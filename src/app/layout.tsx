import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BedahSoal - Platform CBT Simulasi SKD CPNS, LPDP, Olimpiade & UTBK",
  description:
    "Platform latihan soal & simulasi ujian CBT akurat, responsif tanpa reload, zero-leakage, dan offline-resilient dengan analisis kelemahan materi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body className={`${plusJakarta.className} min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
