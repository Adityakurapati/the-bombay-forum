'use client';

import Link from 'next/link';
import { useState } from 'react';

const STATS = [
  { label: 'Total Articles', value: '1,284', detail: '+12% this month', detailColor: '#9e001f', icon: 'trending_up', accent: '#9e001f' },
  { label: 'Active Spotlights', value: '24', detail: 'High engagement', detailColor: '#0f1c2c', icon: 'visibility', accent: '#0f1c2c' },
  { label: 'Subscribers', value: '8.4k', detail: '+340 weekly', detailColor: '#654700', icon: 'person_add', accent: '#f7bd48' },
  { label: "Month's Views", value: '142k', detail: 'Consistent growth', detailColor: '#525f72', icon: 'monitoring', accent: '#525f72' },
];

const BAR_DATA = [
  { label: 'Culture', viewsPct: 75, clicksPct: 50 },
  { label: 'Business', viewsPct: 88, clicksPct: 63 },
  { label: 'Style', viewsPct: 50, clicksPct: 31 },
  { label: 'Interviews', viewsPct: 100, clicksPct: 75 },
  { label: 'Living', viewsPct: 63, clicksPct: 38 },
];

const BOARD = [
  {
    name: 'Rohan Mehta', role: 'Executive Editor',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg_63SZGTetMf52gWtourNbDl0T2g_uBiM9Us4qwoZza_MlyvaotpQF8Wa_MoWpvUd3w16nb3cMbqzYbCtP2hZjNryVY1o9p56gDX2BURjU-mErz06UXaYDO5sHbqkO-8ektfE7lKEOvxwhSjqUoKwveW90EL3PbaoZo6XYMQ12OWLBhyKjbSRxtAF2PtimsMLDnaJw6Lm2UT-Z7BTw4wWS9Bx2QPDlJbExtVZC2AprsaI9gI0ui08wIYaXJUXep0BMOiXx6VEAqc-',
  },
  {
    name: 'Priya Sharma', role: 'Fashion Director',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpvrs0KaIKH330Da8avtB1EikGFXkGF4Au9zIthevsA3OE0v0whGX1cCLwj2fydkw7viPuDHkfN2CcecbubBepxvTk7VDbg69bjC8YkvNZU5sbvm6aKqxc3e1THJCiyg7AzQEmt7osd7PUW0LkqIzA-HD5t1hsKLKRZKHwAoaLvFV8_zpXOiRc-UfQFIBKVyNy8GC4Qy22J9vnJxtIuZqY7zJcEmno6EUPdyvt_bh5Vr00aqW5uVzfD8mRQ3GX2l5wjsxxGznKM8cm',
  },
  {
    name: 'Vikram Seth', role: 'Chief Critic',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE8KbfusJKI7-3WTJnbvuZpHNOnt_c377Dam1fxdUVjDm1TO3tIMsLfRw1oTSSlHtBH0Nwd9XbSh-gxvl3HOSHLCbZFVeUaI1n7t9Afr3zVdcbspHkBCGQ4ypQXmFTOsXwSH6kBLMfKa_yEkyECfqhLCq_BK1405CU4bkab_xsqnFY4FlDAtPYPh2Erd6qXbufUYMZ0TvI0z9nzyhNexRqw_lakTr_Eoq5aLZ5xkw3S49YFvcYqGw3ROLA3xuwmNeVSOJ5AAmkjodc',
  },
];

const ARTICLES = [
  {
    title: 'The Renaissance of Bombay Indigo',
    when: 'Published 2 hours ago',
    cat: 'Heritage',
    catCls: 'bg-secondary-container text-on-secondary-container',
    author: 'Ananya Rao',
    dotCls: 'bg-green-600',
    statusTxt: 'Published',
    statusTxtCls: 'text-green-700',
  },
  {
    title: 'Sustainable Textiles: A New Chapter',
    when: 'Draft saved 5 hours ago',
    cat: 'Innovation',
    catCls: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    author: 'Vikram Seth',
    dotCls: 'bg-amber-500',
    statusTxt: 'Draft',
    statusTxtCls: 'text-amber-600',
  },
  {
    title: 'Architectural Whispers: Marine Drive',
    when: 'Scheduled for tomorrow',
    cat: 'Living',
    catCls: 'bg-primary-fixed text-on-primary-fixed-variant',
    author: 'Priya Sharma',
    dotCls: 'bg-blue-500',
    statusTxt: 'Scheduled',
    statusTxtCls: 'text-blue-600',
  },
];

export default function AdminDashboardPage() {
  const [filter, setFilter] = useState('All Status');

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Top Bar */}
      <header className="h-20 px-10 flex items-center justify-between bg-surface-container-lowest shadow-[0px_20px_40px_rgba(15,28,44,0.06)] z-40">
        <h1 className="font-headline text-3xl font-medium tracking-tight" style={{ color: '#0f1c2c' }}>
          Good morning, Admin
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 text-white font-label text-xs uppercase tracking-widest hover:opacity-90 transition-all"
            style={{ backgroundColor: '#0f1c2c' }}
          >
            Preview Site
          </Link>
          <Link
            href="/admin/articles/edit"
            className="px-6 py-2 text-white font-label text-xs uppercase tracking-widest hover:opacity-90 transition-all"
            style={{ backgroundColor: '#9e001f' }}
          >
            New Article
          </Link>
        </div>
      </header>

      {/* Page Canvas */}
      <div className="p-10 flex flex-col gap-10">

        {/* ── STATS ROW ── */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STATS.map((card) => (
            <div
              key={card.label}
              className="p-8 bg-surface-container-lowest border-l-4"
              style={{ borderColor: card.accent }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-2 font-bold font-label">
                {card.label}
              </p>
              <p className="font-headline text-4xl font-light">{card.value}</p>
              <div className="mt-4 flex items-center gap-1" style={{ color: card.detailColor }}>
                <span className="material-symbols-outlined text-sm">{card.icon}</span>
                <span className="text-[10px] font-bold font-label">{card.detail}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ── MIDDLE: Chart + Editorial Board ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 flex flex-col">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="font-headline text-2xl mb-1">Engagement Metrics</h3>
                <p className="text-xs text-secondary uppercase tracking-widest font-label">Reader retention by category</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: '#9e001f' }} />
                  <span className="text-[10px] uppercase font-bold text-secondary font-label">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: '#0f1c2c' }} />
                  <span className="text-[10px] uppercase font-bold text-secondary font-label">Clicks</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between h-48 gap-4 px-2">
              {BAR_DATA.map((bar) => (
                <div key={bar.label} className="flex flex-col items-center flex-1 group">
                  <div className="w-full h-32 relative" style={{ backgroundColor: 'rgba(15,28,44,0.08)' }}>
                    {/* Views bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{ backgroundColor: '#9e001f', height: `${bar.viewsPct}%` }}
                    />
                    {/* Clicks bar (narrower, overlaid) */}
                    <div
                      className="absolute bottom-0 opacity-80"
                      style={{
                        backgroundColor: '#0f1c2c',
                        height: `${bar.clicksPct}%`,
                        left: '25%',
                        right: '25%',
                      }}
                    />
                  </div>
                  <span className="mt-4 text-[10px] uppercase tracking-tighter text-secondary font-bold font-label">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Board */}
          <div className="p-8 text-white" style={{ backgroundColor: '#0f1c2c' }}>
            <h3 className="font-headline text-2xl mb-6">Editorial Board</h3>
            <div className="flex flex-col gap-6">
              {BOARD.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-10 h-10 object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide font-body">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-body">{member.role}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 text-sm">more_vert</span>
                </div>
              ))}
              <button className="w-full mt-2 py-3 border border-white/20 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors font-label">
                Manage Access
              </button>
            </div>
          </div>
        </div>

        {/* ── RECENT ARTICLES TABLE ── */}
        <section className="bg-surface-container-lowest p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-3xl">Recent Articles</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold font-label">Filter by</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-surface-container-high px-4 py-1 text-[10px] uppercase tracking-widest font-label border-none focus:ring-0 cursor-pointer"
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#0f1c2c' }}>
                  {['Title', 'Category', 'Author', 'Status', 'Action'].map((h) => (
                    <th key={h} className="pb-4 text-[10px] uppercase tracking-widest text-secondary font-bold font-label">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(229,189,187,0.15)' }}>
                {ARTICLES.filter((a) =>
                  filter === 'All Status' ? true : a.statusTxt === filter
                ).map((art) => (
                  <tr key={art.title} className="group hover:bg-surface-container transition-colors">
                    <td className="py-6">
                      <p className="font-headline text-lg" style={{ color: '#0f1c2c' }}>{art.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase mt-1 font-label">{art.when}</p>
                    </td>
                    <td className="py-6">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest font-label ${art.catCls}`}>
                        {art.cat}
                      </span>
                    </td>
                    <td className="py-6">
                      <p className="text-xs font-bold uppercase font-body">{art.author}</p>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${art.dotCls}`} />
                        <span className={`text-[10px] uppercase font-bold tracking-widest font-label ${art.statusTxtCls}`}>
                          {art.statusTxt}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 text-right">
                      <Link href="/admin/articles/edit">
                        <span className="material-symbols-outlined text-secondary hover:text-primary transition-colors">
                          edit_square
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/15 flex justify-center">
            <Link
              href="/admin/articles"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-secondary hover:text-primary transition-all font-label"
            >
              View Editorial Archive
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 px-10 flex justify-between items-center text-[10px] uppercase tracking-widest text-secondary border-t border-outline-variant/10 font-label">
        <span>The Bombay Forum CMS v4.2.0</span>
        <div className="flex gap-6">
          <Link href="/policies" className="hover:text-primary transition-colors">Privacy</Link>
          <a href="#" className="hover:text-primary transition-colors">Security</a>
          <button
            onClick={() => {
              localStorage.removeItem('adminEmail');
              window.location.href = '/admin/login';
            }}
            className="hover:text-primary transition-colors"
          >
            Log Out
          </button>
        </div>
      </footer>
    </div>
  );
}
