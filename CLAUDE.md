# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build (standalone mode)
npm run start      # Start production server
npm run lint       # ESLint checks
```

No test framework is configured yet.

## Architecture

**Next.js 16 App Router** with React 19, deployed as a standalone Docker image on AWS App Runner.

### Key Paths

- `src/app/` — App Router pages and API routes
- `src/components/` — React components (functional, hooks-based)
- `src/components/ui/` — shadcn/ui primitives (style: new-york, icons: lucide)
- `src/lib/` — Shared utilities: auth config, AWS SDK clients, game logic, analytics
- `src/proxy.js` — Middleware for route protection and apex→www redirect (exported as `proxy`, used as Next.js middleware)
- `services/ws/` — Separate WebSocket server (Node.js, deployed on ECS/Fargate at ws.thephillymojo.com)
- `docs/` — Architecture, auth, AWS setup, CI/CD, and widget documentation

### Auth

Google OAuth via NextAuth.js v4. Session state provided by `SessionProvider` wrapper in root layout. Protected routes (`/dashboard`, `/api/getmycourt/*`, `/api/getmyteetime/*`) are enforced in `src/proxy.js` using JWT tokens.

### Bot Widgets (Dashboard)

Two automation bots managed through dashboard widgets:
- **GetMyTeeTime** — Tee time booking bot (Lambda + EventBridge Scheduler)
- **GetMyCourt** — Court booking bot (Lambda + EventBridge Scheduler)

Each bot has API routes under `src/app/api/<botname>/` for:
- `config/` — GET/PUT Lambda environment variables
- `schedule/` — GET/PUT EventBridge scheduler settings
- `test-run/` — POST to invoke Lambda with test payload (GetMyTeeTime only)

AWS SDK clients are initialized in `src/lib/aws.js`.

### Styling

Tailwind CSS v4 with `@tailwindcss/postcss` plugin. Global styles in `src/app/globals.css`. Uses `cn()` utility from `src/lib/utils.js` (clsx + tailwind-merge).

### Path Aliases

`@/*` maps to `./src/*` (configured in jsconfig.json).

### Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`): lint → build → Docker multi-stage build (node:20-alpine) → push to ECR → App Runner auto-deploys.

## Branch Policy

Never commit directly to `main`. Always create a feature branch first (e.g., `git checkout -b feature/your-feature`).
