'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate('APRIL 1, 2026');
  }, []);

  const tabs: { id: 'privacy' | 'terms' | 'cookies'; label: string }[] = [
    { id: 'privacy', label: 'PRIVACY POLICY' },
    { id: 'terms', label: 'TERMS OF SERVICE' },
    { id: 'cookies', label: 'COOKIE POLICY' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-surface-container-highest text-[10px] tracking-widest px-4 py-2 flex justify-between items-center border-b border-on-surface/5 uppercase font-bold font-label">
        <div className="flex items-center gap-2">
          <span className="text-primary">MUMBAI, MH</span>
          <span className="text-on-surface/40">•</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-sm">share</span>
          <span className="material-symbols-outlined text-sm">rss_feed</span>
        </div>
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-[100] text-white py-4 px-4 flex flex-col items-center gap-4"
        style={{ backgroundColor: '#0B1929', boxShadow: '0px 20px 40px rgba(15,28,44,0.06)' }}
      >
        <div className="flex items-center justify-center w-full">
          <Link href="/">
            <span className="text-3xl font-headline uppercase leading-none tracking-tighter text-white">
              T<span className="text-brand-red">B</span>F
            </span>
          </Link>
        </div>
        <nav className="w-full flex justify-between text-[9px] font-bold tracking-[0.2em] uppercase overflow-x-auto whitespace-nowrap py-1 font-label">
          <div className="flex gap-4 items-center">
            <Link href="/categories/founders" className="hover:text-primary transition-colors">THE FOUNDERS</Link>
            <span className="text-white/20">·</span>
            <Link href="/categories/creators" className="hover:text-primary transition-colors">CREATORS</Link>
            <span className="text-white/20">·</span>
            <Link href="/categories/wealth" className="hover:text-primary transition-colors">WEALTH</Link>
          </div>
          <div className="flex gap-4 items-center ml-4">
            <Link href="/categories/future" className="hover:text-primary transition-colors">FUTURE</Link>
            <span className="text-white/20">·</span>
            <Link href="/categories/suite" className="hover:text-primary transition-colors">THE SUITE</Link>
            <span className="text-white/20">·</span>
            <Link href="/categories/bombay" className="hover:text-primary transition-colors">BOMBAY</Link>
            <span className="material-symbols-outlined text-[12px]">dark_mode</span>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 px-6 border-b border-white/5" style={{ backgroundColor: '#0B1929' }}>
        <div className="max-w-screen-md mx-auto">
          <span className="font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block font-label" style={{ color: '#008080' }}>
            LEGAL
          </span>
          <h1 className="text-5xl md:text-7xl font-headline text-white tracking-tight mb-6 leading-[0.9]">
            Our Policies &amp; Commitments
          </h1>
          <p className="text-white/60 font-body text-base max-w-md leading-relaxed mb-8">
            Operating with absolute transparency. This document outlines our legal framework and how
            we protect the integrity of the forum and its contributors.
          </p>
          <div className="text-white/40 text-[10px] tracking-widest uppercase font-bold font-label">
            LAST UPDATED: {date}
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <nav className="sticky top-[100px] z-50 bg-white/70 backdrop-blur-xl border-b border-on-surface/5 overflow-x-auto">
        <div className="flex items-center px-6 py-4 gap-8 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase font-label">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-all pb-4 -mb-4 border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-on-surface/40 border-transparent hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-16 space-y-24 max-w-screen-md mx-auto" style={{ backgroundColor: '#fafaf5' }}>
        {/* Privacy */}
        <section className="scroll-mt-40" id="privacy">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="font-headline text-3xl text-primary leading-none">01</span>
            <h2 className="font-headline text-4xl tracking-tight text-on-surface">Privacy Policy</h2>
          </div>
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface font-label">Information We Collect</h3>
              <p className="text-base text-on-surface-variant leading-relaxed font-body">
                We gather personal information essential for editorial delivery, including identifier
                data, contact details, and professional background when submitted via our elite
                contributor program.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface font-label">Core Clauses</h3>
              <ul className="space-y-4">
                {[
                  { key: 'How We Use', val: 'For personalization of wealth insights and exclusive platform maintenance.' },
                  { key: 'Sharing', val: 'Data is never sold. Limited sharing only with vetted technological partners.' },
                  { key: 'Retention', val: 'Information is held for the duration of active membership + 24 months.' },
                  { key: 'Rights', val: 'Members maintain full access, rectification, and erasure rights over their data profile.' },
                ].map((item) => (
                  <li key={item.key} className="flex gap-3 text-base text-on-surface-variant font-body">
                    <span className="font-bold" style={{ color: '#008080' }}>—</span>
                    <span><strong>{item.key}:</strong> {item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8 grid grid-cols-2 gap-6 text-sm text-on-surface-variant">
              {[
                { label: 'Security', text: 'Tier 4 data encryption across all archival servers.' },
                { label: 'Children', text: 'Platform access restricted to individuals 18+.' },
              ].map((item) => (
                <div key={item.label} className="pl-4 border-l-2" style={{ borderColor: '#008080' }}>
                  <span className="block font-bold uppercase text-[9px] mb-2 tracking-widest font-label">{item.label}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="scroll-mt-40" id="terms">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="font-headline text-3xl text-primary leading-none">02</span>
            <h2 className="font-headline text-4xl tracking-tight text-on-surface">Terms of Service</h2>
          </div>
          <div className="space-y-12">
            <p className="text-lg font-headline italic text-on-surface-variant border-l-4 border-tertiary-fixed-dim pl-6 py-2">
              By accessing The Bombay Forum, you enter into a binding agreement to adhere to our high
              standards of discourse and intellectual property respect.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Acceptance & Use', body: 'Use of the TBF platform constitutes total acceptance of these terms. Usage is restricted to individual, non-commercial editorial consumption unless explicitly licensed.' },
                { title: 'Intellectual Property', body: 'All "The Bombay Forum" mastheads, layouts, and curated photography are protected by international IP law. Any unauthorized reproduction results in immediate legal cessation.' },
                { title: 'Sponsored Content', body: 'All paid partnerships are explicitly labeled as "THE SUITE | PARTNER." Readers acknowledge that TBF receives compensation for such features.' },
              ].map((item) => (
                <div key={item.title} className="border-b border-on-surface/5 pb-6">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-3 font-label">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-body">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-high p-8">
              <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-4 font-label">Legal Disclaimers</h3>
              <p className="text-xs text-on-surface-variant leading-loose uppercase tracking-wide font-label">
                THE BOMBAY FORUM PROVIDES CONTENT "AS IS." NO FINANCIAL ADVICE IS INTENDED OR
                IMPLIED. WE ARE NOT LIABLE FOR ACTIONS TAKEN BASED ON EDITORIAL OPINIONS EXPRESSED
                BY OUR CREATORS.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="scroll-mt-40" id="cookies">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="font-headline text-3xl text-primary leading-none">03</span>
            <h2 className="font-headline text-4xl tracking-tight text-on-surface">Cookie Policy</h2>
          </div>
          <div className="space-y-12">
            <p className="text-base text-on-surface-variant leading-relaxed font-body">
              We utilize small data files ("cookies") to ensure our boutique digital experience
              remains seamless across your high-end devices.
            </p>
            <div className="overflow-x-auto border border-on-surface/5">
              <table className="w-full text-left text-xs uppercase tracking-widest">
                <thead className="bg-surface-container text-on-surface">
                  <tr>
                    <th className="px-4 py-3 font-bold font-label">Category</th>
                    <th className="px-4 py-3 font-bold font-label">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/5">
                  {[
                    { cat: 'Essential', use: 'Core login & security functions.' },
                    { cat: 'Analytics', use: 'Anonymized traffic tracking for TBF insights.' },
                    { cat: 'Preference', use: 'Remembering your display settings & night mode.' },
                  ].map((row) => (
                    <tr key={row.cat}>
                      <td className="px-4 py-4 font-bold text-primary font-label">{row.cat}</td>
                      <td className="px-4 py-4 text-on-surface-variant font-body">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface font-label">Managing Your Cache</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Users may opt-out of non-essential cookies via their browser settings. Note that
                disabling essential cookies may degrade the visual fidelity of the forum.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Contact CTA */}
      <div
        className="py-12 px-6 flex flex-col items-center text-center gap-6"
        style={{ backgroundColor: '#0B1929' }}
      >
        <h4 className="text-white font-headline text-2xl tracking-tight">
          Questions about our policies?
        </h4>
        <a
          href="mailto:legal@bombayforum.com"
          className="bg-primary text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-primary transition-all duration-300 font-label"
        >
          Contact Us
        </a>
      </div>

      {/* Footer */}
      <footer className="text-white pt-20 pb-10 px-8" style={{ backgroundColor: '#11262B' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <Link href="/">
                <h2 className="text-3xl font-headline uppercase tracking-widest">
                  T<span className="text-primary">B</span>F
                </h2>
              </Link>
              <p className="text-white/40 text-xs font-body max-w-xs leading-loose">
                The definitive digital authority on Bombay's creators, wealth, and the future of
                global culture.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-label">THE ARCHIVE</h5>
              <ul className="space-y-2 text-xs font-label">
                <li><Link href="/categories/founders" className="hover:text-primary transition-colors">THE FOUNDERS</Link></li>
                <li><Link href="/categories/wealth" className="hover:text-primary transition-colors">WEALTH REPORTS</Link></li>
                <li><Link href="/categories/creators" className="hover:text-primary transition-colors">CREATOR SUITE</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-label">FORUM INFO</h5>
              <ul className="space-y-2 text-xs font-label">
                <li><Link href="/about" className="hover:text-primary transition-colors">ABOUT</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">EDITORIAL BOARD</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">CONTACT</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex justify-between items-center flex-col gap-6 md:flex-row">
            <span className="text-[9px] font-bold text-white/20 tracking-[0.3em] uppercase font-label">
              © 2026 THE BOMBAY FORUM
            </span>
            <div className="flex gap-4 text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase font-label">
              <span>IG</span>
              <span>TW</span>
              <span>LI</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
