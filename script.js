const screens = [...document.querySelectorAll(".screen")];

let current = 0;

const startButton = document.getElementById("startButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function showScreen(index) {
  if (index < 0) index = 0;
  if (index >= screens.length) index = screens.length - 1;

  current = index;

  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === current);
  });

  updateNavigation();
}

function updateNavigation() {
  prevButton.style.visibility = current === 0 ? "hidden" : "visible";
  nextButton.style.visibility =
    current === screens.length - 1 ? "hidden" : "visible";
}

startButton.addEventListener("click", () => {
  showScreen(1);
});

prevButton.addEventListener("click", () => {
  showScreen(current - 1);
});

nextButton.addEventListener("click", () => {
  showScreen(current + 1);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    showScreen(current + 1);
  }

  if (event.key === "ArrowLeft") {
    showScreen(current - 1);
  }
});

let touchStartX = null;

document.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) > 60) {
      if (difference < 0) {
        showScreen(current + 1);
      } else {
        showScreen(current - 1);
      }
    }

    touchStartX = null;
  },
  { passive: true }
);

showScreen(0);
