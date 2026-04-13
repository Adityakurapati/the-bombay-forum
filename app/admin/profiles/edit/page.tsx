'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ProfileEditorPage() {
  const searchParams = useSearchParams();
  const profileId = searchParams.get('id') || '';
  const profileTypeParam = searchParams.get('type') || '';
  const isEditing = !!profileId;

  const [profileType, setProfileType] = useState<'Founder' | 'Creator'>(
    profileTypeParam === 'creator' ? 'Creator' : 'Founder'
  );
  const [fullName, setFullName] = useState('');
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
  const [heroImage, setHeroImage] = useState('');
  const [portraitImage, setPortraitImage] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'active' | 'review' | 'draft'>('draft');

  // Fetch existing profile if editing
  useEffect(() => {
    if (isEditing) {
      loadProfile();
    }
  }, [profileId, profileTypeParam]);

  async function loadProfile() {
    setLoading(true);
    try {
      const endpoint = profileTypeParam === 'creator' ? '/api/creators' : '/api/founders';
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch');
      const items = await res.json();
      const profile = items.find((item: any) => item.id === profileId);

      if (profile) {
        setProfileType(profileTypeParam === 'creator' ? 'Creator' : 'Founder');
        setFullName(profile.name || '');
        setRoleCompany(
          profileTypeParam === 'founder'
            ? `${profile.title || ''} at ${profile.company || ''}`.replace(/ at $/, '')
            : profile.specialization || profile.title || ''
        );
        setTagline(profile.tagline || profile.quote || '');
        setPullQuote(profile.pullQuote || profile.quote || '');
        setBio1(profile.bioParagraphs?.[0] || profile.bio || '');
        setBio2(profile.bioParagraphs?.[1] || '');
        setBio3(profile.bioParagraphs?.[2] || '');
        setLongForm(
          profile.editorialSections
            ?.map((s: any) => `## ${s.heading}\n\n${s.paragraphs?.join('\n\n') || ''}`)
            .join('\n\n') || ''
        );
        setMetaTitle(profile.metaTitle || '');
        setMetaDesc(profile.metaDescription || '');
        setSlug(profile.slug || '');
        setHeroImage(profile.heroImage || '');
        setPortraitImage(profile.image || '');
        setTags((profile.tags || []).join(', '));
        setStatus(profile.status || 'active');
        setSocialLink(
          profile.socialLinks?.instagram ||
          profile.socialLinks?.twitter ||
          profile.socialLinks?.website ||
          ''
        );

        if (profile.stats && profile.stats.length > 0) {
          const padded = [...profile.stats];
          while (padded.length < 4) padded.push({ value: '', label: '' });
          setStats(padded.slice(0, 4));
        }
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  }

  function updateStat(idx: number, field: 'value' | 'label', val: string) {
    setStats((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Auto-generate slug from name if slug is empty
  useEffect(() => {
    if (!isEditing && fullName && !slug) {
      setSlug(generateSlug(fullName));
    }
  }, [fullName]);

  function buildPayload(publishStatus: 'active' | 'draft') {
    // Parse roleCompany into title and company
    const parts = roleCompany.split(/\s+at\s+/i);
    const title = parts[0]?.trim() || '';
    const company = parts[1]?.trim() || roleCompany;

    // Parse editorial content from longForm
    const sections = longForm
      .split(/^## /gm)
      .filter((s) => s.trim())
      .map((section) => {
        const lines = section.split('\n').filter((l) => l.trim());
        const heading = lines[0] || '';
        const paragraphs = lines.slice(1).filter((l) => l.trim());
        return { heading, paragraphs };
      });

    const tagList = tags
      .split(',')
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);

    const filteredStats = stats.filter((s) => s.value || s.label);

    const base = {
      name: fullName,
      slug: slug || generateSlug(fullName),
      image: portraitImage,
      heroImage: heroImage,
      quote: pullQuote || tagline,
      tagline,
      bioParagraphs: [bio1, bio2, bio3].filter(Boolean),
      bio: bio1,
      stats: filteredStats,
      editorialSections: sections,
      tags: tagList,
      metaTitle,
      metaDescription: metaDesc,
      status: publishStatus,
      socialLinks: socialLink ? { instagram: socialLink } : {},
    };

    if (profileType === 'Founder') {
      return {
        ...base,
        title,
        company,
      };
    } else {
      return {
        ...base,
        title,
        specialization: company || title,
      };
    }
  }

  async function handleSave(publishStatus: 'active' | 'draft') {
    setSaving(true);
    try {
      const endpoint = profileType === 'Founder' ? '/api/founders' : '/api/creators';
      const payload = buildPayload(publishStatus);

      if (isEditing) {
        // Update
        await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: profileId, ...payload }),
        });
      } else {
        // Create
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setStatus(publishStatus);
      alert(publishStatus === 'active' ? 'Profile published!' : 'Draft saved!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
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
        </header>
        <main className="flex-1 p-12 flex items-center justify-center" style={{ backgroundColor: '#fafaf5' }}>
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant animate-spin mb-4 block">progress_activity</span>
            <p className="font-label uppercase tracking-widest text-xs text-on-surface-variant">Loading profile...</p>
          </div>
        </main>
      </>
    );
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
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-6 py-2 border border-white/20 text-white font-label uppercase tracking-widest text-xs hover:bg-white/5 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('active')}
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
                    disabled={isEditing}
                    className={`px-8 py-2 font-label uppercase tracking-widest text-xs transition-colors ${
                      profileType === type
                        ? 'text-white'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    } ${isEditing ? 'cursor-not-allowed' : ''}`}
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

            {/* Tags */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-4">Tags (comma separated)</label>
              <input
                className="w-full bg-surface-container-lowest border-0 p-4 focus:ring-2 focus:ring-primary/10 text-on-surface font-body outline-none"
                placeholder="e.g. FINTECH, BOOTSTRAPPED, BENGALURU"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
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
                    placeholder="Start drafting the full story... Use ## Heading for sections."
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
              {portraitImage ? (
                <div className="aspect-[4/5] overflow-hidden mb-4 relative group">
                  <img src={portraitImage} alt="Portrait preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPortraitImage('')}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ) : (
                <label className="aspect-[4/5] bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center p-12 group cursor-pointer hover:bg-surface-container-highest transition-all block">
                  <input type="file" accept="image/*" className="sr-only" />
                  <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:scale-110 transition-transform">add_a_photo</span>
                  <p className="font-label uppercase tracking-widest text-[10px] text-outline font-bold">Upload High-Res Portrait</p>
                  <p className="text-[10px] text-outline/60 mt-2">Recommended: 1200 x 1500px (4:5)</p>
                </label>
              )}
              <div className="mt-4">
                <label className="text-[9px] font-label uppercase tracking-widest text-secondary block mb-1">Or paste image URL</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant p-3 focus:border-primary focus:ring-0 text-xs font-body outline-none"
                  type="text"
                  placeholder="https://..."
                  value={portraitImage}
                  onChange={(e) => setPortraitImage(e.target.value)}
                />
              </div>
            </section>

            {/* Hero Image URL */}
            <section>
              <label className="block font-label uppercase tracking-widest text-[10px] text-secondary mb-4">Hero / Banner Image</label>
              {heroImage && (
                <div className="aspect-video overflow-hidden mb-4 relative group">
                  <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setHeroImage('')}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              )}
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant p-3 focus:border-primary focus:ring-0 text-xs font-body outline-none"
                type="text"
                placeholder="https://..."
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
              />
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
                    <span className="text-[10px] text-outline-variant font-mono">
                      /{profileType === 'Founder' ? 'founders' : 'creators'}/
                    </span>
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
                    {(heroImage || portraitImage) ? (
                      <img
                        src={heroImage || portraitImage}
                        alt="Social preview cover"
                        className="w-full h-full object-cover grayscale"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container-highest">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant">image</span>
                      </div>
                    )}
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
                <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest font-label ${
                  status === 'active' ? 'bg-green-100 text-green-800' :
                  status === 'review' ? 'bg-amber-100 text-amber-800' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {status === 'active' ? 'Published' : status === 'review' ? 'In Review' : 'Draft'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-secondary font-body">
                  <span className="material-symbols-outlined text-xs">history</span>
                  {isEditing ? 'Editing existing profile' : 'Creating new profile'}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-secondary font-body">
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  {status === 'active' ? 'Visible to public' : 'Not yet visible'}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
