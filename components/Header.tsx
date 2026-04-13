'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

const NAV_LEFT = [
  { label: 'The Founders', href: '/categories/founders' },
  { label: 'Creators', href: '/categories/creators' },
  { label: 'Wealth', href: '/categories/wealth' },
];

const NAV_RIGHT = [
  { label: 'Future', href: '/categories/future' },
  { label: 'The Suite', href: '/categories/suite' },
  { label: 'Bombay', href: '/categories/bombay' },
];

const ALL_NAV = [...NAV_LEFT, ...NAV_RIGHT];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── STICKY MAIN HEADER ── */}
      <header
        className="text-white sticky top-0 z-50 flex justify-between items-center px-12 py-4 w-full"
        style={{ backgroundColor: '#0B1929' }}
      >
        {/* Left nav — desktop only */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase font-label">
          {NAV_LEFT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-accent-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger — visible on small screens */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden text-white hover:text-accent-teal transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Centered Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center h-full"
        >
          <Image
            src="/logo.png"
            alt="The Bombay Forum"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>


        {/* Right nav + dark-mode icon */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase font-label">
            {NAV_RIGHT.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-accent-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label="Toggle dark mode"
            className="text-white hover:text-accent-teal transition-transform active:scale-90"
          >
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* Drawer panel */}
          <div
            className="w-72 h-full flex flex-col py-24 px-8 space-y-8"
            style={{ backgroundColor: '#0B1929' }}
            onClick={(e) => e.stopPropagation()}
          >
            {ALL_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-headline text-2xl text-white hover:text-accent-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Scrim */}
          <div className="flex-1 bg-black/50" />
        </div>
      )}

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav
        className="fixed bottom-0 w-full flex justify-around items-center px-4 lg:hidden z-50 border-t border-outline-variant/20"
        style={{
          backgroundColor: '#fafaf5',
          paddingTop: '0.5rem',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
          boxShadow: '0px -4px 20px rgba(17,38,43,0.06)',
        }}
      >
        {[
          { icon: 'home', label: 'Home', href: '/' },
          { icon: 'article', label: 'Stories', href: '/categories/founders' },
          { icon: 'auto_stories', label: 'Future', href: '/categories/future' },
          { icon: 'info', label: 'About', href: '/about' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-0.5 text-on-surface hover:text-accent-teal transition-colors py-1"
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
