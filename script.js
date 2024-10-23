const questions = [
  {
    question: "which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Girraffe", correct: false },
    ],
  },
  {
    question: "what is color of human blood?",
    answers: [
      { text: "white", correct: false },
      { text: "Yellow", correct: false },
      { text: "Green", correct: false },
      { text: "Red", correct: true },
    ],
  },
  {
    question: "Prime Minister of india?",
    answers: [
      { text: "Obama", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Pinarayi Vijayan", correct: false },
      { text: "Shylaja Teacher", correct: false },
    ],
  },
  {
    question: "which is the largest country in the world?",
    answers: [
      { text: "India", correct: false },
      { text: "Jamaica", correct: false },
      { text: "Russia", correct: true },
      { text: "Antartica", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  // here it removes all the buttons of old question.
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  // here the arrow is to For each answer in the array, execute the code inside the arrow function.
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  // selected button is button or anwser choosed by user
  const selectedButton = e.target;
  // here it checks if the selected button's data correct attribute is true
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
  }
  // the below loop is for to show the right answer if the user chooses wrong answer
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // button.disabled will allow user to choose again.
    button.disabled = true;
  });
  // after choosing user's answer it will show the next button to next question
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
// here arrow represents an anonymous function
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
