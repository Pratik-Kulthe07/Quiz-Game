const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

let userName = "";
const quizData = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { question: "Who painted the Mona Lisa?", options: ["Leonardo Da Vinci", "Picasso", "Michelangelo", "Van Gogh"], answer: 0 },
  { question: "Currency of Japan?", options: ["Yuan", "Won", "Yen", "Dollar"], answer: 2 },
  { question: "Who wrote 'Hamlet'?", options: ["Dickens", "Shakespeare", "Austen", "Twain"], answer: 1 },
  { question: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { question: "World War 2 ended in?", options: ["1945", "1939", "1918", "1965"], answer: 0 },
  { question: "Chemical symbol for Oxygen?", options: ["O", "Ox", "Oz", "Om"], answer: 0 },
  { question: "Plants absorb?", options: ["O2", "CO2", "H2", "N2"], answer: 1 },
  { question: "Smallest continent?", options: ["Europe", "Australia", "Antarctica", "South America"], answer: 1 }
];

const quizContainer = document.getElementById("quiz");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  progress.style.width = `${(currentQuestion / quizData.length) * 100}%`;
  progressContainer.style.display = "block";

  const questionHTML = `
    <div class="question-card">
      <div class="question-number">Hi ${userName}, Question ${currentQuestion + 1} of ${quizData.length}</div>
      <div class="question-text">${q.question}</div>
      ${q.options.map((opt, index) => `<div class="option" onclick="selectOption(this, ${index})">${opt}</div>`).join('')}
    </div>
  `;

  quizContainer.innerHTML = questionHTML;
  quizContainer.prepend(progressContainer);
}

function selectOption(selected, index) {
  const q = quizData[currentQuestion];
  const options = document.querySelectorAll('.option');
  options.forEach(option => option.onclick = null);

  if (index === q.answer) {
    selected.classList.add('correct');
    correctSound.play();
    score++;
  } else {
    selected.classList.add('incorrect');
    wrongSound.play();
    options[q.answer].classList.add('correct');
  }

  const nextBtn = document.createElement('button');
  nextBtn.innerText = currentQuestion < quizData.length - 1 ? 'Next' : 'See Results';
  nextBtn.className = 'btn next';
  nextBtn.onclick = nextQuestion;

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.appendChild(nextBtn);

  quizContainer.appendChild(controls);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  progressContainer.style.display = "none";
  const message = score >= 8 ? "🎉 Excellent!" : score >= 5 ? "👍 Good job!" : "😅 Try again!";
  const resultHTML = `
    <div class="score-container">
      <h2>${userName}, you scored: ${score} / ${quizData.length}</h2>
      <p>${message}</p>
      <button class="btn restart" onclick="restartQuiz()">Restart</button>
    </div>
  `;
  quizContainer.innerHTML = resultHTML;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function startQuiz() {
  const input = document.getElementById("username");
  const name = input.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  userName = name;
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

document.getElementById("username").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    startQuiz();
  }
});


const toggleBtn = document.getElementById('toggle-theme');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.innerText = '☀️ Light Mode';
}
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  toggleBtn.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
