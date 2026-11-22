# Categorized Catalog & Cloudflare Domain Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure production domain `https://bedahsoal.muhshi.my.id` with Google OAuth credentials and transform the flat tryout catalog into a structured, categorized multi-exam catalog organized by exam tracks (SKD CPNS, LPDP TBS, UTBK-SNBT, Olimpiade Sains).

**Architecture:** A client-side interactive catalog component (`CategorizedCatalog.tsx`) groups packages by `examType` with responsive category tabs and section headers. Server and Docker environment variables are updated with the official canonical URL and Google OAuth client credentials.

**Tech Stack:** Next.js 16 App Router, React 19, Lucide React, Tailwind CSS v4, Docker Compose.

---

### Task 1: Environment & OAuth Credentials Configuration

**Files:**
- Modify: `docker-compose.yml`
- Modify: `.env.example`
- Remote Server: Update `/home/bpsdemak/apps/muhshi/bedahsoal/.env`
- Remote Server: Restart Docker container `bedahsoal-cbt`

- [ ] **Step 1: Update local `docker-compose.yml` and `.env.example` with `AUTH_URL`, `AUTH_TRUST_HOST`, and Google OAuth keys**
- [ ] **Step 2: Update remote server `.env` on `10.133.21.24` with the credentials provided by user**
- [ ] **Step 3: Restart remote container and verify healthcheck and OAuth providers endpoint**

---

### Task 2: Categorized Catalog Component

**Files:**
- Create: `src/components/catalog/CategorizedCatalog.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/categorized-catalog.test.ts`

- [ ] **Step 1: Create `src/components/catalog/CategorizedCatalog.tsx` with category tabs and partitioned sections**
- [ ] **Step 2: Remove obsolete hardcoded placeholder cards from `src/app/page.tsx` and integrate `CategorizedCatalog`**
- [ ] **Step 3: Write test verifying category grouping, counts, and rendering**
- [ ] **Step 4: Run `npm test` and `npm run build` to verify clean build**

---

### Task 3: Deployment & Domain Verification

- [ ] **Step 1: Commit and push changes to `main`**
- [ ] **Step 2: Run deployment on remote server**
- [ ] **Step 3: Verify `https://bedahsoal.muhshi.my.id` and Google OAuth callback readiness**
