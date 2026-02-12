# Share Snake via ngrok

## One-time setup
1. Install ngrok (macOS):
   - `brew install ngrok/ngrok/ngrok`
2. Create/sign in to ngrok and copy your auth token from dashboard.
3. Authenticate on this machine:
   - `ngrok config add-authtoken <YOUR_TOKEN>`

## Run and share
1. Start the game server in terminal A:
   - `npm run start`
2. Start ngrok in terminal B:
   - `npm run proxy`
3. Share the `https://...ngrok-free.app` URL shown by ngrok.

## Notes
- Keep both terminals running while friends are playing.
- If port `5173` is busy, stop the conflicting process or change both `server.js` and proxy command to a different port.
