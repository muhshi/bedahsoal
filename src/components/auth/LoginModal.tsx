'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn('google', { callbackUrl: window.location.href });
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError('Gagal menghubungkan Google Auth. Silakan coba masuk sebagai tamu.');
      setLoading(false);
    }
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await signIn('guest-login', {
        name: guestName.trim() || 'Peserta BedahSoal',
        redirect: false,
      });

      if (res?.error) {
        setError('Gagal masuk sebagai tamu. Silakan coba kembali.');
        setLoading(false);
      } else {
        onClose();
        window.location.reload();
      }
    } catch (err: any) {
      console.error('Guest sign in error:', err);
      setError('Terjadi kendala jaringan saat masuk.');
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-200 overflow-y-auto bg-[#191713]/65 backdrop-blur-sm p-4 sm:p-6 flex min-h-screen items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[500px] my-auto bg-[#f3efe3] border border-[#191713] p-7 sm:p-8 shadow-[12px_12px_0px_rgba(25,23,19,0.32)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button [×] */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center font-mono text-xl text-[#4b463d] hover:text-[#191713] hover:bg-[#fbf8f0] border border-transparent hover:border-[#b9ac91] transition cursor-pointer"
          aria-label="Tutup dialog"
        >
          &times;
        </button>

        {/* Header Kicker & Title */}
        <div className="modal-kicker font-mono text-[9px] uppercase tracking-[0.18em] text-[#c4402a] font-bold">
          Akun Peserta
        </div>
        <h2
          id="login-modal-title"
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#191713] mt-1.5 leading-tight pr-6"
        >
          Masuk untuk menyimpan rapor.
        </h2>
        <p className="font-sans text-xs sm:text-[13px] text-[#4b463d] leading-relaxed mt-2">
          Rapor nilai, riwayat pengerjaan, dan analisis kelemahan kisi-kisi tersimpan otomatis pada akun Anda.
        </p>

        {/* Error Alert Banner */}
        {error && (
          <div className="mt-4 p-3 border-l-2 border-[#c4402a] bg-[#c4402a]/10 text-[#9c2f1e] font-mono text-xs leading-relaxed">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-5">
          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-3 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] text-[#191713] font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-[2px_2px_0px_#d2c8b2] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#191713]" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Lanjutkan dengan Google</span>
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d2c8b2]" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#7a7365]">
              atau coba langsung
            </span>
            <div className="h-px flex-1 bg-[#d2c8b2]" />
          </div>

          {/* Fast Guest Login Form */}
          <form onSubmit={handleGuestLogin} className="space-y-3">
            <div>
              <label
                htmlFor="guest-name-input"
                className="block font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#7a7365] mb-1 font-semibold"
              >
                Nama Panggilan / Peserta
              </label>
              <input
                id="guest-name-input"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Rian Pratama"
                disabled={loading}
                className="w-full border border-[#b9ac91] bg-[#fbf8f0] px-3.5 py-2.5 font-mono text-xs text-[#191713] placeholder:text-[#a09782] focus:border-[#191713] focus:outline-none transition disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#191713] text-[#f3efe3] font-mono text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4402a] transition-all shadow-[2px_2px_0px_#b9ac91] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Mulai sebagai Tamu (Mode Cepat)</span>
                  <span aria-hidden="true">&rarr;</span>
                </>
              )}
            </button>
          </form>

          <p className="font-mono text-[9px] text-[#7a7365] text-center pt-2 leading-relaxed">
            Dengan masuk, Anda menyetujui Ketentuan Layanan &amp; Kebijakan Privasi BedahSoal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
