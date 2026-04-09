'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Article } from '@/lib/types';
import { generateFileName, uploadToR2 } from '@/lib/cloudflare-r2';

const CATEGORIES = ['Culture', 'Mumbai', 'Lifestyle', 'Editorial', 'Travel', 'Economy', 'Founders', 'Creators', 'Future', 'The Suite'];
const AUTHORS = ['Aarav Malhotra', 'Zoya Khan', 'Vikram Seth', 'Ananya Rao', 'Priya Sharma'];

export default function ArticleEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [deck, setDeck] = useState('');
  const [body, setBody] = useState(
    'In the quietest hours, before the local trains begin their mechanical symphony and the humidity starts to climb, Mumbai breathes differently. At 4:30 AM, Marine Drive is not the vibrant "Queen\'s Necklace" depicted on postcards, but a silver thread of solitude...'
  );
  const [selectedCategory, setSelectedCategory] = useState('Culture');
  const [author, setAuthor] = useState('Aarav Malhotra');
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
  const [metaTitle, setMetaTitle] = useState('The Unspoken Rhythm of Marine Drive at Dawn | TBF');
  const [metaDesc, setMetaDesc] = useState(
    "Explore the early morning culture of Mumbai's Marine Drive. An editorial journey through the city's quietest hours before the sunrise rush."
  );
  const [tags, setTags] = useState(['Mumbai', 'Dawn', 'Photography']);
  const [tagInput, setTagInput] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const metaTitlePct = Math.min(100, Math.round((metaTitle.length / 60) * 100));
  const metaDescPct = Math.min(100, Math.round((metaDesc.length / 160) * 100));

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToR2(file, generateFileName(file.name));
      setFeaturedImage(url);
    } catch {
      setError('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSave(publish = false) {
    setSaving(true);
    setError('');
    try {
      const payload: Partial<Article> = {
        title,
        subtitle: deck,
        content: body,
        category: selectedCategory,
        author,
        published: publish,
        featuredImage,
        excerpt: deck,
        readTime: Math.max(1, Math.ceil(body.split(' ').length / 200)),
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        id: articleId || undefined,
      };
      const res = await fetch('/api/articles', {
        method: articleId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push('/admin/dashboard');
      else setError('Failed to save article.');
    } catch {
      setError('Error saving article.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* TOP NAV */}
      <header className="h-20 bg-white flex items-center justify-between px-10 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] z-40 flex-shrink-0">
        <div className="flex items-center gap-4 text-sm font-label tracking-wide uppercase">
          <Link href="/admin/dashboard" className="text-on-surface-variant/40 hover:text-on-surface transition-colors">
            Articles
          </Link>
          <span className="material-symbols-outlined text-xs text-on-surface-variant/20">chevron_right</span>
          <span className="text-on-surface font-bold">{articleId ? 'Edit Article' : 'New Article'}</span>
        </div>
        <div className="flex items-center gap-4">
          {error && <p className="text-xs text-red-600 font-bold font-label">{error}</p>}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-6 py-2 border border-surface-container-highest text-xs font-bold tracking-widest uppercase hover:bg-surface-container-low transition-colors disabled:opacity-50 font-label"
          >
            Save Draft
          </button>
          <button className="px-6 py-2 border border-surface-container-highest text-xs font-bold tracking-widest uppercase hover:bg-surface-container-low transition-colors flex items-center gap-2 font-label">
            <span className="material-symbols-outlined text-base">visibility</span>
            Preview
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-8 py-2 text-white text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 font-label"
            style={{ backgroundColor: '#9e001f' }}
          >
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── EDITOR (65%) ── */}
        <section
          className="h-full bg-white overflow-y-auto border-r border-surface-container"
          style={{ width: '65%' }}
        >
          {/* Formatting toolbar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-16 py-4 border-b border-surface-container-low flex items-center gap-6 z-10">
            <div className="flex items-center gap-1 border-r border-surface-container-high pr-6">
              {['format_bold', 'format_italic', 'format_underlined'].map((ic) => (
                <button key={ic} className="p-2 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-xl">{ic}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 border-r border-surface-container-high pr-6">
              {['title', 'format_quote', 'format_list_bulleted'].map((ic) => (
                <button key={ic} className="p-2 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-xl">{ic}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {['image', 'link', 'code'].map((ic) => (
                <button key={ic} className="p-2 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-xl">{ic}</span>
                </button>
              ))}
              <button className="p-2 hover:bg-surface-container-low transition-colors ml-4">
                <span className="material-symbols-outlined text-xl" style={{ color: '#C8102E' }}>more_vert</span>
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="px-24 py-16 space-y-10 max-w-4xl mx-auto">
            {/* Title */}
            <textarea
              className="w-full font-headline text-6xl font-bold border-none focus:ring-0 p-0 placeholder:text-surface-dim resize-none leading-tight bg-transparent outline-none"
              placeholder="The Unspoken Rhythm of Marine Drive at Dawn"
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Deck */}
            <textarea
              className="w-full font-body text-xl font-medium border-none focus:ring-0 p-0 placeholder:text-surface-dim resize-none italic bg-transparent outline-none"
              style={{ color: 'rgba(210,227,250,0.8)' }}
              placeholder="An editorial exploration into the sensory transformation of Mumbai's most iconic promenade before the city awakens."
              rows={2}
              value={deck}
              onChange={(e) => setDeck(e.target.value)}
            />

            <div className="h-[2px] w-12 bg-primary" />

            {/* Body */}
            <div className="space-y-8">
              <textarea
                className="w-full font-body text-lg leading-relaxed text-on-background bg-transparent border-none focus:ring-0 p-0 resize-none outline-none min-h-[200px]"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              {/* Pull Quote */}
              <div className="border-l-4 border-tertiary-fixed-dim pl-8 py-4 my-10">
                <blockquote className="font-headline text-2xl italic text-on-surface">
                  "The city's heartbeat isn't found in its rush, but in the silence that precedes it."
                </blockquote>
              </div>

              <p className="font-body text-lg leading-relaxed text-on-background">
                Joggers move like ghosts in the mist, their steady footfalls the only percussion against the rhythmic lap of the Arabian Sea. It is here that the Forum finds its most honest reflection of the city—stripped of pretense, waiting for the first light to ignite the skyline.
              </p>

              {/* Image slot */}
              <label className="group relative w-full h-96 bg-surface-container-low flex items-center justify-center cursor-pointer overflow-hidden transition-all hover:bg-surface-container block">
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                {featuredImage ? (
                  <img src={featuredImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                ) : (
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr0-3S55Ru2KAq_Fef_-Njmmreue-XE0aivYk7k5mhIPKgc7mv3MFWuh3hz9NiwQU7lohddAX6EUa2d3aH71Kijhee5KRpgfvPXQp8yRpNGSpRpFxS0fJT6m5nnr4gbrsRv5SE12ZsFSsCLwlXIlPCnZWoE0BcfIYd45xYJqzbuVUnpyNokXv-jmhTdON8FDBNqZK9n1tRtTDynp7YzZlIk1gStrvW5DXZBFVosyDACfYTFH0J8JfXoC8tHY3eLohaZclySgnGIxJG"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-2 text-white drop-shadow-md">
                  <span className="material-symbols-outlined text-4xl">{uploading ? 'hourglass_empty' : 'edit'}</span>
                  <span className="text-xs tracking-widest font-bold uppercase font-label">
                    {uploading ? 'Uploading...' : 'Replace Hero Image'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* ── SETTINGS SIDEBAR (35%) ── */}
        <aside
          className="h-full bg-surface-container-low overflow-y-auto border-l border-surface-container"
          style={{ width: '35%' }}
        >
          <div className="p-8 space-y-10">
            {/* Publish Settings */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant font-label">Publish Settings</h3>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">settings</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-secondary font-body">Status</label>
                  <span
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-label"
                    style={{ backgroundColor: '#ffdad8', color: '#92001c' }}
                  >
                    {status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-secondary font-body">Author</label>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="bg-transparent border-none text-xs font-bold text-right focus:ring-0 p-0 text-on-surface cursor-pointer font-body"
                  >
                    {AUTHORS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-secondary font-body">Visibility</label>
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1 cursor-pointer font-body">
                    Public <span className="material-symbols-outlined text-xs">expand_more</span>
                  </span>
                </div>
              </div>
            </section>

            {/* Category */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant font-label">Category</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors font-label ${
                      selectedCategory === cat
                        ? 'border-primary bg-primary text-white'
                        : 'border-surface-container-highest hover:border-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Image */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant font-label">Featured Image</h3>
              <label className="w-full aspect-video border-2 border-dashed border-surface-container-highest bg-surface flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-lowest transition-all block">
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                {featuredImage ? (
                  <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-3xl text-surface-dim">add_a_photo</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-surface-dim font-label">
                      Upload Canvas Image
                    </span>
                  </>
                )}
              </label>
            </section>

            {/* SEO Meta */}
            <section className="space-y-6">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant border-b border-surface-container pb-2 font-label">
                SEO &amp; Social Meta
              </h3>
              {/* Meta Title */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold uppercase text-secondary font-label">Meta Title</label>
                  <span className="text-[10px] text-primary font-label">{metaTitle.length} / 60</span>
                </div>
                <input
                  className="w-full bg-white border border-surface-container-highest p-3 text-xs focus:border-primary focus:ring-0 font-body"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
                <div className="w-full h-1 bg-surface-container-highest">
                  <div className="h-full bg-primary transition-all" style={{ width: `${metaTitlePct}%` }} />
                </div>
              </div>
              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold uppercase text-secondary font-label">Meta Description</label>
                  <span className="text-[10px] text-tertiary-container font-label">{metaDesc.length} / 160</span>
                </div>
                <textarea
                  className="w-full bg-white border border-surface-container-highest p-3 text-xs focus:border-primary focus:ring-0 resize-none h-24 font-body"
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                />
                <div className="w-full h-1 bg-surface-container-highest">
                  <div className="h-full bg-tertiary-container transition-all" style={{ width: `${metaDescPct}%` }} />
                </div>
              </div>
              {/* Social Preview */}
              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-bold uppercase text-secondary font-label">Social Preview</label>
                <div className="bg-white border border-surface-container-highest p-4 flex gap-4">
                  <div className="w-20 h-20 bg-surface-container-low flex-shrink-0 overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRS7JwJiSzJbbe8u8BPfL8-yORAiy31jEjqBhMgqnX4lvUnd4-Hipz--VVrGRRTUPxnl4gmsH6dYy25dwynH3FqUPmOLw8z9IEu-8-lvVptmW3iLzyJvE5qlI-c8_v9DsadKEvmEpD-qalCsvZeT_6_W6sohSWIOYSDZt61XwG8y48tM2aC9Icrz-L3J8qO-rYHwXBt4iQEZ59Ht6KnfwImFVJby5a6PC4SHmlk48RGaSyRA0Pfr01OExp98FNT71-BXgkDhbrft8H"
                      alt="Social preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <p className="text-[10px] font-bold font-body">thebombayforum.com</p>
                    <p className="text-[11px] font-headline font-bold line-clamp-1">{metaTitle || 'Article Title...'}</p>
                    <p className="text-[9px] text-on-surface-variant line-clamp-2 font-body">{metaDesc || 'Article description...'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4 pb-12">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant font-label">Tags</h3>
              <div className="relative">
                <input
                  className="w-full bg-white border border-surface-container-highest p-3 text-xs focus:border-primary focus:ring-0 pr-10 font-body"
                  placeholder="Add Tag..."
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
                <button
                  onClick={() => {
                    if (tagInput.trim()) {
                      setTags((p) => [...p, tagInput.trim()]);
                      setTagInput('');
                    }
                  }}
                  className="absolute right-3 top-3"
                >
                  <span className="material-symbols-outlined text-sm text-surface-dim">add</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-surface-container-highest text-[9px] font-bold uppercase tracking-widest font-label"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
