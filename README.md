# Snake Game

A minimal classic Snake implementation built with plain HTML, CSS, and JavaScript.

## Features
- Grid-based movement (classic Snake loop)
- Food spawning and snake growth
- Score tracking
- Game-over on wall/self collision
- Pause/Resume and Restart
- Keyboard controls + on-screen controls (mobile-friendly)
- Deterministic core game logic with tests

## Tech Stack
- Vanilla JS (ES modules)
- Node.js built-in HTTP server
- Node.js built-in test runner (`node --test`)

## Project Structure
- `index.html`: app shell
- `styles.css`: minimal UI styling
- `main.js`: UI rendering and input/timer wiring
- `snakeLogic.js`: pure game logic (state, movement, collisions, food)
- `snakeLogic.test.js`: logic tests
- `server.js`: local static file server
- `NGROK.md`: quick tunnel/share guide

## Getting Started
### Prerequisites
- Node.js 18+ (tested with newer Node versions)

### Install
```bash
npm install
```

### Run locally
```bash
npm run start
```
Then open: `http://127.0.0.1:5173`

### Run tests
```bash
npm test
```

## Controls
- Move: `Arrow keys` or `W/A/S/D`
- Pause/Resume: `Space`
- Restart: `R`
- On-screen buttons: `Up`, `Left`, `Down`, `Right`

## Share with Friends (ngrok)
1. Start server:
```bash
npm run start
```
2. In another terminal, start tunnel:
```bash
npm run proxy
```
3. Share the HTTPS URL printed by ngrok.

## Manual Verification Checklist
- Movement works in all four directions.
- Immediate reverse direction is blocked.
- Eating food grows snake and increases score.
- Wall collision ends the game.
- Self collision ends the game.
- Pause/Resume works.
- Restart resets score and board state.

## License
No license specified.
