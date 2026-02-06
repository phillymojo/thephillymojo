# WebSocket Service Deployment (ECS/Fargate)

This document explains the minimal production setup for the backgammon WebSocket (WS) service
and how each AWS resource fits together. The goal is to keep deployment as simple as App Runner
while still supporting long‑lived WebSocket connections.

## Why ECS/Fargate?
- App Runner is optimized for stateless HTTP requests and is not a good fit for long‑lived WebSockets.
- ECS on Fargate gives us a managed container runtime that supports WebSockets and scales later.
- For MVP we run **1 task** to keep in‑memory game state consistent.

## Resources We Create (and why)

### 1) ECR repo: `thephillymojo-ws`
**Purpose:** Stores the Docker image for the WS server.

**Flow:**  
Local build → push image to ECR → ECS pulls that image at deploy time.

---

### 2) ECS cluster: `thephillymojo-ws`
**Purpose:** Logical container group in ECS where services run.

**Why:** Required by ECS. It’s just a named container pool.

---

### 3) ECS task definition
**Purpose:** The blueprint for the WS container (image, port, env vars, CPU/memory).

**Key settings:**
- `containerPort: 8080`
- env vars: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ALLOWED_ORIGINS`
- health check path: `/health`

---

### 4) ECS service: `thephillymojo-ws`
**Purpose:** Keeps the task running and integrates with the load balancer.

**MVP settings:**
- `desiredCount = 1` (single task; in‑memory game state)
- Fargate launch type

---

### 5) ALB: `thephillymojo-ws-alb`
**Purpose:** Handles HTTPS termination and forwards WebSocket traffic to the ECS task.

**Key settings:**
- HTTPS listener on `443`
- Target group on port `8080`
- Idle timeout increased (WebSockets need longer than 60s)

---

### 6) ACM certificate for `ws.thephillymojo.com`
**Purpose:** TLS cert for secure WebSockets (`wss://`).

**Validation:** DNS validation via Route53.

---

### 7) Route53 record
**Purpose:** Point `ws.thephillymojo.com` → ALB DNS name.

---

## Production Auth Note (important)
To allow `ws.thephillymojo.com` to receive NextAuth session cookies, the cookie domain must
be the parent domain:

- Set cookie domain to `.thephillymojo.com`
- Set `NEXTAUTH_URL=https://thephillymojo.com`

This ensures the browser sends the session cookie to both the app and the WS subdomain.

---

## MVP Limits (by design)
- **Single task**: in‑memory state only works with one ECS task.
- **Scaling**: when you want to scale, move game state to Redis/DynamoDB.

---

## What We’ll Automate Later (Dashboard)
The dashboard can call AWS SDK routes to:
- Deploy a new image (update task definition + service)
- Scale desired task count
- Check service/target health

---

## High‑level Deploy Steps (CLI)
1. Create ECR repo
2. Build & push WS image
3. Request ACM certificate (DNS validation)
4. Create ALB + target group + listener
5. Create ECS cluster + task definition + service
6. Create Route53 record for `ws.thephillymojo.com`

