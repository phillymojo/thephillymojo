# CI/CD Pipeline

## Overview

GitHub Actions handles continuous integration and deployment. On push to `master`, the pipeline builds a Docker image and pushes to ECR, which triggers App Runner auto-deploy.

## Workflow File

`.github/workflows/deploy.yml`

## Pipeline Stages

### On Pull Request to `master`

| Job | Steps |
|-----|-------|
| **ci** | Checkout → Setup Node → Install deps → Lint → Build |

### On Push to `master`

| Job | Steps |
|-----|-------|
| **ci** | Checkout → Setup Node → Install deps → Lint → Build |
| **deploy** | (after ci) Checkout → Configure AWS → Login ECR → Build & Push Docker |

## GitHub Secrets

Configure these in **Repository Settings > Secrets and variables > Actions**:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key for ECR push |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

### IAM User Permissions

The IAM user needs these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "arn:aws:ecr:us-west-2:*:repository/thephillymojo"
    }
  ]
}
```

## Concurrency Control

The workflow has concurrency settings to prevent race conditions:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This ensures only one deployment runs at a time per branch.

## Manual Trigger

To manually trigger deployment:

1. Go to **Actions** tab in GitHub
2. Select **CI/CD** workflow
3. Click **Run workflow**
4. Select `master` branch

## Monitoring

### Check Workflow Status

```bash
gh run list --limit 5
```

### View Specific Run

```bash
gh run view <run-id>
```

### Check PR Status

```bash
gh pr checks <pr-number>
```

## Troubleshooting

### Build Fails

Check the workflow logs for errors. Common issues:
- ESLint errors (fix code or update rules)
- TypeScript errors (if using TS)
- Missing dependencies

### ECR Push Fails

- Verify GitHub secrets are correct
- Check IAM user has required permissions
- Ensure ECR repository exists

### App Runner Doesn't Update

- Check App Runner is configured for auto-deploy
- Verify image was pushed to ECR (check ECR console)
- Check App Runner deployment logs
