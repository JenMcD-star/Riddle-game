/*Riddle game - if you have a joke book or book of riddles, you can build a static 
html page that provides a riddle and a countdown for the person to have to answer 
before the time runs out then they can display the answer/punchline of the joke.
This primarily would work with DOM manipulation and JS skills like iterating 
through objects/array to display a question and the answer for the questions.  
Some practice with forms/event listeners if you want the user to put in an answer 
and/or click a button to display the answers*/

const riddleDisplay = document.getElementById("riddle");
const checkAnswerBtn = document.getElementById("checkAnswer");
const userGuess = document.getElementById("textBox");
const startBtn = document.getElementById("start");
const wrongInput = document.getElementById("wrongInput");
const wrongGuess = document.getElementById("wrongGuess");
const nextBtn = document.getElementById("next");
let position = 0;

let riddle = [
  "What has to be broken before you can use it?",
  "I’m tall when I’m young, and I’m short when I’m old. What am I?",
  "What month of the year has 28 days?",
  "What is full of holes but still holds water?",
  "What question can you never answer yes to?",
  "What is always in front of you but can’t be seen?",
  "There’s a one-story house in which everything is yellow. Yellow walls, yellow doors, yellow furniture. What color are the stairs?",
  "What can you break, even if you never pick it up or touch it?",
  "What goes up but never comes down?",
  "A man who was outside in the rain without an umbrella or hat didn’t get a single hair on his head wet. Why?",
];
let answer = [
  "an egg",
  "A candle",
  "All of them",
  "a sponge",
  "Are you asleep yet?",
  "The future",
  "There aren’t any—it’s a one-story house.",
  "A promise",
  "your age",
  "he was bald",
];
let p = document.createElement("p");
let myTimer;

startBtn.addEventListener("click", getRiddle);
checkAnswerBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", getRiddle);

function getRiddle() {
  resetTimer();
  console.log(position)
  if (position <= 8) {
    let currentRiddle = riddle[position];
    p.innerHTML = `${currentRiddle}`;
    riddleDisplay.appendChild(p);
    wrongGuess.innerHTML = "";
    //start timer
    startTimer();
    position++;
  } else {
    position = 0;
  }
}
//add code to make user guess and answer case and punctuation insensitive
function checkAnswer() {
  let userAnswer = userGuess.value;
  let userAnswerLower = userAnswer.toLowerCase();
  let userAnswerFinal = userAnswerLower;
  userAnswerFinal = userAnswerFinal.replace(/[^a-zA-Z\d]/g, "");
  let currentAnswer = answer[position-1];
  let answerLower = currentAnswer.toLowerCase();
  let answerFinal = answerLower;
 

  answerFinal = answerFinal.replace(/[^a-zA-Z\d]/g, "");
  let wrongtext = "Wrong guess. Guess again!";
  if (userAnswerFinal === answerFinal) {
    //clear div
    document.getElementById("resetMe").reset();
    wrongGuess.innerHTML = "You got it!";
    //reset timer
    resetTimer();
  } else {
    wrongGuess.innerHTML = wrongtext;
  }
}

function startTimer() {
  let seconds = 30;
  tick();
  function tick() {
    let countdown = document.getElementById("countdown");
    seconds--;
    countdown.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      myTimer = setTimeout(tick, 1000);
    } else {
      let currentAnswer = answer[position-1];
      p.innerHTML = `The answer is: ${currentAnswer}`;
      riddleDisplay.appendChild(p);
      wrongGuess.innerHTML = "Time is up!";
    }
  }
}
function resetTimer() {
  let countdown = document.getElementById("countdown");
  countdown.innerHTML = "0:00";
  clearTimeout(myTimer);
}
