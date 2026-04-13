'use client';

import { useState, useEffect } from 'react';

type Tab = 'hero' | 'leadStory' | 'sideStories' | 'cityPulse' | 'storyGrid' | 'opinion';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'leadStory', label: 'Lead Story', icon: 'article' },
  { key: 'sideStories', label: 'Side Stories', icon: 'list' },
  { key: 'cityPulse', label: 'City Pulse', icon: 'bar_chart' },
  { key: 'storyGrid', label: 'Story Grid', icon: 'grid_view' },
  { key: 'opinion', label: 'Opinion Strip', icon: 'format_quote' },
];

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="px-8 py-3 text-white text-[11px] font-bold uppercase tracking-widest font-label flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
      style={{ backgroundColor: '#0B1929' }}
    >
      <span className="material-symbols-outlined text-sm">{saving ? 'sync' : 'save'}</span>
      {saving ? 'Saving…' : 'Save Changes'}
    </button>
  );
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; }) {
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

export default function AdminBombayPage() {
  const [tab, setTab] = useState<Tab>('hero');
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/api/bombay').then(r => r.json()).then(d => setData(d || {})).catch(console.error);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function save(section: string, payload: any) {
    setSaving(true);
    try {
      await fetch('/api/bombay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: payload }),
      });
      showToast('Saved successfully!');
    } catch {
      showToast('Save failed — check console.');
    } finally {
      setSaving(false);
    }
  }

  async function saveList(section: string, id: string | null, payload: any) {
    setSaving(true);
    try {
      if (id) {
        await fetch('/api/bombay', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, id, data: payload }) });
      } else {
        const res = await fetch('/api/bombay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, data: payload }) });
        const json = await res.json();
        return json.id;
      }
      showToast('Saved!');
    } catch {
      showToast('Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(section: string, id: string, listKey: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/bombay?section=${section}&id=${id}`, { method: 'DELETE' });
    setData((prev: any) => ({ ...prev, [listKey]: (prev[listKey] || []).filter((x: any) => x.id !== id) }));
    showToast('Deleted.');
  }

  // ── Hero ──
  const hero = data.hero || {};
  const ticker = hero.ticker || [
    { label: 'AQI', value: '112', badge: 'Moderate', badgeColor: 'text-yellow-400' },
    { label: 'TRAFFIC INDEX', value: 'High', badge: 'Peak', badgeColor: 'text-red-400' },
    { label: 'LOCAL TEMP', value: '32°C', badge: 'Humid', badgeColor: 'text-blue-400' },
    { label: 'TRANSIT', value: 'Normal', badge: 'On Time', badgeColor: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf5' }}>
      {/* Header */}
      <header className="px-6 md:px-10 py-8 border-b border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <nav className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 font-label flex justify-center sm:justify-start gap-2">
            <span>Admin</span><span>/</span><span className="text-primary font-bold">Bombay</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-headline font-bold" style={{ color: '#0B1929' }}>Bombay Page Manager</h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-body mt-1">Manage all content sections of the Bombay category page.</p>
        </div>
        <a href="/categories/bombay" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest font-label font-bold px-6 py-3 border border-on-surface/20 hover:bg-white transition-colors">
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          Preview Page
        </a>
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

        {/* ── LEAD STORY TAB ── */}
        {tab === 'leadStory' && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl mb-6" style={{ color: '#0B1929' }}>Lead Story</h2>
            {['image', 'tag', 'title', 'author', 'date', 'excerpt'].map(field => (
              <Field key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={data.leadStory?.[field] || ''} onChange={v => setData((p: any) => ({ ...p, leadStory: { ...p.leadStory, [field]: v } }))} multiline={field === 'excerpt'} />
            ))}
            {data.leadStory?.image && (
              <img src={data.leadStory.image} alt="Preview" className="w-full aspect-video object-cover mt-2 border border-surface-container-highest" />
            )}
            <SaveBtn saving={saving} onClick={() => save('leadStory', data.leadStory || {})} />
          </div>
        )}

        {/* ── SIDE STORIES TAB ── */}
        {tab === 'sideStories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Side Stories</h2>
              <button
                onClick={async () => {
                  const id = await saveList('sideStory', null, { tag: 'BOMBAY • NEW', title: 'New Side Story' });
                  if (id) setData((p: any) => ({ ...p, sideStories: [...(p.sideStories || []), { id, tag: 'BOMBAY • NEW', title: 'New Side Story' }] }));
                }}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Story
              </button>
            </div>
            {(data.sideStories || []).map((story: any, i: number) => (
              <div key={story.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Story {i + 1}</span>
                  <button onClick={() => deleteItem('sideStory', story.id, 'sideStories')} className="text-red-500 hover:text-red-700"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Category Tag (e.g. BOMBAY • CULTURE)" value={story.tag} onChange={v => setData((p: any) => ({ ...p, sideStories: p.sideStories.map((s: any) => s.id === story.id ? { ...s, tag: v } : s) }))} />
                <Field label="Headline" value={story.title} onChange={v => setData((p: any) => ({ ...p, sideStories: p.sideStories.map((s: any) => s.id === story.id ? { ...s, title: v } : s) }))} />
                <button onClick={() => saveList('sideStory', story.id, story)} className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5">Save</button>
              </div>
            ))}
          </div>
        )}

        {/* ── CITY PULSE TAB ── */}
        {tab === 'cityPulse' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>City Pulse</h2>
              <button
                onClick={async () => {
                  const id = await saveList('pulseItem', null, { title: 'New Topic', body: 'Description here.' });
                  if (id) setData((p: any) => ({ ...p, pulseItems: [...(p.pulseItems || []), { id, title: 'New Topic', body: 'Description here.' }] }));
                }}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Item
              </button>
            </div>
            {(data.pulseItems || []).map((item: any, i: number) => (
              <div key={item.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Item {i + 1}</span>
                  <button onClick={() => deleteItem('pulseItem', item.id, 'pulseItems')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Title" value={item.title} onChange={v => setData((p: any) => ({ ...p, pulseItems: p.pulseItems.map((x: any) => x.id === item.id ? { ...x, title: v } : x) }))} />
                <Field label="Body" value={item.body} onChange={v => setData((p: any) => ({ ...p, pulseItems: p.pulseItems.map((x: any) => x.id === item.id ? { ...x, body: v } : x) }))} multiline />
                <button onClick={() => saveList('pulseItem', item.id, item)} className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5">Save</button>
              </div>
            ))}
          </div>
        )}

        {/* ── STORY GRID TAB ── */}
        {tab === 'storyGrid' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Story Grid (6 items)</h2>
              <button
                onClick={async () => {
                  const id = await saveList('storyItem', null, { tag: 'BOMBAY • NEW', title: 'New Story', image: '' });
                  if (id) setData((p: any) => ({ ...p, storyGrid: [...(p.storyGrid || []), { id, tag: 'BOMBAY • NEW', title: 'New Story', image: '' }] }));
                }}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#2DD4BF' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Item
              </button>
            </div>
            {(data.storyGrid || []).map((item: any, i: number) => (
              <div key={item.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Story {i + 1}</span>
                  <button onClick={() => deleteItem('storyItem', item.id, 'storyGrid')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Image URL" value={item.image} onChange={v => setData((p: any) => ({ ...p, storyGrid: p.storyGrid.map((x: any) => x.id === item.id ? { ...x, image: v } : x) }))} />
                {item.image && <img src={item.image} alt="" className="w-full aspect-video object-cover border border-surface-container-highest" />}
                <Field label="Category Tag (e.g. BOMBAY • HERITAGE)" value={item.tag} onChange={v => setData((p: any) => ({ ...p, storyGrid: p.storyGrid.map((x: any) => x.id === item.id ? { ...x, tag: v } : x) }))} />
                <Field label="Title" value={item.title} onChange={v => setData((p: any) => ({ ...p, storyGrid: p.storyGrid.map((x: any) => x.id === item.id ? { ...x, title: v } : x) }))} />
                <button onClick={() => saveList('storyItem', item.id, item)} className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5">Save</button>
              </div>
            ))}
          </div>
        )}

        {/* ── OPINION STRIP TAB ── */}
        {tab === 'opinion' && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl mb-6" style={{ color: '#0B1929' }}>Featured Opinion Strip</h2>
            <Field label='Quote (include " marks)' value={data.opinionStrip?.quote || ''} onChange={v => setData((p: any) => ({ ...p, opinionStrip: { ...p.opinionStrip, quote: v } }))} multiline />
            <Field label="Author Name" value={data.opinionStrip?.author || ''} onChange={v => setData((p: any) => ({ ...p, opinionStrip: { ...p.opinionStrip, author: v } }))} />
            <Field label="Author Title / Role" value={data.opinionStrip?.authorTitle || ''} onChange={v => setData((p: any) => ({ ...p, opinionStrip: { ...p.opinionStrip, authorTitle: v } }))} />
            <SaveBtn saving={saving} onClick={() => save('opinionStrip', data.opinionStrip || {})} />
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-[#0B1929] text-white px-6 py-4 text-sm font-label uppercase tracking-widest shadow-2xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
