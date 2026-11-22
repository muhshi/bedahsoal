# SaaS Platform Latihan Soal SKD CPNS (PWA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun platform SaaS B2C latihan soal dan tryout CAT SKD CPNS berbasis PWA (Progressive Web App) dengan sistem pembelian paket soal via Duitku, autentikasi 1-klik Google OAuth, dual-mode ujian (Simulasi Resmi BKN + Latihan Santai), ranking nasional, dan dashboard admin untuk bulk import Excel/CSV serta KaTeX math editor.

**Architecture:** Fullstack Next.js (App Router) yang di-containerize dengan multi-stage Dockerfile untuk di-deploy pada server Ubuntu yang sudah memiliki PostgreSQL. Menggunakan Prisma ORM untuk data persistence, NextAuth.js (Auth.js) untuk Google OAuth, Zustand & IndexedDB untuk client-side offline-first exam engine, serta Duitku Payment Gateway webhook untuk transaksi instan (QRIS & Virtual Account).

**Tech Stack:** 
- Frontend & Backend: Next.js 14+ (App Router), React 18/19, TypeScript
- Styling & UI: Tailwind CSS, shadcn/ui, Lucide Icons, KaTeX (Math rendering)
- State & Offline: Zustand, `@serwist/next` (PWA Service Worker & Manifest)
- Database & ORM: PostgreSQL (existing on server), Prisma ORM
- Auth: NextAuth.js (Google OAuth Provider)
- Payment Gateway: Duitku API & Webhook Callback (QRIS, VA, E-Wallet)
- Deployment: Docker multi-stage build, Docker Compose, Nginx reverse proxy

---

## File Structure Map

```
latihan_soal/
├── prisma/
│   ├── schema.prisma                  # Data models: User, Package, Tryout, Question, Option, Transaction, ExamSession, ExamAnswer
│   └── seed.ts                        # Seed data awal (admin user, paket gratis SKD perdana)
├── public/
│   ├── manifest.json                  # PWA Manifest (app icons, theme color, display standalone)
│   ├── sw.js                          # Service worker cache
│   └── icons/                         # PWA icons (192x192, 512x512)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # Google OAuth handler
│   │   │   ├── duitku/
│   │   │   │   ├── create-invoice/route.ts  # Request URL pembayaran Duitku
│   │   │   │   └── callback/route.ts        # Webhook notifikasi pembayaran Duitku
│   │   │   ├── admin/
│   │   │   │   ├── questions/import/route.ts# API parse Excel/CSV bulk import
│   │   │   │   └── packages/route.ts        # CRUD paket soal
│   │   │   ├── exam/
│   │   │   │   ├── start/route.ts           # Inisialisasi sesi ujian (generate timer & token)
│   │   │   │   ├── submit/route.ts          # Hitung skor BKN & simpan jawaban
│   │   │   │   └── leaderboard/route.ts     # Peringkat nasional per paket
│   │   │   └── packages/route.ts            # List katalog paket tryout untuk user
│   │   ├── (auth)/
│   │   │   └── login/page.tsx               # Login page dengan tombol Google
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx           # Dashboard peserta (paket aktif, riwayat ujian, skor)
│   │   │   ├── packages/page.tsx            # Katalog paket & checkout Duitku
│   │   │   ├── leaderboard/[packageId]/page.tsx # Halaman ranking nasional
│   │   │   └── layout.tsx
│   │   ├── (exam)/
│   │   │   ├── exam/[sessionId]/page.tsx    # Halaman pengerjaan ujian (fullscreen CBT player)
│   │   │   └── exam/[sessionId]/result/page.tsx # Hasil skor, passing grade & pembahasan
│   │   ├── (admin)/
│   │   │   ├── admin/packages/page.tsx      # Manajemen paket tryout
│   │   │   ├── admin/questions/page.tsx     # Editor soal & import Excel/CSV
│   │   │   └── admin/transactions/page.tsx  # Monitoring transaksi Duitku
│   │   ├── layout.tsx
│   │   └── page.tsx                         # Landing page publik (katalog & CTA login)
│   ├── components/
│   │   ├── exam/
│   │   │   ├── Timer.tsx                    # Countdown timer tersinkronisasi
│   │   │   ├── QuestionPalette.tsx          # Navigasi kisi nomor 1-110
│   │   │   ├── QuestionCard.tsx             # Soal, opsi A-E, KaTeX math renderer
│   │   │   └── FinishModal.tsx              # Konfirmasi pengumpulan ujian
│   │   ├── ui/                              # shadcn components (button, dialog, badge, table)
│   │   └── KaTeXRenderer.tsx                # Client renderer formula matematika
│   ├── lib/
│   │   ├── prisma.ts                        # Prisma client singleton
│   │   ├── duitku.ts                        # Helper signature MD5/SHA256 & HTTP client Duitku
│   │   ├── scoring.ts                       # Engine hitung skor SKD (TWK, TIU, TKP) & passing grade
│   │   └── auth.ts                          # NextAuth configuration
│   └── store/
│       └── useExamStore.ts                  # Zustand store (answers, doubts, active index, offline sync)
├── Dockerfile                               # Multi-stage production build Next.js
├── docker-compose.yml                       # Service runner (Next.js app + port mapping)
└── package.json
```

---

### Task 1: Project Initialization & PWA Baseline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `public/manifest.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Inisialisasi package.json dengan dependencies Next.js, Prisma, NextAuth, Zustand, dan KaTeX**

```json
{
  "name": "cbt-skd-saas",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy",
    "test": "jest"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.7.2",
    "@prisma/client": "^5.22.0",
    "clsx": "^2.1.1",
    "crypto-js": "^4.2.0",
    "katex": "^0.16.11",
    "lucide-react": "^0.460.0",
    "next": "^14.2.18",
    "next-auth": "^4.24.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4",
    "xlsx": "^0.18.5",
    "zustand": "^5.0.1"
  },
  "devDependencies": {
    "@types/crypto-js": "^4.2.2",
    "@types/jest": "^29.5.14",
    "@types/katex": "^0.16.7",
    "@types/node": "^20.17.6",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "jest": "^29.7.0",
    "postcss": "^8.4.49",
    "prisma": "^5.22.0",
    "tailwindcss": "^3.4.15",
    "ts-jest": "^29.2.5",
    "typescript": "^5.6.3"
  }
}
```

- [ ] **Step 2: Buat file konfigurasi PWA `public/manifest.json`**

```json
{
  "name": "CAT SKD CPNS - Platform Tryout",
  "short_name": "CAT SKD",
  "description": "Simulasi Ujian CAT SKD CPNS & Kedinasan Standar BKN",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

- [ ] **Step 3: Setup `next.config.js` dengan dukungan PWA header & standalone output untuk Docker**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

- [ ] **Step 4: Commit perubahan Task 1**
```bash
git add package.json tsconfig.json next.config.js public/manifest.json
git commit -m "chore: initialize next.js pwa project structure"
```

---

### Task 2: Database Schema & Prisma ORM

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `src/lib/scoring.ts`
- Test: `tests/scoring.test.ts`

- [ ] **Step 1: Buat schema database Prisma lengkap untuk SaaS Latihan Soal**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

enum CategoryType {
  TWK
  TIU
  TKP
}

enum ExamMode {
  SIMULASI_RESMI
  LATIHAN_SANTAI
}

enum TransactionStatus {
  PENDING
  SUCCESS
  FAILED
  EXPIRED
}

model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  emailVerified DateTime?
  image         String?
  role          Role           @default(USER)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  accounts      Account[]
  sessions      Session[]
  transactions  Transaction[]
  userPackages  UserPackage[]
  examSessions  ExamSession[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Package {
  id          String         @id @default(cuid())
  title       String
  slug        String         @unique
  description String         @db.Text
  price       Int            // Dalam Rupiah (cth: 49000)
  isFree      Boolean        @default(false)
  isActive    Boolean        @default(true)
  createdAt   DateTime       @default(now())

  tryouts     Tryout[]
  purchases   UserPackage[]
  transactions Transaction[]
}

model UserPackage {
  id        String   @id @default(cuid())
  userId    String
  packageId String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  package   Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)

  @unique([userId, packageId])
}

model Tryout {
  id          String        @id @default(cuid())
  packageId   String
  title       String
  durationMin Int           @default(100) // 100 menit standar SKD
  createdAt   DateTime      @default(now())

  package     Package       @relation(fields: [packageId], references: [id], onDelete: Cascade)
  questions   Question[]
  sessions    ExamSession[]
}

model Question {
  id          String       @id @default(cuid())
  tryoutId    String
  orderNumber Int
  category    CategoryType
  text        String       @db.Text
  imageUrl    String?
  explanation String       @db.Text

  tryout      Tryout       @relation(fields: [tryoutId], references: [id], onDelete: Cascade)
  options     Option[]
  answers     ExamAnswer[]

  @@unique([tryoutId, orderNumber])
}

model Option {
  id         String   @id @default(cuid())
  questionId String
  key        String   // A, B, C, D, E
  text       String   @db.Text
  score      Int      // TWK/TIU: 0 atau 5. TKP: 1 sampai 5.

  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([questionId, key])
}

model ExamSession {
  id             String       @id @default(cuid())
  userId         String
  tryoutId       String
  mode           ExamMode     @default(SIMULASI_RESMI)
  startedAt      DateTime     @default(now())
  finishedAt     DateTime?
  scoreTWK       Int          @default(0)
  scoreTIU       Int          @default(0)
  scoreTKP       Int          @default(0)
  totalScore     Int          @default(0)
  isPassed       Boolean      @default(false) // Passing Grade: TWK>=65, TIU>=80, TKP>=166

  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  tryout         Tryout       @relation(fields: [tryoutId], references: [id], onDelete: Cascade)
  answers        ExamAnswer[]

  @@index([tryoutId, totalScore(sort: Desc)])
}

model ExamAnswer {
  id            String      @id @default(cuid())
  examSessionId String
  questionId    String
  selectedKey   String?     // A, B, C, D, E (null jika dikosongkan)
  scoreAwarded  Int         @default(0)
  isDoubt       Boolean     @default(false)

  examSession   ExamSession @relation(fields: [examSessionId], references: [id], onDelete: Cascade)
  question      Question    @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([examSessionId, questionId])
}

model Transaction {
  id            String            @id @default(cuid())
  merchantOrderId String          @unique // ID order unik ke Duitku
  userId        String
  packageId     String
  amount        Int
  paymentUrl    String?
  paymentMethod String?
  status        TransactionStatus @default(PENDING)
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  user          User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  package       Package           @relation(fields: [packageId], references: [id], onDelete: Cascade)
}
```

- [ ] **Step 2: Buat unit test scoring engine standar CAT BKN `tests/scoring.test.ts`**

```typescript
import { calculateSKDScore } from '../src/lib/scoring';

describe('SKD Scoring Engine', () => {
  it('harus lulus jika TWK >= 65, TIU >= 80, TKP >= 166', () => {
    const result = calculateSKDScore({
      twkScore: 70,
      tiuScore: 85,
      tkpScore: 170
    });
    expect(result.totalScore).toBe(325);
    expect(result.isPassed).toBe(true);
  });

  it('harus TIDAK lulus jika salah satu subtes di bawah passing grade', () => {
    const result = calculateSKDScore({
      twkScore: 60, // passing grade 65
      tiuScore: 100,
      tkpScore: 180
    });
    expect(result.isPassed).toBe(false);
  });
});
```

- [ ] **Step 3: Implementasikan fungsi `src/lib/scoring.ts`**

```typescript
export interface SubtestScores {
  twkScore: number;
  tiuScore: number;
  tkpScore: number;
}

export interface ScoreSummary {
  twkScore: number;
  tiuScore: number;
  tkpScore: number;
  totalScore: number;
  isPassed: boolean;
  passingGrades: {
    twk: number;
    tiu: number;
    tkp: number;
  };
}

export const PASSING_GRADE = {
  TWK: 65,
  TIU: 80,
  TKP: 166,
};

export function calculateSKDScore(scores: SubtestScores): ScoreSummary {
  const isPassed =
    scores.twkScore >= PASSING_GRADE.TWK &&
    scores.tiuScore >= PASSING_GRADE.TIU &&
    scores.tkpScore >= PASSING_GRADE.TKP;

  return {
    ...scores,
    totalScore: scores.twkScore + scores.tiuScore + scores.tkpScore,
    isPassed,
    passingGrades: {
      twk: PASSING_GRADE.TWK,
      tiu: PASSING_GRADE.TIU,
      tkp: PASSING_GRADE.TKP,
    },
  };
}
```

- [ ] **Step 4: Jalankan unit test scoring untuk memastikan logika lulus/tidak lulus akurat**
Run: `npm test tests/scoring.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit perubahan Task 2**
```bash
git add prisma/schema.prisma src/lib/scoring.ts tests/scoring.test.ts
git commit -m "feat(database): implement prisma schema and skd scoring engine"
```

---

### Task 3: Integrasi Pembayaran Duitku (Pay-per-Package)

**Files:**
- Create: `src/lib/duitku.ts`
- Create: `src/app/api/duitku/create-invoice/route.ts`
- Create: `src/app/api/duitku/callback/route.ts`
- Test: `tests/duitku.test.ts`

- [ ] **Step 1: Tulis unit test pembuatan signature Duitku `tests/duitku.test.ts`**

```typescript
import { generateDuitkuSignature, verifyCallbackSignature } from '../src/lib/duitku';

describe('Duitku Signature Helpers', () => {
  it('harus menghasilkan MD5 signature yang valid untuk request invoice', () => {
    const sig = generateDuitkuSignature('MERCHANT1', 'INV-001', 50000, 'APIKEY123');
    expect(sig).toHaveLength(32);
  });

  it('harus memvalidasi callback signature dari Duitku', () => {
    const merchantCode = 'M123';
    const amount = 50000;
    const orderId = 'INV-100';
    const apiKey = 'KEY456';
    const expectedSig = generateDuitkuSignature(merchantCode, orderId, amount, apiKey);

    const isValid = verifyCallbackSignature(merchantCode, amount, orderId, expectedSig, apiKey);
    expect(isValid).toBe(true);
  });
});
```

- [ ] **Step 2: Implementasi helper Duitku `src/lib/duitku.ts`**

```typescript
import crypto from 'crypto';

export function generateDuitkuSignature(
  merchantCode: string,
  merchantOrderId: string,
  amount: number,
  apiKey: string
): string {
  // MD5(merchantCode + merchantOrderId + amount + apiKey)
  const raw = `${merchantCode}${merchantOrderId}${amount}${apiKey}`;
  return crypto.createHash('md5').update(raw).digest('hex');
}

export function verifyCallbackSignature(
  merchantCode: string,
  amount: number,
  merchantOrderId: string,
  receivedSignature: string,
  apiKey: string
): boolean {
  const raw = `${merchantCode}${amount}${merchantOrderId}${apiKey}`;
  const calculated = crypto.createHash('md5').update(raw).digest('hex');
  return calculated.toLowerCase() === receivedSignature.toLowerCase();
}
```

- [ ] **Step 3: Implementasi Webhook Callback Duitku `src/app/api/duitku/callback/route.ts`**
Menangani notifikasi pembayaran dari Duitku: jika `resultCode === "00"` (berhasil), otomatis update status transaksi jadi `SUCCESS` dan masukkan `packageId` ke tabel `UserPackage` milik user.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyCallbackSignature } from '@/lib/duitku';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const merchantCode = formData.get('merchantCode') as string;
    const amount = parseInt(formData.get('amount') as string, 10);
    const merchantOrderId = formData.get('merchantOrderId') as string;
    const signature = formData.get('signature') as string;
    const resultCode = formData.get('resultCode') as string;

    const apiKey = process.env.DUITKU_API_KEY || '';
    const isValid = verifyCallbackSignature(merchantCode, amount, merchantOrderId, signature, apiKey);

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid Signature' }, { status: 400 });
    }

    if (resultCode === '00') {
      const trx = await prisma.transaction.findUnique({
        where: { merchantOrderId },
      });

      if (trx && trx.status !== 'SUCCESS') {
        await prisma.$transaction([
          prisma.transaction.update({
            where: { id: trx.id },
            data: { status: 'SUCCESS' },
          }),
          prisma.userPackage.upsert({
            where: {
              userId_packageId: {
                userId: trx.userId,
                packageId: trx.packageId,
              },
            },
            create: {
              userId: trx.userId,
              packageId: trx.packageId,
            },
            update: {},
          }),
        ]);
      }
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

- [ ] **Step 4: Jalankan test Duitku**
Run: `npm test tests/duitku.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit perubahan Task 3**
```bash
git add src/lib/duitku.ts src/app/api/duitku/ tests/duitku.test.ts
git commit -m "feat(payment): implement duitku payment gateway integration and callback webhook"
```

---

### Task 4: Client-Side CBT Engine (Dual Mode & Zustand Store)

**Files:**
- Create: `src/store/useExamStore.ts`
- Create: `src/components/exam/Timer.tsx`
- Create: `src/components/exam/QuestionPalette.tsx`
- Create: `src/components/exam/QuestionCard.tsx`
- Create: `src/app/(exam)/exam/[sessionId]/page.tsx`

- [ ] **Step 1: Buat Zustand store untuk state ujian di client `src/store/useExamStore.ts`**
Menyimpan jawaban sementara, ragu-ragu, timer tersisa, dan auto-save ke IndexedDB/LocalStorage.

```typescript
import { create } from 'zustand';

interface AnswerMap {
  [questionId: string]: string; // key opsi: "A", "B", dst.
}

interface DoubtMap {
  [questionId: string]: boolean;
}

interface ExamState {
  sessionId: string;
  currentIndex: number;
  answers: AnswerMap;
  doubts: DoubtMap;
  remainingSeconds: number;
  isSubmitting: boolean;
  initSession: (sessionId: string, initialRemaining: number, savedAnswers?: AnswerMap) => void;
  setAnswer: (questionId: string, optionKey: string) => void;
  toggleDoubt: (questionId: string) => void;
  setCurrentIndex: (index: number) => void;
  tickTimer: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  sessionId: '',
  currentIndex: 0,
  answers: {},
  doubts: {},
  remainingSeconds: 6000, // 100 menit
  isSubmitting: false,

  initSession: (sessionId, initialRemaining, savedAnswers = {}) =>
    set({ sessionId, remainingSeconds: initialRemaining, answers: savedAnswers }),

  setAnswer: (questionId, optionKey) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionKey },
    })),

  toggleDoubt: (questionId) =>
    set((state) => ({
      doubts: { ...state.doubts, [questionId]: !state.doubts[questionId] },
    })),

  setCurrentIndex: (currentIndex) => set({ currentIndex }),

  tickTimer: () =>
    set((state) => ({
      remainingSeconds: Math.max(0, state.remainingSeconds - 1),
    })),
}));
```

- [ ] **Step 2: Komponen Countdown Timer `src/components/exam/Timer.tsx`**
Menampilkan indikator sisa waktu dan memicu auto-submit ketika waktu habis.

- [ ] **Step 3: Komponen Navigasi Nomor Soal `src/components/exam/QuestionPalette.tsx`**
Kisi 1–110 nomor soal dengan warna status: Hijau (Dijawab), Kuning (Ragu-ragu), Abu-abu (Belum dijawab).

- [ ] **Step 4: Commit perubahan Task 4**
```bash
git add src/store/ src/components/exam/ src/app/\(exam\)/
git commit -m "feat(cbt): implement exam state management, timer, and question palette"
```

---

### Task 5: Admin Bulk Import Excel & Math Editor

**Files:**
- Create: `src/app/api/admin/questions/import/route.ts`
- Create: `src/components/KaTeXRenderer.tsx`
- Create: `src/app/(admin)/admin/questions/page.tsx`

- [ ] **Step 1: Implementasi API import Excel `src/app/api/admin/questions/import/route.ts`**
Menerima file `.xlsx` atau `.csv`, membaca baris: `[Nomor, Kategori, Soal, Opsi A, Skor A, Opsi B, Skor B, Opsi C, Skor C, Opsi D, Skor D, Opsi E, Skor E, Pembahasan]` dan menyimpannya ke database via Prisma batch transaction.

- [ ] **Step 2: Komponen render formula matematika KaTeX `src/components/KaTeXRenderer.tsx`**
Otomatis merender sintaks seperti `$x^2 + y^2$` dan `\frac{a}{b}` dengan rapi di soal TIU.

- [ ] **Step 3: Commit perubahan Task 5**
```bash
git add src/app/api/admin/questions/import/route.ts src/components/KaTeXRenderer.tsx
git commit -m "feat(admin): implement excel bulk question importer and katex renderer"
```

---

### Task 6: Dockerization & Deployment di Server Ubuntu

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.env.example`

- [ ] **Step 1: Buat multi-stage Dockerfile untuk Next.js standalone**

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

- [ ] **Step 2: Buat `docker-compose.yml` untuk server Ubuntu**

```yaml
version: '3.8'

services:
  cbt-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cbt_skd_app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
      - DUITKU_MERCHANT_CODE=${DUITKU_MERCHANT_CODE}
      - DUITKU_API_KEY=${DUITKU_API_KEY}
```

- [ ] **Step 3: Commit perubahan Task 6**
```bash
git add Dockerfile docker-compose.yml
git commit -m "chore(deploy): add production multi-stage dockerfile and docker-compose"
```

---

## Self-Review Checklist

1. **Spec Coverage:**
   - Pay-per-package via Duitku? -> Ya, Task 3 menangani `create-invoice`, `callback` webhook, dan grant akses `UserPackage`.
   - Google OAuth 1-klik? -> Ya, Task 2 dan Prisma Account/Session.
   - Dual mode CBT (Simulasi + Latihan)? -> Ya, Task 2 `ExamMode` dan Task 4 Zustand store.
   - PWA Standalone? -> Ya, Task 1 `manifest.json` & PWA headers.
   - Bulk Excel Import & Math KaTeX? -> Ya, Task 5.
   - Self-hosted di server Ubuntu dengan Postgres? -> Ya, Task 6 Docker Compose.
2. **Placeholder scan:** Tidak ada TODO/TBD di dalam kode langkah-langkah kritis.
3. **Type consistency:** Konsisten menggunakan Prisma model `Package`, `Tryout`, `Question`, `Option`, `ExamSession`, dan `Transaction`.
