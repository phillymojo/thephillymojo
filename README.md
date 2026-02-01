# thephillymojo

Personal hub and dashboard built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone mode)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
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

See `.env.example` for required environment variables.

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout
│   ├── page.js                # Homepage
│   ├── globals.css            # Global styles
│   ├── dashboard/page.js      # Protected dashboard
│   ├── login/page.js          # Login page
│   └── api/
│       ├── auth/[...nextauth] # NextAuth handlers
│       └── getmycourt/        # Lambda/EventBridge APIs
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── GetMyCourtWidget/      # Dashboard widget
│   └── SignOutButton/
├── lib/
│   ├── auth.js                # NextAuth config
│   └── aws.js                 # AWS SDK clients
└── middleware.js              # Route protection
```
