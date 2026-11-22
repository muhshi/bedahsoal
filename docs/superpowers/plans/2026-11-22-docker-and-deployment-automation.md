# Docker & Smart Deployment Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide production-grade containerization and a zero-waste smart deployment pipeline (`Dockerfile`, `docker-compose.yml`, `.dockerignore`, `src/app/api/health/route.ts`, and `deploy.sh` adapted from the `saham` project) for the CAT SKD & Multi-Exam CBT Platform.

**Architecture:** Multi-stage Docker build leveraging Next.js `output: "standalone"` on `node:22-alpine` for a minimal runtime image (~150MB). An intelligent bash deployment script (`deploy.sh`) with SHA-256 hash tracking for zero-waste rebuilds, git sync, healthcheck verification on `/api/health`, and automated rollback reporting.

**Tech Stack:** Next.js 16 (Standalone Output), Docker, Docker Compose, Bash, Vitest.

---

## File Structure Map

```text
latihan_soal/
├── Dockerfile                         # Created: Multi-stage production build (base, deps, builder, runner)
├── .dockerignore                      # Created: Exclude node_modules, tests, docs, git from build context
├── docker-compose.yml                 # Modified: Production-ready container orchestration
├── deploy.sh                          # Created: Smart zero-waste deployment script based on saham/deploy.sh
├── src/
│   └── app/
│       └── api/
│           └── health/
│               └── route.ts           # Created: Healthcheck endpoint (DB ping, status, uptime)
└── tests/
    └── health-route.test.ts           # Created: Unit test for healthcheck endpoint
```

---

## Bite-Sized Implementation Tasks

### Task 1: Healthcheck API Endpoint & Testing (TDD)

**Files:**
- Create: `src/app/api/health/route.ts`
- Test: `tests/health-route.test.ts`

- [x] **Step 1: Write test for healthcheck route**

Create `tests/health-route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../src/app/api/health/route';

vi.mock('../src/lib/db', () => ({
  db: {
    $queryRaw: vi.fn(),
  },
}));

import { db } from '../src/lib/db';

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns status ok with database connected when DB query succeeds', async () => {
    vi.mocked(db.$queryRaw).mockResolvedValueOnce([{ '?column?': 1 }]);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.status).toBe('ok');
    expect(json.database).toBe('connected');
    expect(json.timestamp).toBeDefined();
  });

  it('returns status degraded with 503 when DB query fails', async () => {
    vi.mocked(db.$queryRaw).mockRejectedValueOnce(new Error('DB Connection Lost'));

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(503);
    expect(json.status).toBe('degraded');
    expect(json.database).toBe('disconnected');
    expect(json.error).toBe('DB Connection Lost');
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:
```bash
npm test tests/health-route.test.ts
```
Expected: FAIL with "Cannot find module '../src/app/api/health/route'"

- [x] **Step 3: Implement `src/app/api/health/route.ts`**

Create `src/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  try {
    // Ping PostgreSQL
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'ok',
        service: 'cbt-platform',
        database: 'connected',
        latencyMs,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'degraded',
        service: 'cbt-platform',
        database: 'disconnected',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

- [x] **Step 4: Run test to verify it passes**

Run:
```bash
npm test tests/health-route.test.ts
```
Expected: PASS (2 tests passed)

- [x] **Step 5: Commit Task 1**

```bash
git add src/app/api/health/route.ts tests/health-route.test.ts
git commit -m "feat(api): add database-aware healthcheck endpoint at /api/health"
```

---

### Task 2: Multi-Stage Dockerfile & .dockerignore

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

- [x] **Step 1: Create `.dockerignore`**

Create `.dockerignore`:

```text
node_modules
.next
.git
.agents
*.md
docs
prototypes
tests
data/bank_soal
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
.env.local
.env.development.local
.env.test.local
.env.production.local
.last_docker_build_state
.last_docker_build_hash
```

- [x] **Step 2: Create multi-stage `Dockerfile`**

Create `Dockerfile`:

```dockerfile
# Stage 1: Base Alpine Image
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps && npx prisma generate

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Stage 4: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Setup standalone directory permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

- [x] **Step 3: Commit Task 2**

```bash
git add Dockerfile .dockerignore
git commit -m "feat(docker): add multi-stage standalone Dockerfile and dockerignore"
```

---

### Task 3: Production Docker Compose Configuration

**Files:**
- Modify: `docker-compose.yml`

- [x] **Step 1: Configure `docker-compose.yml` for CBT Platform**

Update `docker-compose.yml`:

```yaml
services:
  cbt-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: cat-skd-cbt:latest
    container_name: cat-skd-cbt
    restart: unless-stopped
    ports:
      - "${APP_PORT:-3000}:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=${DATABASE_URL:-postgresql://bpsdemak:demak3321@10.133.21.24:5433/cat_skd_db?schema=public}
      - NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-cat_skd_super_secret_jwt_key_2026_production_ready}
      - DUITKU_MERCHANT_CODE=${DUITKU_MERCHANT_CODE:-}
      - DUITKU_API_KEY=${DUITKU_API_KEY:-}
      - DUITKU_ENV=${DUITKU_ENV:-sandbox}
      - DUITKU_CALLBACK_URL=${DUITKU_CALLBACK_URL:-http://localhost:3000/api/duitku/callback}
      - DUITKU_RETURN_URL=${DUITKU_RETURN_URL:-http://localhost:3000/dashboard}
```

- [x] **Step 2: Commit Task 3**

```bash
git add docker-compose.yml
git commit -m "feat(docker): configure production-ready docker-compose.yml"
```

---

### Task 4: Smart Zero-Waste Deployment Script (`deploy.sh`)

**Files:**
- Create: `deploy.sh`

- [x] **Step 1: Write `deploy.sh` adapted from `saham/deploy.sh`**

Implement `deploy.sh` with:
- ASCII branding banner
- Hash-based change detection (Dependencies vs Application Source)
- Auto-detect Zero-Waste Rebuild (Skip build if image exists & code unchanged)
- CLI options: `--check`, `--total` / `--build`, `--help`
- Git sync with remote if `.git` exists
- Healthcheck polling loop against `/api/health`
- Diagnostic output on failure

- [x] **Step 2: Grant executable permission & test `--check`**

Run:
```bash
chmod +x deploy.sh
./deploy.sh --check
```
Expected: PASS (Displays change analysis, hashes, and decision)

- [x] **Step 3: Commit Task 4**

```bash
git add deploy.sh
git commit -m "feat(deploy): add smart zero-waste deployment script adapted from saham project"
```

---

## Self-Review Checklist
1. Matches `saham/deploy.sh` features: Hash calculation, state file (`.last_docker_build_state`), `--check` dry-run, healthcheck retry loop.
2. Production Next.js standalone optimization enabled.
3. Database health endpoint covered by unit tests.
