'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─────────────────────── TYPES ─────────────────────── */
type Status = 'Published' | 'Draft' | 'Scheduled' | 'Archived';

type Article = {
  id: number;
  title: string;
  thumb: string;
  category: string;
  categoryStyle: string; // Tailwind-compatible border/text colour classes
  author: string;
  status: Status;
  date: string;
  views: string;
};

/* ─────────────────────── DATA ─────────────────────── */
const STATUS_STYLES: Record<Status, string> = {
  Published: 'bg-emerald-100 text-emerald-800',
  Draft: 'bg-amber-100 text-amber-800',
  Scheduled: 'bg-teal-100 text-teal-800',
  Archived: 'bg-slate-100 text-slate-800',
};

const ALL_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'The Decacorn Manifesto',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVCl-UnKeTMmV4btNil4Co2RwjTAA4Hriimyd0fzMKhXNY0c9CJB7mET_eneql2tM7iVRuqT4OxwGbqQSIhhc6ithruObjbImnkOw1dUGJUzXWmJAIQyE63aqHwwmG8oQoKLLUKv79gWxL9MEPDSsUNgQYGZGu_UQ583ASR6Ue-MKoBqJPzeKKur9UnngdmGDNLimy0e0eEma9zEsah9JS0Rmgzywfw7BbKQ8IjEPeNu1HkAxLNBuQuAG4Zkw1Ny-Yt5TPRHlho-AU',
    category: 'The Founders',
    categoryStyle: 'border border-teal-accent text-teal-accent',
    author: 'Vikram Sethi',
    status: 'Published',
    date: 'Oct 24, 2024',
    views: '12.4k',
  },
  {
    id: 2,
    title: "Alibaug's New Modernism",
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP0SNNQ1insKWWEOW7G0iU0JJR25MadAMt3Ht0vKn0p6fvBfgQ-UoOquiHXJm2R2hyyNhP1h0-TC2bHdlprM1tVBTN_3HBey6xE8g0eSvEv2ythtDbcL-O2miADQyTJf_g-Oe7E4hniaKNdkKftf31rhvbx-LNw957oC2xzIph5pUdAQhoASf9J_Ez4JAFvQ9D57L50ktgdjHfm3u7hkSk892Ga76pvDK3UKeMZAreW3nmb4N5N8sQov9Cb5aGNkKtwbwLGcXsZWMv',
    category: 'The Suite',
    categoryStyle: 'border border-slate-400 text-slate-500',
    author: 'Meera Rao',
    status: 'Draft',
    date: 'Oct 22, 2024',
    views: '--',
  },
  {
    id: 3,
    title: 'Nithin Kamath: The Zerodha Way',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmEKPxScbE_8G9vg6CeW9MVOuKR4G4QmvbIakcZOs75yEcIcq0TRD1CbRF1KXN5hudD4Oehbbhg_o3FbXv9ynWAwmC07WkMX4O_UT6DanMFRY9CVzlZtycAFdRmL2P7BkPLY26-jr2vJz5PZg7dk0E3YeBGbzmIl3gltpuKXzj49uS-2YHmYb84b1W3ejBZXilrMaM4gIfWemzE3HbkQpdY130ytJAU1-JDahPleRDEaaCWXbI1baIlqAYubs5M-G17OC-8ES-7Xyg',
    category: 'The Founders',
    categoryStyle: 'border border-teal-accent text-teal-accent',
    author: 'Siddharth Mehta',
    status: 'Scheduled',
    date: 'Nov 01, 2024',
    views: '--',
  },
  {
    id: 4,
    title: 'Wealth Allocation in 2025',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrVswBWyq8XZSCbyfi1CGLTKG3t0sv5NRdO51GESVsM6HFJ2AxPPwgCETe08WHXGdqSuY6EqLyJHfXvqM0BwdGpWmFtcaH_p8EF2-CwzfRzwyC9Au4cbF-qy5H5sOBUtuSQg63aSkXFq7Pl_ie-Dq0rjN8erRoPpLhGMW4pFuQhkuZEEAMuMNwNceoutevGSefQe24Y3Y9vzSIc3JfzAvuFLbWSqtwwHsiLIj2IE2ab4CHgtroXDGOkC4pCZiG6WPdWCh3CpjlQK6e',
    category: 'Wealth',
    categoryStyle: 'border border-primary text-primary',
    author: 'Anjali Desai',
    status: 'Published',
    date: 'Oct 20, 2024',
    views: '8.9k',
  },
  {
    id: 5,
    title: "Mumbai's Coastal Road Impact",
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNLbtstI4UkD1FjLWoJZqkOk4SlJKvkA-xhpMttkfXe7rwHJahyDAuzMxFFHe1sr6JrRTOO1uOGN2gqDnkIcIM6eWe9Gl4AYxBXPTmonBm1Ulvhiw0NlHS0yE1AqyfmLxLth-Fz_mGPRNnkTrH3WukqERhB4bNifUz0YvFuYC0hZBdVE5RcFT4BlW0oa-X9S0SGezoyzVLm5exQSoKRwguMhQUA6uJvPYi3a6rkAebTPEygQeoc9_I7j5jpoMigFoao95vK2SMQPy',
    category: 'Bombay',
    categoryStyle: 'border border-secondary text-secondary',
    author: 'Karan Johar',
    status: 'Archived',
    date: 'Oct 15, 2024',
    views: '45.2k',
  },
  {
    id: 6,
    title: 'AI: The New Editorial Frontier',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHY_EkcakY-_JCWS2SHfGu8J3FvYZMXQklLKEFZfyMLjibOXC5vYqpnYQck2UbLx3MqDR_oJpktf-Y1GZKfWd2weLc-XRCboKKW13BgjHR5POXELgDWnLN_f1J74fCpajxq_0cdCjT4rcb2Wi0X0-EQC6l5Ez-YYwYSh4rvkHjHtHLH2NpeQBCwex8x9cb3tq8Gkki3hBZ7B2LGLpdIArFgrcaE-6Gh--8XTE0P6_9OrS_G0MCbpMI7a3I59TM9k91FSuSKiOgSKJx',
    category: 'Future',
    categoryStyle: 'border border-amber-500 text-amber-600',
    author: 'Rajiv Bajaj',
    status: 'Published',
    date: 'Oct 12, 2024',
    views: '3.1k',
  },
  {
    id: 7,
    title: 'The Oberoi Renaissance',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRIQTug1eIKP5MljnLcPjp-xK2W8WtPVQh57UbSBSeKrwwZlZhwVrDfz1M3QAs45NDZyOmFuSbIQu_OClnXDVd5l4yel61O5EFzfGvHs3C4cCOj7l99QB_KhhIGEWPmKfYAdc69MHityPWCQmfrEnribqCC1nBFmrSlFCBLx88y0zbKBBZri2NeM6sLczHxJzjliJppq7kXPTr9FGA12-eQXcSIZjdhgqOsB2LIVKrKMRg90LtzQ3mGt1r0_t9wuYpAE-L9sXM3ml3',
    category: 'The Suite',
    categoryStyle: 'border border-slate-400 text-slate-500',
    author: 'Priya Paul',
    status: 'Draft',
    date: 'Oct 10, 2024',
    views: '--',
  },
  {
    id: 8,
    title: 'Digital Creators to Watch',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8UF4FFq9Sc_a2zoX654QSVeaC1PbrLsrUFH1JPS67MMIZdIEmz8JcQaFmLsCXj-0-daMtGXVWuoZn8p03VVCpV-RVrRhdWeAXJT_hEBabppcIq4asRDAG2OQJGz0uuWVeohDL9apCNaciSI5WkxB6uep-eaZOfPg49OCQ44_RtdXLJH_QnXJ5j5-LorGzxdS8D8t6euSZkATLhkYf34gI0LCOM_BQNGVS_HARtETe75XzmOZHW1kbZIalolNGlSdGg0GGhseOQcHW',
    category: 'Creators',
    categoryStyle: 'border border-teal-accent text-teal-accent',
    author: 'Nandita Das',
    status: 'Published',
    date: 'Oct 08, 2024',
    views: '2.4k',
  },
];

const STATUS_FILTERS = ['All', 'Published', 'Draft', 'Scheduled', 'Archived'] as const;
type Filter = typeof STATUS_FILTERS[number];

const CATEGORIES = ['All Categories', 'The Founders', 'Creators', 'Wealth', 'The Suite', 'Bombay', 'Future'];
const SORTS = ['Newest First', 'Oldest First', 'Most Viewed'];

/* ─────────────────────── COMPONENT ─────────────────────── */
export default function AdminArticlesPage() {
  const [statusFilter, setStatusFilter] = useState<Filter>('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sort, setSort] = useState('Newest First');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 2, 3]));
  const [allChecked, setAllChecked] = useState(false);

  /* Filter + search */
  const visible = ALL_ARTICLES.filter((a) => {
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesCat = categoryFilter === 'All Categories' || a.category === categoryFilter;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesCat && matchesSearch;
  });

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visible.map((a) => a.id)));
    }
    setAllChecked(!allChecked);
  }

  function toggleOne(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
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
              {['Article', 'Category', 'Author', 'Status', 'Date', 'Views', 'Actions'].map((h) => (
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
                      <img
                        src={art.thumb}
                        alt={art.title}
                        className="w-16 h-12 object-cover grayscale flex-shrink-0"
                      />
                      <span className="font-headline text-lg font-bold text-on-surface">
                        {art.title}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 font-label ${art.categoryStyle}`}
                    >
                      {art.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-5 text-xs font-label">{art.author}</td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 font-label ${STATUS_STYLES[art.status]}`}
                    >
                      {art.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-xs text-on-surface-variant font-body">{art.date}</td>

                  {/* Views */}
                  <td className="px-6 py-5 text-xs text-on-surface-variant font-bold font-body">
                    {art.views}
                  </td>

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
                      <button
                        className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:underline"
                      >
                        Preview
                      </button>
                      <button className="material-symbols-outlined text-on-surface-variant">
                        more_horiz
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">article</span>
            <p className="font-label text-sm uppercase tracking-widest">No articles match your filters.</p>
          </div>
        )}
      </section>

      {/* ── PAGINATION ── */}
      <footer className="flex items-center justify-between px-10 py-10 bg-surface-bright mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">
          Showing 1–{visible.length} of 1,402 articles
        </p>
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest font-label">
          <button className="text-on-surface-variant hover:text-primary transition-colors">Previous</button>
          <div className="flex gap-4 items-center">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`transition-colors ${
                  n === 1
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-slate-400">...</span>
            <button className="text-on-surface-variant hover:text-primary transition-colors">175</button>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors">Next</button>
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
          <button className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors font-label">
            Publish All
          </button>
          <button className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors font-label">
            Archive All
          </button>
          <button className="px-6 py-2 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors font-label">
            Delete
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
