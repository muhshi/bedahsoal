<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BedahSoal Engineering & Architecture Standards (Lessons from Opencode Audit)

Prinsip kerja wajib untuk setiap agen/developer di repositori ini agar kode bersih, tuntas, dan bebas regresi:

### 1. Prinsip "Tuntas Menyeluruh" (No Half-Done / Surface-Level Work)
- **Cek Seluruh Siklus Fitur**: Saat memodifikasi atau me-redesign komponen, jangan hanya mengubah styling CSS. Telusuri seluruh rantai: API route, state store, navigasi, guard kepemilikan, dan unit test.
- **Rute yang Valid**: Jangan pernah membuat tautan ke route yang tidak ada di `src/app/` (seperti `/review/[id]`). Selalu gunakan helper terpusat `src/lib/exam-navigation.ts` (`resolveExamUrl`).
- **Hapus Sisa Prototipe**: Jangan pernah meninggalkan hardcoded ID atau mock route (`session-demo-tiu`). Semua alur harus terhubung ke sesi riil atau generator sesi tamu.

### 2. Siklus Ujian, Timer & Sinkronisasi Jawaban
- **Single-Flight Auto-Submit**: Setiap timer ujian wajib menggunakan guard ref (`hasTimedUpRef = useRef(false)`) agar interval countdown tidak memicu request submit berulang kali ke server.
- **Grace Window Batas Waktu**: Endpoint submit wajib memberikan toleransi keterlambatan jaringan (`LATE_SUBMIT_GRACE_MS = 5 * 60 * 1000`) saat auto-submit sebelum menolak submit yang terlambat.
- **Timestamped Answer Merge**: Saat melakukan sinkronisasi lokal dan server, selalu gunakan `mergeAnswersByTimestamp` (`src/lib/answer-merge.ts`) dengan `answeredAt`. Jangan biarkan cache offline lokal yang basi menimpa jawaban server yang lebih baru.

### 3. Keamanan, Akses Sesi & Fair Play Leaderboard
- **Guard Kepemilikan Sesi**: Endpoint `GET /api/sessions/[sessionId]`, `POST submit`, dan `GET review` wajib menerapkan `canAccessSession(sessionUserId, authenticatedUserId)` (`src/lib/session-access.ts`) untuk mencegah unauthorized access, tanpa memutus akses peserta tamu (guest).
- **Entitlement Sesi**: Pembuatan sesi (`/api/sessions/start`) wajib memvalidasi kepemilikan paket aktif di database sebelum memperbolehkan pengerjaan tryout berbayar.
- **Integritas Peringkat**: Papan peringkat nasional hanya mencatat percobaan pertama simulasi resmi (`rankEligible = examMode === 'SIMULASI' && attemptNumber === 1`). Retake/pembahasan tidak boleh mengotori peringkat.

### 4. Disiplin Desain Editorial Paper
- Gunakan token tema editorial: `bg-paper`, `text-ink`, `border-line-strong`, `bg-subtle-paper`, dan `StampBadge`.
- **Dilarang memakai token SaaS lama**: `dark:`, `rounded-xl/2xl/3xl`, `bg-gradient`, `shadow-lg/xl`, `animate-in`, atau styling ungu/indigo generic.
- Gunakan skala z-index terstandar: header `z-60`, dropdown `z-70`, drawer `z-180`, modal `z-200`.

### 5. Loop Verifikasi Wajib Sebelum Mengklaim Selesai
Setiap perubahan wajib melalui 4 gerbang verifikasi:
1. `npx tsc --noEmit` (0 error tipe).
2. `npm test` (seluruh suite test unit & integrasi lolos).
3. `npm run build` (build produksi Next.js Turbopack bersih).
4. Deploy & cek live `curl -s -i https://bedahsoal.muhshi.my.id/api/health`.

