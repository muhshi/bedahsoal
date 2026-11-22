import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/auth/SessionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
    <html
      lang="id"
      className={`h-full scroll-smooth ${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className={`${manrope.className} min-h-full flex flex-col bg-[var(--paper)] text-[var(--ink)] antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
