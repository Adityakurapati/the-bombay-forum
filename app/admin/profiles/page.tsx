'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Profile = {
  id: string;
  name: string;
  type: 'FOUNDER' | 'CREATOR';
  company: string;
  articles: number;
  views: string;
  updated: string;
  status: 'active' | 'review' | 'draft';
  image: string;
  slug: string;
};

const STATUS_DOT: Record<Profile['status'], string> = {
  active: 'bg-green-500',
  review: 'bg-amber-500',
  draft: 'bg-slate-400',
};

const TABS = ['ALL', 'FOUNDERS', 'CREATORS', 'DRAFT PROFILES'];

export default function ProfilesPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    try {
      const [foundersRes, creatorsRes] = await Promise.all([
        fetch('/api/founders'),
        fetch('/api/creators'),
      ]);

      const founders = foundersRes.ok ? await foundersRes.json() : [];
      const creators = creatorsRes.ok ? await creatorsRes.json() : [];

      const merged: Profile[] = [
        ...founders.map((f: any) => ({
          id: f.id,
          name: f.name || 'Untitled',
          type: 'FOUNDER' as const,
          company: f.company || f.title || '',
          articles: f.articles || 0,
          views: f.views || '0',
          updated: formatUpdated(f.createdAt),
          status: f.status || 'active',
          image: f.image || f.heroImage || '',
          slug: f.slug || '',
        })),
        ...creators.map((c: any) => ({
          id: c.id,
          name: c.name || 'Untitled',
          type: 'CREATOR' as const,
          company: c.specialization || c.title || '',
          articles: c.articles || 0,
          views: c.views || '0',
          updated: formatUpdated(c.createdAt),
          status: c.status || 'active',
          image: c.image || c.heroImage || '',
          slug: c.slug || '',
        })),
      ];

      setProfiles(merged);
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
    } finally {
      setLoading(false);
    }
  }

  function formatUpdated(dateStr?: string): string {
    if (!dateStr) return 'Just now';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  }

  async function handleDelete(profile: Profile) {
    const endpoint = profile.type === 'FOUNDER' ? '/api/founders' : '/api/creators';
    if (!confirm(`Delete "${profile.name}"? This cannot be undone.`)) return;
    try {
      await fetch(`${endpoint}?id=${profile.id}`, { method: 'DELETE' });
      await fetchProfiles();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  const filtered = profiles.filter((p) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'FOUNDERS') return p.type === 'FOUNDER';
    if (activeTab === 'CREATORS') return p.type === 'CREATOR';
    if (activeTab === 'DRAFT PROFILES') return p.status === 'draft';
    return true;
  });

  return (
    <div className="min-h-screen p-6 md:p-12" style={{ backgroundColor: '#fafaf5' }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-6">
        <div className="text-center sm:text-left">
          <nav className="flex justify-center sm:justify-start space-x-2 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4 font-label">
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Directory</span>
          </nav>
          <h2
            className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter"
            style={{ color: '#0B1929' }}
          >
            Founders &amp; Creators
          </h2>
        </div>
        <Link
          href="/admin/profiles/edit"
          className="w-full sm:w-auto text-white px-8 py-4 font-label uppercase tracking-widest text-xs flex items-center justify-center group transition-all hover:opacity-90"
          style={{ backgroundColor: '#11262B' }}
        >
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          Add New Profile
        </Link>
      </header>

      {/* Tabs */}
      <div className="border-b border-surface-container-highest mb-12 flex space-x-8 md:space-x-12 overflow-x-auto custom-scrollbar whitespace-nowrap">
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
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-8 border border-surface-container-highest animate-pulse"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-32 bg-surface-container-highest flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="w-16 h-4 bg-surface-container-highest" />
                  <div className="w-32 h-6 bg-surface-container-highest" />
                  <div className="w-24 h-3 bg-surface-container-highest" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-surface-container-high pt-6 mb-8">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="w-12 h-3 bg-surface-container-highest" />
                    <div className="w-8 h-4 bg-surface-container-highest" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-surface-container-high" />
                <div className="w-10 h-10 bg-surface-container-high" />
                <div className="w-10 h-10 bg-surface-container-high" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {filtered.map((profile) => (
            <div
              key={`${profile.type}-${profile.id}`}
              className="bg-surface-container-lowest p-8 border border-surface-container-highest hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-32 flex-shrink-0 overflow-hidden">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        profile.type === 'FOUNDER' ? 'grayscale hover:grayscale-0' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-on-surface-variant">person</span>
                    </div>
                  )}
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
                  href={`/admin/profiles/edit?id=${profile.id}&type=${profile.type.toLowerCase()}`}
                  className="flex-1 py-3 bg-surface-container-high font-label text-[10px] uppercase tracking-widest hover:text-white transition-colors text-center"
                  style={{ color: '#0B1929' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0B1929')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  Edit Profile
                </Link>
                <Link
                  href={`/${profile.type === 'FOUNDER' ? 'founders' : 'creators'}/${profile.slug}`}
                  target="_blank"
                  className="px-4 py-3 bg-surface-container-high hover:text-white transition-colors"
                  style={{ color: '#0B1929' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.style.backgroundColor = '#8BB0B8');
                  }}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <span className="material-symbols-outlined text-sm">search</span>
                </Link>
                <button
                  onClick={() => handleDelete(profile)}
                  className="px-4 py-3 bg-surface-container-high hover:bg-red-500 hover:text-white transition-colors"
                  style={{ color: '#0B1929' }}
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 block">person_off</span>
          <p className="font-label text-sm uppercase tracking-widest">No profiles found.</p>
        </div>
      )}

      {/* Pagination */}
      <footer className="mt-16 border-t border-surface-container-highest pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-label">
          Showing {filtered.length} of {profiles.length} total profiles
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
