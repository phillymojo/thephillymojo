# WebSocket Service (Backgammon MVP)

This service provides WebSocket-based multiplayer session state for the backgammon game.
It runs independently of the Next.js app and is intended to be deployed to ECS/Fargate.

## Environment Variables
- `PORT` (default `8080`)
- `NEXTAUTH_SECRET` (required)
- `ALLOWED_ORIGINS` (comma-separated list of allowed origins)

## Local Run
```bash
cd services/ws
npm install
npm run start
```

## Message Types

**Client → server:** `join` `{ gameId }`, `move` `{ state }`, `leave`

**Server → client:** `welcome` (on connect), `joined` (game + role), `state` (broadcast), `left`, `error` `{ message }`

## Health Check
- `GET /health`
