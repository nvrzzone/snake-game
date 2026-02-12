import { createInitialState, setDirection, step } from './snakeLogic.js';

const gridEl = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const pauseBtn = document.getElementById('pause');
const controlButtons = document.querySelectorAll('[data-dir]');

const CELL_SIZE = 22;
const TICK_MS = 130;

let paused = false;
let state = createInitialState({ width: 16, height: 16, seed: Date.now() & 0xffffffff });

function setupGrid() {
  gridEl.style.gridTemplateColumns = `repeat(${state.width}, ${CELL_SIZE}px)`;
  gridEl.style.gridTemplateRows = `repeat(${state.height}, ${CELL_SIZE}px)`;
  gridEl.style.width = `${state.width * CELL_SIZE}px`;
}

function render() {
  scoreEl.textContent = String(state.score);
  if (!state.alive) {
    statusEl.textContent = 'Game over';
  } else if (paused) {
    statusEl.textContent = 'Paused';
  } else {
    statusEl.textContent = 'Running';
  }

  const snakeSet = new Set(state.snake.map((p) => `${p.x},${p.y}`));
  const head = state.snake[0];

  const cells = [];
  for (let y = 0; y < state.height; y += 1) {
    for (let x = 0; x < state.width; x += 1) {
      let cls = 'cell';
      if (state.food && state.food.x === x && state.food.y === y) {
        cls += ' food';
      }
      if (snakeSet.has(`${x},${y}`)) {
        cls += x === head.x && y === head.y ? ' snake head' : ' snake';
      }
      cells.push(`<div class="${cls}"></div>`);
    }
  }
  gridEl.innerHTML = cells.join('');
}

function tick() {
  if (!paused && state.alive) {
    state = step(state);
    render();
  }
}

function reset() {
  paused = false;
  pauseBtn.textContent = 'Pause';
  state = createInitialState({ width: 16, height: 16, seed: Date.now() & 0xffffffff });
  setupGrid();
  render();
}

function handleDirection(input) {
  state = setDirection(state, input);
}

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') handleDirection('up');
  if (key === 'arrowdown' || key === 's') handleDirection('down');
  if (key === 'arrowleft' || key === 'a') handleDirection('left');
  if (key === 'arrowright' || key === 'd') handleDirection('right');
  if (key === ' ') {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    render();
  }
  if (key === 'r') {
    reset();
  }
});

controlButtons.forEach((btn) => {
  btn.addEventListener('click', () => handleDirection(btn.dataset.dir));
});

restartBtn.addEventListener('click', reset);
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
  render();
});

setupGrid();
render();
setInterval(tick, TICK_MS);
