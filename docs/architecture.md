# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              User Browser                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    www.thephillymojo.com (Route 53)                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AWS App Runner                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     Next.js Application                                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐   │  │
│  │  │   Pages     │  │  API Routes │  │      Middleware             │   │  │
│  │  │  /, /login  │  │ /api/auth/* │  │  (route protection)        │   │  │
│  │  │  /dashboard │  │ /api/getmy* │  │                             │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                    IAM Role: thephillymojo-apprunner-role                   │
└─────────────────────────────────────────────────────────────────────────────┘
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
| ECR | thephillymojo | Docker image repository |
| Lambda | getmycourt-x86 | Court booking bot |
| EventBridge Scheduler | getmycourt-schedule | Triggers Lambda on schedule |
| Route 53 | thephillymojo.com | DNS management |
| IAM | thephillymojo-apprunner-role | App Runner permissions |

## Data Flow

### Authentication Flow

1. User visits `/dashboard`
2. Middleware checks for session
3. If no session, redirect to `/login`
4. User clicks "Sign in with Google"
5. Google OAuth flow completes
6. NextAuth creates session
7. User redirected to `/dashboard`

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
