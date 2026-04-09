'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ProfileEditorPage() {
  const searchParams = useSearchParams();
  const profileName = searchParams.get('name') || '';

  const [profileType, setProfileType] = useState<'Founder' | 'Creator'>('Founder');
  const [fullName, setFullName] = useState(profileName);
  const [roleCompany, setRoleCompany] = useState('');
  const [tagline, setTagline] = useState('');
  const [pullQuote, setPullQuote] = useState('');
  const [bio1, setBio1] = useState('');
  const [bio2, setBio2] = useState('');
  const [bio3, setBio3] = useState('');
  const [stats, setStats] = useState([
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ]);
  const [longForm, setLongForm] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [slug, setSlug] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [saving, setSaving] = useState(false);

  function updateStat(idx: number, field: 'value' | 'label', val: string) {
    setStats((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
  }

  async function handlePublish() {
    setSaving(true);
    // Stub: wire to backend when ready
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    alert('Profile saved!');
  }

  return (
    <>
      {/* Fixed Top Nav (sits above admin layout's ml-64 main area) */}
      <header
        className="h-16 flex justify-between items-center px-8 shadow-[0px_20px_40px_rgba(15,28,44,0.06)] z-40 flex-shrink-0"
        style={{ backgroundColor: '#0B1929' }}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/admin/profiles"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-label uppercase tracking-widest text-xs"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Profiles
          </Link>
          <div className="h-4 w-[1px] bg-white/20" />
          <h1 className="text-white font-headline text-xl tracking-tighter">Profile Editor</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border border-white/20 text-white font-label uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-6 py-2 text-white font-label uppercase tracking-widest text-xs hover:opacity-90 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#9e001f' }}
          >
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </header>

      {/* Main canvas */}
      <main className="flex-1 overflow-y-auto p-12 max-w-7xl" style={{ backgroundColor: '#fafaf5' }}>
        <div className="grid grid-cols-12 gap-16">

          {/* ── LEFT (7 cols) ── */}
          <div className="col-span-12 lg:col-span-7 space-y-16">

            {/* Type Toggle */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-4">Content Category</label>
              <div className="inline-flex bg-surface-container p-1">
                {(['Founder', 'Creator'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProfileType(type)}
                    className={`px-8 py-2 font-label uppercase tracking-widest text-xs transition-colors ${
                      profileType === type
                        ? 'text-white'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    style={profileType === type ? { backgroundColor: '#0B1929' } : {}}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>

            {/* Identity */}
            <section className="space-y-6">
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-4xl font-headline tracking-tight placeholder:text-surface-dim p-0 pb-2 outline-none"
                style={{ color: '#0B1929' }}
                placeholder="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-lg font-body text-secondary placeholder:text-surface-dim p-0 pb-2 outline-none"
                placeholder="Role & Company (e.g., CEO at Atelier Tech)"
                type="text"
                value={roleCompany}
                onChange={(e) => setRoleCompany(e.target.value)}
              />
              <textarea
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-2xl font-headline italic text-on-surface-variant placeholder:text-surface-dim p-0 pb-2 resize-none outline-none"
                placeholder="High-impact tagline..."
                rows={1}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </section>

            {/* Pull Quote */}
            <section className="p-8 border-l-4" style={{ backgroundColor: '#f4f4ef', borderColor: '#8BB0B8' }}>
              <label className="block font-label uppercase tracking-widest text-[10px] mb-4 italic" style={{ color: '#8BB0B8' }}>
                Featured Insight
              </label>
              <textarea
                className="w-full bg-transparent border-0 focus:ring-0 text-2xl font-headline italic placeholder:opacity-40 p-0 resize-none outline-none"
                style={{ color: '#0B1929' }}
                placeholder="Paste a signature quote from the interview here..."
                value={pullQuote}
                onChange={(e) => setPullQuote(e.target.value)}
              />
            </section>

            {/* Bio Paragraphs */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <label className="block font-label uppercase tracking-widest text-[10px] text-secondary">Narrative Biography</label>
                <span className="text-[10px] font-label uppercase text-outline">3 Blocks Recommended</span>
              </div>
              <div className="space-y-4">
                {[
                  { val: bio1, set: setBio1, ph: 'Opening paragraph: The origin story...' },
                  { val: bio2, set: setBio2, ph: 'Middle paragraph: Key achievements and pivots...' },
                  { val: bio3, set: setBio3, ph: 'Closing paragraph: Current vision and future outlook...' },
                ].map(({ val, set, ph }) => (
                  <textarea
                    key={ph}
                    className="w-full bg-surface-container-lowest border-0 p-6 focus:ring-2 focus:ring-primary/10 text-on-surface leading-relaxed font-body outline-none resize-none"
                    placeholder={ph}
                    rows={4}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                  />
                ))}
              </div>
            </section>

            {/* Stats Grid */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-6">Key Performance Indicators</label>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-surface-container p-6">
                    <input
                      className="w-full bg-transparent border-0 border-b font-headline text-xl mb-2 p-0 focus:ring-0 outline-none placeholder:text-surface-dim"
                      style={{ borderColor: '#0B1929', color: '#0B1929' }}
                      placeholder="Value (e.g. 250M+)"
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(i, 'value', e.target.value)}
                    />
                    <input
                      className="w-full bg-transparent border-0 focus:ring-0 text-[10px] font-label uppercase tracking-widest text-secondary p-0 outline-none placeholder:text-surface-dim"
                      placeholder="Label (e.g. Total Revenue)"
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(i, 'label', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Long-form Editor */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-4">Long-form Editorial Content</label>
              <div className="border border-outline-variant bg-surface-container-lowest">
                <div className="flex items-center gap-2 p-2 border-b border-outline-variant bg-surface-container-low">
                  {['format_bold', 'format_italic', 'format_quote', 'title', 'image', 'monitoring'].map((ic, idx) => (
                    <button
                      key={ic}
                      className={`p-2 hover:bg-surface-container-high transition-colors ${idx === 2 ? 'border-r border-outline-variant pr-4 mr-2' : ''}`}
                    >
                      <span className="material-symbols-outlined text-lg">{ic}</span>
                    </button>
                  ))}
                </div>
                <div className="p-8 min-h-[400px]">
                  <textarea
                    className="w-full h-full border-0 focus:ring-0 text-on-surface leading-loose font-body p-0 resize-none outline-none min-h-[360px]"
                    placeholder="Start drafting the full story..."
                    value={longForm}
                    onChange={(e) => setLongForm(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT (5 cols) ── */}
          <div className="col-span-12 lg:col-span-5 space-y-12">

            {/* Portrait Upload */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-4">Portrait Cover</label>
              <label className="aspect-[4/5] bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center p-12 group cursor-pointer hover:bg-surface-container-highest transition-all block">
                <input type="file" accept="image/*" className="sr-only" />
                <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:scale-110 transition-transform">add_a_photo</span>
                <p className="font-label uppercase tracking-widest text-[10px] text-outline font-bold">Upload High-Res Portrait</p>
                <p className="text-[10px] text-outline/60 mt-2">Recommended: 1200 x 1500px (4:5)</p>
              </label>
            </section>

            {/* SEO */}
            <section className="space-y-6 bg-surface-container-low p-8">
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: '#0B1929' }}>
                <h3 className="font-label uppercase tracking-widest text-xs font-bold" style={{ color: '#0B1929' }}>SEO &amp; Discovery</h3>
                <span className="material-symbols-outlined text-sm" style={{ color: '#0B1929' }}>search</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] font-label uppercase tracking-widest text-secondary">Meta Title</label>
                    <span className="text-[9px] text-outline font-label">{metaTitle.length}/60</span>
                  </div>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant p-3 focus:border-primary focus:ring-0 text-xs font-body outline-none"
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] font-label uppercase tracking-widest text-secondary">Meta Description</label>
                    <span className="text-[9px] text-outline font-label">{metaDesc.length}/160</span>
                  </div>
                  <textarea
                    className="w-full bg-surface-container-lowest border border-outline-variant p-3 focus:border-primary focus:ring-0 text-xs font-body resize-none outline-none"
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-label uppercase tracking-widest text-secondary block mb-1">URL Slug</label>
                  <div className="flex items-center bg-surface-container-highest px-3 border border-outline-variant">
                    <span className="text-[10px] text-outline-variant font-mono">/profiles/</span>
                    <input
                      className="w-full bg-transparent border-0 p-3 focus:ring-0 text-xs font-mono outline-none"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section className="space-y-6">
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary">Social Manifest</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-surface-container-low border border-outline-variant px-3 flex items-center">
                  <span className="material-symbols-outlined text-sm text-secondary mr-2">link</span>
                  <input
                    className="w-full bg-transparent border-0 text-[10px] focus:ring-0 py-3 font-body outline-none"
                    placeholder="https://instagram.com/..."
                    type="text"
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                  />
                </div>
                <button
                  className="text-white px-4 hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#0B1929' }}
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>

              {/* Social preview mock */}
              <div className="bg-[#f0f0f0] p-1 shadow-sm">
                <div className="bg-white">
                  <div className="h-48 bg-surface-container overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKt9vs9sZSbYR8aIcexSIpDC8oftU3kzMKUryZjf_rhZRRfvnPdYN_Nbvsp62gPAX2KL_NL6a9vfKMvREsUde3xoa_eN2_s46j_xLVrYtkkr4fxTNATFNz4rWyrxPK9kgm9alt8B4DVt4H9Le_3U6Ua0h1N-CcY4t3d0RI-9niMmTxVcDO7yT8Jl8i5xbVqWUaRO8aazW8xV4QoknbwN1Vl-wFrNwJCX9MRH3jtLDZJxZUhSOhSf2YZEsikximGrxdO44zPElqH6xi"
                      alt="Social preview cover"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-[10px] text-secondary uppercase tracking-widest font-label">thebombayforum.com</p>
                    <h4 className="font-headline font-bold text-lg leading-tight" style={{ color: '#0B1929' }}>
                      {metaTitle || `The Architect of Modern Luxury: A Profile on ${fullName || '[Name]'}`}
                    </h4>
                    <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed font-body">
                      {metaDesc || `Discover the journey of ${fullName || '[Name]'} as they redefine the boundaries of their industry through intentional design and strategic vision.`}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Status Panel */}
            <section className="border-t-2 pt-8" style={{ borderColor: '#0B1929' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">Current Status</span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[9px] font-bold uppercase tracking-widest font-label">Draft</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-secondary font-body">
                  <span className="material-symbols-outlined text-xs">history</span>
                  Last edited 14 minutes ago by Admin
                </div>
                <div className="flex items-center gap-2 text-[10px] text-secondary font-body">
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  0 public views
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
