export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export function createInitialState({ width = 16, height = 16, seed = 1 } = {}) {
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const snake = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];

  const rng = createRng(seed);
  const food = spawnFood({ width, height, snake, rng });

  return {
    width,
    height,
    snake,
    direction: 'right',
    pendingDirection: 'right',
    food,
    score: 0,
    alive: true,
    rng,
  };
}

export function setDirection(state, nextDirection) {
  if (!state.alive) return state;
  if (!DIRECTIONS[nextDirection]) return state;
  if (OPPOSITE[state.direction] === nextDirection) return state;
  return { ...state, pendingDirection: nextDirection };
}

export function step(state) {
  if (!state.alive) return state;

  const direction = state.pendingDirection;
  const delta = DIRECTIONS[direction];
  const nextHead = {
    x: state.snake[0].x + delta.x,
    y: state.snake[0].y + delta.y,
  };

  const outOfBounds =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.width ||
    nextHead.y >= state.height;

  if (outOfBounds) {
    return { ...state, direction, alive: false };
  }

  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const bodyToCheck = ateFood ? state.snake : state.snake.slice(0, -1);
  const hitSelf = bodyToCheck.some((part) => part.x === nextHead.x && part.y === nextHead.y);

  if (hitSelf) {
    return { ...state, direction, alive: false };
  }

  const snake = [nextHead, ...state.snake];
  if (!ateFood) {
    snake.pop();
  }

  const food = ateFood
    ? spawnFood({ width: state.width, height: state.height, snake, rng: state.rng })
    : state.food;

  return {
    ...state,
    snake,
    direction,
    food,
    score: state.score + (ateFood ? 1 : 0),
  };
}

export function spawnFood({ width, height, snake, rng }) {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const openCells = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const idx = Math.floor(rng() * openCells.length);
  return openCells[idx];
}

export function createRng(seed = 1) {
  let value = seed >>> 0;
  return function rng() {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}
