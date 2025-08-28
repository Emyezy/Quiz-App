const questions = [
  {
    question: "What is the capital of Nigeria?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Abuja", correct: true },
      { text: "Abia", correct: false },
      { text: "Porthacurt", correct: false },
    ],
  },
  {
    question: "What is 20 + 25?",
    answers: [
      { text: "65", correct: false },
      { text: "85", correct: false },
      { text: "55", correct: false },
      { text: "45", correct: true },
    ],
  },
  {
    question: "Which planet is known as the Hottest?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Venus", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
    ],
  },
  {
    question:
      "What is the melting point of ice at standard atmospheric pressure?",
    answers: [
      { text: "0 °C (32 °F)", correct: true },
      { text: "50 °C (122 °F)", correct: false },
      { text: "–10 °C (14 °F)", correct: false },
      { text: "100 °C (212 °F)", correct: false },
    ],
  },
  {
    question: "Which gas do plants primarily absorb for photosynthesis?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Gd", correct: false },
      { text: "Go", correct: false },
    ],
  },
  {
    question: "In which year did Nigeria gain independence?",
    answers: [
      { text: "1960", correct: true },
      { text: "1990", correct: false },
      { text: "1950", correct: false },
      { text: "1919", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const restartButton2 = document.getElementById("restart-btn2");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, button));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer, button) {
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (
      btn.innerText ===
      questions[currentQuestionIndex].answers.find((a) => a.correct).text
    ) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `${score} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", startQuiz);
restartButton2.addEventListener("click", startQuiz);

// Start the quiz initially
startQuiz();
