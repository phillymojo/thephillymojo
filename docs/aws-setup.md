# AWS Setup

## Services Overview

| Service | Region | Resource Name |
|---------|--------|---------------|
| App Runner | us-west-2 | thephillymojo |
| ECR | us-west-2 | thephillymojo |
| Route 53 | Global | thephillymojo.com |
| IAM | Global | thephillymojo-apprunner-role |

## ECR Repository

**Repository**: `thephillymojo`
**URI**: `<account-id>.dkr.ecr.us-west-2.amazonaws.com/thephillymojo`

Created with:
```bash
aws ecr create-repository --repository-name thephillymojo --region us-west-2
```

## App Runner Service

**Service**: thephillymojo
**Source**: ECR image `thephillymojo:latest`
**Port**: 3000

### Configuration

| Setting | Value |
|---------|-------|
| vCPU | 0.25 |
| Memory | 0.5 GB |
| Auto-deploy | Enabled (watches ECR) |
| Instance Role | thephillymojo-apprunner-role |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `HOSTNAME` | `0.0.0.0` (required for container networking) |
| `AWS_REGION` | `us-west-2` |
| `GETMYCOURT_LAMBDA_NAME` | `getmycourt-x86` |
| `GETMYCOURT_SCHEDULE_NAME` | `getmycourt-schedule` |
| `NEXTAUTH_URL` | `https://www.thephillymojo.com` |
| `NEXTAUTH_SECRET` | (generated secret) |
| `GOOGLE_CLIENT_ID` | (from Google Cloud Console) |
| `GOOGLE_CLIENT_SECRET` | (from Google Cloud Console) |

### Custom Domains

| Domain | Status |
|--------|--------|
| www.thephillymojo.com | Active |

## IAM Role

**Role Name**: `thephillymojo-apprunner-role`
**Trust Policy**: App Runner service

### Permissions Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunctionConfiguration",
        "lambda:UpdateFunctionConfiguration"
      ],
      "Resource": "arn:aws:lambda:us-west-2:*:function:getmycourt-x86"
    },
    {
      "Effect": "Allow",
      "Action": [
        "scheduler:GetSchedule",
        "scheduler:UpdateSchedule"
      ],
      "Resource": "arn:aws:scheduler:us-west-2:*:schedule/default/getmycourt-schedule"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "iam:PassedToService": "scheduler.amazonaws.com"
        }
      }
    }
  ]
}
```

## Route 53

**Hosted Zone**: thephillymojo.com

### DNS Records

| Name | Type | Value |
|------|------|-------|
| thephillymojo.com | NS | (AWS nameservers) |
| thephillymojo.com | SOA | (AWS SOA) |
| www.thephillymojo.com | A (Alias) | App Runner service |
| _*.www.thephillymojo.com | CNAME | ACM validation records |

## Manual Deployment

If needed, deploy manually:

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

App Runner auto-deploys when a new image is pushed to ECR.
