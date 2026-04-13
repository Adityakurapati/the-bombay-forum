'use client';

import { useState, useEffect } from 'react';

const TABS = [
  { key: 'hero', label: 'Hero & Ticker' },
  { key: 'stories', label: 'Main Stories' },
  { key: 'pulse', label: 'Market Pulse' },
  { key: 'grid', label: 'Story Grid' },
  { key: 'opinion', label: 'Opinion Strip' },
];

export default function AdminWealthPage() {
  const [tab, setTab] = useState('hero');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch('/api/wealth');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(action: string, section: string, id?: string, payload?: any) {
    setSaving(true);
    try {
      await fetch('/api/wealth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, section, id, data: payload }),
      });
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fafaf5]">
        <span className="material-symbols-outlined animate-spin text-surface-dim">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf5]">
      {/* Header */}
      <header className="px-6 md:px-10 py-6 bg-white border-b border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold">Wealth Management</h1>
          <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest mt-1">Manage dynamic content for the Wealth page</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="/categories/wealth" 
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 border border-surface-container-highest text-[10px] font-bold uppercase tracking-widest font-label hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            View Live
          </a>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-surface-container bg-white overflow-x-auto whitespace-nowrap custom-scrollbar">
        <div className="flex px-6 md:px-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-4 border-b-2 font-label text-[11px] uppercase tracking-widest font-bold transition-colors ${
                tab === t.key
                  ? 'border-[#2DD4BF] text-on-surface'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="p-6 md:p-10 flex-1 overflow-y-auto">
        <div className="max-w-5xl space-y-12">
          
          {tab === 'hero' && (
            <>
              {/* Hero Section */}
              <section className="bg-white p-8 border border-surface-container space-y-6">
                <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label border-b border-surface-container pb-4">Hero Contents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Main Title</label>
                    <input 
                      type="text"
                      className="w-full bg-[#fafaf5] border-0 p-3 text-sm font-body focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                      defaultValue={data?.hero?.title || 'Money. Understood.'}
                      onBlur={(e) => handleAction('update_hero', 'hero', undefined, { ...data?.hero, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Description</label>
                    <textarea 
                      className="w-full h-24 bg-[#fafaf5] border-0 p-3 text-sm font-body focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                      defaultValue={data?.hero?.description || 'Markets, capital and the financial moves shaping India\'s next generation of wealth.'}
                      onBlur={(e) => handleAction('update_hero', 'hero', undefined, { ...data?.hero, description: e.target.value })}
                    />
                  </div>
                </div>
              </section>

              {/* Ticker Section */}
              <section className="bg-white p-8 border border-surface-container space-y-6">
                <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label border-b border-surface-container pb-4">Market Ticker</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {['sensex', 'nifty', 'gold', 'usdInr'].map((key) => (
                    <div key={key} className="space-y-4 p-4 bg-[#fafaf5]">
                      <h3 className="text-[10px] font-bold uppercase text-on-surface-variant font-label">{key}</h3>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-400 font-bold">Value</label>
                        <input 
                          type="text"
                          className="w-full bg-white border-0 p-2 text-xs font-bold font-body"
                          defaultValue={data?.ticker?.[key]?.value || ''}
                          onBlur={(e) => handleAction('update_ticker', 'ticker', undefined, { ...data?.ticker, [key]: { ...data?.ticker?.[key], value: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-400 font-bold">Change (%)</label>
                        <input 
                          type="text"
                          className="w-full bg-white border-0 p-2 text-xs font-bold font-body"
                          defaultValue={data?.ticker?.[key]?.change || ''}
                          onBlur={(e) => handleAction('update_ticker', 'ticker', undefined, { ...data?.ticker, [key]: { ...data?.ticker?.[key], change: e.target.value } })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {tab === 'stories' && (
            <>
              {/* Lead Story */}
              <section className="bg-white p-8 border border-surface-container space-y-6">
                <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label border-b border-surface-container pb-4">Lead Story</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Headline</label>
                    <input 
                      type="text"
                      className="w-full bg-[#fafaf5] border-0 p-3 text-sm font-body focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                      defaultValue={data?.leadStory?.title || ''}
                      onBlur={(e) => handleAction('update_lead', 'leadStory', undefined, { ...data?.leadStory, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Category Tag</label>
                    <input 
                      type="text"
                      className="w-full bg-[#fafaf5] border-0 p-3 text-sm font-body focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                      defaultValue={data?.leadStory?.category || 'WEALTH • ANALYSIS'}
                      onBlur={(e) => handleAction('update_lead', 'leadStory', undefined, { ...data?.leadStory, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Image URL</label>
                    <input 
                      type="text"
                      className="w-full bg-[#fafaf5] border-0 p-3 text-sm font-body focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                      defaultValue={data?.leadStory?.image || ''}
                      onBlur={(e) => handleAction('update_lead', 'leadStory', undefined, { ...data?.leadStory, image: e.target.value })}
                    />
                  </div>
                </div>
              </section>

              {/* Side Stories */}
              <section className="bg-white border border-surface-container overflow-hidden">
                <div className="px-8 py-4 border-b border-surface-container flex items-center justify-between bg-white">
                  <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label">Secondary Stories</h2>
                  <button 
                    onClick={() => handleAction('create_side', 'sideStories', undefined, { title: 'New Story', category: 'WEALTH', slug: '#' })}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#2DD4BF] hover:bg-[#2DD4BF]/10 px-3 py-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Story
                  </button>
                </div>
                <div className="divide-y divide-surface-container bg-white">
                  {data?.sideStories?.map((item: any) => (
                    <div key={item.id} className="p-6 md:px-8 flex items-center gap-6">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          type="text"
                          className="bg-[#fafaf5] border-0 p-2 text-xs font-bold font-body focus:ring-1 focus:ring-[#2DD4BF]"
                          defaultValue={item.title}
                          onBlur={(e) => handleAction('update_side', 'sideStories', item.id, { ...item, title: e.target.value })}
                        />
                        <input 
                          type="text"
                          className="bg-[#fafaf5] border-0 p-2 text-xs font-label uppercase tracking-widest focus:ring-1 focus:ring-[#2DD4BF]"
                          defaultValue={item.category}
                          onBlur={(e) => handleAction('update_side', 'sideStories', item.id, { ...item, category: e.target.value })}
                        />
                      </div>
                      <button 
                        onClick={() => handleAction('delete_side', 'sideStories', item.id)}
                        className="p-2 text-on-surface-variant/40 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {tab === 'pulse' && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data?.pulseItems?.map((item: any) => (
                <div key={item.id} className="bg-white p-6 border border-surface-container space-y-4 relative group">
                  <button 
                    onClick={() => handleAction('delete_pulse', 'pulseItems', item.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-on-surface-variant/40 hover:text-red-500 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                  <div className="space-y-4">
                     <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Item Title</label>
                      <input 
                        className="w-full bg-[#fafaf5] font-bold text-sm p-3 focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                        defaultValue={item.title}
                        onBlur={(e) => handleAction('update_pulse', 'pulseItems', item.id, { ...item, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Short Description</label>
                      <textarea 
                        className="w-full h-32 bg-[#fafaf5] text-xs leading-relaxed p-3 focus:ring-1 focus:ring-[#2DD4BF] outline-none"
                        defaultValue={item.description}
                        onBlur={(e) => handleAction('update_pulse', 'pulseItems', item.id, { ...item, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => handleAction('create_pulse', 'pulseItems', undefined, { title: 'New Pulse', description: 'Description here...' })}
                className="bg-white border-2 border-dashed border-surface-container flex flex-col items-center justify-center p-8 text-on-surface-variant/40 hover:bg-white hover:text-[#2DD4BF] hover:border-[#2DD4BF]/30 transition-all"
              >
                <span className="material-symbols-outlined text-3xl mb-2">add_circle</span>
                <span className="text-xs font-bold uppercase tracking-widest font-label">Add Insight</span>
              </button>
            </section>
          )}

          {tab === 'grid' && (
             <section className="bg-white border border-surface-container">
                <div className="px-8 py-4 border-b border-surface-container flex items-center justify-between">
                  <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label">Grid Stories</h2>
                  <button 
                    onClick={() => handleAction('create_grid', 'storyGrid', undefined, { title: 'New Grid Story', category: 'WEALTH', image: '', slug: '#' })}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#2DD4BF] hover:bg-[#2DD4BF]/10 px-3 py-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Card
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-container">
                  {data?.storyGrid?.map((item: any) => (
                    <div key={item.id} className="p-8 space-y-4 bg-white relative group">
                       <button 
                        onClick={() => handleAction('delete_grid', 'storyGrid', item.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-on-surface-variant/40 hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                      <div className="aspect-[4/3] bg-surface-container-low overflow-hidden">
                        {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                      </div>
                      <div className="space-y-4">
                        <input 
                           className="w-full bg-[#fafaf5] font-bold text-sm p-3 focus:ring-1 focus:ring-[#2DD4BF]"
                           defaultValue={item.title}
                           placeholder="Story Headline"
                           onBlur={(e) => handleAction('update_grid', 'storyGrid', item.id, { ...item, title: e.target.value })}
                        />
                        <input 
                           className="w-full bg-[#fafaf5] font-label text-[10px] uppercase font-bold tracking-widest p-2"
                           defaultValue={item.category}
                           placeholder="Category Tag"
                           onBlur={(e) => handleAction('update_grid', 'storyGrid', item.id, { ...item, category: e.target.value })}
                        />
                        <input 
                           className="w-full bg-[#fafaf5] text-[10px] p-2"
                           defaultValue={item.image}
                           placeholder="Image URL"
                           onBlur={(e) => handleAction('update_grid', 'storyGrid', item.id, { ...item, image: e.target.value })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {tab === 'opinion' && (
            <section className="bg-white p-8 border border-surface-container space-y-8">
               <h2 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant font-label border-b border-surface-container pb-4">Featured Opinion Strip</h2>
               <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">The Quote</label>
                    <textarea 
                      className="w-full h-32 bg-[#fafaf5] p-4 text-2xl font-headline italic"
                      defaultValue={data?.opinionStrip?.quote || ''}
                      onBlur={(e) => handleAction('update_opinion', 'opinionStrip', undefined, { ...data?.opinionStrip, quote: e.target.value })}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Author Name</label>
                      <input 
                        className="w-full bg-[#fafaf5] font-bold p-3"
                        defaultValue={data?.opinionStrip?.authorName || ''}
                        onBlur={(e) => handleAction('update_opinion', 'opinionStrip', undefined, { ...data?.opinionStrip, authorName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">Author Title</label>
                      <input 
                        className="w-full bg-[#fafaf5] p-3"
                        defaultValue={data?.opinionStrip?.authorTitle || ''}
                        onBlur={(e) => handleAction('update_opinion', 'opinionStrip', undefined, { ...data?.opinionStrip, authorTitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant font-label">CTA Label</label>
                      <input 
                        className="w-full bg-[#fafaf5] p-3 text-xs uppercase font-bold tracking-widest"
                        defaultValue={data?.opinionStrip?.ctaLabel || 'Read the Full Essay'}
                        onBlur={(e) => handleAction('update_opinion', 'opinionStrip', undefined, { ...data?.opinionStrip, ctaLabel: e.target.value })}
                      />
                    </div>
                 </div>
               </div>
            </section>
          )}

        </div>
      </main>

      {/* Save indicator overlay */}
      {saving && (
        <div className="fixed bottom-10 right-10 bg-[#071014] text-white px-6 py-3 shadow-2xl flex items-center gap-3 z-50">
          <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-label">Syncing Changes...</span>
        </div>
      )}
    </div>
  );
}
