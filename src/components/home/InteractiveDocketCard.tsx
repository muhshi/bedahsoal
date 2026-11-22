'use client';

import React, { useState, useEffect } from 'react';
import { StampBadge } from '@/components/ui/StampBadge';

interface Option {
  key: string;
  text: string;
  isCorrect: boolean;
}

const SAMPLE_OPTIONS: Option[] = [
  { key: 'A', text: 'Pertumbuhan', isCorrect: false },
  { key: 'B', text: 'Penggabungan', isCorrect: false },
  { key: 'C', text: 'Pemulihan', isCorrect: false },
  { key: 'D', text: 'Pelepasan', isCorrect: false },
  { key: 'E', text: 'Kemerosotan', isCorrect: true },
];

export function InteractiveDocketCard() {
  // Initial timer 01:39:42 in seconds = 1*3600 + 39*60 + 42 = 5982s
  const [secondsRemaining, setSecondsRemaining] = useState(5982);
  const [selectedOption, setSelectedOption] = useState<string>('E');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // 20-question status mockup
  const cells = [
    { num: '01', status: 'done' },
    { num: '02', status: 'done' },
    { num: '03', status: 'done' },
    { num: '04', status: 'doubt' },
    { num: '05', status: 'done' },
    { num: '06', status: 'done' },
    { num: '07', status: 'active' },
    { num: '08', status: 'done' },
    { num: '09', status: 'done' },
    { num: '10', status: 'doubt' },
    { num: '11', status: 'done' },
    { num: '12', status: 'done' },
    { num: '13', status: 'done' },
    { num: '14', status: 'empty' },
    { num: '15', status: 'done' },
    { num: '16', status: 'done' },
    { num: '17', status: 'done' },
    { num: '18', status: 'empty' },
    { num: '19', status: 'done' },
    { num: '20', status: 'done' },
  ];

  return (
    <div className="relative group/docket">
      {/* Decorative architectural border backing */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 border border-[#b9ac91] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Docket Card */}
      <div className="relative z-10 bg-[#fbf8f0] border border-[#191713] p-5 sm:p-7 shadow-[10px_10px_0px_#ded4bf] sm:shadow-[14px_14px_0px_#ded4bf] -rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Retro Stamp Badge */}
        <div className="absolute -top-3.5 right-4 z-20">
          <StampBadge label="LULUS PG" variant="green" rotate={-6} />
        </div>

        {/* Docket Top Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-dashed border-[#b9ac91]">
          <div>
            <div className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-[#7a7365]">
              Lembar Ujian / Sesi 04
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713] mt-1">
              SKD CPNS 2026
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365]">Sisa Waktu</div>
            <div
              className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#191713] tabular-nums"
              aria-label="Sisa waktu ujian"
            >
              {formatTimer(secondsRemaining)}
            </div>
          </div>
        </div>

        {/* 20-cell quick palette grid */}
        <div className="grid grid-cols-10 gap-1 sm:gap-1.5 my-4" aria-label="Palette nomor soal">
          {cells.map((cell) => {
            let style = 'bg-transparent border-[#b9ac91] text-[#7a7365]';
            if (cell.status === 'done') {
              style = 'bg-[#191713] border-[#191713] text-[#fbf8f0]';
            } else if (cell.status === 'doubt') {
              style = 'bg-[#b67a18] border-[#b67a18] text-[#191713] font-bold';
            } else if (cell.status === 'active') {
              style = 'border-2 border-[#c4402a] text-[#c4402a] font-bold bg-[#c4402a]/10';
            }

            return (
              <span
                key={cell.num}
                className={`aspect-square flex items-center justify-center border font-mono text-[10px] select-none ${style}`}
              >
                {cell.num}
              </span>
            );
          })}
        </div>

        {/* Sample Real Question Preview & Interactive Options */}
        <div className="bg-[#f3efe3] border border-[#d2c8b2] p-4 sm:p-5 my-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-[#c4402a] bg-[#c4402a]/10 px-2 py-0.5 border border-[#c4402a]/40">
              TIU · Analogi Kata
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#7a7365]">
              Butir 07 / 110
            </span>
          </div>

          <p className="font-serif text-base sm:text-lg font-bold text-[#191713] tracking-tight leading-snug mt-2">
            KULMINASI : PUNCAK = DEGRADASI : ...
          </p>
          <p className="font-sans text-xs text-[#4b463d] mt-1 leading-relaxed">
            Hubungan antar kata mengikuti pola makna yang sama. Pilih pasangan yang paling sepadan.
          </p>

          {/* Interactive Choice Options */}
          <div className="mt-3.5 space-y-2">
            {SAMPLE_OPTIONS.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedOption(opt.key)}
                  className={`w-full flex items-center gap-3 p-2 sm:p-2.5 text-left border transition-all text-xs cursor-pointer ${
                    isSelected
                      ? 'border-[#191713] bg-[#191713] text-[#fbf8f0] shadow-[2px_2px_0px_#7a7365]'
                      : 'border-[#d2c8b2] bg-[#fbf8f0] text-[#191713] hover:border-[#191713] hover:bg-[#eae3d2]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 flex-none flex items-center justify-center font-mono text-[11px] font-bold border ${
                      isSelected
                        ? 'border-[#fbf8f0] bg-[#c4402a] text-[#fbf8f0]'
                        : 'border-[#b9ac91] bg-[#f3efe3] text-[#191713]'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="font-sans font-medium flex-1">{opt.text}</span>
                  {isSelected && opt.isCorrect && (
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#2f5a44] bg-[#2f5a44]/20 border border-[#2f5a44] px-1.5 py-0.5 ml-auto">
                      KUNCI BENAR
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback note when selected */}
          {selectedOption && (
            <div className="mt-3 pt-2.5 border-t border-[#d2c8b2] text-[11.5px] font-sans text-[#4b463d] flex items-start gap-2">
              <span className="text-[#c4402a] font-mono font-bold">Bedah:</span>
              <span>
                {selectedOption === 'E'
                  ? 'Tepat. Kulminasi bersinonim dengan puncak, sementara degradasi bersinonim dengan kemerosotan.'
                  : 'Kurang tepat. Kulminasi = puncak, maka degradasi = kemerosotan (Pilihan E).'}
              </span>
            </div>
          )}
        </div>

        {/* Docket Stats 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#d2c8b2] border border-[#d2c8b2]">
          <div className="bg-[#fbf8f0] p-2.5 sm:p-3">
            <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-[#7a7365]">
              Terjawab
            </span>
            <strong className="block font-serif text-xl sm:text-2xl font-bold text-[#191713] leading-none mt-1">
              27
            </strong>
          </div>
          <div className="bg-[#fbf8f0] p-2.5 sm:p-3">
            <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-[#7a7365]">
              Ragu-ragu
            </span>
            <strong className="block font-serif text-xl sm:text-2xl font-bold text-[#b67a18] leading-none mt-1">
              04
            </strong>
          </div>
          <div className="bg-[#fbf8f0] p-2.5 sm:p-3">
            <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-[#7a7365]">
              Skor Sementara
            </span>
            <strong className="block font-serif text-xl sm:text-2xl font-bold text-[#191713] leading-none mt-1">
              412
            </strong>
          </div>
          <div className="bg-[#fbf8f0] p-2.5 sm:p-3">
            <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-[#7a7365]">
              Passing Grade
            </span>
            <strong className="block font-serif text-xl sm:text-2xl font-bold text-[#2f5a44] leading-none mt-1">
              311
            </strong>
          </div>
        </div>

        {/* Docket Foot Note */}
        <div className="mt-3 pt-2.5 border-t border-[#d2c8b2] font-mono text-[9px] uppercase tracking-[0.08em] text-[#7a7365] flex items-center justify-between">
          <span>Tie-breaker resmi BKN: TKP &rarr; TIU &rarr; TWK</span>
          <span className="font-semibold text-[#191713] hidden sm:inline">Engine CBT v2</span>
        </div>
      </div>
    </div>
  );
}
