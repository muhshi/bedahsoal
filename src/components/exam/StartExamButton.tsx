'use client';

import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';

interface StartExamButtonProps {
  tryoutId: string;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function StartExamButton({
  tryoutId,
  label = 'Mulai Kerjakan',
  className = '',
  icon,
}: StartExamButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartExam = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPending) return;

    try {
      setIsPending(true);
      setError(null);

      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tryoutId }),
      });

      const data = await res.json();
      if (!res.ok || !data.examUrl) {
        throw new Error(data.error || 'Sesi ujian tidak dapat dibuat.');
      }

      window.location.href = data.examUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyiapkan sesi ujian.');
      setIsPending(false);
    }
  };

  return (
    <span className="inline-flex flex-col items-stretch">
      <button
        type="button"
        onClick={handleStartExam}
        disabled={isPending}
        className={`inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 transition-all ${className}`}
      >
        {isPending ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Menyiapkan Ujian...</span>
          </>
        ) : (
          <>
            {icon}
            <span>{label}</span>
            {!icon && <ChevronRight className="w-4 h-4" />}
          </>
        )}
      </button>
      {error && (
        <span role="alert" className="mt-2 font-mono text-[10px] text-red-stamp">
          {error}
        </span>
      )}
    </span>
  );
}

export default StartExamButton;
