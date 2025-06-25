// Hamburger Menu
// Navbar Toggle

const mobileMenu = document.querySelector("#mobile-menu");

function toggleNav(show) {
  mobileMenu.classList.toggle("scale-x-100", show);
  mobileMenu.classList.toggle("opacity-100", show);
  mobileMenu.classList.toggle("visible", show);
  mobileMenu.classList.toggle("scale-x-0", !show);
  mobileMenu.classList.toggle("opacity-0", !show);
  mobileMenu.classList.toggle("invisible", !show);
}

// About Area
// Swiper
var swiper = new Swiper(".mySwiper", {
  effect: "slide",
  grabCursor: true,
  loop: true,
  speed: 1000,
  slidesPerView: 3,
  slidesPerGroup: 1,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
    1536: { slidesPerView: 6 },
  },
});

// Pause autoplay on hover
const swiperEl = document.querySelector(".mySwiper");

swiperEl.addEventListener("mouseenter", () => {
  swiper.autoplay.stop();
});

swiperEl.addEventListener("mouseleave", () => {
  swiper.autoplay.start();
});

// Testimonial Cards
const slides = document.querySelectorAll(".swiper-slide");

slides.forEach((slide) => {
  const info = slide.querySelector(".avatar-info");

  slide.addEventListener("mouseenter", () => {
    info.classList.remove("-bottom-32", "opacity-0");
    info.classList.add("bottom-0", "opacity-100");
  });

  slide.addEventListener("mouseleave", () => {
    info.classList.remove("bottom-0", "opacity-100");
    info.classList.add("-bottom-32", "opacity-0");
  });
});

// Quiz Area
// Quiz App
let questions = [
  {
    question: "What is the sum of the interior angles of a triangle?",

    choices: [`180°`, `90°`, `360°`, `270°`],
    answer: 0,
  },
  {
    question: "Which shape has exactly one pair of parallel sides?",
    choices: ["Rectangle", "Trapezoid", "Rhombus", "Square"],
    answer: 1,
  },
  {
    question: "A line that touches a circle at exactly one point is called a:",
    choices: ["Diameter", "Chord", "Tangent", "Radius"],
    answer: 2,
  },
  {
    question:
      "What do you call a triangle with all three sides of different lengths?",
    choices: ["Isosceles", "Scalene", "Right", "Equilateral"],
    answer: 1,
  },
  {
    question: "How many faces does a rectangular prism have?",
    choices: ["4", "8", "12", "6"],
    answer: 3,
  },
  {
    question: "Which of the following is NOT a polygon?",
    choices: ["Circle", "Octagon", "Hexagon", "Triangle"],
    answer: 0,
  },
  {
    question: "Which unit is used to measure angles?",
    choices: ["Meters", "Liters", "Kilograms", "Degrees"],
    answer: 3,
  },
  {
    question: "A square has how many lines of symmetry?",
    choices: ["2", "3", "4", "6"],
    answer: 2,
  },
];

let current = 0;
let score = 0;
const originalQuizHTML = document.getElementById("quiz").innerHTML;

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("restart-screen").classList.add("hidden");

  current = 0;
  score = 0;
  questions = questions.sort(() => Math.random() - 0.5);
  document.getElementById("quiz").innerHTML = originalQuizHTML;
  loadQuestion();
}

function restartQuiz() {
  startQuiz();
}

function loadQuestion() {
  if (current >= questions.length) {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("restart-screen").classList.remove("hidden");
    document.getElementById("restart-screen").insertAdjacentHTML(
      "afterbegin",
      `
      <h2 class='text-xl md:text-2xl text-center mb-2 font-[Raleway] font-semibold'>🎉Assessment Completed!</h2>
      <p class="text-center text-lg text-blue-600">Your Score: ${score}/${questions.length}</p>
    `
    );
    return;
  }

  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  document.getElementById("question-count").textContent = `Question ${
    current + 1
  } of ${questions.length}`;
  document.getElementById("score-indicator").textContent = `Score: ${score}`;
  // document.getElementById("inline-score").textContent = `Score: ${score}`;

  const progress = (current / questions.length) * 100;
  const accuracy = current > 0 ? score / current : 0;
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress}%`;
  progressBar.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-500");
  if (accuracy >= 0.7) {
    progressBar.classList.add("bg-green-500");
  } else if (accuracy >= 0.4) {
    progressBar.classList.add("bg-yellow-500");
  } else {
    progressBar.classList.add("bg-red-500");
  }

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className =
      "bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-200 cursor-pointer";
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(i, btn, q.answer);
    choicesDiv.appendChild(btn);
  });
}

function selectAnswer(index, button, correctIndex) {
  const isCorrect = index === correctIndex;
  const allButtons = document.querySelectorAll("#choices button");

  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add("border-2", "border-green-500");
    }
    if (i === index && !isCorrect) {
      btn.classList.add("border-2", "border-red-500");
    }
  });

  if (isCorrect) score++;

  setTimeout(() => {
    current++;
    loadQuestion();
  }, 1000);
}

window.onload = () => {
  document.getElementById("quiz").classList.add("hidden");
};

// Generator Area
// Password Generator
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = `!#$%&()*+,-./:;<=>?@[]^_{|}~`;
const numbers = "0123456789";

const outputPass = document.querySelector("#output-pass");
const inputPass = document.querySelector("#input-len");

function genPassword(length) {
  const chartSet = lowerCase + upperCase + symbols + numbers;
  let pass = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chartSet.length);
    pass += chartSet[randomIndex];
  }
  return pass;
}

function passBtn() {
  if (inputPass < 8) {
    oupt;
  }
  outputPass.value = genPassword(inputPass.value);
}
