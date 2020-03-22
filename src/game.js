const choices = Array.from(document.getElementsByClassName("choice-text"));
const question = document.getElementById("question");
const progessText = document.getElementById("progessText");
const progessBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: "What is the best movie/series genre?",
        choice1: "Comedy",
        choice2: "Action",
        choice3: "Horror",
        choice4: "Musical",
        answer: 3,
    },
    {
        question: "What is the most beautiful color?",
        choice1: "Turquoise",
        choice2: "Pink",
        choice3: "Green",
        choice4: "Purple",
        answer: 1,
    },
    {
        question: `What is the best character in "Turma da Mônica"?`,
        choice1: "Mônica",
        choice2: "Cebolinha",
        choice3: "Magalí",
        choice4: "Cascão",
        answer: 2,
    },
    {
        question: 'What is the most tasty food? ',
        choice1: "Açaí",
        choice2: "Pizza",
        choice3: "Sushi",
        choice4: "Ice Cream",
        answer: 1,
    },
];

/* Constants */
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];

     getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to end page
        return window.location.assign('../src/end.html');
    }

    questionCounter++;
    progessText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progessBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    const questionIndex = Math.floor((Math.random() * availableQuestions.length));
    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 700)
    });
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
incrementScore(0);