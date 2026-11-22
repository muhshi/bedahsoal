'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, BookOpen, ChevronDown, Menu, X } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { StartExamButton } from '@/components/exam/StartExamButton';

export interface UserNavProps {
  /** If true, only renders the auth button / user dropdown without the outer header */
  compact?: boolean;
  className?: string;
  activeTab?: 'home' | 'catalog' | 'dashboard' | 'exam';
}

/**
 * Editorial Paper Atelier Navigation & User Profile Component
 *
 * Adopts the authentic "Ruang Bedah Ujian" editorial identity:
 * - [B] serif brand mark with architectural inner border
 * - "Ruang Bedah Ujian" monospace kicker
 * - Paper background (bg-[#f3efe3]) and ink border (border-b border-[#d2c8b2])
 * - Monospace brutalist styled action buttons with hard drop shadows
 */
export function UserNav({
  compact = false,
  className = '',
  activeTab = 'home',
}: UserNavProps) {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auth Action Component (Button or User Profile Dropdown)
  const renderAuthAction = () => {
    if (status === 'loading') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-[#d2c8b2] bg-[#eae3d2] animate-pulse" />
        </div>
      );
    }

    if (!session?.user) {
      return (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 h-9 px-3.5 sm:px-4 border border-[#191713] bg-transparent text-[#191713] font-mono text-[10.5px] font-semibold tracking-[0.1em] uppercase hover:bg-[#191713] hover:text-[#f3efe3] transition-all shadow-[2px_2px_0px_#d2c8b2] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
        >
          <span>Masuk</span>
        </button>
      );
    }

    const user = session.user;
    const initials = user.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase()
      : 'BS';

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 p-1 pr-2.5 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] transition-all shadow-[2px_2px_0px_#d2c8b2] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
        >
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || 'Peserta'}
              className="w-7 h-7 object-cover border border-[#191713]"
            />
          ) : (
            <div className="w-7 h-7 bg-[#191713] text-[#f3efe3] flex items-center justify-center font-mono font-bold text-xs">
              {initials}
            </div>
          )}
          <span className="font-mono text-xs font-semibold text-[#191713] max-w-[110px] truncate hidden sm:inline">
            {user.name || 'Peserta'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#4b463d]" />
        </button>

        {/* Brutalist Paper Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#fbf8f0] border border-[#191713] shadow-[8px_8px_0px_#ded4bf] py-2 z-70">
            <div className="px-4 py-3 border-b border-[#d2c8b2] bg-[#f3efe3]">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#7a7365]">
                Peserta Terdaftar
              </p>
              <p className="font-serif text-sm font-bold text-[#191713] truncate mt-0.5">
                {user.name || 'Peserta'}
              </p>
              <p className="font-mono text-[10px] text-[#4b463d] truncate mt-0.5">
                {user.email}
              </p>
            </div>

            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-mono tracking-wide text-[#191713] hover:bg-[#eae3d2] transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#4b463d]" />
                <span>Rapor &amp; Riwayat Ujian</span>
              </Link>
              <Link
                href="/#katalog"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-mono tracking-wide text-[#191713] hover:bg-[#eae3d2] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#4b463d]" />
                <span>Katalog Tryout</span>
              </Link>
            </div>

            <div className="border-t border-[#d2c8b2] pt-1 mt-1">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-mono tracking-wide text-[#c4402a] hover:bg-[#c4402a]/10 transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-[#c4402a]" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // If in compact mode, return only the user profile button
  if (compact) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderAuthAction()}
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  // Full Editorial Navbar
  return (
    <>
      <header
        className={`sticky top-0 z-60 w-full bg-[#f3efe3]/95 backdrop-blur-md border-b border-[#d2c8b2] transition-all ${className}`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Link with [B] Serif Brand Mark & 'Ruang Bedah Ujian' Kicker */}
        <Link href="/" className="inline-flex items-center gap-3 min-w-0 group" aria-label="BedahSoal, Beranda">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex-none bg-[#191713] text-[#f3efe3] flex items-center justify-center font-serif text-lg font-bold relative border border-[#191713] shadow-[2px_2px_0px_#b9ac91] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
            <span className="relative z-10 font-serif font-bold tracking-tighter">[B]</span>
            <span className="absolute inset-[3px] border border-[#f3efe3]/30 pointer-events-none" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191713] leading-none">
              Bedah<em className="text-[#c4402a] not-italic font-normal">Soal</em>
            </div>
            <div className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] text-[#7a7365] mt-1 whitespace-nowrap">
              Ruang Bedah Ujian
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase text-[#4b463d]">
          <Link
            href="/"
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === 'home'
                ? 'border-b-[#c4402a] text-[#191713] font-semibold'
                : 'border-b-transparent hover:text-[#191713]'
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/#katalog"
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === 'catalog'
                ? 'border-b-[#c4402a] text-[#191713] font-semibold'
                : 'border-b-transparent hover:text-[#191713]'
            }`}
          >
            Katalog
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-b-[#c4402a] text-[#191713] font-semibold'
                : 'border-b-transparent hover:text-[#191713]'
            }`}
          >
            Rapor
          </Link>
          <Link
            href="/#keunggulan"
            className="px-3 py-2 border-b-2 border-b-transparent hover:text-[#191713] transition-colors"
          >
            Prinsip Ujian
          </Link>
        </nav>

        {/* Action Buttons & Auth */}
        <div className="flex items-center gap-2.5">
          <StartExamButton
            tryoutId="tryout-tiu-60"
            label="Mulai"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-[10.5px] font-semibold tracking-[0.1em] uppercase hover:bg-[#c4402a] hover:border-[#c4402a] transition-all shadow-[2px_2px_0px_#d2c8b2] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            icon={<span aria-hidden="true">&rarr;</span>}
          />

          {renderAuthAction()}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-[#b9ac91] bg-[#fbf8f0] text-[#191713] hover:bg-[#eae3d2] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#d2c8b2] bg-[#f3efe3] px-4 py-3 space-y-1 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 px-3 border-b border-[#d2c8b2]/60 text-[#191713] hover:text-[#c4402a]"
          >
            Beranda
          </Link>
          <Link
            href="/#katalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 px-3 border-b border-[#d2c8b2]/60 text-[#4b463d] hover:text-[#191713]"
          >
            Katalog Paket
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 px-3 border-b border-[#d2c8b2]/60 text-[#4b463d] hover:text-[#191713]"
          >
            Rapor &amp; Riwayat
          </Link>
          <div className="px-3 py-2.5 text-[#c4402a] font-bold">
            <StartExamButton
              tryoutId="tryout-tiu-60"
              label="Ruang Ujian Demo →"
              className="w-full justify-between font-bold"
            />
          </div>
          {!session?.user ? (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full text-left py-2.5 px-3 border-t border-[#d2c8b2] text-[#191713] font-bold hover:text-[#c4402a] cursor-pointer flex items-center justify-between"
            >
              <span>Masuk ke Akun</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                signOut({ callbackUrl: '/' });
              }}
              className="w-full text-left py-2.5 px-3 border-t border-[#d2c8b2] text-[#c4402a] font-bold cursor-pointer flex items-center justify-between"
            >
              <span>Keluar Akun ({session.user.name || 'Peserta'})</span>
              <LogOut className="w-3.5 h-3.5 text-[#c4402a]" />
            </button>
          )}
        </div>
      )}
    </header>
    <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>
);
}

export { UserNav as Navbar };
