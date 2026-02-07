# thephillymojo

Personal hub and dashboard built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone mode)
- **Runtime**: Node.js 20, React 19
- **Styling**: Tailwind CSS v4, shadcn/ui (Radix primitives)
- **Authentication**: NextAuth.js with Google OAuth
- **AWS**: Lambda, EventBridge Scheduler (via @aws-sdk)
- **Deployment**: AWS App Runner
- **CI/CD**: GitHub Actions → ECR → App Runner

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System overview and data flows |
| [AWS Setup](docs/aws-setup.md) | App Runner, ECR, IAM, Route 53 config |
| [Authentication](docs/authentication.md) | Google OAuth and email allowlist |
| [CI/CD](docs/ci-cd.md) | GitHub Actions pipeline and secrets |
| [GetMyCourt Widget](docs/getmycourt-widget.md) | Lambda/EventBridge integration |
| [WebSocket Deploy](docs/ws-deploy.md) | ECS/Fargate setup for backgammon WS service |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Build and push Docker image to ECR:

```bash
# Login to ECR
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws ecr get-login-password --region us-west-2 | \
  docker login --username AWS --password-stdin \
  ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com

# Build and push
docker build --platform linux/amd64 -t thephillymojo .
docker tag thephillymojo:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/thephillymojo:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/thephillymojo:latest
```

App Runner auto-deploys when a new image is pushed.

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
|----------|---------|
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth (NextAuth) |
| `NEXTAUTH_URL`, `NEXTAUTH_SECRET` | NextAuth config |
| `GETMYCOURT_LAMBDA_NAME`, `GETMYCOURT_SCHEDULE_NAME` | GetMyCourt widget (Lambda, EventBridge) |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | AWS credentials (local dev; production uses IAM) |

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout (SessionProvider)
│   ├── page.js                # Homepage
│   ├── globals.css            # Global styles
│   ├── dashboard/page.js      # Protected dashboard
│   ├── login/page.js          # Login page
│   ├── backgammon/page.js     # Backgammon WS test (session required)
│   ├── snake/page.js          # Snake game
│   └── api/
│       ├── auth/[...nextauth] # NextAuth handlers
│       └── getmycourt/        # Lambda/EventBridge APIs
│           ├── config/        # Lambda env vars (GET, PUT)
│           └── schedule/      # EventBridge schedule (GET, PUT)
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── SessionProvider.js     # NextAuth session context
│   ├── GetMyCourtWidget/      # Dashboard widget
│   ├── SignOutButton/
│   └── ui/                    # shadcn/ui components (button, card, dropdown-menu, input)
├── lib/
│   ├── auth.js                # NextAuth config
│   ├── aws.js                 # AWS SDK clients
│   ├── utils.js               # cn() and other utilities
│   └── snake.js               # Snake game logic
└── proxy.js                   # Request proxy / route protection (Next.js 16)

services/
└── ws/                        # WebSocket server (backgammon MVP)
    ├── index.js
    ├── package.json
    └── README.md
```
