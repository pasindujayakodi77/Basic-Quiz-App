let currentQuestionIndex = 0;
let score = 0;
const questions = [];
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// Load questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions.push(...data);
        displayQuestion();
    })
    .catch(error => console.log(error));

// Display the current question and choices
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById("question");
    const answersList = document.getElementById("answers");

    questionText.textContent = question.question;
    answersList.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => checkAnswer(index));
        li.appendChild(button);
        answersList.appendChild(li);
    });
}

// Check if the selected answer is correct
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        score++;
    }
    nextBtn.disabled = false;
}

// Move to the next question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextBtn.disabled = true;
    } else {
        displayResult();
    }
});

// Display the final score
function displayResult() {
    const totalQuestions = questions.length;
    resultDiv.textContent = `Quiz Complete! Your score is ${score} out of ${totalQuestions}.`;
    nextBtn.style.display = 'none';
}
