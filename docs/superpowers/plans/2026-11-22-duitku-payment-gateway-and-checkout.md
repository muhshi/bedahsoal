# Duitku Payment Gateway & Pay-per-Package Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement end-to-end Pay-per-Package monetization for BedahSoal via Duitku Payment Gateway (QRIS and Virtual Account), including invoice generation, strict MD5 signature verification, idempotent webhook processing with atomic user package entitlement, and a responsive client-side checkout modal.

**Architecture:** A server-side Duitku service client (`src/lib/duitku.ts`) handles API communication, signature generation, and callback verification. Next.js App Router route handlers (`/api/payment/create`, `/api/payment/callback`, `/api/payment/status/[merchantOrderId]`) process transactions with Prisma database models (`Transaction` and `UserPackage`). The frontend uses an interactive `CheckoutModal.tsx` connected to `CategorizedCatalog.tsx` to handle payment selection, QRIS rendering, and auto-unlock on success.

**Tech Stack:** Next.js 16 App Router, TypeScript 5, Prisma ORM (PostgreSQL), Duitku API v2, Lucide React, Vitest.

---

### File Structure Map
- Create: `src/lib/duitku.ts` - Duitku API client, MD5 signature generator, and callback validator.
- Create: `src/app/api/payment/create/route.ts` - POST endpoint to initialize a transaction and request invoice from Duitku.
- Create: `src/app/api/payment/callback/route.ts` - POST endpoint handling Duitku webhook callbacks with atomic database transaction.
- Create: `src/app/api/payment/status/[merchantOrderId]/route.ts` - GET endpoint for client-side polling and status verification.
- Create: `src/components/payment/CheckoutModal.tsx` - User-facing payment modal with QRIS display, VA instructions, and status polling.
- Modify: `src/components/catalog/CategorizedCatalog.tsx` - Connect "Beli Paket" button to open `CheckoutModal` and display user ownership tags.
- Test: `tests/duitku-payment.test.ts` - Comprehensive unit and route integration tests.

---

### Task 1: Duitku API Engine & Signature Utilities

**Files:**
- Create: `src/lib/duitku.ts`
- Test: `tests/duitku-payment.test.ts`

- [x] **Step 1: Write failing unit tests for signature hashing and Duitku helpers**
- [x] **Step 2: Run test to verify it fails**
- [x] **Step 3: Implement `src/lib/duitku.ts`**
- [x] **Step 4: Run tests and ensure they pass**
- [x] **Step 5: Commit Task 1**

---

### Task 2: Create Payment Endpoint (`/api/payment/create`)

**Files:**
- Create: `src/app/api/payment/create/route.ts`
- Modify: `tests/duitku-payment.test.ts`

- [x] **Step 1: Add failing test for POST /api/payment/create**
- [x] **Step 2: Implement `src/app/api/payment/create/route.ts`**
- [x] **Step 3: Run tests to verify passing**
- [x] **Step 4: Commit Task 2**

---

### Task 3: Payment Callback Webhook with Atomic Entitlement (`/api/payment/callback`)

**Files:**
- Create: `src/app/api/payment/callback/route.ts`
- Modify: `tests/duitku-payment.test.ts`

- [x] **Step 1: Write unit tests for callback webhook**
- [x] **Step 2: Implement `src/app/api/payment/callback/route.ts`**
- [x] **Step 3: Run tests to ensure all pass**
- [x] **Step 4: Commit Task 3**

---

### Task 4: Transaction Status Polling Endpoint (`/api/payment/status/[merchantOrderId]`)

**Files:**
- Create: `src/app/api/payment/status/[merchantOrderId]/route.ts`
- Modify: `tests/duitku-payment.test.ts`

- [x] **Step 1: Implement endpoint that queries local DB and falls back to Duitku check API if still PENDING**
- [x] **Step 2: Add integration tests for status polling**
- [x] **Step 3: Commit Task 4**

---

### Task 5: Checkout & Payment Modal Component (`CheckoutModal.tsx`)

**Files:**
- Create: `src/components/payment/CheckoutModal.tsx`
- Modify: `src/components/catalog/CategorizedCatalog.tsx`

- [x] **Step 1: Create `src/components/payment/CheckoutModal.tsx`**
- [x] **Step 2: Connect `CheckoutModal` to `CategorizedCatalog.tsx`**
- [x] **Step 3: Run `npm run build` and tests**
- [x] **Step 4: Commit Task 5**

---

### Task 6: Remote Deployment & Live Verification

- [ ] **Step 1: Run complete test suite and production build**
- [ ] **Step 2: Commit and push changes to GitHub `main`**
- [ ] **Step 3: Deploy to production server via Tailscale (`bpsdemak@100.106.152.115`)**
- [ ] **Step 4: Verify live endpoints on `https://bedahsoal.muhshi.my.id`**
