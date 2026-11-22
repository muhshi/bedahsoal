'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Clock,
  Shield,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { LeaderboardRankedEntry } from '@/lib/leaderboard';

interface LeaderboardViewProps {
  tryoutId: string;
  tryoutTitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function LeaderboardView({
  tryoutId,
  tryoutTitle,
  isOpen = true,
  onClose,
}: LeaderboardViewProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    tryout: { id: string; title: string; examType: string };
    totalParticipants: number;
    userStanding: { rank: number; entry: LeaderboardRankedEntry } | null;
    leaderboard: LeaderboardRankedEntry[];
  } | null>(null);
  const [isNamePublic, setIsNamePublic] = useState(false);
  const [privacyLoading, setPrivacyLoading] = useState(false);
  const [privacyMessage, setPrivacyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!tryoutId) return;

    let isMounted = true;
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tryouts/${tryoutId}/leaderboard`);
        if (!res.ok) throw new Error('Gagal memuat data leaderboard');
        const json = await res.json();
        if (isMounted) {
          setData(json);
          if (json.userStanding?.entry) {
            setIsNamePublic(json.userStanding.entry.isNamePublic);
          }
        }
      } catch (err) {
        console.error('Error loading leaderboard:', err);
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
      const nextState = !isNamePublic;
      const res = await fetch('/api/user/privacy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isNamePublic: nextState }),
      });
      const result = await res.json();
      if (res.ok) {
        setIsNamePublic(nextState);
        setPrivacyMessage(
          nextState
            ? 'Nama lengkap Anda kini tampil di papan peringkat.'
            : 'Nama Anda kini disamarkan dengan inisial.'
        );
        setTimeout(() => setPrivacyMessage(null), 4000);
      }
    } catch (err) {
      console.error('Error updating privacy:', err);
    } finally {
      setPrivacyLoading(false);
    }
  };

  if (!isOpen) return null;

  const top3 = data?.leaderboard.slice(0, 3) || [];
  const remaining = data?.leaderboard.slice(3) || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className="min-h-full flex items-center justify-center p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        <div
          className="relative w-full max-w-4xl my-8 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-6 border-b border-indigo-950/40 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Tutup Papan Peringkat"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5" /> Peringkat Nasional
            </span>
            <span className="text-xs text-slate-400">
              {data?.totalParticipants ? `${data.totalParticipants} Peserta Terdaftar` : 'Memuat data...'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {data?.tryout.title || tryoutTitle || 'Papan Peringkat Tryout'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Menggunakan aturan pemecah seri resmi BKN: Total Skor &gt; TKP &gt; TIU &gt; TWK &gt; Waktu Selesai.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* User Rank Standing Banner */}
          {data?.userStanding && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                  #{data.userStanding.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Posisi Anda</span>
                    {data.userStanding.entry.isPassed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Lolos Passing Grade
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                        <XCircle className="w-3 h-3" /> Belum Lolos
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>
                      Total Skor: <b>{data.userStanding.entry.totalScore}</b>
                    </span>
                    <span>
                      Durasi: <b>{data.userStanding.entry.durationFormatted}</b>
                    </span>
                    <span>
                      Peringkat: <b>{data.userStanding.rank}</b> dari <b>{data.totalParticipants}</b> peserta
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy Toggle Button */}
              <button
                type="button"
                onClick={handleTogglePrivacy}
                disabled={privacyLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-200 bg-white text-indigo-700 text-xs font-semibold hover:bg-indigo-100/50 transition cursor-pointer shadow-xs disabled:opacity-60"
              >
                {isNamePublic ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isNamePublic ? 'Nama Lengkap (Publik)' : 'Nama Disamarkan (Privat)'}</span>
              </button>
            </div>
          )}

          {privacyMessage && (
            <div className="text-xs text-indigo-700 bg-indigo-100/60 px-4 py-2 rounded-xl animate-in fade-in">
              {privacyMessage}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm">Menghitung peringkat resmi nasional...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && data?.leaderboard.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Belum Ada Peserta Selesai</h3>
              <p className="text-xs text-slate-500 mt-1">
                Jadilah peserta pertama yang menyelesaikan simulasi resmi untuk mencatatkan rekor peringkat!
              </p>
            </div>
          )}

          {/* Podium Top 3 */}
          {!loading && top3.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {top3.map((entry, idx) => {
                const podiumColors = [
                  'bg-gradient-to-b from-amber-50 to-amber-100/50 border-amber-300 text-amber-900',
                  'bg-gradient-to-b from-slate-50 to-slate-100/50 border-slate-300 text-slate-900',
                  'bg-gradient-to-b from-orange-50 to-orange-100/50 border-orange-300 text-orange-900',
                ];
                const badgeColors = [
                  'bg-amber-500 text-white',
                  'bg-slate-400 text-white',
                  'bg-orange-500 text-white',
                ];

                return (
                  <div
                    key={entry.sessionId}
                    className={`p-4 rounded-2xl border ${podiumColors[idx]} flex flex-col justify-between relative shadow-xs`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-xs ${badgeColors[idx]}`}>
                        {entry.rank}
                      </span>
                      {entry.isPassed ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          LOLOS
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          TIDAK LOLOS
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-sm truncate" title={entry.displayName}>
                        {entry.displayName}
                      </h4>
                      <div className="text-2xl font-black mt-1">
                        {entry.totalScore} <span className="text-xs font-normal opacity-70">poin</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-black/5 text-[11px] flex justify-between items-center opacity-80">
                      <span>TKP: {entry.subtestScores?.['TKP'] || '-'}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {entry.durationFormatted}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full Ranking Table */}
          {!loading && remaining.length > 0 && (
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 w-12 text-center">Rank</th>
                      <th className="py-3 px-4">Nama Peserta</th>
                      <th className="py-3 px-4 text-center">Subtes (TWK/TIU/TKP)</th>
                      <th className="py-3 px-4 text-center">Durasi</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Total Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {remaining.map((entry) => (
                      <tr
                        key={entry.sessionId}
                        className={`hover:bg-slate-50/80 transition ${
                          data?.userStanding?.entry.sessionId === entry.sessionId ? 'bg-indigo-50/60 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-bold text-slate-600">
                          #{entry.rank}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{entry.displayName}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600">
                          {entry.subtestScores?.['TWK'] ?? '-'}/
                          {entry.subtestScores?.['TIU'] ?? '-'}/
                          {entry.subtestScores?.['TKP'] ?? '-'}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-500">
                          {entry.durationFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {entry.isPassed ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                              Lolos
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[10px]">
                              Belum
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-sm text-slate-900">
                          {entry.totalScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
