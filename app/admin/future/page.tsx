'use client';

import { useState, useEffect, useCallback } from 'react';

const TEAL = '#006A6A';
const DARK = '#0B1929';
const BG = '#fafaf5';

/* ─────────────────────── TYPES ─────────────────────── */
type LeadStory = {
  leadImage: string; leadCategory: string; leadTitle: string;
  leadAuthor: string; leadDate: string; leadExcerpt: string;
  leadLinkLabel: string; leadSlug: string;
};
type SideItem   = { id: string; sub: string; title: string; body: string };
type SignalCard = { id: string; title: string; body: string; signal: boolean };
type StoryItem  = { id: string; sub: string; title: string; body: string; read: string; img: string };
type Opinion    = { quote: string; attribution: string; linkLabel: string; linkSlug: string };

const TABS = [
  { key: 'lead',    label: 'Lead Story',      icon: 'featured_play_list' },
  { key: 'side',    label: 'Side Items',       icon: 'list' },
  { key: 'signal',  label: 'Signal vs Noise',  icon: 'sensors' },
  { key: 'story',   label: 'Story Grid',       icon: 'grid_view' },
  { key: 'opinion', label: 'Opinion Strip',    icon: 'format_quote' },
] as const;
type TabKey = typeof TABS[number]['key'];

/* ─────────────────────── HELPERS ─────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant font-label">{label}</label>
      {children}
    </div>
  );
}
const inputCls = 'w-full border border-surface-container-highest bg-white px-3 py-2 text-sm font-body focus:border-teal-600 focus:ring-0 outline-none';
const textareaCls = inputCls + ' resize-none';
const btnPrimary = 'px-6 py-2 text-white text-[11px] font-bold uppercase tracking-widest font-label hover:opacity-90 transition-all disabled:opacity-40';
const btnSecondary = 'px-6 py-2 border border-surface-container-highest text-[11px] font-bold uppercase tracking-widest font-label hover:bg-surface-container-low transition-colors';

/* ─────────────────────── TOAST ─────────────────────── */
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 text-white text-sm font-label shadow-2xl" style={{ backgroundColor: DARK }}>
      <span className="material-symbols-outlined text-sm" style={{ color: TEAL }}>check_circle</span>
      {msg}
    </div>
  );
}

/* ─────────────────────── CONFIRM MODAL ─────────────────────── */
function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-sm w-full mx-4 shadow-2xl">
        <p className="font-body text-sm text-on-surface mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className={btnSecondary}>Cancel</button>
          <button onClick={onConfirm} className={btnPrimary} style={{ backgroundColor: '#9e001f' }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */
export default function AdminFuturePage() {
  const [tab, setTab] = useState<TabKey>('lead');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

  /* ── Lead Story state ── */
  const [lead, setLead] = useState<LeadStory>({
    leadImage: '', leadCategory: 'FUTURE', leadTitle: '', leadAuthor: '',
    leadDate: '', leadExcerpt: '', leadLinkLabel: 'Read the Essay', leadSlug: '#',
  });

  /* ── Side Items state ── */
  const [sideItems, setSideItems] = useState<SideItem[]>([]);
  const [sideForm, setSideForm] = useState<Partial<SideItem>>({});
  const [sideEditing, setSideEditing] = useState<string | null>(null);

  /* ── Signal Cards state ── */
  const [signalCards, setSignalCards] = useState<SignalCard[]>([]);
  const [signalForm, setSignalForm] = useState<Partial<SignalCard>>({ signal: true });
  const [signalEditing, setSignalEditing] = useState<string | null>(null);

  /* ── Story Grid state ── */
  const [storyGrid, setStoryGrid] = useState<StoryItem[]>([]);
  const [storyForm, setStoryForm] = useState<Partial<StoryItem>>({});
  const [storyEditing, setStoryEditing] = useState<string | null>(null);

  /* ── Opinion Strip state ── */
  const [opinion, setOpinion] = useState<Opinion>({
    quote: '', attribution: '', linkLabel: 'Read the Full Essay', linkSlug: '#',
  });

  /* ── Fetch all data ── */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/future');
      const data = await res.json();
      if (data?.leadStory)   setLead((p) => ({ ...p, ...data.leadStory }));
      if (data?.sideItems)   setSideItems(data.sideItems);
      if (data?.signalCards) setSignalCards(data.signalCards);
      if (data?.storyGrid)   setStoryGrid(data.storyGrid);
      if (data?.opinionStrip) setOpinion((p) => ({ ...p, ...data.opinionStrip }));
    } catch (err) {
      console.error('Failed to fetch future data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  function showToast(msg: string) { setToast(msg); }

  /* ─── LEAD STORY ─── */
  async function saveLead() {
    setSaving(true);
    try {
      await fetch('/api/future', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'leadStory', data: lead }),
      });
      showToast('Lead Story saved successfully.');
    } finally { setSaving(false); }
  }

  /* ─── SIDE ITEMS ─── */
  async function saveSideItem() {
    if (!sideForm.sub || !sideForm.title || !sideForm.body) return;
    setSaving(true);
    try {
      await fetch('/api/future', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'sideItems',
          id: sideEditing || undefined,
          item: { sub: sideForm.sub, title: sideForm.title, body: sideForm.body, order: sideItems.length },
        }),
      });
      setSideForm({});
      setSideEditing(null);
      await fetchAll();
      showToast(sideEditing ? 'Side item updated.' : 'Side item added.');
    } finally { setSaving(false); }
  }
  function editSideItem(item: SideItem) {
    setSideForm({ sub: item.sub, title: item.title, body: item.body });
    setSideEditing(item.id);
  }
  function deleteSideItem(id: string) {
    setConfirm({
      message: 'Delete this side item? This cannot be undone.',
      onConfirm: async () => {
        setConfirm(null);
        await fetch(`/api/future?section=sideItems&id=${id}`, { method: 'DELETE' });
        await fetchAll();
        showToast('Side item deleted.');
      },
    });
  }

  /* ─── SIGNAL CARDS ─── */
  async function saveSignalCard() {
    if (!signalForm.title || !signalForm.body) return;
    setSaving(true);
    try {
      await fetch('/api/future', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'signalCards',
          id: signalEditing || undefined,
          item: { title: signalForm.title, body: signalForm.body, signal: !!signalForm.signal, order: signalCards.length },
        }),
      });
      setSignalForm({ signal: true });
      setSignalEditing(null);
      await fetchAll();
      showToast(signalEditing ? 'Signal card updated.' : 'Signal card added.');
    } finally { setSaving(false); }
  }
  function editSignalCard(card: SignalCard) {
    setSignalForm({ title: card.title, body: card.body, signal: card.signal });
    setSignalEditing(card.id);
  }
  function deleteSignalCard(id: string) {
    setConfirm({
      message: 'Delete this signal card? This cannot be undone.',
      onConfirm: async () => {
        setConfirm(null);
        await fetch(`/api/future?section=signalCards&id=${id}`, { method: 'DELETE' });
        await fetchAll();
        showToast('Signal card deleted.');
      },
    });
  }

  /* ─── STORY GRID ─── */
  async function saveStoryItem() {
    if (!storyForm.title || !storyForm.sub || !storyForm.body) return;
    setSaving(true);
    try {
      await fetch('/api/future', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'storyGrid',
          id: storyEditing || undefined,
          item: {
            sub: storyForm.sub, title: storyForm.title, body: storyForm.body,
            read: storyForm.read || '', img: storyForm.img || '',
            order: storyGrid.length,
          },
        }),
      });
      setStoryForm({});
      setStoryEditing(null);
      await fetchAll();
      showToast(storyEditing ? 'Story item updated.' : 'Story item added.');
    } finally { setSaving(false); }
  }
  function editStoryItem(item: StoryItem) {
    setStoryForm({ sub: item.sub, title: item.title, body: item.body, read: item.read, img: item.img });
    setStoryEditing(item.id);
  }
  function deleteStoryItem(id: string) {
    setConfirm({
      message: 'Delete this story grid item? This cannot be undone.',
      onConfirm: async () => {
        setConfirm(null);
        await fetch(`/api/future?section=storyGrid&id=${id}`, { method: 'DELETE' });
        await fetchAll();
        showToast('Story item deleted.');
      },
    });
  }

  /* ─── OPINION STRIP ─── */
  async function saveOpinion() {
    setSaving(true);
    try {
      await fetch('/api/future', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'opinionStrip', data: opinion }),
      });
      showToast('Opinion strip saved.');
    } finally { setSaving(false); }
  }

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: BG }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-10 py-8 bg-surface-bright gap-6 text-center sm:text-left">
        <div>
          <nav className="flex justify-center sm:justify-start space-x-2 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1 font-label">
            <span>Admin</span><span>/</span>
            <span className="text-primary font-bold">Future</span>
          </nav>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight" style={{ color: DARK }}>
            Future Page Manager
          </h2>
        </div>
        <a
          href="/categories/future"
          target="_blank"
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-surface-container-highest px-5 py-2 text-[11px] font-bold uppercase tracking-widest font-label hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          View Live Page
        </a>
      </header>

      {/* Tab bar */}
      <div className="border-b border-surface-container-highest bg-white overflow-x-auto whitespace-nowrap custom-scrollbar">
        <div className="flex px-6 md:px-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-label text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'border-teal-700 text-on-surface'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
              style={tab === t.key ? { borderBottomColor: TEAL, color: DARK } : {}}
            >
              <span className="material-symbols-outlined text-sm">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1 py-32">
          <span className="material-symbols-outlined text-4xl animate-spin text-on-surface-variant">progress_activity</span>
        </div>
      ) : (
        <div className="flex-1 px-6 md:px-10 py-10 max-w-5xl">

          {/* ── LEAD STORY TAB ── */}
          {tab === 'lead' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-2xl font-bold" style={{ color: DARK }}>Lead Story</h3>
                <p className="text-xs text-on-surface-variant font-body">This is the large featured article at the top of the page.</p>
              </div>
              <div className="bg-white p-8 space-y-6 border border-surface-container-highest">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Category Label">
                    <input className={inputCls} value={lead.leadCategory} onChange={(e) => setLead((p) => ({ ...p, leadCategory: e.target.value }))} placeholder="e.g. FUTURE, AI & ETHICS" />
                  </Field>
                  <Field label="Author">
                    <input className={inputCls} value={lead.leadAuthor} onChange={(e) => setLead((p) => ({ ...p, leadAuthor: e.target.value }))} placeholder="e.g. Aarav Malhotra" />
                  </Field>
                </div>
                <Field label="Title">
                  <input className={inputCls} value={lead.leadTitle} onChange={(e) => setLead((p) => ({ ...p, leadTitle: e.target.value }))} placeholder="Article title..." />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Date">
                    <input className={inputCls} value={lead.leadDate} onChange={(e) => setLead((p) => ({ ...p, leadDate: e.target.value }))} placeholder="e.g. October 24, 2024" />
                  </Field>
                  <Field label="Link Label">
                    <input className={inputCls} value={lead.leadLinkLabel} onChange={(e) => setLead((p) => ({ ...p, leadLinkLabel: e.target.value }))} placeholder="e.g. Read the Essay" />
                  </Field>
                </div>
                <Field label="Slug / URL">
                  <input className={inputCls} value={lead.leadSlug} onChange={(e) => setLead((p) => ({ ...p, leadSlug: e.target.value }))} placeholder="/articles/slug-here" />
                </Field>
                <Field label="Excerpt">
                  <textarea className={textareaCls} rows={3} value={lead.leadExcerpt} onChange={(e) => setLead((p) => ({ ...p, leadExcerpt: e.target.value }))} placeholder="Short description of the article..." />
                </Field>
                <Field label="Featured Image URL">
                  <input className={inputCls} value={lead.leadImage} onChange={(e) => setLead((p) => ({ ...p, leadImage: e.target.value }))} placeholder="https://..." />
                </Field>
                {lead.leadImage && (
                  <img src={lead.leadImage} alt="preview" className="w-full max-h-60 object-cover border border-surface-container-highest" />
                )}
                <div className="flex justify-end pt-2">
                  <button onClick={saveLead} disabled={saving} className={btnPrimary} style={{ backgroundColor: DARK }}>
                    {saving ? 'Saving...' : 'Save Lead Story'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── SIDE ITEMS TAB ── */}
          {tab === 'side' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-2xl font-bold" style={{ color: DARK }}>Side Items</h3>
                <p className="text-xs text-on-surface-variant font-body">Secondary stories stacked alongside the lead article.</p>
              </div>

              {/* Form */}
              <div className="bg-white p-8 border border-surface-container-highest space-y-4">
                <h4 className="font-label text-[11px] uppercase tracking-widest font-bold text-on-surface-variant">
                  {sideEditing ? 'Edit Item' : 'Add New Item'}
                </h4>
                <Field label="Sub-category Label">
                  <input className={inputCls} value={sideForm.sub || ''} onChange={(e) => setSideForm((p) => ({ ...p, sub: e.target.value }))} placeholder="e.g. AI & ETHICS" />
                </Field>
                <Field label="Title">
                  <input className={inputCls} value={sideForm.title || ''} onChange={(e) => setSideForm((p) => ({ ...p, title: e.target.value }))} placeholder="Article title..." />
                </Field>
                <Field label="Body">
                  <textarea className={textareaCls} rows={2} value={sideForm.body || ''} onChange={(e) => setSideForm((p) => ({ ...p, body: e.target.value }))} placeholder="Short body text..." />
                </Field>
                <div className="flex gap-3 justify-end">
                  {sideEditing && (
                    <button onClick={() => { setSideForm({}); setSideEditing(null); }} className={btnSecondary}>Cancel</button>
                  )}
                  <button onClick={saveSideItem} disabled={saving || !sideForm.sub || !sideForm.title || !sideForm.body} className={btnPrimary} style={{ backgroundColor: DARK }}>
                    {saving ? 'Saving...' : sideEditing ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="space-y-2">
                {sideItems.length === 0 && (
                  <p className="text-sm text-on-surface-variant font-body py-8 text-center border border-dashed border-surface-container-highest">No side items yet. Add one above.</p>
                )}
                {sideItems.map((item, i) => (
                  <div key={item.id} className="bg-white border border-surface-container-highest p-6 flex items-start gap-6 group hover:border-teal-700 transition-colors">
                    <span className="text-2xl font-headline font-bold text-on-surface-variant/30 w-6 flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest font-label block mb-1" style={{ color: TEAL }}>{item.sub}</span>
                      <p className="font-headline font-bold text-on-surface truncate">{item.title}</p>
                      <p className="text-xs text-on-surface-variant font-body line-clamp-1 mt-1">{item.body}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => editSideItem(item)} className="px-3 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label hover:border-teal-700 transition-colors">Edit</button>
                      <button onClick={() => deleteSideItem(item.id)} className="px-3 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SIGNAL VS NOISE TAB ── */}
          {tab === 'signal' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-2xl font-bold" style={{ color: DARK }}>Signal vs Noise</h3>
                <p className="text-xs text-on-surface-variant font-body">Cards labelled SIGNAL (teal) or NOISE (grey).</p>
              </div>

              {/* Form */}
              <div className="bg-white p-8 border border-surface-container-highest space-y-4">
                <h4 className="font-label text-[11px] uppercase tracking-widest font-bold text-on-surface-variant">
                  {signalEditing ? 'Edit Card' : 'Add New Card'}
                </h4>
                <Field label="Title">
                  <input className={inputCls} value={signalForm.title || ''} onChange={(e) => setSignalForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Vertical Farming in Tier-2 Cities" />
                </Field>
                <Field label="Body">
                  <textarea className={textareaCls} rows={2} value={signalForm.body || ''} onChange={(e) => setSignalForm((p) => ({ ...p, body: e.target.value }))} placeholder="Short analysis..." />
                </Field>
                <Field label="Classification">
                  <div className="flex gap-4">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setSignalForm((p) => ({ ...p, signal: val }))}
                        className={`px-6 py-2 text-[11px] font-bold uppercase tracking-widest font-label border-2 transition-colors ${
                          signalForm.signal === val
                            ? val ? 'border-teal-700 text-white' : 'border-slate-500 text-white'
                            : 'border-surface-container-highest text-on-surface-variant'
                        }`}
                        style={signalForm.signal === val ? { backgroundColor: val ? TEAL : '#525f72' } : {}}
                      >
                        {val ? 'Signal' : 'Noise'}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="flex gap-3 justify-end">
                  {signalEditing && (
                    <button onClick={() => { setSignalForm({ signal: true }); setSignalEditing(null); }} className={btnSecondary}>Cancel</button>
                  )}
                  <button onClick={saveSignalCard} disabled={saving || !signalForm.title || !signalForm.body} className={btnPrimary} style={{ backgroundColor: DARK }}>
                    {saving ? 'Saving...' : signalEditing ? 'Update Card' : 'Add Card'}
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="space-y-2">
                {signalCards.length === 0 && (
                  <p className="text-sm text-on-surface-variant font-body py-8 text-center border border-dashed border-surface-container-highest">No cards yet. Add one above.</p>
                )}
                {signalCards.map((card, i) => (
                  <div key={card.id} className="bg-white border border-surface-container-highest p-6 flex items-start gap-6 group hover:border-teal-700 transition-colors">
                    <span className="text-2xl font-headline font-bold text-on-surface-variant/30 w-6 flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 text-white font-label inline-block mb-2"
                        style={{ backgroundColor: card.signal ? TEAL : '#525f72' }}
                      >
                        {card.signal ? 'Signal' : 'Noise'}
                      </span>
                      <p className="font-headline font-bold text-on-surface">{card.title}</p>
                      <p className="text-xs text-on-surface-variant font-body line-clamp-1 mt-1">{card.body}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => editSignalCard(card)} className="px-3 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label hover:border-teal-700 transition-colors">Edit</button>
                      <button onClick={() => deleteSignalCard(card.id)} className="px-3 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STORY GRID TAB ── */}
          {tab === 'story' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-2xl font-bold" style={{ color: DARK }}>Story Grid</h3>
                <p className="text-xs text-on-surface-variant font-body">"Latest from Future" 3-column image grid.</p>
              </div>

              {/* Form */}
              <div className="bg-white p-8 border border-surface-container-highest space-y-4">
                <h4 className="font-label text-[11px] uppercase tracking-widest font-bold text-on-surface-variant">
                  {storyEditing ? 'Edit Story' : 'Add New Story'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Sub-category">
                    <input className={inputCls} value={storyForm.sub || ''} onChange={(e) => setStoryForm((p) => ({ ...p, sub: e.target.value }))} placeholder="e.g. BIOTECH" />
                  </Field>
                  <Field label="Read Time">
                    <input className={inputCls} value={storyForm.read || ''} onChange={(e) => setStoryForm((p) => ({ ...p, read: e.target.value }))} placeholder="e.g. 8 min read" />
                  </Field>
                </div>
                <Field label="Title">
                  <input className={inputCls} value={storyForm.title || ''} onChange={(e) => setStoryForm((p) => ({ ...p, title: e.target.value }))} placeholder="Story title..." />
                </Field>
                <Field label="Body">
                  <textarea className={textareaCls} rows={2} value={storyForm.body || ''} onChange={(e) => setStoryForm((p) => ({ ...p, body: e.target.value }))} placeholder="Short description..." />
                </Field>
                <Field label="Image URL">
                  <input className={inputCls} value={storyForm.img || ''} onChange={(e) => setStoryForm((p) => ({ ...p, img: e.target.value }))} placeholder="https://..." />
                </Field>
                {storyForm.img && (
                  <div className="aspect-square w-32 overflow-hidden border border-surface-container-highest">
                    <img src={storyForm.img} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-3 justify-end">
                  {storyEditing && (
                    <button onClick={() => { setStoryForm({}); setStoryEditing(null); }} className={btnSecondary}>Cancel</button>
                  )}
                  <button onClick={saveStoryItem} disabled={saving || !storyForm.title || !storyForm.sub || !storyForm.body} className={btnPrimary} style={{ backgroundColor: DARK }}>
                    {saving ? 'Saving...' : storyEditing ? 'Update Story' : 'Add Story'}
                  </button>
                </div>
              </div>

              {/* Grid List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storyGrid.length === 0 && (
                  <p className="col-span-2 text-sm text-on-surface-variant font-body py-8 text-center border border-dashed border-surface-container-highest">No stories yet. Add one above.</p>
                )}
                {storyGrid.map((item, i) => (
                  <div key={item.id} className="bg-white border border-surface-container-highest p-4 flex gap-4 group hover:border-teal-700 transition-colors">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                      {item.img
                        ? <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale" />
                        : <div className="w-full h-full bg-surface-container-highest flex items-center justify-center"><span className="material-symbols-outlined text-on-surface-variant">image</span></div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest font-label block" style={{ color: TEAL }}>{item.sub}</span>
                      <p className="font-headline font-bold text-on-surface text-sm truncate">{item.title}</p>
                      <p className="text-[10px] text-on-surface-variant font-label">{item.read}</p>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button onClick={() => editStoryItem(item)} className="px-2 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label hover:border-teal-700 transition-colors">Edit</button>
                      <button onClick={() => deleteStoryItem(item.id)} className="px-2 py-1 border border-surface-container-highest text-[10px] font-bold uppercase font-label text-red-500 hover:bg-red-50 transition-colors">Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── OPINION STRIP TAB ── */}
          {tab === 'opinion' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-2xl font-bold" style={{ color: DARK }}>Opinion Strip</h3>
                <p className="text-xs text-on-surface-variant font-body">Full-width dark pull-quote section at the bottom of the page.</p>
              </div>
              <div className="bg-white p-8 border border-surface-container-highest space-y-6">
                <Field label="Quote Text">
                  <textarea
                    className={textareaCls} rows={3}
                    value={opinion.quote}
                    onChange={(e) => setOpinion((p) => ({ ...p, quote: e.target.value }))}
                    placeholder={`"The next generation of Indian wealth will not be inherited. It will be built."`}
                  />
                </Field>
                <Field label="Attribution">
                  <input className={inputCls} value={opinion.attribution} onChange={(e) => setOpinion((p) => ({ ...p, attribution: e.target.value }))} placeholder="— ROHINI RAO, PRINCIPAL AT AKASH VENTURES" />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Link Label">
                    <input className={inputCls} value={opinion.linkLabel} onChange={(e) => setOpinion((p) => ({ ...p, linkLabel: e.target.value }))} placeholder="Read the Full Essay" />
                  </Field>
                  <Field label="Link Slug / URL">
                    <input className={inputCls} value={opinion.linkSlug} onChange={(e) => setOpinion((p) => ({ ...p, linkSlug: e.target.value }))} placeholder="/articles/slug-here" />
                  </Field>
                </div>

                {/* Live Preview */}
                {opinion.quote && (
                  <div className="py-10 px-8 text-center mt-4" style={{ backgroundColor: DARK }}>
                    <blockquote className="font-headline italic text-xl text-white leading-tight mb-4">
                      {opinion.quote}
                    </blockquote>
                    {opinion.attribution && (
                      <p className="font-label uppercase tracking-widest text-xs text-white/60">{opinion.attribution}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button onClick={saveOpinion} disabled={saving} className={btnPrimary} style={{ backgroundColor: DARK }}>
                    {saving ? 'Saving...' : 'Save Opinion Strip'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast('')} />}

      {/* Confirm Modal */}
      {confirm && <ConfirmModal message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
}
