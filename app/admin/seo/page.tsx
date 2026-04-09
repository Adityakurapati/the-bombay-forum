'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SEOManagerPage() {
  const [activeTab, setActiveTab] = useState('All Pages');

  const tabs = ['All Pages', 'Articles', 'Category Pages', 'Profiles', 'Static Pages'];

  const pages = [
    { name: 'Homepage', url: 'thebombayforum.com/', type: 'Homepage', title: 'The Bombay Forum | Global Perspectives on India...', desc: 'Defining the narrative for the global Indian...', slug: '/home', score: 85, scoreColor: 'bg-green-500' },
    { name: 'The Founders', url: 'thebombayforum.com/founders', type: 'Category', title: 'The Founders - Stories of Visionaries...', desc: 'Behind the scenes with the world\'s most...', slug: '/the-founders', score: 72, scoreColor: 'bg-green-500' },
    { name: 'Nithin Kamath Profile', url: 'thebombayforum.com/profile/nithin-kamath', type: 'Profile', title: 'Nithin Kamath - Founder of Zerodha', desc: 'Missing meta description for Nithin Kamath...', slug: '/nithin-kamath', score: 65, scoreColor: 'bg-amber-500', descError: true },
    { name: 'Aryan Varma Profile', url: 'thebombayforum.com/profile/aryan-varma', type: 'Profile', title: 'Aryan Varma Profile | The Bombay Forum Archive...', desc: 'Profile view for Aryan Varma on TBF...', slug: '/aryan-varma', score: 58, scoreColor: 'bg-amber-500', titleError: true },
    { name: 'About TBF', url: 'thebombayforum.com/about', type: 'Static', title: 'About The Bombay Forum | Heritage & Future', desc: 'Learn more about our editorial mission and the...', slug: '/about-the-forum', score: 90, scoreColor: 'bg-green-500' },
  ];

  const keywords = [
    { kw: 'Indian Entrepreneurs', page: '/the-founders', rank: '#4', change: '↑ 2', changeColor: 'text-green-600', vol: '22.4k', diff: 'High', diffColor: 'text-orange-600' },
    { kw: 'Luxury Real Estate Mumbai', page: '/the-suite', rank: '#8', change: '↓ 1', changeColor: 'text-red-600', vol: '1.2k', diff: 'Low', diffColor: 'text-green-600' },
    { kw: 'Venture Capital India', page: '/wealth', rank: '#12', change: '↑ 5', changeColor: 'text-green-600', vol: '8.6k', diff: 'Med', diffColor: 'text-amber-600' },
    { kw: 'Nithin Kamath Interview', page: '/nithin-kamath', rank: '#2', change: '—', changeColor: 'text-on-surface-variant/40', vol: '4.2k', diff: 'Low', diffColor: 'text-green-600' },
  ];

  return (
    <div className="flex min-h-screen bg-surface font-body text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 text-white flex flex-col z-40" style={{ backgroundColor: '#0B1929' }}>
        <div className="h-20 flex items-center px-8">
          <Link href="/">
            <span className="font-headline text-2xl font-bold tracking-tighter">
              T<span className="text-primary-container">B</span>F
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-8">
          {[
            { icon: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', active: false },
            { icon: 'article', label: 'Content', href: '/admin/articles', active: false },
            { icon: 'travel_explore', label: 'SEO Manager', href: '/admin/seo', active: true },
            { icon: 'analytics', label: 'Analytics', href: '#', active: false },
            { icon: 'settings', label: 'Settings', href: '#', active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-3 transition-colors duration-200 ${item.active ? 'bg-primary-container text-white' : 'text-white/60 hover:text-white'}`}
            >
              <span className="material-symbols-outlined mr-3">{item.icon}</span>
              <span className="font-body text-xs font-bold tracking-widest uppercase">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-64 min-h-screen bg-surface-bright flex flex-col flex-1">
        {/* Header */}
        <header className="h-20 bg-white flex items-center justify-between px-12 sticky top-0 z-30" style={{ boxShadow: '0px 20px 40px rgba(15,28,44,0.06)' }}>
          <h1 className="font-headline text-3xl" style={{ color: '#11262B' }}>SEO Manager</h1>
          <button
            className="text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity font-label"
            style={{ backgroundColor: '#11262B' }}
          >
            Run SEO Audit
          </button>
        </header>

        <div className="px-12 py-10">
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Pages Indexed', value: '47', sub: 'Google Search Console', subClass: 'text-on-secondary-container' },
              { label: 'Avg. SEO Score', value: '73/100', sub: '↑ 8 pts this month', subClass: 'text-green-700' },
              { label: 'Organic Traffic', value: '12.4k', sub: '↑ 22% vs last month', subClass: 'text-green-700' },
              { label: 'Keywords Ranking', value: '284', sub: 'Top 10 positions', subClass: 'text-on-surface-variant' },
            ].map((card) => (
              <div key={card.label} className="bg-white p-6 border-l-4 border-primary" style={{ boxShadow: '0px 10px 20px rgba(15,28,44,0.03)' }}>
                <p className="text-[9px] font-bold text-on-surface-variant/60 tracking-[0.2em] uppercase mb-2 font-label">{card.label}</p>
                <h2 className="font-headline text-4xl text-on-surface mb-1">{card.value}</h2>
                <p className={`text-[9px] font-medium uppercase tracking-wider font-label ${card.subClass}`}>{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-outline-variant/20 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold px-8 py-4 border-b-2 transition-colors font-label ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/40 hover:text-on-surface'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Pages Table */}
          <div className="w-full bg-white mb-12" style={{ boxShadow: '0px 20px 40px rgba(15,28,44,0.04)' }}>
            <div className="grid grid-cols-[2fr_1fr_2fr_2fr_1.5fr_0.8fr_1fr] text-[9px] uppercase tracking-[0.25em] bg-surface-container font-bold px-4 py-3 font-label">
              <div>Page</div><div>Type</div><div>Meta Title</div><div>Meta Desc</div><div>Slug</div><div>Score</div><div className="text-right">Actions</div>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {pages.map((page, i) => (
                <div key={page.name} className={`grid grid-cols-[2fr_1fr_2fr_2fr_1.5fr_0.8fr_1fr] px-4 py-5 items-center transition-colors ${i % 2 === 1 ? 'bg-surface-container-low hover:bg-white' : 'hover:bg-surface-container-low'}`}>
                  <div>
                    <p className="font-headline text-base text-primary">{page.name}</p>
                    <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-tighter font-label">{page.url}</p>
                  </div>
                  <div><span className="bg-surface-variant text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest font-label">{page.type}</span></div>
                  <div className={`text-[11px] font-medium ${page.titleError ? 'text-error' : 'text-on-surface-variant'} font-body`}>{page.title}</div>
                  <div className={`text-[11px] font-medium ${page.descError ? 'text-error italic' : 'text-on-surface-variant'} font-body`}>{page.desc}</div>
                  <div className="text-[10px] font-bold text-accent-teal font-label">{page.slug}</div>
                  <div>
                    <div className={`w-7 h-7 ${page.scoreColor} rounded-full flex items-center justify-center text-white text-[10px] font-bold font-label`}>
                      {page.score}
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="text-accent-teal text-[9px] font-bold uppercase tracking-widest hover:underline font-label">Edit SEO</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Tracker */}
          <section className="mb-20">
            <h3 className="text-[10px] tracking-[0.4em] uppercase border-b border-outline-variant/30 pb-4 mb-8 font-bold text-on-surface font-label">
              Keyword Tracker
            </h3>
            <div className="grid grid-cols-6 text-[9px] uppercase tracking-[0.25em] bg-surface-container font-bold px-4 py-3 font-label">
              <div>Keyword</div><div>Target Page</div><div>Rank</div><div>Change</div><div>Volume</div><div>Difficulty</div>
            </div>
            <div className="bg-white divide-y divide-outline-variant/10" style={{ boxShadow: '0px 20px 40px rgba(15,28,44,0.04)' }}>
              {keywords.map((kw, i) => (
                <div key={kw.kw} className={`grid grid-cols-6 px-4 py-4 items-center ${i % 2 === 1 ? 'bg-surface-container-low' : ''}`}>
                  <div className="text-[11px] font-bold text-primary uppercase tracking-tight font-label">{kw.kw}</div>
                  <div className="text-[10px] text-accent-teal font-label">{kw.page}</div>
                  <div className="font-headline text-lg">{kw.rank}</div>
                  <div className={`font-bold text-[10px] font-label ${kw.changeColor}`}>{kw.change}</div>
                  <div className="text-[11px] font-bold font-label">{kw.vol}</div>
                  <div className={`text-[10px] uppercase font-bold font-label ${kw.diffColor}`}>{kw.diff}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-auto bg-surface-container-highest flex flex-col items-center py-12 px-12 space-y-6 w-full">
          <Link href="/">
            <div className="font-headline text-2xl font-bold tracking-tighter text-brand-navy">
              T<span className="text-primary-container">B</span>F{' '}
              <span className="text-xs uppercase tracking-[0.4em] font-body ml-4">Admin</span>
            </div>
          </Link>
          <div className="flex gap-12">
            {['Support', 'Documentation', 'Security'].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-[10px] font-body font-bold tracking-widest uppercase text-on-surface-variant/60 hover:text-primary hover:underline underline-offset-8"
              >
                {link}
              </Link>
            ))}
          </div>
          <p className="text-[9px] font-body uppercase tracking-[0.2em] text-on-surface-variant/40">
            © 2024 THE DIGITAL ATELIER. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </div>
  );
}
