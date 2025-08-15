const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "San Francisco", correct: false },
            { text: "Paris", correct: true },
            { text: "Los Angeles", correct: false },
            { text: "Colmar", correct: false },
        ]
    },
    {
        question: "What is the capital of the United States?",
        answers: [
            { text: "New York City", correct: false },
            { text: "Washington D.C.", correct: true },
            { text: "Chicago", correct: false },
            { text: "Boston", correct: false },
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Monaco", correct: false },
            { text: "Nauru", correct: false },
            { text: "Tuvalu", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Uranus", correct: false },
        ]
    },
    {
        question: 'Which is the largest desert in the world?',
        answers: [
            { text: 'Sahara', correct: true },
            { text: 'Gobi', correct: false },
            { text: 'Mojave', correct: false },
            { text: 'Atacama', correct: false },
        ]
    },
    {
        question: "What is the world's largest waterfall, by volume of water?",
        answers: [
            { text: "Victoria Falls", correct: true },
            { text: "Iguazu Falls", correct: false },
            { text: "Niagara Falls", correct: false },
            { text: "Angel Falls", correct: false },
        ]
    },
    {
        question: "What is the world's largest living structure, according to the Guinness World Records?",
        answers: [
            { text: "Amazon Rainforest", correct: false },
            { text: "Great Barrier Reef", correct: true },
            { text: "Grand Canyon", correct: false },
            { text: "Great Blue Hole", correct: false },
        ]
    },
    {
        question: "What is the world's largest snowflake?",
        answers: [
            { text: "10 inches", correct: false },
            { text: "20 inches", correct: false },
            { text: "25 inches", correct: false },
            { text: "15 inches", correct: true },
        ]
    },{
        question: "Who was the first President of the United States?",
        answers: [
            { text: "George Washington", correct: true },
            { text: "Thomas Jefferson", correct: false },
            { text: "Abraham Lincoln", correct: false },
            { text: "Benjamin Franklin", correct: false },
        ]
    },
    {
        question: "What is the world's largest island?",
        answers: [
            { text: "New Guinea", correct: false },
            { text: "Borneo", correct: false },
            { text: "Madagascar", correct: false },
            { text: "Greenland", correct: true },
        ]
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answerButtons')
const nextButton = document.getElementById('nextBtn')


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState()
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next'
    showQuestions()
}

function showQuestions(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 + ". ";
    questionElement.innerHTML = questionNo + currentQuestion.question

    currentQuestion.answers.forEach(function(answer){
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', selectAnswer)
    })
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect')
    }

    // to show correct answer when wrong is selected
    Array.from(answerButtons.children).forEach(function(button){
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block'
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !!`
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestions()
    }
    else{
        showScore()
    }
}

nextButton.addEventListener('click', function(){
    if(currentQuestionIndex < questions.length){
        handleNextBtn()
    }
    else{
        startQuiz()
    }
})

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz()

