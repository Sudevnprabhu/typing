const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const fm = document.getElementById('Final-msg')
const timerElement = document.getElementById('timer')
const btn = document.getElementById("btn");
const btn2 = document.getElementById("btnend");

btn.addEventListener('click',function(){
  if(this.innerText == 'Start'){
    quoteInputElement.disable = false;
    renderNewQuote();
  }else if(this.innerText == "Done"){
    quoteInputElement.disable = true;
    btn.innerText = "Start Again";
    endPlay();
  }else if(this.innerText == 'Start Again'){
    quoteInputElement.disable = false;
    fm.innerText = null;
    renderNewQuote();
  }
})

btn2.addEventListener('click', function(){
  if (this.innerText == "End"){
    quoteDisplayElement.innerText=null;
    fm.innerText=null;
    timerElement.innerText="Thank You For Playing Hope You Enjoyed The Game";
    btn.innerText = "Start";
  }
})
//1st
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

//2nd
async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null


  startTimer()

  btn.innerText = "Done";
}



//3rd
quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

 // if (correct)  renderNewQuote()
})

//4th
let startTime
function startTimer() {
  timerElement.innerText = "Keep Focused!";
  let date = new Date();
  startTime=date.getTime();
  /*setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)*/
}

//5th
//function getTimerTime() {
 // return Math.floor((new Date() - startTime) / 1000)
//}

let endTime
const endPlay = () => {
  let date = new Date();
  endTime = date.getTime();

  let TotalTime = ((endTime - startTime)/1000)

  console.log(TotalTime);

  let totalStr = quoteInputElement.value;
  let wordCount = wordCounter(totalStr);

  let speed = Math.round((wordCount / TotalTime)*60);

  let finalMsg = "Your speed of typing is " + speed + " words per minutes, ";

  finalMsg += compareWords(quoteDisplayElement.innerText,totalStr);

  fm.innerText = finalMsg;

  timerElement.innerText = "Great Keep Going 👍 "
}

const wordCounter=(str)=>{
  let ressp = str.split(" ").length;
  console.log(ressp);
  return ressp;  
}

const compareWords=(str1,str2)=>{
  let words1 = str1.split(" ");
  let words2 = str2.split(" ");
  let cnt = 0;

  words1.forEach(function(item , index){
    if(item == words2[index]){
      cnt++;
    }
  })

  let errorWords = (words1.length - cnt);
  return(" in which " + cnt+ " words are correct out of " + words1.length + " words and the total number of error are " + errorWords + " words.");
}