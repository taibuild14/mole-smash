
const holes = document.querySelectorAll(".hole");

let score = 0;
let time = 30;
let activeMole = -1;
let playing = false;
let gameTimer;
let moleTimer;

let best = Number(localStorage.getItem("moleBest")) || 0;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const bestDisplay = document.getElementById("best");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

bestDisplay.textContent = String(best).padStart(4, "0");

function updateDisplay() {
  scoreDisplay.textContent = String(score).padStart(4, "0");
  timeDisplay.textContent = time;
}

function showMole() {
  holes.forEach(hole => hole.textContent = "");

  let next;

  do {
    next = Math.floor(Math.random() * 9);
  } while (next === activeMole);

  activeMole = next;
  holes[next].textContent = "🐹";
}

function hitMole(index) {
  if (!playing || index !== activeMole) return;

  score += 10;
  updateDisplay();

  holes[index].textContent = "💥";
  activeMole = -1;

  message.textContent = "NICE HIT!";
}

holes.forEach((hole, index) => {
  hole.addEventListener("click", () => hitMole(index));
});

function endGame() {
  playing = false;

  clearInterval(gameTimer);
  clearInterval(moleTimer);

  holes.forEach(hole => hole.textContent = "");

  if (score > best) {
    best = score;
    localStorage.setItem("moleBest", best);
  }

  bestDisplay.textContent = String(best).padStart(4, "0");

  message.textContent = `GAME OVER! SCORE: ${score}`;
  startButton.textContent = "↻ PLAY AGAIN";
}

function startGame() {
  if (playing) return;

  score = 0;
  time = 30;
  playing = true;

  updateDisplay();

  message.textContent = "GO! GO! GO!";
  startButton.textContent = "PLAYING...";

  showMole();

  moleTimer = setInterval(showMole, 850);

  gameTimer = setInterval(() => {
    time--;
    updateDisplay();

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);
