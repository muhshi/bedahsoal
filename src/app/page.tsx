import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { StartExamButton } from "@/components/exam/StartExamButton";
import { UserNav } from "@/components/auth/UserNav";
import { CategorizedCatalog, PackageData } from "@/components/catalog/CategorizedCatalog";
import {
  GraduationCap,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Calculator,
  Award,
  Layers,
} from "lucide-react";

async function PackageList() {
  let packages: Array<PackageData> = [];
  let userPackageIds: string[] = [];

  try {
    const [fetchedPackages, session] = await Promise.all([
      db.package.findMany({
        where: { isActive: true },
        include: {
          tryouts: {
            select: {
              id: true,
              title: true,
              durationMinutes: true,
              totalQuestions: true,
            },
          },
        },
        orderBy: [
          { examType: "asc" },
          { createdAt: "desc" },
        ],
      }),
      auth().catch(() => null),
    ]);

    packages = fetchedPackages;

    if (session?.user?.id) {
      const userPackages = await db.userPackage.findMany({
        where: { userId: session.user.id },
        select: { packageId: true },
      });
      userPackageIds = userPackages.map((up) => up.packageId);
    }
  } catch (err) {
    console.error("Failed to fetch packages from DB:", err);
  }

  return <CategorizedCatalog packages={packages} userPackageIds={userPackageIds} />;
}

function PackageListSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Pills skeleton */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-28 bg-slate-200 rounded-2xl" />
        ))}
      </div>
      {/* Banner skeleton */}
      <div className="h-24 bg-slate-200 rounded-3xl" />
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 h-72 space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-16 bg-slate-100 rounded w-full" />
            <div className="h-8 bg-slate-200 rounded w-1/3 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-900 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-blue-900 font-extrabold tracking-tight">
                Bedah<span className="text-blue-600">Soal</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
                CBT Multi-Exam Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#katalog" className="hover:text-blue-600 transition-colors">
              Katalog Tryout
            </a>
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
              Riwayat &amp; Statistik
            </Link>
            <a href="#keunggulan" className="hover:text-blue-600 transition-colors">
              Keunggulan
            </a>
            <a href="#format" className="hover:text-blue-600 transition-colors">
              Format Ujian
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <StartExamButton
              tryoutId="tryout-tiu-60"
              label="Coba Demo"
              className="hidden sm:inline-flex px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs transition"
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            />
            <UserNav />
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),white)] opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Engine CBT Polimorfik Modern &middot; SKD, Kedinasan, LPDP, Olimpiade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Taklukkan Ujian Impian dengan{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Simulasi CBT Paling Akurat
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Engine simulasi ujian berkecepatan tinggi (&lt;16 ms) tanpa reload, kalkulasi penilaian presisi resmi BKN
              dan skor minus olimpiade, aman dari koneksi terputus, serta evaluasi kelemahan materi terarah.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <StartExamButton
                tryoutId="tryout-skd-110"
                label="Mulai Simulasi SKD (110 Soal BKN)"
                className="w-full sm:w-auto px-6 py-3.5 text-base font-bold rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 active:scale-95"
                icon={<Sparkles className="w-5 h-5 text-amber-300" />}
              />
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-white text-slate-700 border border-slate-300/80 shadow-xs hover:bg-slate-50 transition-all"
              >
                <span>Lihat Katalog Paket</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Answer Leakage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Server-Authoritative Timer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>IndexedDB Offline Resilience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-indigo-500" />
                <span>KaTeX Math Rendering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Katalog Paket Tryout */}
      <section id="katalog" className="py-16 bg-white border-y border-slate-200/80 scroll-mt-16">
        <div id="paket-ujian" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Pilihan Pembelajaran Multi-Ujian</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Katalog Paket Soal Terkategori</h2>
              <p className="text-sm text-slate-600 mt-1">
                Pilih jalur ujian target Anda: SKD CPNS, Beasiswa LPDP, UTBK-SNBT, atau Olimpiade Sains.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 self-start md:self-auto">
              <span>Masa Akses Selamanya per Paket</span>
            </div>
          </div>

          <Suspense fallback={<PackageListSkeleton />}>
            <PackageList />
          </Suspense>
        </div>
      </section>

      {/* 4. Keunggulan Platform */}
      <section id="keunggulan" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Teknologi Terdepan</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Mengapa Memilih BedahSoal?</h2>
            <p className="text-sm text-slate-600 mt-2">
              Dirancang dengan standar industri untuk menghadirkan ketenangan dan akurasi saat Anda berlatih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Perpindahan 0 Milidetik (&lt; 16 ms)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Navigasi antar nomor berjalan 60 FPS mulus di browser ponsel tanpa reload halaman berkat Zustand
                in-memory client store.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Answer Leakage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kunci jawaban dan bobot nilai tidak pernah dikirim ke browser saat ujian berjalan. Kredibilitas nilai
                terjaga 100% murni.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Server-Authoritative Timer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timer ujian dikunci oleh server. Mengubah jam ponsel atau me-refresh browser tidak akan menambah waktu
                sedetik pun.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">KaTeX &amp; Figural Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simbol matematika, pecahan, deret angka, dan gambar figural dirender tajam dan proporsional di semua
                layar smartphone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Engine Polimorfik Multi-Exam</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mendukung berbagai skema penilaian: SKD CPNS (TWK/TIU/TKP), LPDP Tes Bakat Skolastik, hingga skor minus
                Olimpiade Sains.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Tie-Breaker Resmi BKN</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Urutan peringkat nasional dihitung ketat berdasar hierarki resmi: Total Skor &rarr; TKP &rarr; TIU
                &rarr; TWK &rarr; Waktu Tercepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Demo Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Siap Menguji Kemampuanmu Hari Ini?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-base">
            Coba simulasi mandiri 60 butir soal TIU sekarang juga langsung di browser. Rasakan navigasi instan dan timer
            real-time tanpa biaya.
          </p>
          <div className="pt-2">
            <StartExamButton
              tryoutId="tryout-skd-110"
              label="Buka CBT Player Sekarang"
              className="px-8 py-3.5 text-base font-bold rounded-xl bg-white text-blue-700 shadow-xl hover:bg-blue-50 active:scale-95"
            />
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                BS
              </div>
              <span className="text-white font-bold text-base">BedahSoal</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#katalog" className="hover:text-white transition-colors">
                Katalog
              </a>
              <a href="#keunggulan" className="hover:text-white transition-colors">
                Keunggulan
              </a>
              <Link href="/exam/session-demo-tiu" className="hover:text-white transition-colors">
                Ujian Demo
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-slate-500 text-[11px] leading-relaxed">
            <p>
              <strong>Penafian Independen:</strong> Platform ini merupakan sarana simulasi belajar mandiri independen
              dan tidak terafiliasi secara resmi dengan Badan Kepegawaian Negara (BKN) maupun Kementerian Pendayagunaan
              Aparatur Negara dan Reformasi Birokrasi (PANRB). Nilai tryout adalah hasil simulasi dan tidak menjamin
              kelulusan pada seleksi resmi pemerintah.
            </p>
            <p className="mt-2">&copy; 2026 BedahSoal Platform. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
