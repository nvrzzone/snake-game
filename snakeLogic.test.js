import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, setDirection, step, spawnFood, createRng } from './snakeLogic.js';

test('moves one cell in current direction', () => {
  const state = createInitialState({ width: 10, height: 10, seed: 1 });
  const next = step(state);
  assert.deepEqual(next.snake[0], { x: state.snake[0].x + 1, y: state.snake[0].y });
});

test('rejects immediate reverse direction', () => {
  const state = createInitialState({ width: 10, height: 10, seed: 1 });
  const changed = setDirection(state, 'left');
  assert.equal(changed.pendingDirection, 'right');
});

test('grows and increments score when eating food', () => {
  let state = createInitialState({ width: 10, height: 10, seed: 1 });
  state = { ...state, food: { x: state.snake[0].x + 1, y: state.snake[0].y } };
  const next = step(state);
  assert.equal(next.snake.length, state.snake.length + 1);
  assert.equal(next.score, state.score + 1);
});

test('dies on boundary collision', () => {
  let state = createInitialState({ width: 4, height: 4, seed: 1 });
  state = { ...state, snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], direction: 'right', pendingDirection: 'right' };
  const next = step(state);
  assert.equal(next.alive, false);
});

test('dies on self collision', () => {
  let state = createInitialState({ width: 6, height: 6, seed: 1 });
  state = {
    ...state,
    snake: [
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 4, y: 2 },
    ],
    direction: 'left',
    pendingDirection: 'down',
  };
  const next = step(state);
  assert.equal(next.alive, false);
});

test('spawns food in open cells only', () => {
  const rng = createRng(7);
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  for (let i = 0; i < 20; i += 1) {
    const food = spawnFood({ width: 3, height: 3, snake, rng });
    assert.ok(food);
    assert.notEqual(food.y, 0);
  }
});
