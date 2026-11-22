'use client';

import React, { useState } from 'react';
import { ChevronRight, Loader2, Play } from 'lucide-react';

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

  const handleStartExam = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPending) return;

    try {
      setIsPending(true);
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tryoutId }),
      });

      const data = await res.json();
      if (res.ok && data.examUrl) {
        window.location.href = data.examUrl;
      } else {
        // Fallback to direct navigation if server returned error
        window.location.href = `/exam/session-demo-tiu`;
      }
    } catch {
      window.location.href = `/exam/session-demo-tiu`;
    }
  };

  return (
    <button
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
  );
}

export default StartExamButton;
