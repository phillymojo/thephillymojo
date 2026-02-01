# thephillymojo

Personal hub and dashboard built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone mode)
- **Styling**: Tailwind CSS
- **Deployment**: AWS App Runner

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
├── app/                  # Next.js routes
│   ├── layout.js         # Root layout
│   ├── page.js           # Homepage
│   └── dashboard/        # Dashboard page
├── components/           # Reusable components
│   ├── Header/
│   └── Footer/
└── lib/                  # Utilities (future)
```
