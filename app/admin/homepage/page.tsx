'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Tab = 'coverStory' | 'editorPicks' | 'featuredWeek' | 'suiteCarousel';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'coverStory', label: 'Cover Story', icon: 'newspaper' },
  { key: 'editorPicks', label: "Editor's Picks", icon: 'bookmarks' },
  { key: 'featuredWeek', label: 'Featured This Week', icon: 'featured_play_list' },
  { key: 'suiteCarousel', label: 'Suite Carousel', icon: 'view_carousel' },
];

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const cls = "w-full bg-white border border-surface-container-highest px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#0B1929]/30";
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest font-bold font-label text-on-surface-variant mb-2">{label}</label>
      {multiline
        ? <textarea className={cls} rows={4} value={value} onChange={e => onChange(e.target.value)} />
        : <input className={cls} type="text" value={value} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="px-8 py-3 text-white text-[11px] font-bold uppercase tracking-widest font-label flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
      style={{ backgroundColor: '#0B1929' }}
    >
      <span className="material-symbols-outlined text-sm">{saving ? 'sync' : 'save'}</span>
      {saving ? 'Saving…' : 'Save Changes'}
    </button>
  );
}

export default function AdminHomepagePage() {
  const [tab, setTab] = useState<Tab>('coverStory');
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/api/homepage').then(r => r.json()).then(d => setData(d || {})).catch(console.error);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function saveSingleton(section: string, payload: any) {
    setSaving(true);
    try {
      await fetch('/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: payload }),
      });
      showToast('Saved successfully!');
    } catch { showToast('Save failed.'); }
    finally { setSaving(false); }
  }

  async function createListItem(section: string, payload: any, listKey: string) {
    setSaving(true);
    try {
      const res = await fetch('/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: payload }),
      });
      const json = await res.json();
      if (json.id) {
        setData((p: any) => ({ ...p, [listKey]: [...(p[listKey] || []), { id: json.id, ...payload }] }));
        showToast('Item created!');
      }
    } catch { showToast('Failed to create.'); }
    finally { setSaving(false); }
  }

  async function updateListItem(section: string, id: string, payload: any) {
    setSaving(true);
    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, id, data: payload }),
      });
      showToast('Saved!');
    } catch { showToast('Failed.'); }
    finally { setSaving(false); }
  }

  async function deleteListItem(section: string, id: string, listKey: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/homepage?section=${section}&id=${id}`, { method: 'DELETE' });
    setData((p: any) => ({ ...p, [listKey]: (p[listKey] || []).filter((x: any) => x.id !== id) }));
    showToast('Deleted.');
  }

  function updateInList(listKey: string, id: string, field: string, value: string) {
    setData((p: any) => ({
      ...p,
      [listKey]: (p[listKey] || []).map((x: any) => x.id === id ? { ...x, [field]: value } : x),
    }));
  }

  const cover = data.coverStory || {};

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf5' }}>
      {/* Header */}
      <header className="px-6 md:px-10 py-8 border-b border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <nav className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 font-label flex justify-center sm:justify-start gap-2">
            <span>Admin</span><span>/</span><span className="text-primary font-bold">Homepage</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-headline font-bold" style={{ color: '#0B1929' }}>Homepage Manager</h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-body mt-1">Control the Cover Story, Editor's Picks, Featured Week, and Suite Carousel.</p>
        </div>
        <Link href="/" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest font-label font-bold px-6 py-3 border border-on-surface/20 hover:bg-white transition-colors">
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          Preview Site
        </Link>
      </header>

      {/* Tabs */}
      <div className="border-b border-surface-container-highest px-6 md:px-10 flex gap-8 overflow-x-auto custom-scrollbar">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 py-4 border-b-2 font-label uppercase tracking-widest text-[11px] font-bold whitespace-nowrap transition-colors ${
              tab === t.key ? 'border-[#0B1929] text-[#0B1929]' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-w-4xl">

        {/* ── COVER STORY ── */}
        {tab === 'coverStory' && (
          <div className="space-y-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Cover Story</h2>
                <p className="text-sm text-on-surface-variant font-body mt-1">The main hero article on the home page (left 65%).</p>
              </div>
            </div>
            <Field label="Hero Image URL" value={cover.img || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, img: v } }))} />
            {cover.img && <img src={cover.img} alt="Preview" className="w-full aspect-video object-cover border border-surface-container-highest" />}
            <Field label="Category Label (e.g. Cover Story)" value={cover.category || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, category: v } }))} />
            <Field label="Headline" value={cover.title || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, title: v } }))} />
            <Field label="Excerpt / Subheading" value={cover.excerpt || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, excerpt: v } }))} multiline />
            <Field label="Byline (e.g. By Vikram Sethi • 12 Min Read)" value={cover.byline || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, byline: v } }))} />
            <Field label="Article Link (e.g. /articles/slug)" value={cover.href || ''} onChange={v => setData((p: any) => ({ ...p, coverStory: { ...p.coverStory, href: v } }))} />
            <SaveBtn saving={saving} onClick={() => saveSingleton('coverStory', cover)} />
          </div>
        )}

        {/* ── EDITOR'S PICKS ── */}
        {tab === 'editorPicks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Editor's Picks</h2>
                <p className="text-sm text-on-surface-variant font-body mt-1">3 compact picks shown in the right column of the hero. Falls back to latest articles.</p>
              </div>
              <button
                onClick={() => createListItem('editorPick', { href: '#', section: 'TBF', title: 'New Pick', img: '' }, 'editorPicks')}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Pick
              </button>
            </div>
            {(data.editorPicks || []).map((pick: any, i: number) => (
              <div key={pick.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Pick {i + 1}</span>
                  <button onClick={() => deleteListItem('editorPick', pick.id, 'editorPicks')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Thumbnail Image URL" value={pick.img || ''} onChange={v => updateInList('editorPicks', pick.id, 'img', v)} />
                {pick.img && <img src={pick.img} alt="" className="w-32 h-32 object-cover border border-surface-container-highest" />}
                <Field label="Section Label (e.g. The Suite)" value={pick.section || ''} onChange={v => updateInList('editorPicks', pick.id, 'section', v)} />
                <Field label="Headline" value={pick.title || ''} onChange={v => updateInList('editorPicks', pick.id, 'title', v)} />
                <Field label="Link URL (e.g. /articles/slug)" value={pick.href || ''} onChange={v => updateInList('editorPicks', pick.id, 'href', v)} />
                <button
                  onClick={() => updateListItem('editorPick', pick.id, pick)}
                  className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5"
                >
                  Save Pick
                </button>
              </div>
            ))}
            {(data.editorPicks || []).length === 0 && (
              <div className="p-8 text-center text-on-surface-variant text-sm font-body border border-dashed border-surface-container-highest">
                No editor's picks yet. Add some above, or the page will auto-pull from latest articles.
              </div>
            )}
          </div>
        )}

        {/* ── FEATURED THIS WEEK ── */}
        {tab === 'featuredWeek' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Featured This Week</h2>
                <p className="text-sm text-on-surface-variant font-body mt-1">3 feature cards in a grid below the hero. Falls back to latest articles.</p>
              </div>
              <button
                onClick={() => createListItem('featuredWeek', { href: '#', section: 'TBF', title: 'New Feature', excerpt: '', img: '' }, 'featuredWeek')}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Feature
              </button>
            </div>
            {(data.featuredWeek || []).map((item: any, i: number) => (
              <div key={item.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Feature {i + 1}</span>
                  <button onClick={() => deleteListItem('featuredWeek', item.id, 'featuredWeek')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Image URL (portrait aspect)" value={item.img || ''} onChange={v => updateInList('featuredWeek', item.id, 'img', v)} />
                {item.img && <img src={item.img} alt="" className="w-full aspect-[4/5] object-cover border border-surface-container-highest" />}
                <Field label="Section Label (e.g. Bombay)" value={item.section || ''} onChange={v => updateInList('featuredWeek', item.id, 'section', v)} />
                <Field label="Headline" value={item.title || ''} onChange={v => updateInList('featuredWeek', item.id, 'title', v)} />
                <Field label="Excerpt" value={item.excerpt || ''} onChange={v => updateInList('featuredWeek', item.id, 'excerpt', v)} multiline />
                <Field label="Link URL (e.g. /articles/slug)" value={item.href || ''} onChange={v => updateInList('featuredWeek', item.id, 'href', v)} />
                <button
                  onClick={() => updateListItem('featuredWeek', item.id, item)}
                  className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5"
                >
                  Save Feature
                </button>
              </div>
            ))}
            {(data.featuredWeek || []).length === 0 && (
              <div className="p-8 text-center text-on-surface-variant text-sm font-body border border-dashed border-surface-container-highest">
                No featured articles yet. Add some above, or the page will auto-pull from latest articles.
              </div>
            )}
          </div>
        )}

        {/* ── SUITE CAROUSEL ── */}
        {tab === 'suiteCarousel' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Suite Carousel</h2>
                <p className="text-sm text-on-surface-variant font-body mt-1">Horizontal scroll section near the bottom of the home page. Shows 400px-wide cards.</p>
              </div>
              <button
                onClick={() => createListItem('suiteCarousel', { section: 'The Suite', title: 'New Item', img: '' }, 'suiteCarousel')}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Item
              </button>
            </div>
            {(data.suiteCarousel || []).map((item: any, i: number) => (
              <div key={item.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Item {i + 1}</span>
                  <button onClick={() => deleteListItem('suiteCarousel', item.id, 'suiteCarousel')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Square Image URL" value={item.img || ''} onChange={v => updateInList('suiteCarousel', item.id, 'img', v)} />
                {item.img && <img src={item.img} alt="" className="w-full aspect-square object-cover border border-surface-container-highest" />}
                <Field label="Section Label (e.g. The Suite)" value={item.section || ''} onChange={v => updateInList('suiteCarousel', item.id, 'section', v)} />
                <Field label="Title" value={item.title || ''} onChange={v => updateInList('suiteCarousel', item.id, 'title', v)} />
                <button
                  onClick={() => updateListItem('suiteCarousel', item.id, item)}
                  className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5"
                >
                  Save Item
                </button>
              </div>
            ))}
            {(data.suiteCarousel || []).length === 0 && (
              <div className="p-8 text-center text-on-surface-variant text-sm font-body border border-dashed border-surface-container-highest">
                No carousel items yet. Add some above, or the page will show default Suite content.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-[#0B1929] text-white px-6 py-4 text-sm font-label uppercase tracking-widest shadow-2xl z-50 flex items-center gap-3">
          <span className="material-symbols-outlined text-sm text-accent-teal">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}
