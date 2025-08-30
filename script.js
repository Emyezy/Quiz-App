const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Custom Nigeria Questions (first 10)
const nigeriaQuestions = [
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
    question: "Which Nigerian artist sang African Queen?",
    answers: [
      { text: "Davido", correct: false },
      { text: "Burna Boy", correct: false },
      { text: "Wizkid", correct: false },
      { text: "2Face Idibia", correct: true },
    ],
  },
  {
    question:
      "Which Nigerian writer won the Nobel Prize in Literature in 1986?",
    answers: [
      { text: "Ben Okri", correct: false },
      { text: "Chinua Achebe", correct: false },
      { text: "Wole Soyinka", correct: true },
      { text: "Chimamanda Ngozi Adichie", correct: false },
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
    question: "The currency used in Nigeria is",
    answers: [
      { text: "Naira", correct: true },
      { text: "Cedi", correct: false },
      { text: "Pound", correct: false },
      { text: "Dollar", correct: false },
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
      { text: "1945", correct: false },
      { text: "1947", correct: false },
      { text: "1960", correct: true },
      { text: "1952", correct: false },
    ],
  },
  {
    question: "Which river is the longest in Nigeria?",
    answers: [
      { text: "River Benue", correct: false },
      { text: "River Kaduna", correct: false },
      { text: "River Niger", correct: true },
      { text: "River Cross", correct: false },
    ],
  },
  {
    question: "Who designed the Nigerian flag?",
    answers: [
      { text: "Dora Akunyili", correct: false },
      { text: "Yakubu Gowon", correct: false },
      { text: "Michael Taiwo Akinkunmi", correct: true },
      { text: "Wole Soyinka", correct: false },
    ],
  },
];

// Fetch 90 questions from Open Trivia
async function fetchTriviaQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=90&type=multiple"
  );
  const data = await res.json();
  return data.results.map((q) => ({
    question: decodeHTML(q.question),
    answers: shuffleArray([
      ...q.incorrect_answers.map((ans) => ({
        text: decodeHTML(ans),
        correct: false,
      })),
      { text: decodeHTML(q.correct_answer), correct: true },
    ]),
  }));
}

function decodeHTML(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener("click", () => {
  window.location.reload();
});

async function startGame() {
  startButton.classList.add("hide");
  score = 0;
  // Load custom + API questions
  const apiQuestions = await fetchTriviaQuestions();
  shuffledQuestions = [...nigeriaQuestions, ...apiQuestions];
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  setStatusClass(selectedButton, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    nextButton.classList.remove("hide");
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionContainer.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreElement.innerText = score;
  restartButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
