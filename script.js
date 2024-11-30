let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userName = '';
let userAge = '';

// DOM Elements
const userInfoContainer = document.getElementById('user-info');
const quizContainer = document.getElementById('quiz-container');
const scoreboardContainer = document.getElementById('scoreboard');
const questionContainer = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const startQuizButton = document.getElementById('start-quiz-btn');
const retryButton = document.getElementById('retry-btn');
const finalScore = document.getElementById('final-score');
const scoreboardTable = document.getElementById('scoreboard-table');
const userForm = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');

// Fetch questions from a JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions.json'); // Ensure path is correct
        if (!response.ok) throw new Error(`Failed to load questions. Status: ${response.status}`);
        questions = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Initialize the quiz process
userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    userName = nameInput.value.trim();
    userAge = ageInput.value.trim();

    if (userName && userAge) {
        startQuiz();
    } else {
        alert('Please enter both your name and age.');
    }
});

// Start the quiz
async function startQuiz() {
    userInfoContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    await loadQuestions();
    displayQuestion();
}

// Display current question and answers
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // Clear previous answers
    answersContainer.innerHTML = '';
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = createAnswerButton(answer, index === currentQuestion.correct);
        answersContainer.appendChild(button);
    });

    nextButton.disabled = true; // Disable the "Next" button initially
}

// Create an answer button
function createAnswerButton(answer, isCorrect) {
    const button = document.createElement('button');
    button.classList.add('answer-button');
    button.textContent = answer;
    button.addEventListener('click', () => handleAnswer(isCorrect, button));
    return button;
}

// Handle user answer selection
function handleAnswer(isCorrect, button) {
    button.disabled = true;

    if (isCorrect) {
        score++;
    }

    const allButtons = document.querySelectorAll('.answer-button');
    allButtons.forEach(button => button.disabled = true);

    nextButton.disabled = false; // Enable "Next" button
}

// Move to the next question or show scoreboard
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showScoreboard();
    }
});

// Show final score and scoreboard
function showScoreboard() {
    quizContainer.classList.add('hidden');
    scoreboardContainer.classList.remove('hidden');
    finalScore.textContent = `Your Score: ${score} / ${questions.length}`;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${userName}</td>
        <td>${userAge}</td>
        <td>${score}</td>
        <td>${questions.length}</td>
    `;
    scoreboardTable.appendChild(newRow);
}

// Retry the quiz
retryButton.addEventListener('click', () => {
    resetQuiz();
    userInfoContainer.classList.remove('hidden');
    scoreboardContainer.classList.add('hidden');
});

// Reset quiz variables and UI
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
}
