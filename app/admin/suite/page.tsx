'use client';

import { useState, useEffect } from 'react';

type Tab = 'hero' | 'cards' | 'pullQuote' | 'featuredStrip' | 'secondRow';

const SUITE_CATEGORIES = [
  'All Collections',
  'Hotels & Retreats',
  'Design & Interiors',
  'Travel',
  'Watches & Style',
  'Fine Dining'
];

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'cards', label: 'Featured Cards', icon: 'grid_view' },
  { key: 'pullQuote', label: 'Pull Quote', icon: 'format_quote' },
  { key: 'featuredStrip', label: 'Featured Strip', icon: 'horizontal_split' },
  { key: 'secondRow', label: 'Second Row', icon: 'view_agenda' },
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

export default function AdminSuitePage() {
  const [tab, setTab] = useState<Tab>('hero');
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/api/suite').then(r => r.json()).then(d => setData(d || {})).catch(console.error);
  }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  async function save(section: string, payload: any) {
    setSaving(true);
    try {
      await fetch('/api/suite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: payload }),
      });
      showToast('Saved successfully!');
    } catch { showToast('Save failed.'); }
    finally { setSaving(false); }
  }

  async function saveListItem(section: string, id: string | null, payload: any) {
    setSaving(true);
    try {
      if (id) {
        await fetch('/api/suite', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, id, data: payload }) });
        showToast('Saved!');
      } else {
        const res = await fetch('/api/suite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, data: payload }) });
        const json = await res.json();
        showToast('Created!');
        return json.id;
      }
    } catch { showToast('Failed.'); }
    finally { setSaving(false); }
  }

  async function deleteListItem(section: string, id: string, listKey: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/suite?section=${section}&id=${id}`, { method: 'DELETE' });
    setData((p: any) => ({ ...p, [listKey]: (p[listKey] || []).filter((x: any) => x.id !== id) }));
    showToast('Deleted.');
  }

  const hero = data.hero || {};
  const pullQuote = data.pullQuote || {};
  const strip = data.featuredStrip || {};

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf5' }}>
      {/* Header */}
      <header className="px-6 md:px-10 py-8 border-b border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <nav className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 font-label flex justify-center sm:justify-start gap-2">
            <span>Admin</span><span>/</span><span className="text-primary font-bold">The Suite</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-headline font-bold" style={{ color: '#0B1929' }}>The Suite Manager</h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-body mt-1">Manage luxury features, cards, and pull quotes.</p>
        </div>
        <a href="/categories/suite" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest font-label font-bold px-6 py-3 border border-on-surface/20 hover:bg-white transition-colors">
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

        {/* ── FEATURED CARDS ── */}
        {tab === 'cards' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Featured Cards (3 items)</h2>
              <button
                onClick={async () => {
                  const id = await saveListItem('featuredCard', null, { tag: 'The Suite — New', title: 'New Card', excerpt: '', image: '', category: 'All Collections' });
                  if (id) setData((p: any) => ({ ...p, featuredCards: [...(p.featuredCards || []), { id, tag: 'The Suite — New', title: 'New Card', excerpt: '', image: '', category: 'All Collections' }] }));
                }}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#C8102E' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Card
              </button>
            </div>
            {(data.featuredCards || []).map((card: any, i: number) => (
              <div key={card.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Card {i + 1}</span>
                  <button onClick={() => deleteListItem('featuredCard', card.id, 'featuredCards')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Image URL" value={card.image} onChange={v => setData((p: any) => ({ ...p, featuredCards: p.featuredCards.map((c: any) => c.id === card.id ? { ...c, image: v } : c) }))} />
                {card.image && <img src={card.image} alt="" className="w-full aspect-[4/5] object-cover border border-surface-container-highest" />}
                <Field label="Tag (e.g. The Suite — Style)" value={card.tag} onChange={v => setData((p: any) => ({ ...p, featuredCards: p.featuredCards.map((c: any) => c.id === card.id ? { ...c, tag: v } : c) }))} />
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-widest font-bold font-label text-on-surface-variant mb-2">Category</label>
                  <select 
                    className="w-full bg-white border border-surface-container-highest px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#0B1929]/30"
                    value={card.category || 'All Collections'}
                    onChange={e => setData((p: any) => ({ ...p, featuredCards: p.featuredCards.map((c: any) => c.id === card.id ? { ...c, category: e.target.value } : c) }))}
                  >
                    {SUITE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <Field label="Title" value={card.title} onChange={v => setData((p: any) => ({ ...p, featuredCards: p.featuredCards.map((c: any) => c.id === card.id ? { ...c, title: v } : c) }))} />
                <Field label="Excerpt" value={card.excerpt} onChange={v => setData((p: any) => ({ ...p, featuredCards: p.featuredCards.map((c: any) => c.id === card.id ? { ...c, excerpt: v } : c) }))} multiline />
                <button onClick={() => saveListItem('featuredCard', card.id, card)} className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5">Save Card</button>
              </div>
            ))}
          </div>
        )}

        {/* ── PULL QUOTE ── */}
        {tab === 'pullQuote' && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl mb-6" style={{ color: '#0B1929' }}>Pull Quote</h2>
            <Field label='Quote Text (include " marks)' value={pullQuote.quote || ''} onChange={v => setData((p: any) => ({ ...p, pullQuote: { ...p.pullQuote, quote: v } }))} multiline />
            <Field label="Cite (e.g. — Vikram Sethi, Collector)" value={pullQuote.cite || ''} onChange={v => setData((p: any) => ({ ...p, pullQuote: { ...p.pullQuote, cite: v } }))} />
            <SaveBtn saving={saving} onClick={() => save('pullQuote', pullQuote)} />
          </div>
        )}

        {/* ── FEATURED STRIP ── */}
        {tab === 'featuredStrip' && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl mb-6" style={{ color: '#0B1929' }}>Featured Strip (Full-Width)</h2>
            <Field label="Image URL (left side)" value={strip.image || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, image: v } }))} />
            {strip.image && <img src={strip.image} alt="Preview" className="w-full aspect-video object-cover border border-surface-container-highest" />}
            <Field label="Label (small red text, e.g. Deep Dive)" value={strip.label || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, label: v } }))} />
            <Field label="Headline" value={strip.title || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, title: v } }))} />
            <Field label="Body Text" value={strip.body || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, body: v } }))} multiline />
            <Field label="Link URL (e.g. /articles/slug)" value={strip.link || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, link: v } }))} />
            <Field label="Link Text (e.g. Read the Full Account)" value={strip.linkText || ''} onChange={v => setData((p: any) => ({ ...p, featuredStrip: { ...p.featuredStrip, linkText: v } }))} />
            <SaveBtn saving={saving} onClick={() => save('featuredStrip', strip)} />
          </div>
        )}

        {/* ── SECOND ROW ── */}
        {tab === 'secondRow' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl" style={{ color: '#0B1929' }}>Second Row (2 horizontal items)</h2>
              <button
                onClick={async () => {
                  const id = await saveListItem('secondRowItem', null, { tag: 'The Suite — New', title: 'New Item', excerpt: '', image: '' });
                  if (id) setData((p: any) => ({ ...p, secondRow: [...(p.secondRow || []), { id, tag: 'The Suite — New', title: 'New Item', excerpt: '', image: '' }] }));
                }}
                className="flex items-center gap-2 px-4 py-2 text-white text-[11px] font-label uppercase tracking-widest"
                style={{ backgroundColor: '#C8102E' }}
              >
                <span className="material-symbols-outlined text-sm">add</span>Add Item
              </button>
            </div>
            {(data.secondRow || []).map((item: any, i: number) => (
              <div key={item.id} className="p-6 bg-white border border-surface-container-highest space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Item {i + 1}</span>
                  <button onClick={() => deleteListItem('secondRowItem', item.id, 'secondRow')} className="text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
                <Field label="Image URL" value={item.image} onChange={v => setData((p: any) => ({ ...p, secondRow: p.secondRow.map((x: any) => x.id === item.id ? { ...x, image: v } : x) }))} />
                {item.image && <img src={item.image} alt="" className="w-full aspect-square object-cover border border-surface-container-highest" />}
                <Field label="Tag" value={item.tag} onChange={v => setData((p: any) => ({ ...p, secondRow: p.secondRow.map((x: any) => x.id === item.id ? { ...x, tag: v } : x) }))} />
                <Field label="Title" value={item.title} onChange={v => setData((p: any) => ({ ...p, secondRow: p.secondRow.map((x: any) => x.id === item.id ? { ...x, title: v } : x) }))} />
                <Field label="Excerpt" value={item.excerpt} onChange={v => setData((p: any) => ({ ...p, secondRow: p.secondRow.map((x: any) => x.id === item.id ? { ...x, excerpt: v } : x) }))} multiline />
                <button onClick={() => saveListItem('secondRowItem', item.id, item)} className="text-[10px] uppercase tracking-widest font-label font-bold text-[#0B1929] border-b border-[#0B1929] pb-0.5">Save Item</button>
              </div>
            ))}
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
