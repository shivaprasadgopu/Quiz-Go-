const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which programming language is primarily used for Android development?",
    answers: [
      { text: "python", correct: false },
      { text: "java", correct: true },
      { text: "swift", correct: false },
      { text: "PHP", correct: false },
    ],
  },
  {
    question: "Which language is mainly used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "java", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: false },
      { text: "undefined", correct: true },
    ],
  },
  {
    question: "Which of the following is a NoSQL database?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "PostgreSQL", correct: false },
      { text: "MongoDB", correct: true },
      { text: "Oracle", correct: false },
    ],
  },
  {
    question: "If Wi-Fi goes down, what’s the first thing people usually do?",
    answers: [
      { text: "Restart the router", correct: true },
      { text: "Read a book", correct: false },
      { text: "Call customer support", correct: false },
      { text: "Panic and question their life choices", correct: false },
    ],
  },
  {
    question: "What do you call someone who talks to themselves, answers, and argues too?",
    answers: [
      { text: "A philosopher", correct: false },
      { text: "A programmer", correct: false },
      { text: "A genius", correct: false },
      { text: "A mirror fan", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  resultScreen.classList.remove("active");
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a Genius";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep Learning";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not Bad! Try again to improve";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
