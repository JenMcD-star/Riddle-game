/*Riddle game - if you have a joke book or book of riddles, you can build a static 
html page that provides a riddle and a countdown for the person to have to answer 
before the time runs out then they can display the answer/punchline of the joke.
This primarily would work with DOM manipulation and JS skills like iterating 
through objects/array to display a question and the answer for the questions.  
Some practice with forms/event listeners if you want the user to put in an answer 
and/or click a button to display the answers*/

/* 
create display
make riddles and answers 
display a riddle
enter a guess
save the guess in a variable
check the guess against the answer
if wrong display keep guessing
if right add 1 to score (make a scoreboard)
create a countdown
when countdown is over display correct answer and disable more guesses
create a next button for new riddle
*/
const riddleDisplay = document.getElementById("riddle");
const checkAnswerBtn = document.getElementById("checkAnswer");
const userGuess = document.getElementById("textBox");
const startBtn = document.getElementById("start");
const wrongInput = document.getElementById("wrongInput");
const wrongGuess = document.getElementById("wrongGuess");
const nextBtn = document.getElementById("next");
let riddle;
let answer;
let p = document.createElement("p");

startBtn.addEventListener("click", getRiddle);
checkAnswerBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", getRiddle);

function getRiddle() {
  fetch("https://riddles-api.vercel.app/random", { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then(function (response) {
      riddle = response.riddle;
      answer = response.answer;
      console.log(answer);

      p.innerHTML = `${riddle}`;
      riddleDisplay.appendChild(p);
      wrongGuess.innerHTML = "";
    });
  //start timer
}
//add code to make user guess and answer case and punctuation insensitive
function checkAnswer() {
  let userAnswer = userGuess.value;
  let userAnswerLower = userAnswer.toLowerCase();
  let userAnswerFinal = userAnswerLower;
  userAnswerFinal = userAnswerFinal.replace(/[^a-zA-Z\d]/g, "");
  let answerLower = answer.toLowerCase();
  let answerFinal = answerLower;
  answerFinal = answerFinal.replace(/[^a-zA-Z\d]/g, "");
  let wrongtext = "Wrong guess. Guess again!";
  if (userAnswerFinal === answerFinal) {
    //clear div
    document.getElementById("resetMe").reset();
    wrongGuess.innerHTML = "You got it!";
    //stop timer
  } else {
    wrongGuess.innerHTML = wrongtext;
  }
}
