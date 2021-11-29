// list of all questions, choices, & answers
const questions = [{

}, {
  title: "There are two basic groups of data types used in JavaScript, what are they?",
  choices: ["Primitive & attribute","Primitive & reference types","Reference types & attribute","None of the above"],
  answer: "Primitive & reference types"
}, {
  
  title: "Which one is a looping structure in JavaScript?",
  choices: ["All the above", "For", "While", "do-while loops"],
  answer: "All the above"
}, {

  title: "Data types commonly used DO NOT include:",
  choices: ["strings", "booleans", "alerts", "numbers"],
  answer: "alerts"
}, {

  title: "Boolean operators that can be used in JavaScript include:",
  choices: ["'And' Operator &&","'Or' Operator ||","'Not' Operator !","All the above"],
  answer: "All the above"
}, {

  title: "What is the data type of variables in JavaScript?",
  choices: ["Object data types","Function data type","None of the above","All of the above"],
  answer: "Object data types"
}, {

  title:
    "There are three different types of errors in JavaScript. Which one of these is not among the three?",
  choices: ["Animation time errors","Load time errors","Run time errors","Logical Errors"],
  answer: "Animation time errors"
}, {

  title:
    "How do you access the the dev tools to inspect the elements & console in JavaScript?",
  choices: ["right click and look for inspect option in menu","click the three dots right in the hand top corner of the screen; look for more tools then click on developer tools","Ctrl+ shift + I","All of the above"],
  answer: "All of the above"
}, {

  title: "The condition in an if/else statement is enclosed within ____.",
  choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
  answer: "parentheses"
}, {

  title: "Arrays in JavaScript can be used to store ____.",
  choices: ["numbers and strings","other arrays","booleans","all of the above"],
  answer: "all of the above"
}, {

  title:
    "A very useful tool used during development & debugging for printing content to the debugger is:",
  choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  answer: "console.log"
}, {

  title:
    "String values must be enclosed within ____ when being assigned to variables.",
  choices: ["commas", "curly brackets", "quotes", "parentheses"],
  answer: "quotes"
}, {

  title: "What are the type of Pop up boxes available in JavaScript?:",
  choices: ["Alert", "Confirm", "Prompt", "All the above"],
  answer: "All the above"
}];

const timerEl = document.getElementById("timer");
//buttons
const startButton = document.getElementById('start-btn')
const answerButtonsElement = document.getElementById('answer-buttons')
const submitButton = document.getElementById('submit-btn')
const answer1 = document.getElementById("btn1");
const answer2 = document.getElementById("btn2");
const answer3 = document.getElementById("btn3");
const answer4 = document.getElementById("btn4");

//questions
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')

//page elements
const welcomePageElements = document.getElementById('welcome-page')
const endGameElements = document.getElementById('end-page')
const scoreElement = document.getElementById('score')
const displayEl = document.getElementById('display')
const displayEl2 = document.getElementById('display2')

//highest score page elements
const initialsEl = document.getElementById('initials')
const scoresEl = document.getElementById('high-scores')
const newScore = document.getElementById('newScores')
const viewScoreList = document.getElementById('highscore')
const containerEl = document.getElementById('container')


let questionCounter = 0;
let timeLeft = questions.length * 15;     
                                              

// Timer countdown from 60 seconds
function countDown() {
                            
        if(timeLeft > 0){
            timerEl.textContent = "Timer:  " + timeLeft;
            timeLeft--
        }
        else {
            timerEl.textContent = "Timer:  " + timeLeft; 
            endGame();
        }
    }


var createQuestionElement = function(index) {

    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;

    answer1.textContent = currentQuestion.answers[0]
    answer2.textContent = currentQuestion.answers[1]
    answer3.textContent = currentQuestion.answers[2]
    answer4.textContent = currentQuestion.answers[3]
}

var checkAnswer = function(event) {
    var correctAnswer = questions[questionCounter].correctAnswer
    var currentAnswer = event.target.textContent   
    displayEl.classList.remove('hide') 
    displayEl2.classList.remove('hide')
    
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "-----------Correct!!-----------"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "-----------Wrong!!!-----------"
        timeLeft -= 15;
    }
    
    questionCounter++;
    if(questionCounter === questions.length){
        endGame();
    } else {
    createQuestionElement();
}
}

var startGame = function(){
    timeInterval = setInterval(countDown, 1000);
    startButton.classList.add('hide')
    // shuffledQuestions = questions.sort(() => Math.random() - .5)
    // currentQuestionIndex = 0
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    countDown();
    // setNextQuestion()
    createQuestionElement();
    }

var endGame = function(){
    clearInterval(timeInterval);
    questionContainerElement.classList.add('hide')
       endGameElements.classList.remove('hide')
       scoreElement.textContent = "Your final score is " + timeLeft;
       timerEl.classList.add('hide')
    //    timerInterval = setInterval(countDown, 1000);

       setTimeout(function() {
           displayEl.setAttribute("class", "hide");
       }, 1000);
       setTimeout(function() {
           displayEl2.setAttribute("class", "hide");
       }, 1000);
       highestScore();
  }


  function highestScore(){
    submitButton.addEventListener("click", function(event) {
        
    
    var id = initialsEl.value
    var score = timeLeft;
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    if(id.length > 0) {
        var newScore = {
            id,
            score
        }
        console.log(id)
        scoresEl.classList.remove('hide');
        endGameElements.classList.add('hide');
        containerEl.classList.add('hide')
        viewScoreList.classList.add('hide')
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
           
        if(highscores !== undefined) {
            highscores.sort(function(a,b){
                return b.score - a.score
            })
            highscores.forEach(function(score){
                console.log(score)
                var li = document.createElement("li");
                li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
                var olEl = document.getElementById('newScores');
                olEl.appendChild(li)
            })
        }
    }
   
    
        
    console.log(highscores);
    
 })
  }

  function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

function viewHighScores(){
    startButton.classList.add('hide')
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.add('hide')
    displayEl.classList.add('hide') 
    displayEl2.classList.add('hide')
    timerEl.classList.add('hide')
    // newScore.classList.remove('hide')
    scoresEl.classList.remove('hide')
    containerEl.classList.add('hide')
    viewScoreList.classList.add('hide')

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // highscores.push(newScore);
    // window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
        


highscores.sort(function(a,b){
    return b.score - a.score
})

highscores.forEach(function(score){
    var li = document.createElement("li");
    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
    var olEl = document.getElementById('newScores');
    olEl.appendChild(li)
})

console.log(highscores);

    
}


document.getElementById("clear").onclick = clearHighscores;
startButton.addEventListener('click', startGame)
answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)
viewScoreList.addEventListener("click", viewHighScores)

