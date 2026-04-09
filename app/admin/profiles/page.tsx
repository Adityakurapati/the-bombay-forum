'use client';

import { useState } from 'react';
import Link from 'next/link';

type Profile = {
  name: string;
  type: 'FOUNDER' | 'CREATOR';
  company: string;
  articles: number;
  views: string;
  updated: string;
  status: 'active' | 'review' | 'draft';
  image: string;
};

const PROFILES: Profile[] = [
  {
    name: 'Nithin Kamath', type: 'FOUNDER', company: 'Zerodha',
    articles: 12, views: '142K', updated: '2d ago', status: 'active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN9EffWcxrGV8bAmp9r9LNyd9UFInPCOXrkAqRHLI2iP-QJjhxoJWd7raofRmG6styt-uj9Sc9u3qmfvM951nw8ELjcdnm5l8FDH4vHCJFnRbDeZd9LryvxjB1i03kWW3LjlCzWd38u-E-YQ7G9Oek-kUTRoMghinaiGKpS6Ien7YGeHel0gHsQ9hcRDFsLZWhvf7kCOCmT6FR2QwUhjATlluk3V9ohd6ZVxHUOEfKq7lhxP2qwAy1lch_g99cM_bRN06FpEglQF4I',
  },
  {
    name: 'Ranveer Allahbadia', type: 'CREATOR', company: 'BeerBiceps',
    articles: 28, views: '890K', updated: '5h ago', status: 'active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh_PC2eHCJI3CxHr4d3ArxmOZDGcEkqxZ43RAF6X44pxzQDBVbm0dFMeyrPNYc9MI5r_f2nwxpofVOP8RkdJgLqJLmWBFqk4Ix1mFesXUGrCg_KmcwxOChRISnkBSuF8C5F-up7a6_zIQzzwqx3jgQHGC4nbJ-teTb1MIMFDzQQkz7N5vvBmzucrIDebSY8IkYGVEMvem75Lv_svGZomtbiB6uYpmZLJmeMqclHZcXJMTgm0woLKNlXLXntkmRzNnprPQiOScXiLRQ',
  },
  {
    name: 'Falguni Nayar', type: 'FOUNDER', company: 'Nykaa',
    articles: 9, views: '205K', updated: '1w ago', status: 'active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRkv54GL1VDk07gG-CPrNbYaEK4ZrE8vSWzHHA0QF4_AaU0PeP60ErAYjlF18Ad63qMAaU4E0BrAWD_HIwfgLYJl8ibiDgb1WlnZgn_GyaiDv8H_nd0FkGAUdniwdjMozv8Lz-J8ra7BBECoGVZOIe-N8IGChDsBRMyNkqpCifkmQwmcHMDfVn1wILd8Z8B2W7HXJD_I7sZ9mzrHsSFgq1p2ZLVtEbp6piZISvddbz9KOxbWGhBksEc-ksI9NWv-hRSlfjOXl4-bg4',
  },
  {
    name: 'Prajakta Koli', type: 'CREATOR', company: 'MostlySane',
    articles: 15, views: '312K', updated: '3d ago', status: 'active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4bNLOnBd7upP1PX7GxkCo4HFI9zKzMJOuXCsNE5DK90wwXyokEJOKmxWx_7jfxH5jGpt3sK5IhFaB-0eVVS_s3B0aLx2tTwQSUMsyt4mNx76sTPpKsaYwGXcXDWLcG7Zi6bxh1iHhpQfdgAchldk9GVy4yLxhDUeUal9yL6gpIRzU4-gD_2dU-LnWWWFbRpKXIrjfUXzXO3I_5VSl3GWCHJmQXqOLBQz4IwziIRzxHqy2YnWCtLqOkEt-8CeKckZ96zJx6mNnsTo',
  },
  {
    name: 'Kunal Shah', type: 'FOUNDER', company: 'CRED',
    articles: 5, views: '98K', updated: '1h ago', status: 'review',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_e_GtuXLuKjcMsKxQj7h--x6bHLmvYO4k2aDR4F5y38RV5dhGHXh1b7Y99NT2FHS1o33mR99oHYJNQKao9DvugwAnT5xt7kyOzY0Qu3lzV-JApx8NE_bD9ZzBNgKJjf-YTrJqxdUJ-oVUkZmNNCmUK_phzjJ4FnzKm2qsoCZ9qsv1H-axLQio8EAbX0gOBRUXeaQrico5gHxClzDO9t4_PDiytjpzYNoXXB3mXEeNzQIOiDSbtAiswowyJ4e7KDddMlCSohdXrfD',
  },
  {
    name: 'Aryan Varma', type: 'CREATOR', company: 'Filmmaker',
    articles: 2, views: '12K', updated: 'Just now', status: 'draft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsVb5IVtRPtJTK2atkUD_mBPFrvUN-N7kydBTXbdU-GeLivrGlO8jIZSKodRSxtGjfcftGtWRYt1B7rnR3j_YA4DN4ouAHWLudkWnv_-3wX2oP9CfVIRiPrdZmGuKUvsACnSZrTu9OOMf60N7hW3r7FiPgLRP4atgj6cbp3Pj5HK_3MLd1lG81aTK00Pf99QBZil7T0B5nuvaVfEfxntpl-JJyhta-mcUr9VMKdhZ_KMz5gfG31nK-kEGAiAarg5Tilr1R_haBDrHY',
  },
];

const STATUS_DOT: Record<Profile['status'], string> = {
  active: 'bg-green-500',
  review: 'bg-amber-500',
  draft: 'bg-slate-400',
};

const TABS = ['ALL', 'FOUNDERS', 'CREATORS', 'DRAFT PROFILES'];

export default function ProfilesPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = PROFILES.filter((p) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'FOUNDERS') return p.type === 'FOUNDER';
    if (activeTab === 'CREATORS') return p.type === 'CREATOR';
    if (activeTab === 'DRAFT PROFILES') return p.status === 'draft';
    return true;
  });

  return (
    <div className="min-h-screen p-12" style={{ backgroundColor: '#fafaf5' }}>
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <nav className="flex space-x-2 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4 font-label">
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Directory</span>
          </nav>
          <h2
            className="text-5xl font-headline font-extrabold tracking-tighter"
            style={{ color: '#0B1929' }}
          >
            Founders &amp; Creators
          </h2>
        </div>
        <Link
          href="/admin/profiles/edit"
          className="text-white px-8 py-4 font-label uppercase tracking-widest text-xs flex items-center group transition-all hover:opacity-90"
          style={{ backgroundColor: '#11262B' }}
        >
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          Add New Profile
        </Link>
      </header>

      {/* Tabs */}
      <div className="border-b border-surface-container-highest mb-12 flex space-x-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 border-b-2 font-label uppercase tracking-[0.2em] text-[10px] font-bold transition-colors ${
              activeTab === tab
                ? 'border-primary text-on-surface'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            style={{ color: activeTab === tab ? '#0B1929' : undefined }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {filtered.map((profile) => (
          <div
            key={profile.name}
            className="bg-surface-container-lowest p-8 border border-surface-container-highest hover:bg-white hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    profile.type === 'FOUNDER' ? 'grayscale hover:grayscale-0' : ''
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 mb-2 inline-block font-label ${
                      profile.type === 'FOUNDER'
                        ? 'text-on-surface bg-surface-container-high'
                        : 'text-brand-teal bg-brand-teal/10'
                    }`}
                    style={profile.type === 'CREATOR' ? { color: '#8BB0B8' } : { color: '#0B1929' }}
                  >
                    {profile.type}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${STATUS_DOT[profile.status]}`} title={profile.status} />
                </div>
                <h3
                  className="text-2xl font-headline font-bold mb-1 leading-tight group-hover:text-primary transition-colors"
                  style={{ color: '#0B1929' }}
                >
                  {profile.name}
                </h3>
                <p className="text-[11px] font-label uppercase tracking-widest text-on-surface-variant">
                  {profile.company}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-surface-container-high pt-6 mb-8">
              {[
                { label: 'Articles', value: profile.articles },
                { label: 'Views', value: profile.views },
                { label: 'Updated', value: profile.updated },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-tighter mb-1 font-label">{stat.label}</p>
                  <p className="text-sm font-bold font-body" style={{ color: '#0B1929' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/profiles/edit?name=${encodeURIComponent(profile.name)}`}
                className="flex-1 py-3 bg-surface-container-high font-label text-[10px] uppercase tracking-widest hover:text-white transition-colors text-center"
                style={{ color: '#0B1929' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0B1929')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
              >
                Edit Profile
              </Link>
              <button
                className="px-4 py-3 bg-surface-container-high hover:text-white transition-colors"
                style={{ color: '#0B1929' }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.backgroundColor = '#8BB0B8');
                }}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
              >
                <span className="material-symbols-outlined text-sm">search</span>
              </button>
              <button className="px-4 py-3 bg-surface-container-high" style={{ color: '#0B1929' }}>
                <span className="material-symbols-outlined text-sm">more_vert</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <footer className="mt-16 border-t border-surface-container-highest pt-8 flex justify-between items-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-label">
          Showing {filtered.length} of 142 total profiles
        </p>
        <div className="flex space-x-2">
          {(['chevron_left', '1', '2', '3', 'chevron_right'] as const).map((item, i) => {
            const isIcon = item === 'chevron_left' || item === 'chevron_right';
            const isActive = item === '1';
            return (
              <button
                key={i}
                className={`w-10 h-10 flex items-center justify-center border font-label transition-colors text-[10px] font-bold ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'border-surface-container-highest text-on-surface-variant hover:border-on-surface'
                }`}
                style={isActive ? { backgroundColor: '#0B1929' } : undefined}
              >
                {isIcon ? (
                  <span className="material-symbols-outlined text-sm">{item}</span>
                ) : item}
              </button>
            );
          })}
        </div>
      </footer>

      {/* Quick search shortcut */}
      <div
        className="fixed bottom-12 right-12 text-white px-6 py-4 flex items-center shadow-2xl z-40 border-l-4 border-primary"
        style={{ backgroundColor: '#0B1929' }}
      >
        <span className="material-symbols-outlined mr-3 text-lg">keyboard_command_key</span>
        <span className="font-label uppercase tracking-widest text-[10px]">Quick search profiles (Ctrl + K)</span>
      </div>
    </div>
  );
}
