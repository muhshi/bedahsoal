# Review Mode, Dynamic Sessions & Multi-Exam Question Bank Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menghadirkan siklus CBT end-to-end lengkap dengan mode pembahasan (review & KaTeX solutions), perbaikan sesi dinamis & auto-reset demo (mengatasi error "Sesi ujian ini telah selesai dikerjakan"), serta penambahan bank soal bervariasi lintas ujian (SKD Lengkap 110 Soal TWK/TIU/TKP, Olimpiade Matematika skor minus, dan TBS LPDP/UTBK).

**Architecture:**
- Backend: Endpoint `POST /api/sessions/start` untuk inisiasi sesi dinamis per pengguna/tryout, dan `GET /api/sessions/[sessionId]/review` yang dilindungi guard `status === 'COMPLETED'` untuk menyajikan kunci jawaban, skor, dan pembahasan KaTeX setelah ujian berakhir.
- Frontend: Halaman review hasil ujian (`/exam/[sessionId]/review` atau mode review di `/exam/[sessionId]`) dengan palet nomor berkode warna (Hijau: Benar, Merah: Salah, Abu-abu: Kosong), filter "Salah Saja", dan kartu pembahasan interaktif.
- Database & Seeder: Skrip injeksi bank soal beragam (`prisma/seed-packages.ts`) yang mengisi paket SKD CPNS 110 butir lengkap, Olimpiade Matematika (KaTeX & negative marking +4/-1), dan TBS LPDP ke PostgreSQL `cat_skd_db`.
- Deploy: Smart deploy ke server Ubuntu `10.133.21.24:3001` dengan verifikasi zero-downtime.

**Tech Stack:** Next.js 16 (App Router, Turbopack, Partial Prerendering), TypeScript, Prisma ORM, PostgreSQL, Zustand, Tailwind CSS v4, KaTeX, Vitest.

---

## File Structure & Responsibilities

| File | Responsibilitas |
| --- | --- |
| `src/app/api/sessions/start/route.ts` | Inisiasi sesi ujian baru secara dinamis berdasarkan `tryoutId` (mencegah bentrok ID sesi statis) |
| `src/app/api/sessions/[sessionId]/review/route.ts` | Menyajikan data review, kunci jawaban, dan pembahasan hanya untuk sesi `COMPLETED` |
| `src/app/api/sessions/[sessionId]/route.ts` | Modifikasi penanganan sesi `COMPLETED`: mengembalikan status 200 dengan flag `isCompleted: true` & redirect review |
| `src/types/exam.ts` | Definisi tipe data DTO untuk Review Mode (`ExamReviewDTO`, `QuestionReviewDTO`) |
| `src/components/exam/ExamReviewViewer.tsx` | Komponen visual interaktif pembahasan soal dengan KaTeX, filter status jawaban, dan navigasi |
| `src/app/(exam)/exam/[sessionId]/page.tsx` | Penyesuaian agar ketika sesi berstatus selesai, user langsung dialihkan atau disajikan opsi review & coba ulang |
| `prisma/seed-packages.ts` | Seeder bank soal masif & bervariasi (SKD 110 Soal, Olimpiade Matematika, LPDP TBS) |
| `src/app/page.tsx` | Integrasi tombol "Mulai Kerjakan" katalog dengan dynamic session creator |
| `tests/session-lifecycle.test.ts` | Unit & integrasi test untuk start session, submit, dan review authorization |

---

## Tasks

### Task 1: Type Definitions & Review Data Transfer Objects (DTO)

**Files:**
- Modify: `src/types/exam.ts`
- Test: `tests/review-types.test.ts`

- [ ] **Step 1: Write failing test untuk review types**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Define `QuestionReviewDTO` and `ExamReviewDTO` di `src/types/exam.ts`**
  - Termasuk `correctOptionKey`, `correctOptionId`, `scoreAwarded`, `explanation`, `userSelectedOptionId`, `isCorrect`.
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit changes**

---

### Task 2: Dynamic Session Starter Endpoint (`POST /api/sessions/start`) & Demo Graceful Handling

**Files:**
- Create: `src/app/api/sessions/start/route.ts`
- Modify: `src/app/api/sessions/[sessionId]/route.ts`
- Test: `tests/session-lifecycle.test.ts`

- [ ] **Step 1: Write failing integration test untuk start session & demo session check**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `POST /api/sessions/start`**
  - Menerima `{ tryoutId: string, userName?: string, mode?: "SIMULASI" | "LATIHAN" }`.
  - Membuat record `ExamSession` baru dengan ID acak unik (cuid/uuid).
  - Mengembalikan `{ sessionId: string, examUrl: string }`.
- [ ] **Step 4: Update `GET /api/sessions/[sessionId]`**
  - Jika sesi `COMPLETED`, daripada langsung return 403 error, sertakan flag `isCompleted: true` dan info hasil sehingga frontend bisa langsung menampilkan review atau redirect dengan elegan.
  - Untuk sesi `session-demo-tiu`: jika sudah selesai dan diakses kembali dalam mode demo, sediakan opsi auto-clone/reset ke sesi aktif baru.
- [ ] **Step 5: Run tests and verify they pass**
- [ ] **Step 6: Commit changes**

---

### Task 3: Secure Review Endpoint (`GET /api/sessions/[sessionId]/review`)

**Files:**
- Create: `src/app/api/sessions/[sessionId]/review/route.ts`
- Test: `tests/session-review.test.ts`

- [ ] **Step 1: Write failing test untuk guard & validasi data review**
  - Test 1: Sesi berstatus `IN_PROGRESS` DITOLAK (403 Forbidden - Zero Leakage Guard).
  - Test 2: Sesi berstatus `COMPLETED` menyajikan kunci jawaban, poin, dan pembahasan KaTeX.
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `GET /api/sessions/[sessionId]/review`**
  - Query database dengan join `Question`, `Option`, `ExamAnswer`, `Tryout`, dan `PassingGradeProfile`.
  - Menghitung statistik akurasi (total benar, salah, kosong, persentase).
  - Mengembalikan payload `ExamReviewDTO`.
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit changes**

---

### Task 4: Frontend Review Mode UI (`ExamReviewViewer`)

**Files:**
- Create: `src/components/exam/ExamReviewViewer.tsx`
- Modify: `src/app/(exam)/exam/[sessionId]/page.tsx`
- Test: `tests/exam-review-viewer.test.tsx`

- [ ] **Step 1: Write component test untuk `ExamReviewViewer`**
  - Memverifikasi render badge hijau/merah pada pilihan jawaban.
  - Memverifikasi render KaTeX pembahasan.
  - Memverifikasi filter palet nomor (Semua / Salah / Benar / Kosong).
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Build `ExamReviewViewer` component**
  - Header dengan ringkasan skor & passing grade badge.
  - Filter tab: "Semua Soal", "Hanya Salah", "Hanya Benar", "Tidak Dijawab".
  - Question pane dengan indikator visual:
    - Opsi benar: border hijau + icon checkmark.
    - Opsi salah pilihan peserta: border merah + icon X.
  - Kotak Pembahasan (Solusi & Tips Trik) dengan `MathRenderer` (KaTeX).
  - Tombol aksi: "Coba Ulangi Ujian Ini", "Kembali ke Katalog".
- [ ] **Step 4: Connect review view di `src/app/(exam)/exam/[sessionId]/page.tsx`**
  - Jika sesi sudah selesai atau setelah submit, user dapat langsung mengklik "Lihat Pembahasan Lengkap".
- [ ] **Step 5: Run test to verify it passes**
- [ ] **Step 6: Commit changes**

---

### Task 5: Bank Soal Masif & Bervariasi (Multi-Exam Seeder)

**Files:**
- Create: `prisma/seed-packages.ts`
- Modify: `package.json` (tambahkan script `npm run db:seed:packages`)
- Test: `tests/package-seeder.test.ts`

- [ ] **Step 1: Rancang dataset soal komprehensif**
  - **Paket A: SKD CPNS Lengkap (110 Butir Standar BKN)**
    - 30 Soal TWK: Nasionalisme, Bela Negara, Integritas, Pilar Negara (UUD 45/Pancasila), Bahasa Indonesia.
    - 35 Soal TIU: Analogi, Silogisme, Analitis, Deret Angka, Berhitung Cepat, Figural Serial/Analogi.
    - 45 Soal TKP: Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme, Anti Radikalisme (Skala skor 1-5).
  - **Paket B: Simulasi Olimpiade Sains & Matematika (OSN / KSN)**
    - 20 Soal Aljabar, Geometri, Kombinatorika, dan Teori Bilangan dengan formula KaTeX kompleks.
    - Aturan penilaian: Benar +4, Salah -1, Kosong 0.
  - **Paket C: Tes Bakat Skolastik (TBS) Beasiswa LPDP / UTBK**
    - 40 Soal Penalaran Verbal, Penalaran Kuantitatif, dan Pemecahan Masalah.
- [ ] **Step 2: Buat skrip seeder `prisma/seed-packages.ts`**
  - Menangani `upsert` Package, PassingGradeProfile, Tryout, Question, dan Option.
- [ ] **Step 3: Jalankan seeder ke database PostgreSQL `cat_skd_db`**
  - Run: `npx tsx prisma/seed-packages.ts`
- [ ] **Step 4: Verifikasi isi database (total soal > 230 butir tersimpan rapi)**
- [ ] **Step 5: Commit changes**

---

### Task 6: Integrasi Landing Page dengan Dynamic Session Starter

**Files:**
- Modify: `src/app/page.tsx`
- Test: manual & local build check

- [ ] **Step 1: Pasang handler klik pada tombol "Mulai Kerjakan" di setiap kartu katalog**
  - Menghubungkan tombol ke client action yang memanggil `POST /api/sessions/start?tryoutId=...` dan langsung me-redirect browser ke sesi baru `/exam/[newSessionId]`.
- [ ] **Step 2: Pasang tombol "Coba Demo Gratis" di Navbar & Hero agar selalu membuat sesi demo baru**
- [ ] **Step 3: Run `npm run build && npm test` lokal**
- [ ] **Step 4: Commit changes**

---

### Task 7: Remote Deployment & Verifikasi di Server (`10.133.21.24:3001`)

**Files:**
- Remote: `/home/bpsdemak/apps/muhshi/bedahsoal`

- [ ] **Step 1: Push branch ke GitHub `origin/main`**
- [ ] **Step 2: Jalankan `./deploy.sh` di remote server via SSH**
- [ ] **Step 3: Jalankan `npx prisma db seed` atau `tsx prisma/seed-packages.ts` di server jika diperlukan**
- [ ] **Step 4: Verifikasi akses live**:
  - Buka katalog di `http://10.133.21.24:3001`.
  - Klik "Mulai Kerjakan" pada paket SKD / Olimpiade / Demo.
  - Kerjakan beberapa soal dan submit.
  - Buka halaman pembahasan dan pastikan review & KaTeX tampil sempurna.
