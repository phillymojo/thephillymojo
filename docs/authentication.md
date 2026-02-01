# Authentication

## Overview

Authentication is handled by NextAuth.js with Google OAuth provider. Access is restricted to an email allowlist.

## Flow

```
User → /dashboard → Middleware (no session?) → /login → Google OAuth → Callback → Session created → /dashboard
```

## Configuration Files

| File | Purpose |
|------|---------|
| `src/lib/auth.js` | NextAuth configuration, Google provider, email allowlist |
| `src/middleware.js` | Route protection for /dashboard and /api/getmycourt |
| `src/app/api/auth/[...nextauth]/route.js` | NextAuth API handlers |
| `src/app/login/page.js` | Login page with Google sign-in button |

## Email Allowlist

Edit `src/lib/auth.js` to modify allowed emails:

```javascript
const ALLOWED_EMAILS = [
  'mbonar@gmail.com',
  // Add more emails here
];
```

## Google OAuth Setup

### Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**

### OAuth Client Settings

| Setting | Value |
|---------|-------|
| Application type | Web application |
| Name | thephillymojo |
| Authorized JavaScript origins | `https://www.thephillymojo.com` |
| Authorized redirect URIs | `https://www.thephillymojo.com/api/auth/callback/google` |

For local development, also add:
- Origin: `http://localhost:3000`
- Redirect: `http://localhost:3000/api/auth/callback/google`

### OAuth Consent Screen

| Setting | Value |
|---------|-------|
| User type | External |
| App name | thephillymojo |
| Support email | (your email) |
| Scopes | email, profile, openid |

For testing mode, add your email(s) as test users.

## Environment Variables

### Local Development (`.env.local`)

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
```

### Production (App Runner)

```
NEXTAUTH_URL=https://www.thephillymojo.com
NEXTAUTH_SECRET=<generate-new-for-production>
GOOGLE_CLIENT_ID=<same-as-local>
GOOGLE_CLIENT_SECRET=<same-as-local>
```

## Protected Routes

### Pages (redirect to /login)

- `/dashboard`

### API Routes (return 401)

- `/api/getmycourt/*`

## Adding New Users

1. Edit `src/lib/auth.js`
2. Add email to `ALLOWED_EMAILS` array
3. Deploy changes

If the app is in Google OAuth testing mode, also add the email as a test user in Google Cloud Console.
