
const questions = [
    {
        category: "Astronomia",
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: ["Terra", "Saturno", "Júpiter", "Netuno"],
        correct: 2,
        explanation: "Júpiter é o maior planeta do Sistema Solar."
    },
    {
        category: "Geografia",
        question: "Qual é a capital da Austrália?",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2,
        explanation: "Canberra é a capital da Austrália."
    },
    {
        category: "Ciências",
        question: "Qual é o símbolo químico do ouro?",
        answers: ["Ag", "Au", "Fe", "O"],
        correct: 1,
        explanation: "Au vem do nome latino do ouro: aurum."
    },
    {
        category: "Literatura",
        question: "Quem escreveu Dom Quixote?",
        answers: [
            "William Shakespeare",
            "Machado de Assis",
            "Miguel de Cervantes",
            "Victor Hugo"
        ],
        correct: 2,
        explanation: "Dom Quixote foi escrito por Miguel de Cervantes."
    },
    {
        category: "História",
        question: "Em que ano ocorreu a chegada de Pedro Álvares Cabral ao Brasil?",
        answers: ["1492", "1500", "1530", "1822"],
        correct: 1,
        explanation: "A chegada da expedição portuguesa ocorreu em 1500."
    },
    {
        category: "Biologia",
        question: "Qual organela celular realiza a fotossíntese?",
        answers: [
            "Mitocôndria",
            "Ribossomo",
            "Lisossomo",
            "Cloroplasto"
        ],
        correct: 3,
        explanation: "Os cloroplastos contêm clorofila e realizam a fotossíntese."
    },
    {
        category: "Matemática",
        question: "Quanto é a raiz quadrada de 144?",
        answers: ["10", "11", "12", "14"],
        correct: 2,
        explanation: "12 × 12 = 144."
    },
    {
        category: "Geografia",
        question: "Qual é o maior oceano da Terra?",
        answers: [
            "Oceano Atlântico",
            "Oceano Índico",
            "Oceano Ártico",
            "Oceano Pacífico"
        ],
        correct: 3,
        explanation: "O Oceano Pacífico é o maior dos oceanos."
    },
    {
        category: "Tecnologia",
        question: "O que significa a sigla HTML?",
        answers: [
            "HyperText Markup Language",
            "High Transfer Machine Language",
            "HyperTool Modern Link",
            "Home Text Management Language"
        ],
        correct: 0,
        explanation: "HTML significa HyperText Markup Language."
    },
    {
        category: "Arte",
        question: "Qual artista pintou a Mona Lisa?",
        answers: [
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Claude Monet"
        ],
        correct: 2,
        explanation: "A Mona Lisa foi pintada por Leonardo da Vinci."
    }
];

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionEl = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const categoryEl = document.getElementById("category");
const counter = document.getElementById("counter");
const answersEl = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    intro.classList.add("hidden");
    result.classList.add("hidden");
    quiz.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];
    const number = currentQuestion + 1;

    categoryEl.textContent = q.category.toUpperCase();
    counter.textContent =
        `${String(number).padStart(2, "0")} / ${questions.length}`;

    questionNumber.textContent =
        `PERGUNTA ${String(number).padStart(2, "0")}`;

    questionEl.textContent = q.question;
    progressBar.style.width =
        `${(number / questions.length) * 100}%`;

    feedback.textContent = "";
    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado →"
            : "Próxima pergunta →";

    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer";

        const letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = answer;

        button.append(letter, text);
        button.addEventListener("click", () => selectAnswer(index));

        answersEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answersEl.querySelectorAll(".answer");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && index !== q.correct) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === q.correct) {
        score++;
        feedback.textContent = `✓ Correto! ${q.explanation}`;
        feedback.style.color = "#4ADE80";
    } else {
        feedback.textContent = `Não foi dessa vez. ${q.explanation}`;
        feedback.style.color = "#FB7185";
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById("score").textContent =
        `${score}/${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}% de aproveitamento`;

    let title;
    let message;

    if (percentage === 100) {
        title = "Perfeição! ✨";
        message = "Você acertou tudo! Seu conhecimento está em outro nível.";
    } else if (percentage >= 70) {
        title = "Excelente! 🎉";
        message = "Você mandou muito bem! Continue explorando o mundo.";
    } else if (percentage >= 40) {
        title = "Bom trabalho!";
        message = "Você já sabe bastante. Que tal aprender ainda mais?";
    } else {
        title = "Continue tentando!";
        message = "Cada tentativa é uma oportunidade de descobrir algo novo.";
    }

    document.getElementById("result-title").textContent = title;
    document.getElementById("result-message").textContent = message;
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
