# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              User Browser                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Route 53 (thephillymojo.com)                         │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                                      │
        www.thephillymojo.com                  ws.thephillymojo.com
                    │                                      │
                    ▼                                      ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│         AWS App Runner              │   │  ALB → ECS Fargate (thephillymojo-ws)│
│  ┌───────────────────────────────┐  │   │  WebSocket server, session cookie   │
│  │ Next.js: /, /login, /dashboard │  │   │  auth for backgammon                 │
│  │ /snake, /backgammon, /api/*    │  │   └─────────────────────────────────────┘
│  └───────────────────────────────┘  │
│  IAM: thephillymojo-apprunner-role  │
└─────────────────────────────────────┘

           │                   │                              │
           ▼                   ▼                              ▼
    ┌────────────┐    ┌────────────────┐            ┌─────────────────┐
    │   Google   │    │  AWS Lambda    │            │ AWS EventBridge │
    │   OAuth    │    │ getmycourt-x86 │            │ Scheduler       │
    │            │    │                │            │                 │
    └────────────┘    └────────────────┘            └─────────────────┘
```

## Components

### Frontend (Next.js App Router)

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage | No |
| `/login` | Google OAuth login page | No |
| `/dashboard` | Dashboard with widgets | Yes |
| `/snake` | Snake game | No |
| `/backgammon` | Backgammon WS test (connect requires session) | No (page); WS requires session |

### API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/*` | GET, POST | NextAuth.js handlers |
| `/api/getmycourt/config` | GET, PUT | Lambda environment variables |
| `/api/getmycourt/schedule` | GET, PUT | EventBridge schedule management |

### AWS Services

| Service | Resource Name | Purpose |
|---------|--------------|---------|
| App Runner | thephillymojo | Hosts the Next.js application |
| ECR | thephillymojo, thephillymojo-ws | Docker image repositories |
| ECS Fargate | thephillymojo-ws | WebSocket server (backgammon) |
| ALB | thephillymojo-ws-alb | HTTPS → WS on ws.thephillymojo.com |
| Lambda | getmycourt-x86 | Court booking bot |
| EventBridge Scheduler | getmycourt-schedule | Triggers Lambda on schedule |
| Route 53 | thephillymojo.com | DNS (www + ws subdomain) |
| IAM | thephillymojo-apprunner-role | App Runner permissions |

## Data Flow

### Authentication Flow

1. User visits `/dashboard`
2. Proxy checks for session
3. If no session, redirect to `/login`
4. User clicks "Sign in with Google"
5. Google OAuth flow completes
6. NextAuth creates session
7. User redirected to `/dashboard`

### Backgammon WebSocket Flow

1. User opens `/backgammon` (must be signed in to connect).
2. Browser connects to `wss://ws.thephillymojo.com` with session cookie.
3. WS server validates NextAuth JWT and accepts connection.
4. Client sends `join` with `gameId`; server assigns role and broadcasts state.
5. Moves are sent as `move` and broadcast to the room. See [WebSocket Deploy](ws-deploy.md).

### GetMyCourt Widget Flow

1. Dashboard loads GetMyCourtWidget
2. Widget calls `/api/getmycourt/config` and `/api/getmycourt/schedule`
3. API routes use AWS SDK with IAM role credentials
4. Data displayed in widget forms
5. User edits and saves
6. API routes update Lambda/EventBridge

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Next.js 16 (App Router, standalone mode)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **AWS SDK**: @aws-sdk/client-lambda, @aws-sdk/client-scheduler
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
