# Google OAuth & User Profile Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full user authentication via Google OAuth 2.0 (with fallback Guest Mode) using Auth.js (NextAuth v5) and Prisma Adapter, along with user profile management and a tryout history dashboard.

**Architecture:** NextAuth v5 handles OAuth authentication flows with JWT sessions. The Prisma Adapter stores users, accounts, and sessions in PostgreSQL. Authenticated sessions are linked to `ExamSession` records so users can review past test scores, track rank/progress, and resume tests across devices. A top navigation bar component displays user profile details, sign-in/sign-out controls, and a dedicated tryout history dashboard.

**Tech Stack:** Next.js 16 App Router, Auth.js (NextAuth v5.0.0-beta), @auth/prisma-adapter, Prisma ORM, PostgreSQL, Lucide React, Tailwind CSS v4, Vitest.

---

### Task 1: Auth Configuration & Handlers

**Files:**
- Create: `src/auth.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Test: `tests/unit/auth.test.ts`

- [ ] **Step 1: Write test for Auth configuration & providers**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `src/auth.ts` and NextAuth route handlers**
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit changes**

---

### Task 2: Session Provider & Navigation UI Component

**Files:**
- Create: `src/components/auth/SessionProvider.tsx`
- Create: `src/components/auth/UserNav.tsx`
- Create: `src/components/auth/LoginModal.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create client SessionProvider wrapping Next.js layout**
- [ ] **Step 2: Build `LoginModal` with Google OAuth button and Quick Guest login**
- [ ] **Step 3: Build `UserNav` displaying avatar, user name, role badge, history link, and logout**
- [ ] **Step 4: Integrate `UserNav` into the homepage navbar and exam completion pages**
- [ ] **Step 5: Commit changes**

---

### Task 3: Link Exam Sessions with Authenticated User

**Files:**
- Modify: `src/app/api/sessions/start/route.ts`
- Modify: `src/app/api/sessions/[sessionId]/route.ts`
- Modify: `src/app/(exam)/exam/[sessionId]/page.tsx`
- Test: `tests/unit/session-user-link.test.ts`

- [ ] **Step 1: Write test ensuring ExamSession connects to logged-in user if session exists**
- [ ] **Step 2: Update `POST /api/sessions/start` to read auth session from request**
- [ ] **Step 3: Run test to verify correct association**
- [ ] **Step 4: Commit changes**

---

### Task 4: User Profile & Tryout History Dashboard

**Files:**
- Create: `src/app/(dashboard)/dashboard/page.tsx`
- Create: `src/app/api/user/history/route.ts`
- Create: `src/components/dashboard/ExamHistoryList.tsx`

- [ ] **Step 1: Create API endpoint `GET /api/user/history` returning user's completed and in-progress exams**
- [ ] **Step 2: Build `ExamHistoryList` component with scores, status badges, breakdown, and "Bahas Ujian" links**
- [ ] **Step 3: Build `/dashboard` page displaying user stats (Total Ujian, Skor Tertinggi, Rata-rata Skor)**
- [ ] **Step 4: Commit changes**

---

### Task 5: Verification, Tests & Production Deployment

**Files:**
- Modify: `.env.example`
- Run: `npm test`
- Run: `npm run build`
- Deploy: `./deploy.sh` on remote server `10.133.21.24`

- [ ] **Step 1: Run full unit test suite**
- [ ] **Step 2: Run Next.js production build (`npm run build`)**
- [ ] **Step 3: Commit and push changes to `main`**
- [ ] **Step 4: Trigger remote deployment on `10.133.21.24`**
- [ ] **Step 5: Verify live application on port 3001**
