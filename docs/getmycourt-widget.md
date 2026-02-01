# GetMyCourt Widget

## Overview

The GetMyCourt widget on the dashboard allows viewing and editing the configuration of the GetMyCourt Lambda bot and its EventBridge schedule.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GetMyCourtWidget (Client)                     │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │    Config Section       │  │    Schedule Section          │   │
│  │  - Username             │  │  - Cron expression           │   │
│  │  - Password (masked)    │  │  - Enabled/Disabled toggle   │   │
│  │  - Email                │  │  - Timezone                  │   │
│  │  - Phone                │  │                              │   │
│  │  - Debug                │  │                              │   │
│  └─────────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
              │                              │
              ▼                              ▼
┌─────────────────────────┐    ┌─────────────────────────────────┐
│ /api/getmycourt/config  │    │ /api/getmycourt/schedule        │
│  GET: Fetch env vars    │    │  GET: Fetch schedule details    │
│  PUT: Update env vars   │    │  PUT: Update schedule           │
└─────────────────────────┘    └─────────────────────────────────┘
              │                              │
              ▼                              ▼
┌─────────────────────────┐    ┌─────────────────────────────────┐
│   AWS Lambda            │    │   AWS EventBridge Scheduler     │
│   getmycourt-x86        │    │   getmycourt-schedule           │
└─────────────────────────┘    └─────────────────────────────────┘
```

## Files

| File | Purpose |
|------|---------|
| `src/components/GetMyCourtWidget/index.js` | Main widget component |
| `src/app/api/getmycourt/config/route.js` | Lambda config API |
| `src/app/api/getmycourt/schedule/route.js` | EventBridge schedule API |
| `src/lib/aws.js` | AWS SDK client initialization |

## Lambda Environment Variables

The widget manages these Lambda environment variables:

| Variable | Description | UI Handling |
|----------|-------------|-------------|
| `USERNAME` | YourCourts login | Text input |
| `PASSWORD` | YourCourts password | Password input, masked in display |
| `NOTIFICATION_EMAIL` | Email for booking alerts | Text input |
| `NOTIFICATION_PHONE` | Phone for SMS alerts | Text input (optional) |
| `DEBUG` | Enable debug logging | Text input (true/false) |

### Password Handling

- GET: Returns `••••••••` placeholder (never exposes real password)
- PUT: Empty password = keep current value
- PUT: New password = update to new value

## EventBridge Schedule

| Field | Description |
|-------|-------------|
| Schedule Expression | Cron or rate expression (e.g., `cron(0 14 * * ? *)`) |
| State | `ENABLED` or `DISABLED` |
| Timezone | Schedule timezone (e.g., `America/New_York`) |

## API Endpoints

### GET /api/getmycourt/config

Returns Lambda environment variables (PASSWORD masked).

**Response:**
```json
{
  "USERNAME": "user@example.com",
  "PASSWORD": "••••••••",
  "NOTIFICATION_EMAIL": "alerts@example.com",
  "NOTIFICATION_PHONE": "+1234567890",
  "DEBUG": "false"
}
```

### PUT /api/getmycourt/config

Updates Lambda environment variables.

**Request:**
```json
{
  "USERNAME": "user@example.com",
  "PASSWORD": "",
  "NOTIFICATION_EMAIL": "alerts@example.com"
}
```

Empty PASSWORD = keep current value.

### GET /api/getmycourt/schedule

Returns EventBridge schedule details.

**Response:**
```json
{
  "scheduleExpression": "cron(0 14 * * ? *)",
  "state": "ENABLED",
  "timezone": "America/New_York"
}
```

### PUT /api/getmycourt/schedule

Updates EventBridge schedule.

**Request:**
```json
{
  "scheduleExpression": "cron(0 15 * * ? *)",
  "state": "ENABLED",
  "timezone": "America/New_York"
}
```

## AWS Permissions

The App Runner IAM role needs:

- `lambda:GetFunctionConfiguration`
- `lambda:UpdateFunctionConfiguration`
- `scheduler:GetSchedule`
- `scheduler:UpdateSchedule`
- `iam:PassRole` (for scheduler updates)

See [aws-setup.md](aws-setup.md) for full IAM policy.

## Local Development

For local testing, set AWS credentials in `.env.local`:

```
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_REGION=us-west-2
GETMYCOURT_LAMBDA_NAME=getmycourt-x86
GETMYCOURT_SCHEDULE_NAME=getmycourt-schedule
```

In production (App Runner), credentials come from the IAM instance role.
