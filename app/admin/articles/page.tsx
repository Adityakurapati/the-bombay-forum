'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ─────────────────────── TYPES ─────────────────────── */
type Status = 'Published' | 'Draft' | 'Scheduled' | 'Archived';

type Article = {
  id: string;
  title: string;
  featuredImage: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  excerpt: string;
  readTime: number;
  views?: string;
};

/* ─────────────────────── DATA ─────────────────────── */
const STATUS_STYLES: Record<Status, string> = {
  Published: 'bg-emerald-100 text-emerald-800',
  Draft: 'bg-amber-100 text-amber-800',
  Scheduled: 'bg-teal-100 text-teal-800',
  Archived: 'bg-slate-100 text-slate-800',
};

const CATEGORY_STYLES: Record<string, string> = {
  'The Founders': 'border border-teal-accent text-teal-accent',
  'Founders': 'border border-teal-accent text-teal-accent',
  'Creators': 'border border-teal-accent text-teal-accent',
  'The Suite': 'border border-slate-400 text-slate-500',
  'Wealth': 'border border-primary text-primary',
  'Bombay': 'border border-secondary text-secondary',
  'Future': 'border border-amber-500 text-amber-600',
  'Culture': 'border border-teal-accent text-teal-accent',
  'Mumbai': 'border border-secondary text-secondary',
  'Lifestyle': 'border border-slate-400 text-slate-500',
  'Editorial': 'border border-primary text-primary',
  'Travel': 'border border-amber-500 text-amber-600',
  'Economy': 'border border-primary text-primary',
};

const STATUS_FILTERS = ['All', 'Published', 'Draft', 'Scheduled', 'Archived'] as const;
type Filter = typeof STATUS_FILTERS[number];

const SORTS = ['Newest First', 'Oldest First'];

/* ─────────────────────── COMPONENT ─────────────────────── */
export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<Filter>('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sort, setSort] = useState('Newest First');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allChecked, setAllChecked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch articles from Firebase via API
  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  }

  // Derive unique categories from fetched articles
  const categories = ['All Categories', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))];

  // Derive article status
  function getStatus(art: Article): Status {
    if (art.published) return 'Published';
    return 'Draft';
  }

  // Format date
  function formatDate(dateStr: string) {
    if (!dateStr) return '--';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
      });
    } catch {
      return '--';
    }
  }

  /* Filter + search */
  const visible = articles
    .filter((a) => {
      const status = getStatus(a);
      const matchesStatus = statusFilter === 'All' || status === statusFilter;
      const matchesCat = categoryFilter === 'All Categories' || a.category === categoryFilter;
      const matchesSearch =
        (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.author || '').toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === 'Newest First') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    });

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visible.map((a) => a.id)));
    }
    setAllChecked(!allChecked);
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleDelete() {
    if (!confirm(`Delete ${selected.size} article(s)? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      for (const id of selected) {
        await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
      }
      setSelected(new Set());
      setAllChecked(false);
      await fetchArticles();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  }

  async function handleBulkPublish() {
    for (const id of selected) {
      const art = articles.find((a) => a.id === id);
      if (art) {
        await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...art, published: true }),
        });
      }
    }
    setSelected(new Set());
    setAllChecked(false);
    await fetchArticles();
  }

  async function handleBulkArchive() {
    for (const id of selected) {
      const art = articles.find((a) => a.id === id);
      if (art) {
        await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...art, published: false }),
        });
      }
    }
    setSelected(new Set());
    setAllChecked(false);
    await fetchArticles();
  }

  const showBulkBar = selected.size > 0;

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: '#fafaf5' }}>

      {/* ── TOP APP BAR ── */}
      <header className="flex items-center justify-between px-10 py-8 bg-surface-bright">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-primary">Articles</h2>
        <Link
          href="/admin/articles/edit"
          className="text-white px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors flex items-center gap-2"
          style={{ backgroundColor: '#11262B' }}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Article
        </Link>
      </header>

      {/* ── FILTER BAR ── */}
      <section className="px-10 space-y-6">
        <div className="flex flex-col gap-6 p-8 bg-surface-container-low">

          {/* Status chips + dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Status filter chips */}
            <div className="flex gap-2 flex-wrap">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest font-label transition-colors ${
                    statusFilter === f
                      ? 'text-white'
                      : 'bg-white text-on-surface hover:bg-surface-container-high'
                  }`}
                  style={statusFilter === f ? { backgroundColor: '#9e001f' } : {}}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border-0 px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:ring-0 font-label"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border-0 px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:ring-0 font-label"
                >
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                  swap_vert
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              className="w-full bg-white border-0 py-4 pl-12 pr-4 text-sm font-label focus:ring-0 outline-none"
              placeholder="Search articles..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── ARTICLES TABLE ── */}
      <section className="flex-1 px-10 py-8">
        {loading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white animate-pulse h-20 flex items-center px-6 gap-4">
                <div className="w-4 h-4 bg-surface-container-highest" />
                <div className="w-16 h-12 bg-surface-container-highest" />
                <div className="flex-1 h-4 bg-surface-container-highest" />
                <div className="w-20 h-4 bg-surface-container-highest" />
                <div className="w-16 h-4 bg-surface-container-highest" />
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-4 h-4 border-2 border-outline focus:ring-0"
                    style={{ borderRadius: 0 }}
                  />
                </th>
                {['Article', 'Category', 'Author', 'Status', 'Date', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant font-label ${
                      h === 'Actions' ? 'text-right' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
              {visible.map((art, idx) => {
                const isSelected = selected.has(art.id);
                const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-surface-container-low';
                const status = getStatus(art);
                const categoryStyle = CATEGORY_STYLES[art.category] || 'border border-slate-400 text-slate-500';
                return (
                  <tr
                    key={art.id}
                    className={`${rowBg} hover:bg-surface-container transition-colors group`}
                  >
                    {/* Checkbox */}
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(art.id)}
                        className="w-4 h-4 border-2 border-outline focus:ring-0"
                        style={{ borderRadius: 0 }}
                      />
                    </td>

                    {/* Article (thumb + title) */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {art.featuredImage ? (
                          <img
                            src={art.featuredImage}
                            alt={art.title}
                            className="w-16 h-12 object-cover grayscale flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-on-surface-variant text-sm">article</span>
                          </div>
                        )}
                        <span className="font-headline text-lg font-bold text-on-surface">
                          {art.title}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 font-label ${categoryStyle}`}
                      >
                        {art.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-6 py-5 text-xs font-label">{art.author}</td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 font-label ${STATUS_STYLES[status]}`}
                      >
                        {status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-xs text-on-surface-variant font-body">{formatDate(art.createdAt)}</td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/articles/edit?id=${art.id}`}
                          className="font-label text-[10px] font-bold uppercase tracking-widest hover:underline"
                          style={{ color: '#2DD4BF' }}
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/articles/${art.slug}`}
                          target="_blank"
                          className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:underline"
                        >
                          Preview
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete "${art.title}"?`)) {
                              await fetch(`/api/articles?id=${art.id}`, { method: 'DELETE' });
                              await fetchArticles();
                            }
                          }}
                          className="material-symbols-outlined text-on-surface-variant hover:text-red-500 transition-colors"
                        >
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && visible.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">article</span>
            <p className="font-label text-sm uppercase tracking-widest">No articles match your filters.</p>
          </div>
        )}
      </section>

      {/* ── PAGINATION ── */}
      <footer className="flex items-center justify-between px-10 py-10 bg-surface-bright mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">
          Showing {visible.length} of {articles.length} articles
        </p>
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest font-label">
          <span className="text-on-surface-variant">
            {articles.length} total articles in database
          </span>
        </div>
      </footer>

      {/* ── BULK ACTIONS BAR (fixed bottom, hidden when nothing selected) ── */}
      <div
        className={`fixed bottom-0 right-0 text-white px-10 py-5 flex items-center justify-between z-40 shadow-2xl transition-transform duration-300 ${
          showBulkBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          left: '18rem', /* 72 * 4px = 288px = w-72 sidebar */
          backgroundColor: '#11262B',
        }}
      >
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined" style={{ color: '#2DD4BF' }}>check_circle</span>
          <p className="text-sm font-label tracking-wide">{selected.size} article{selected.size !== 1 ? 's' : ''} selected</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleBulkPublish}
            className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors font-label"
          >
            Publish All
          </button>
          <button
            onClick={handleBulkArchive}
            className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors font-label"
          >
            Archive All
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors font-label disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="ml-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
