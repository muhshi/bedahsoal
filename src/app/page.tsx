import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { StartExamButton } from "@/components/exam/StartExamButton";
import { UserNav } from "@/components/auth/UserNav";
import { CategorizedCatalog, PackageData } from "@/components/catalog/CategorizedCatalog";
import { InteractiveDocketCard } from "@/components/home/InteractiveDocketCard";

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
          <div key={i} className="h-9 w-28 bg-[#ded4bf] border border-[#d2c8b2]" />
        ))}
      </div>
      {/* Banner skeleton */}
      <div className="h-20 bg-[#eae3d2] border border-[#d2c8b2]" />
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-[#191713] bg-[#fbf8f0] p-6 h-72 space-y-4 shadow-paper">
            <div className="h-4 bg-[#ded4bf] w-1/4" />
            <div className="h-6 bg-[#ded4bf] w-3/4" />
            <div className="h-16 bg-[#f3efe3] w-full" />
            <div className="h-8 bg-[#ded4bf] w-1/3 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f3efe3] text-[#191713] selection:bg-[#c4402a] selection:text-[#f3efe3]">
      {/* 1. Header / Navbar with Paper Atelier Aesthetic */}
      <UserNav />

      {/* 2. Hero Section with Fraunces Serif Headline & Interactive Docket Card */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#d2c8b2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Subtitle */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Kicker */}
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4b463d]">
                <span className="w-2 h-2 bg-[#c4402a] flex-none" />
                <span>Simulasi CBT · SKD / LPDP / UTBK / OSN</span>
              </div>

              {/* Fraunces Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#191713] tracking-tight leading-[1.04] max-w-xl">
                Ujian bukan soal tebak-tebakan.{" "}
                <em className="italic text-[#c4402a] font-normal">Bedah soalnya.</em>
              </h1>

              {/* Descriptive Subtitle */}
              <p className="text-base sm:text-lg text-[#4b463d] leading-relaxed max-w-xl font-sans">
                Simulasi ujian dengan timer server, penilaian resmi, dan pembahasan yang menunjukkan
                di mana logikamu patah — bukan sekadar angka di akhir layar.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <StartExamButton
                  tryoutId="tryout-skd-110"
                  label="Mulai simulasi gratis"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-6 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4402a] hover:border-[#c4402a] shadow-paper hover:shadow-[8px_8px_0px_#191713] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                  icon={<span className="text-sm font-bold" aria-hidden="true">&rarr;</span>}
                />
                <a
                  href="#katalog"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 border border-[#191713] bg-transparent text-[#191713] font-mono text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#191713] hover:text-[#f3efe3] shadow-paper hover:shadow-[8px_8px_0px_#191713] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                >
                  Lihat katalog paket
                </a>
              </div>

              {/* Micro Specification Badges */}
              <div className="pt-6 border-t border-[#b9ac91] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#7a7365]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#c4402a]">✳</span>
                  <strong className="text-[#191713] font-semibold">110 butir</strong> SKD standar BKN
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#c4402a]">✳</span>
                  <strong className="text-[#191713] font-semibold">Timer server</strong> tidak bisa diakali
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#c4402a]">✳</span>
                  <strong className="text-[#191713] font-semibold">Pembahasan</strong> per langkah
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Live Simulation Teaser Card */}
            <div className="lg:col-span-5">
              <InteractiveDocketCard />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specifications Ticker Band */}
      <div className="border-b border-[#b9ac91] bg-[#eae3d2] overflow-hidden py-3 select-none" aria-label="Spesifikasi platform">
        <div className="flex items-center gap-8 whitespace-nowrap font-mono text-[10.5px] font-medium uppercase tracking-[0.15em] text-[#4b463d] animate-marquee">
          <span>SKD CPNS — 110 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>LPDP TBS — 40 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>UTBK-SNBT — 45 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>OSN Matematika — 25 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>Timer server terauthorisasi</span>
          <span className="text-[#c4402a]">✳</span>
          <span>Pembahasan analitis per langkah</span>
          <span className="text-[#c4402a]">✳</span>
          <span>Zero answer leakage</span>
          <span className="text-[#c4402a]">✳</span>
          <span>SKD CPNS — 110 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>LPDP TBS — 40 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>UTBK-SNBT — 45 butir</span>
          <span className="text-[#c4402a]">✳</span>
          <span>OSN Matematika — 25 butir</span>
        </div>
      </div>

      {/* 4. The 4 Integrity Pillars (Cara Kerja / Ledger Ujian Jujur) */}
      <section id="keunggulan" className="py-16 sm:py-24 border-b border-[#d2c8b2] bg-[#f3efe3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#c4402a]">
                02 — Cara kerja
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#191713] mt-2 leading-[1.05]">
                Ujian yang jujur.<br />
                <em className="font-normal text-[#7a7365] not-italic">Nilai yang bisa dibela.</em>
              </h2>
            </div>
            <p className="text-sm text-[#4b463d] max-w-md leading-relaxed font-sans">
              Empat hal yang kami anggap tidak bisa dikompromikan saat kamu sedang berlatih
              untuk menghadapi ujian penentu masa depan.
            </p>
          </div>

          {/* Editorial Ledger Grid */}
          <div className="border-t border-[#191713] divide-y divide-[#b9ac91]">
            {/* Pillar 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 items-start">
              <div className="md:col-span-2 font-serif text-3xl sm:text-4xl font-semibold text-[#c4402a] leading-none">
                01
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713]">
                  Soal yang tidak bocor.
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-[#4b463d] leading-relaxed font-sans">
                  Kunci jawaban dan bobot nilai tidak pernah dikirim ke browser selama ujian berjalan.
                  Yang kamu lihat hanya soal, pilihan, dan sisa waktu — integritas nilai terjaga murni.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 items-start">
              <div className="md:col-span-2 font-serif text-3xl sm:text-4xl font-semibold text-[#c4402a] leading-none">
                02
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713]">
                  Waktu yang tidak bisa ditawar.
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-[#4b463d] leading-relaxed font-sans">
                  Timer dikunci oleh server. Mengganti jam ponsel atau me-refresh halaman tidak
                  menambah satu detik pun. Disiplin waktu dilatih persis seperti di bilik ujian CAT resmi.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 items-start">
              <div className="md:col-span-2 font-serif text-3xl sm:text-4xl font-semibold text-[#c4402a] leading-none">
                03
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713]">
                  Nilai yang bisa dipertanggungjawabkan.
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-[#4b463d] leading-relaxed font-sans">
                  Skor TWK, TIU, dan TKP dihitung mengikuti passing grade KepmenPANRB dan tie-breaker resmi BKN.
                  Bukan rata-rata yang dibuat-buat, sehingga peta kesiapanmu terukur objektif.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 items-start">
              <div className="md:col-span-2 font-serif text-3xl sm:text-4xl font-semibold text-[#c4402a] leading-none">
                04
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713]">
                  Pembahasan yang membedah.
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-[#4b463d] leading-relaxed font-sans">
                  Setiap jawaban salah diurai: langkah mana yang patah, konsep mana yang perlu diulang,
                  dan bagaimana cara berpikir yang benar. Belajar dari kekeliruan, bukan sekadar melihat kunci.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Katalog Paket Tryout ("Empat Meja Ujian") */}
      <section id="katalog" className="py-16 sm:py-24 border-b border-[#d2c8b2] scroll-mt-16">
        <div id="paket-ujian" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#c4402a]">
                01 — Katalog Paket Ujian
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191713] mt-1 tracking-tight">
                Pilihan Meja &amp; Latihan Terarah
              </h2>
              <p className="text-sm text-[#4b463d] mt-1.5 max-w-xl font-sans">
                Pilih jalur ujian target Anda: SKD CPNS, Beasiswa LPDP, UTBK-SNBT, atau Olimpiade Sains.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#eae3d2] border border-[#b9ac91] font-mono text-[10px] font-semibold uppercase tracking-wider text-[#191713] self-start md:self-auto shadow-[2px_2px_0px_#ded4bf]">
              <span>Masa Akses Selamanya per Paket</span>
            </div>
          </div>

          <Suspense fallback={<PackageListSkeleton />}>
            <PackageList />
          </Suspense>
        </div>
      </section>

      {/* 6. Editorial CTA Band */}
      <section className="bg-[#191713] text-[#f3efe3] py-16 sm:py-20 border-b border-[#191713] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-[#ded4bf]">
            Mulai Tanpa Hambatan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f3efe3]">
            Siap Menguji Kemampuanmu Hari Ini?
          </h2>
          <p className="text-[#ded4bf] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
            Coba simulasi mandiri butir soal TIU sekarang juga langsung di browser. Rasakan navigasi instan
            dan timer real-time tanpa biaya.
          </p>
          <div className="pt-2">
            <StartExamButton
              tryoutId="tryout-skd-110"
              label="Buka CBT Player Sekarang"
              className="inline-flex items-center justify-center gap-2.5 h-12 px-8 border border-[#f3efe3] bg-[#f3efe3] text-[#191713] font-mono text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#c4402a] hover:border-[#c4402a] hover:text-[#f3efe3] shadow-[4px_4px_0px_rgba(243,239,227,0.2)] transition-all cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 7. Editorial Paper Footer */}
      <footer className="mt-auto bg-[#eae3d2] text-[#4b463d] py-12 border-t border-[#b9ac91] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#b9ac91]">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 bg-[#191713] text-[#f3efe3] flex items-center justify-center font-serif font-bold text-sm border border-[#191713]">
                [B]
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#191713] leading-none">
                  Bedah<em className="text-[#c4402a] not-italic font-normal">Soal</em>
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#7a7365] mt-0.5">
                  Ruang Bedah Ujian
                </span>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.1em]">
              <a href="#katalog" className="text-[#4b463d] hover:text-[#191713] transition-colors">
                Katalog Paket
              </a>
              <a href="#keunggulan" className="text-[#4b463d] hover:text-[#191713] transition-colors">
                Prinsip Ujian
              </a>
              <Link href="/dashboard" className="text-[#4b463d] hover:text-[#191713] transition-colors">
                Rapor &amp; Riwayat
              </Link>
              <Link href="/exam/session-demo-tiu" className="text-[#c4402a] font-semibold hover:underline">
                Ujian Demo &rarr;
              </Link>
            </div>
          </div>

          <div className="pt-2 font-mono text-[9px] text-[#7a7365] leading-relaxed space-y-2">
            <p>
              <strong className="text-[#191713] uppercase">Penafian Independen:</strong> Platform ini merupakan
              sarana simulasi belajar mandiri independen dan tidak terafiliasi secara resmi dengan Badan Kepegawaian Negara
              (BKN) maupun Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB). Nilai tryout adalah
              hasil simulasi dan tidak menjamin kelulusan pada seleksi resmi pemerintah.
            </p>
            <p>&copy; 2026 BedahSoal Platform · Ruang Bedah Ujian CBT. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
