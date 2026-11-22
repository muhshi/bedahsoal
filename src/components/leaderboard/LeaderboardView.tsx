'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import { LeaderboardRankedEntry } from '@/lib/leaderboard';
import { StampBadge } from '@/components/ui/StampBadge';

interface LeaderboardViewProps {
  tryoutId: string;
  tryoutTitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

interface LeaderboardResponse {
  tryout: { id: string; title: string; examType: string };
  totalParticipants: number;
  userStanding: { rank: number; entry: LeaderboardRankedEntry } | null;
  leaderboard: LeaderboardRankedEntry[];
}

export function LeaderboardView({
  tryoutId,
  tryoutTitle,
  isOpen = true,
  onClose,
}: LeaderboardViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isNamePublic, setIsNamePublic] = useState(false);
  const [privacyLoading, setPrivacyLoading] = useState(false);
  const [privacyMessage, setPrivacyMessage] = useState<string | null>(null);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  useEffect(() => {
    if (!tryoutId) return;

    let isMounted = true;
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/tryouts/${tryoutId}/leaderboard`);
        if (!res.ok) throw new Error('Gagal memuat data leaderboard');
        const json = (await res.json()) as LeaderboardResponse;
        if (isMounted) {
          setData(json);
          if (json.userStanding?.entry) {
            setIsNamePublic(json.userStanding.entry.isNamePublic);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Gagal memuat data papan peringkat'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => {
      isMounted = false;
    };
  }, [tryoutId]);

  const handleTogglePrivacy = async () => {
    try {
      setPrivacyLoading(true);
      setPrivacyError(null);
      const nextState = !isNamePublic;
      const res = await fetch('/api/user/privacy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isNamePublic: nextState }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || 'Gagal memperbarui preferensi privasi');
      }

      setIsNamePublic(nextState);
      setPrivacyMessage(
        nextState
          ? 'Nama lengkap Anda kini tampil di papan peringkat.'
          : 'Nama Anda kini disamarkan dengan inisial.'
      );
      setTimeout(() => setPrivacyMessage(null), 4000);
    } catch (err) {
      setPrivacyError(
        err instanceof Error ? err.message : 'Gagal memperbarui preferensi privasi'
      );
    } finally {
      setPrivacyLoading(false);
    }
  };

  if (!isOpen) return null;

  const top3 = data?.leaderboard.slice(0, 3) ?? [];
  const remaining = data?.leaderboard.slice(3) ?? [];

  const podiumStyles = [
    'border-red-stamp bg-paper-2',
    'border-ink bg-white',
    'border-ink bg-paper-3',
  ];
  const rankBadgeStyles = [
    'border-red-stamp bg-red-stamp text-paper',
    'border-ink bg-ink text-paper',
    'border-blue-ink bg-blue-ink text-paper',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-title"
      className="fixed inset-0 z-200 overflow-y-auto bg-ink/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center p-3 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        <div
          className="relative my-6 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-ink bg-paper shadow-paper-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="flex items-start justify-between gap-4 border-b border-line-strong bg-paper-2 px-5 py-5 sm:px-7">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StampBadge label="Peringkat Nasional" variant="red" rotate={-1} />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-3">
                  {data
                    ? `${data.totalParticipants} peserta terverifikasi`
                    : 'Memuat data peserta...'}
                </span>
              </div>
              <h2
                id="leaderboard-title"
                className="mt-3 truncate font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                {data?.tryout.title || tryoutTitle || 'Papan Peringkat Tryout'}
              </h2>
              <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink-2">
                Aturan pemecah seri: total skor &gt; TKP &gt; TIU &gt; TWK &gt; waktu selesai.
              </p>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup Papan Peringkat"
                className="flex h-10 w-10 flex-none items-center justify-center border border-ink bg-white text-ink hover:bg-ink hover:text-paper"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </header>

          {/* Body */}
          <div className="overflow-y-auto p-4 sm:p-6">
            {error && (
              <div className="mb-5 flex items-start gap-3 border border-red-stamp bg-red-stamp/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-none text-red-stamp" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-stamp">
                    Papan peringkat belum tersedia
                  </p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-2">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {data?.userStanding && (
              <section className="mb-6 border border-ink bg-white p-4 shadow-paper sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 flex-none items-center justify-center border-2 border-red-stamp bg-red-stamp font-serif text-2xl font-bold text-paper">
                      #{data.userStanding.rank}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-lg font-bold text-ink">Posisi Anda</span>
                        <StampBadge
                          label={data.userStanding.entry.isPassed ? 'Lolos' : 'Belum Lolos'}
                          variant={data.userStanding.entry.isPassed ? 'green' : 'amber'}
                          rotate={1}
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-ink-2">
                        <span>
                          Skor <b className="text-ink">{data.userStanding.entry.totalScore}</b>
                        </span>
                        <span>
                          Durasi <b className="text-ink">{data.userStanding.entry.durationFormatted}</b>
                        </span>
                        <span>
                          Dari <b className="text-ink">{data.totalParticipants}</b> peserta
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleTogglePrivacy}
                    disabled={privacyLoading}
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink bg-paper px-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-paper hover:bg-ink hover:text-paper disabled:opacity-50"
                  >
                    {isNamePublic ? (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    )}
                    {isNamePublic ? 'Nama Publik' : 'Nama Disamarkan'}
                  </button>
                </div>

                {privacyMessage && (
                  <p className="mt-3 border-l-2 border-green-stamp bg-green-stamp/5 px-3 py-2 font-mono text-[10px] text-green-stamp">
                    {privacyMessage}
                  </p>
                )}
                {privacyError && (
                  <p className="mt-3 border-l-2 border-red-stamp bg-red-stamp/5 px-3 py-2 font-mono text-[10px] text-red-stamp">
                    {privacyError}
                  </p>
                )}
              </section>
            )}

            {loading && (
              <div className="py-16 text-center">
                <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-red-stamp" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                  Menghitung peringkat resmi...
                </p>
              </div>
            )}

            {!loading && !error && data?.leaderboard.length === 0 && (
              <div className="py-14 text-center">
                <Trophy className="mx-auto mb-3 h-12 w-12 text-ink-3" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-ink">Belum Ada Peserta Selesai</h3>
                <p className="mx-auto mt-2 max-w-md font-mono text-[11px] leading-relaxed text-ink-2">
                  Jadilah peserta pertama yang menyelesaikan simulasi resmi untuk mencatatkan rekor
                  peringkat.
                </p>
              </div>
            )}

            {!loading && top3.length > 0 && (
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {top3.map((entry, idx) => (
                  <article
                    key={entry.sessionId}
                    className={`border p-4 shadow-paper ${podiumStyles[idx]}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-8 w-8 items-center justify-center border font-mono text-xs font-bold ${rankBadgeStyles[idx]}`}
                      >
                        {entry.rank}
                      </span>
                      <StampBadge
                        label={entry.isPassed ? 'Lolos' : 'Belum'}
                        variant={entry.isPassed ? 'green' : 'neutral'}
                        rotate={idx === 1 ? 2 : -2}
                      />
                    </div>

                    <h4 className="mt-4 truncate font-serif text-lg font-bold text-ink" title={entry.displayName}>
                      {entry.displayName}
                    </h4>
                    <p className="mt-1 font-serif text-3xl font-bold leading-none text-ink">
                      {entry.totalScore}
                      <span className="ml-1 font-mono text-[10px] font-normal uppercase tracking-wider text-ink-3">
                        poin
                      </span>
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-wider text-ink-2">
                      <span>TKP {entry.subtestScores?.['TKP'] ?? '-'}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {entry.durationFormatted}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && remaining.length > 0 && (
              <section className="border border-ink bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left font-mono text-[11px]">
                    <thead className="border-b border-ink bg-paper-2 text-[9px] uppercase tracking-[0.14em] text-ink-3">
                      <tr>
                        <th className="px-4 py-3 text-center">Rank</th>
                        <th className="px-4 py-3">Nama Peserta</th>
                        <th className="px-4 py-3 text-center">TWK/TIU/TKP</th>
                        <th className="px-4 py-3 text-center">Durasi</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Skor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {remaining.map((entry) => {
                        const isCurrentUser =
                          data?.userStanding?.entry.sessionId === entry.sessionId;
                        return (
                          <tr
                            key={entry.sessionId}
                            className={isCurrentUser ? 'bg-red-stamp/5' : 'hover:bg-paper'}
                          >
                            <td className="px-4 py-3 text-center font-bold text-ink">
                              #{entry.rank}
                            </td>
                            <td className="px-4 py-3">
                              <span className={isCurrentUser ? 'font-bold text-red-stamp' : 'text-ink'}>
                                {entry.displayName}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-ink-2">
                              {entry.subtestScores?.['TWK'] ?? '-'}/
                              {entry.subtestScores?.['TIU'] ?? '-'}/
                              {entry.subtestScores?.['TKP'] ?? '-'}
                            </td>
                            <td className="px-4 py-3 text-center text-ink-2">
                              {entry.durationFormatted}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {entry.isPassed ? (
                                <span className="inline-flex items-center gap-1 border border-green-stamp px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-green-stamp">
                                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                                  Lolos
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 border border-line-strong px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-3">
                                  <XCircle className="h-3 w-3" aria-hidden="true" />
                                  Belum
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-ink">
                              {entry.totalScore}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <p className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-ink-3">
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              Nama peserta disamarkan secara default sesuai prinsip privasi data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardView;
