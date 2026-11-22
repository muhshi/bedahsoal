'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  CheckCircle2,
  QrCode,
  Building2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  Clock,
  ArrowRight,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { PackageData } from '@/components/catalog/CategorizedCatalog';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
  onPaymentSuccess?: (packageId: string) => void;
}

type CheckoutStep = 'SELECT_PAYMENT' | 'PROCESSING' | 'WAITING_FOR_PAYMENT' | 'SUCCESS' | 'ERROR';

interface InvoiceData {
  transactionId?: string;
  merchantOrderId: string;
  amount: number;
  paymentUrl?: string;
  vaNumber?: string;
  qrString?: string;
  expiredAt?: string;
}

const PAYMENT_METHODS = [
  {
    id: 'SP',
    name: 'QRIS (GoPay, OVO, DANA, BCA, ShopeePay)',
    category: 'QRIS',
    description: 'Scan QR instan dari semua e-wallet & mobile banking.',
    badge: 'Verifikasi Instan',
    isPopular: true,
  },
  {
    id: 'BC',
    name: 'BCA Virtual Account',
    category: 'VA',
    description: 'Transfer otomatis via BCA Mobile, KlikBCA, atau ATM.',
    badge: 'BCA',
    isPopular: false,
  },
  {
    id: 'M2',
    name: 'Mandiri Virtual Account',
    category: 'VA',
    description: 'Transfer via Livin\' by Mandiri atau ATM Mandiri.',
    badge: 'Mandiri',
    isPopular: false,
  },
  {
    id: 'BR',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'VA',
    description: 'Transfer via BRImo atau ATM BRI.',
    badge: 'BRI',
    isPopular: false,
  },
  {
    id: 'I1',
    name: 'BNI Virtual Account',
    category: 'VA',
    description: 'Transfer via BNI Mobile Banking atau ATM BNI.',
    badge: 'BNI',
    isPopular: false,
  },
];

export function CheckoutModal({
  isOpen,
  onClose,
  packageData,
  onPaymentSuccess,
}: CheckoutModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('SELECT_PAYMENT');
  const [selectedMethod, setSelectedMethod] = useState<string>('SP');
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(3);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stop polling helper
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // Clean up polling on unmount or when modal is closed
  useEffect(() => {
    if (!isOpen) {
      stopPolling();
    }
    return () => {
      stopPolling();
    };
  }, [isOpen, stopPolling]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && step !== 'PROCESSING') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, step]);

  // Status check action
  const checkStatus = useCallback(
    async (merchantOrderId: string) => {
      try {
        setIsCheckingStatus(true);
        const res = await fetch(`/api/payment/status/${merchantOrderId}`);
        if (!res.ok) {
          setIsCheckingStatus(false);
          return;
        }

        const data = await res.json();
        if (data.status === 'SUCCESS') {
          stopPolling();
          setStep('SUCCESS');
          if (packageData) {
            onPaymentSuccess?.(packageData.id);
          }
        } else if (data.status === 'FAILED' || data.status === 'EXPIRED') {
          stopPolling();
          setErrorMessage('Transaksi telah kedaluwarsa atau dibatalkan.');
          setStep('ERROR');
        }
      } catch (err) {
        console.error('Error polling status:', err);
      } finally {
        setIsCheckingStatus(false);
      }
    },
    [packageData, onPaymentSuccess, stopPolling]
  );

  // Polling every 3s when waiting for payment
  useEffect(() => {
    if (step === 'WAITING_FOR_PAYMENT' && invoice?.merchantOrderId) {
      const orderId = invoice.merchantOrderId;
      pollIntervalRef.current = setInterval(() => {
        checkStatus(orderId);
      }, 3000);

      return () => {
        stopPolling();
      };
    }
  }, [step, invoice?.merchantOrderId, checkStatus, stopPolling]);

  // Countdown timer on SUCCESS step before auto redirect
  useEffect(() => {
    if (step === 'SUCCESS') {
      const targetTryoutId = packageData?.tryouts[0]?.id;
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            if (targetTryoutId) {
              router.push(`/exam/${targetTryoutId}`);
            } else {
              router.push('/dashboard');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, packageData, onClose, router]);

  if (!isOpen || !packageData) return null;

  const finalPrice = packageData.promoPrice ?? packageData.price;
  const hasDiscount = packageData.promoPrice !== null && packageData.promoPrice < packageData.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - packageData.promoPrice! / packageData.price) * 100)
    : 0;

  // Initiate Payment
  const handleProceedPayment = async () => {
    setStep('PROCESSING');
    setErrorMessage(null);
    setIsUnauthorized(false);

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageData.id,
          paymentMethod: selectedMethod,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        setIsUnauthorized(true);
        setErrorMessage(data.error || 'Silakan login terlebih dahulu untuk melakukan pembelian paket.');
        setStep('SELECT_PAYMENT');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses pembuatan transaksi.');
      }

      // If package is free or 0, direct grant
      if (data.isFree) {
        setStep('SUCCESS');
        onPaymentSuccess?.(packageData.id);
        return;
      }

      setInvoice({
        transactionId: data.transactionId,
        merchantOrderId: data.merchantOrderId,
        amount: data.amount,
        paymentUrl: data.paymentUrl,
        vaNumber: data.vaNumber,
        qrString: data.qrString,
        expiredAt: data.expiredAt,
      });

      setStep('WAITING_FOR_PAYMENT');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
      setErrorMessage(message);
      setStep('ERROR');
    }
  };

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleStartExamNow = () => {
    onClose();
    const targetTryoutId = packageData.tryouts[0]?.id;
    if (targetTryoutId) {
      router.push(`/exam/${targetTryoutId}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 id="checkout-modal-title" className="text-base font-extrabold text-slate-900 leading-none">
                Checkout Pembelian Paket
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">
                Pembayaran Resmi Terverifikasi Duitku Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Modal"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Unauthorized Warning Banner */}
          {isUnauthorized && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold">Akses Memerlukan Akun</p>
                  <p className="mt-0.5 text-amber-700">{errorMessage}</p>
                </div>
              </div>
              <Link
                href="/api/auth/signin"
                className="block w-full py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer text-center"
              >
                Masuk / Daftar Akun Sekarang
              </Link>
            </div>
          )}

          {/* 2. Package Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white border border-blue-100/80 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                  {packageData.examType.replace('_', ' ')}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                  {packageData.title}
                </h4>
              </div>
              <div className="text-right shrink-0">
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through block font-medium">
                    Rp {packageData.price.toLocaleString('id-ID')}
                  </span>
                )}
                <span className="text-lg font-black text-blue-700">
                  Rp {finalPrice.toLocaleString('id-ID')}
                </span>
                {hasDiscount && (
                  <span className="block text-[10px] font-bold text-emerald-600">
                    Hemat {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-blue-100/60 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Masa Akses Selamanya
              </span>
              <span className="font-semibold text-slate-700">
                {packageData.tryouts.length} Simulasi Ujian Lengkap
              </span>
            </div>
          </div>

          {/* 3. STEP: SELECT_PAYMENT */}
          {step === 'SELECT_PAYMENT' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                  <span>Pilih Metode Pembayaran</span>
                  <span className="text-[10px] font-medium text-slate-400">(Otomatis Terverifikasi)</span>
                </label>

                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                            : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {method.category === 'QRIS' ? (
                              <QrCode className="w-5 h-5" />
                            ) : (
                              <Building2 className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                {method.name}
                              </span>
                              {method.isPopular && (
                                <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-700">
                                  {method.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {method.description}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security info */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transaksi dienkripsi 256-bit SSL dan diproses langsung secara resmi oleh Duitku.</span>
              </div>
            </div>
          )}

          {/* 4. STEP: PROCESSING */}
          {step === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Menghubungkan ke Gateway...</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Sedang menyiapkan tagihan dan kode QRIS/VA resmi untuk Anda.
                </p>
              </div>
            </div>
          )}

          {/* 5. STEP: WAITING_FOR_PAYMENT */}
          {step === 'WAITING_FOR_PAYMENT' && invoice && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Status Header Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    Menunggu Pembayaran
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Cek otomatis tiap 3 detik</span>
                </div>
              </div>

              {/* Order & Amount Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Nomor Transaksi (Order ID):</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-800">
                      {invoice.merchantOrderId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(invoice.merchantOrderId)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
                      title="Salin Order ID"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500">Total Pembayaran:</span>
                  <span className="text-base font-extrabold text-blue-700">
                    Rp {invoice.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* QRIS Display */}
              {invoice.qrString && (
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    <QrCode className="w-3.5 h-3.5 text-blue-600" />
                    <span>Scan QRIS di bawah ini</span>
                  </div>

                  <div className="p-3 bg-white border-2 border-slate-800 rounded-2xl shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                        invoice.qrString
                      )}`}
                      alt="Kode QRIS Duitku"
                      className="w-52 h-52 object-contain"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                    Buka GoPay, OVO, Dana, BCA Mobile, atau aplikasi bank apa pun, lalu arahkan kamera untuk memindai QR di atas.
                  </p>
                </div>
              )}

              {/* Virtual Account Display */}
              {invoice.vaNumber && (
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <span className="text-xs text-slate-500 block font-medium">
                    Nomor Rekening Virtual Account:
                  </span>
                  <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                    <span className="text-xl font-mono font-extrabold tracking-wider text-slate-900">
                      {invoice.vaNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(invoice.vaNumber!)}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin No. VA</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Gunakan menu Transfer &gt; Virtual Account pada ATM atau aplikasi mobile banking Anda dan masukkan nomor di atas.
                  </p>
                </div>
              )}

              {/* Manual check and external payment link */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => checkStatus(invoice.merchantOrderId)}
                  disabled={isCheckingStatus}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                  <span>{isCheckingStatus ? 'Memeriksa...' : 'Cek Status Sekarang'}</span>
                </button>

                {invoice.paymentUrl && (
                  <a
                    href={invoice.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm text-center"
                  >
                    <span>Buka Halaman Duitku</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 6. STEP: SUCCESS */}
          {step === 'SUCCESS' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center shadow">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-slate-900">
                  Pembayaran Berhasil Dikonfirmasi! 🎉
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Selamat! Paket <span className="font-bold text-slate-900">{packageData.title}</span> telah aktif secara permanen di akun Anda.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium w-full">
                <span>Mengalihkan otomatis ke simulasi dalam </span>
                <span className="font-extrabold text-emerald-900 text-sm">{redirectCountdown}s</span>...
              </div>

              <button
                onClick={handleStartExamNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Mulai Simulasi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 7. STEP: ERROR */}
          {step === 'ERROR' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Pembayaran Belum Berhasil</h4>
                <p className="text-xs text-rose-600 max-w-sm mx-auto">{errorMessage}</p>
              </div>
              <button
                onClick={() => setStep('SELECT_PAYMENT')}
                className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Coba Metode Lain
              </button>
            </div>
          )}
        </div>

        {/* Footer (Only on SELECT_PAYMENT) */}
        {step === 'SELECT_PAYMENT' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Total Pembayaran</span>
              <span className="text-lg font-black text-slate-900">
                Rp {finalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleProceedPayment}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-600/20 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Bayar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
