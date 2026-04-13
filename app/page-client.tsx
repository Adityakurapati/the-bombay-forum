'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';

/* ─────────────── STATIC DEFAULTS (fallback when DB empty) ─────────────── */
const DEFAULT_EDITORS_PICKS = [
  { href: '/articles/alibaug-retreat', section: 'The Suite', title: 'The Alibaug Retreat: Redefining Tropical Modernism.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZMHNmqSexwU7PV2iMKlX7tA4ZTZAvPWp1iOg7StFmefOEnwefF9KT7_yMzhO3HLR8chtOghYOf6jsEocY076-k8xyxI2u-Y2_0euzY-EhrA81fMgYSU7cwVXvLf0f0uZS4uV9AzO7o1WviMLhte_bSm0uyrF3OXno9WjY-8_Eo7X_iD68m2hdKAcDscMZRmpNW3pwbSng88HH1esvNy43r1_20YTLT6yhdeIE_-y4UzAJVMBzrj_o93YW54xJz60ry7WrlDqu0E7Q' },
  { href: '/categories/future', section: 'The Exchange', title: "Decoding the SaaS Correction: A Founder's Survival Guide.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzfkR7XHVKEzhpxjzCcDy1AuwpIdME8YaWsS33K64SYOFa9OGjtP0W8F5huAyl5VR9aCYG9pFGBuHwfSMZiM7W-3-rWTaavCFtBUrSupm-Mtvgy8dD9N2JsvEMtGl3SSVlyl1NEvDM3KORfhyKQpDYkLKAb7iPfudO2c_mCKBI_tFApGaJNWSv5f95Gj8dwujom8GLpjquvdw2756ze7Leev2-diwBDQgU8XkEsr0XWl217p6tAda4YfyoomfJqsgWFUYRX6IA-jc8' },
  { href: '/categories/future', section: 'Future', title: "Ladakh's New Sovereign: The Rise of Ultra-Luxe Glamping.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkUQG1ap0LIWsOI2U4mlCKdXZrW80P5L6vOF3jF_MWeMFI6u0jr9qJS8HlynmAf8ZB5q3HAcTJkehrBEqM5EcY6OyotBNU6qfepfpjoh1Y3ZuT0cfsRsEDxt-IiL9s9ytFWlbjAt9mRmDv8hjkR8aEmjLSVOIah55Vybb-G-u2XQ-hmgtejfTc74IPejYRHdCc3kW0zfKUIw5Tst7mhIxU-r6JRBZl0bngqLuVjo71YdxUQKCCKSemzOsVScw0SGjlecOWLHkZUsf-' },
];

const DEFAULT_FEATURED_WEEK = [
  { href: '/categories/bombay', section: 'Bombay', title: "The Bean Economy: Why Specialty Coffee is India's New Gold.", excerpt: 'How local roasteries are challenging global giants with terroir-driven narratives and aggressive retail footprints.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUV91hU8blW_K9rfM8xyav_O0knO-wjsrppIV_UX2cDEcOeH0N2V6rlcM8ZHqrE6J0Bc_y_BcuRyjrchaLlIhAXRVg53sfVNjyyTdy8nu1gjJ0BhnnXVEe1DqhnelwLRi6BSCaujueRZqSRwIDxH54MqPS3RQ5LGsNhnNR6GPiSzmQQPB2T_JRE9zZ0bq2FNR_wlu8UnwOQMcjo11cDuLxSzylE0CHfReZF-IfCVKnq7oABiCCGFIKzNVc6XQL4u8DWNZTYciieWTx' },
  { href: '/categories/creators', section: 'Creators', title: 'Investing in the Avant-Garde: A Guide to the Contemporary Indian Art Market.', excerpt: 'Beyond the masters—identifying the next generation of visual storytellers before they hit the auction blocks.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARxhVwPnqHyrvNOeR48JqVhjWp2fglzmL8K27Lek679JyKOnuAY9oDzkJXfd3joyuMTdyO82QStGKCgLwwaaFdm3Rc9BzwwrVuQcmgnJ66BDesKLYQQeSeBPIMT0W5WXip6VujtYvWel6YfN8pVTfiK9bIDuPiSxUyQR9_fU6TtNgprcAvRhz2jt5j_GIJ64vFa3OGYb5y2sFifPXIZIFvnTS7tOMQao8SBlC9b3Xs-KHSCwxPPVzznX5hthTvnMBScak4eeyk5yWN' },
  { href: '/categories/future', section: 'Future', title: "Quiet Power: The Silent Revolution of India's Premium EV Segment.", excerpt: "Inside the bespoke workshops building the electric future for India's 0.1%.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP5SksybXJ5UAHvCElnAsPX9jYvUFrYS3Dp2yPxc2HjiK6xGYmMoNQxyF7uBgGuAWbWQUJ7oUpGD18KWeCgD-EFEkAcABIpxOIcKY1AKUoaHNzKnnjTvN50pAyZg_Lj_FVUb1s-zv2uqE3mPOZWqWld1E_-9xaHjd5AqoiXk2K9SXK78Urw5_SJXXqLN75FCsMS8bsnt6NOlqinZXw_AQmu6D0qq318YUSPY0eB4cN1mVckUhfIEu3e7FayErp7IYFVHjtADZJV3xQ' },
];

const DEFAULT_SUITE_ITEMS = [
  { section: 'The Suite', title: "The Vacheron Overseas: A Nomad's Companion.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZMaS3NmrMCHZgNYbhHlnCcdUpeCjLXU98BNaq4-4pcAWdfT97bHTWajifDoShNDm97kfDXscbZ9S-wzhjFFfRutp8bUWMod-ei7Rk60kc8J265KHwc9rSNo6paGjNNe7E2jxvz5LisU4ihApBg4AQng_Jcn8FMnhWqPTMSl4s7LUhwWa90doWaAabV62ZQXhUrdz_1gtxB5ABALo5MPoU5Fa9uz3Pia_Y6AddSIOddX5sXRW7V4nU8VmKls-E0iRf8clgr_yzeRJ' },
  { section: 'Bombay', title: 'Masque Mumbai: 10 Courses of Modern Alchemy.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChZ8Kzbs68upW7JrZmrSsabWB7UewJbMDK051Woid2Mq1ZkXrD2tzQCAjmyT0g66Coj7gyaewC4Q1qAf9ded3LR3RxMi2FnxNEu_7P0Li9WwkR1BvNcr5rrSKRsp2he9eecNp6d_R4fzGwSC8MS5_zA0Cg8pod_lRVTtNe2IR1A8LZS3mMiB7-tEIVAlNUPWAT8x16tpBKujpuAUY_SFlcrphbPZvCwzn3c4iVQ7ACBcjUMRTj2n0_PNO--QPOB2SitRduoIADXW3_' },
  { section: 'The Suite', title: "The Hidden Estate: Goa's Most Private Sanctuary.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAidG40_w8YMSKZTqrV5m43c3lL2T9tWxhgCn2DkdD4VkUvuQNhSLiQvg9NDhLF6Xzg3yydAPzMNtrgc7TFiZaRmJyb26w3WzhffC4IaYct44bnDkMRUfLsMOhKc5sPagB51qKEX2PMziwZFTGWsqccYsyQbRfjQAE6dYJqI5GAawaCaakrXDGXiE2oOPIPwuM0PEOuagS_yTwz1DBf6DglUP5D6eV5-UYbTGM2vOgHxsbIcytpgRY0Xs7HED2Hq901GcJWYgVr2Upl' },
];

const DEFAULT_COVER = {
  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeakS4d7VAvGc94-5fbGDm5WDMQdhR0A3601e4zlDRf-B8K-W-1YpVmwXtECbAYyLLz5sLv-ke-MUUgmmIJZ1c_s3N5VG6FEVJbYQLuPgW9X6LLQ-Ou8cmxNlQDyjalx6huDiz_L9CPbKA5SpGDvYYOB7Yau4n2B2ik4yz62Xt_6g81BMwWkE5gdoYKn1ukjlhzZUvr96Zjw0CNlHq-pR5UXUU-93sc9tHTduxODiLkCXWbZhTdNTc-hrLAebS1kSCb79Xx_aAafGi',
  category: 'Cover Story',
  title: 'The New Arbiters of Indian Venture.',
  excerpt: 'How a fresh wave of operators-turned-investors is dismantling the traditional Bombay club and rewriting the rules of Series A capital.',
  byline: 'By Vikram Sethi • 12 Min Read',
};

const NAV_LEFT = ['The Founders', 'Creators', 'Wealth'];
const NAV_RIGHT = ['Future', 'The Suite', 'Bombay'];
const NAV_HREFS: Record<string, string> = {
  'The Founders': '/categories/founders',
  'Creators': '/categories/creators',
  'Wealth': '/categories/wealth',
  'Future': '/categories/future',
  'The Suite': '/categories/suite',
  'Bombay': '/categories/bombay',
};

/* ─────────────── COMPONENT ─────────────── */
export default function HomePageClient() {
  const [dateStr, setDateStr] = useState('');
  const [email, setEmail] = useState('');
  const [hpData, setHpData] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [founders, setFounders] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }).toUpperCase()
    );

    // Fetch all data in parallel
    Promise.all([
      fetch('/api/homepage').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/articles').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/founders').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/creators').then(r => r.ok ? r.json() : []).catch(() => []),
    ]).then(([hp, arts, fnd, crt]) => {
      setHpData(hp);
      setArticles(Array.isArray(arts) ? arts.filter((a: any) => a.published !== false) : []);
      setFounders(Array.isArray(fnd) ? fnd.filter((f: any) => f.status !== 'draft') : []);
      setCreators(Array.isArray(crt) ? crt.filter((c: any) => c.status !== 'draft') : []);
      setLoading(false);
    });
  }, []);

  /* ── Resolve dynamic data with fallbacks ── */
  const coverStory = hpData?.coverStory || DEFAULT_COVER;

  const editorPicks = (() => {
    if (hpData?.editorPicks?.length > 0) return hpData.editorPicks;
    // Fallback: latest 3 published articles
    if (articles.length > 0) {
      return articles.slice(0, 3).map((a: any) => ({
        href: `/articles/${a.slug}`,
        section: a.category?.replace('cat_', '') || 'TBF',
        title: a.title,
        img: a.featuredImage || DEFAULT_EDITORS_PICKS[0].img,
      }));
    }
    return DEFAULT_EDITORS_PICKS;
  })();

  const featuredWeek = (() => {
    if (hpData?.featuredWeek?.length > 0) return hpData.featuredWeek;
    // Try articles categorised across sections
    if (articles.length >= 3) {
      return articles.slice(0, 3).map((a: any) => ({
        href: `/articles/${a.slug}`,
        section: a.tags?.[0] || 'TBF Editorial',
        title: a.title,
        excerpt: a.subtitle || a.excerpt || '',
        img: a.featuredImage || DEFAULT_FEATURED_WEEK[0].img,
      }));
    }
    return DEFAULT_FEATURED_WEEK;
  })();

  const suiteItems = (() => {
    if (hpData?.suiteCarousel?.length > 0) return hpData.suiteCarousel;
    return DEFAULT_SUITE_ITEMS;
  })();

  /* ── Founders section: pick the first one with a quote ── */
  const featuredFounder = founders.length > 0 ? founders[0] : null;
  const featuredCreator = creators.length > 0 ? creators[0] : null;

  return (
    <div className="font-body text-on-surface selection:bg-accent-teal selection:text-white" style={{ backgroundColor: '#F8F8F4' }}>

      {/* ── THIN TOP BAR ── */}
      <aside className="bg-surface-container-high text-[10px] tracking-[0.2em] uppercase py-2 px-8 flex justify-between items-center border-b border-outline-variant/20">
        <div className="flex items-center gap-6">
          <span>MUMBAI, MH</span>
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-accent-teal transition-colors">share</span>
          <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-accent-teal transition-colors">rss_feed</span>
        </div>
      </aside>

      {/* ── MAIN NAV / HEADER ── */}
      <header
        className="text-white sticky top-0 z-50 flex justify-between items-center px-12 py-4 w-full"
        style={{ backgroundColor: '#0B1929' }}
      >
        {/* Left nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
          {NAV_LEFT.map((label) => (
            <Link key={label} href={NAV_HREFS[label]} className="text-white hover:text-accent-teal transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Centered Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
          <Image
            src="/logo.png"
            alt="The Bombay Forum"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right nav + dark mode icon */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
            {NAV_RIGHT.map((label) => (
              <Link key={label} href={NAV_HREFS[label]} className="text-white hover:text-accent-teal transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button className="text-white hover:text-accent-teal transition-transform active:scale-90">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1440px] mx-auto px-8 pt-16">

        {/* ── 1. MAGAZINE HERO ── */}
        <section className="flex flex-col lg:flex-row gap-12 mb-32">

          {/* Cover Story (65%) */}
          <article className="lg:w-[65%] group cursor-pointer">
            <div className="relative overflow-hidden aspect-[16/10] mb-8">
              <img
                src={coverStory.img || coverStory.image}
                alt="Cover story"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                className="absolute top-8 left-8 text-white text-[10px] font-bold tracking-widest px-4 py-1.5 uppercase font-label"
                style={{ backgroundColor: '#11262B' }}
              >
                {coverStory.category || 'Cover Story'}
              </div>
            </div>
            <div>
              <h1 className="font-headline text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-8 text-primary">
                {coverStory.title}
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed opacity-80">
                {coverStory.excerpt}
              </p>
              {coverStory.byline && (
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-accent-teal" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-label">
                    {coverStory.byline}
                  </span>
                </div>
              )}
            </div>
          </article>

          {/* Editor's Picks (35%) */}
          <div className="lg:w-[35%] flex flex-col gap-12">
            <div className="border-b border-outline-variant pb-2">
              <h2 className="text-[12px] font-bold tracking-[0.3em] uppercase text-accent-teal font-label">
                Editor's Picks
              </h2>
            </div>
            <div className="space-y-12">
              {editorPicks.map((pick: any) => (
                <Link href={pick.href} key={pick.title} className="flex gap-6 items-start group block">
                  <div className="w-32 h-32 flex-shrink-0 bg-surface-container overflow-hidden">
                    <img src={pick.img} alt={pick.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-accent-teal font-bold font-label">
                      {pick.section}
                    </span>
                    <h3 className="font-headline text-xl mt-2 leading-snug group-hover:text-accent-teal transition-colors">
                      {pick.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. FEATURED THIS WEEK ── */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-16 border-b border-outline-variant/30 pb-6">
            <h2 className="font-headline text-4xl">Featured This Week</h2>
            <Link href="/categories/founders" className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-accent-teal pb-1 hover:text-accent-teal transition-colors font-label">
              View All Stories
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {featuredWeek.map((art: any) => (
              <Link href={art.href || '#'} key={art.title}>
                <article className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-surface-container mb-8 overflow-hidden">
                    <img src={art.img || art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <span className="text-accent-teal text-[10px] font-bold uppercase tracking-widest font-label">
                    {art.section}
                  </span>
                  <h3 className="font-headline text-3xl mt-4 mb-4 leading-tight group-hover:text-accent-teal transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-body">
                    {art.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 3. THE FOUNDERS / CREATORS MAGAZINE SPREAD ── */}
        <section className="mb-32 flex flex-col lg:flex-row gap-20 items-center">
          {/* Left: Image + pull-quote overlay */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src={featuredFounder?.heroImage || featuredFounder?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW5SU1o2nzypuaLDehylYTI4qrEUsYw43QCcby-RuB5iB8MqhQqqjiv7TWwmj-b90qnxWr-ogKf3riSM6N-Mwz1ufEt6xSZ2Magfx1bNl-HqhnSRqcuDSYnwIlBQZC7AfsIlLVDxi61sXFsXfUe5tMg62oay6yYz0DKT3Xr4FxBJfrmJDpR2Tc2xOh7SBlAbEWRd3YLvTeKepUIi5E_0DHwQqwLr6l-WoaErt140J-xWY0dfMVaEpLg-QaXTRetLMZeutSeViP4Lw3'}
                alt={featuredFounder?.name || 'Mumbai skyline'}
                className="w-full aspect-[4/5] object-cover grayscale brightness-90"
              />
              {/* Pull-quote card */}
              <div className="absolute -bottom-10 -right-10 bg-white p-12 max-w-sm shadow-2xl hidden lg:block border-l-8 border-accent-teal">
                <p className="font-headline text-2xl italic text-primary mb-6">
                  "{featuredFounder?.quote || featuredFounder?.tagline || 'The next decade of global innovation won\'t happen in Silicon Valley. It\'s happening in the streets of Bengaluru and the boardrooms of Mumbai.'}"
                </p>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-teal font-label">
                  — {featuredFounder?.name || 'Ratan Tata'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial content */}
          <div className="lg:w-1/2">
            <span className="text-accent-teal text-[11px] font-bold uppercase tracking-[0.4em] block mb-8 font-label">
              The Founders
            </span>
            <h2 className="font-headline text-6xl mb-10 leading-[1.1] text-primary">
              {featuredFounder?.name
                ? `${featuredFounder.name}: ${featuredFounder.company || 'Redefining Indian Business.'}`
                : 'The Decacorn Manifesto: Why Profitability is the New Status Symbol.'}
            </h2>
            <div className="space-y-8 text-on-surface-variant leading-relaxed text-lg font-body">
              {featuredFounder?.bioParagraphs?.length > 0 ? (
                featuredFounder.bioParagraphs.slice(0, 2).map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : featuredFounder?.bio ? (
                <p>{featuredFounder.bio}</p>
              ) : (
                <>
                  <p>For the last decade, growth-at-all-costs was the North Star. Founders were celebrated for burning cash in pursuit of market share. Today, the tide has turned.</p>
                  <p>In this deep-dive, we talk to the architects of India's most resilient unicorns who have pivoted from vanity metrics to sustainable unit economics.</p>
                </>
              )}
            </div>
            <Link
              href={featuredFounder?.slug ? `/founders/${featuredFounder.slug}` : '/categories/founders'}
              className="mt-12 inline-block border-b-2 border-accent-teal pb-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-accent-teal transition-colors font-label"
            >
              Read the Full Investigation
            </Link>
          </div>
        </section>
      </main>

      {/* ── 4. SPONSORED STRIP ── */}
      <section className="py-14 px-8 mb-32 overflow-hidden relative" style={{ backgroundColor: '#11262B' }}>
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8">
            <span className="text-[9px] uppercase tracking-[0.3em] font-label" style={{ color: 'rgba(139,176,184,0.6)' }}>
              Sponsored by
            </span>
            <span className="text-white text-3xl font-headline tracking-widest opacity-90 uppercase">
              The Oberoi Group
            </span>
          </div>
          <p className="text-slate-300 font-body text-base italic max-w-md">
            "Experience the pinnacle of hospitality at the new Oberoi Mumbai penthouse suites."
          </p>
          <Link href="/spotlight" className="text-white border px-10 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-accent-teal transition-all font-label" style={{ borderColor: 'rgba(139,176,184,0.4)' }}>
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* ── 5. THE SUITE CAROUSEL ── */}
      <section className="max-w-[1440px] mx-auto px-8 mb-32">
        <div className="flex justify-between items-end mb-16 border-b border-outline-variant/30 pb-8">
          <h2 className="font-headline text-5xl">The Suite</h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container transition-colors group">
              <span className="material-symbols-outlined group-hover:text-accent-teal">chevron_left</span>
            </button>
            <button className="w-12 h-12 border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container transition-colors group">
              <span className="material-symbols-outlined group-hover:text-accent-teal">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex gap-10 overflow-x-auto pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          {suiteItems.map((item: any) => (
            <div key={item.title} className="min-w-[400px] group cursor-pointer flex-shrink-0">
              <div className="aspect-square bg-surface-container mb-8 overflow-hidden">
                <img src={item.img || item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-accent-teal font-bold font-label">{item.section}</span>
                  <h4 className="font-headline text-2xl mt-3 group-hover:text-accent-teal transition-colors">{item.title}</h4>
                </div>
                <span className="material-symbols-outlined text-accent-teal flex-shrink-0 mt-1">bookmark</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. NEWSLETTER ── */}
      <section className="py-32 px-8 text-center border-y border-outline-variant/20 mb-0" style={{ backgroundColor: 'rgba(214,233,228,0.3)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-6xl mb-8 text-primary">The Saturday Communiqué</h2>
          <p className="text-on-surface-variant font-body text-lg mb-12 opacity-80">
            Our weekly curation of business intelligence, culture, and luxury, delivered every Saturday morning to 120,000+ elite readers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0 border-b-2 border-primary">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Professional Email"
              className="flex-grow bg-transparent border-none py-5 px-0 focus:ring-0 text-xl placeholder:text-primary/30 outline-none font-body"
            />
            <button type="submit" className="py-5 px-10 text-[11px] font-bold uppercase tracking-[0.3em] hover:text-accent-teal transition-colors font-label">
              Join the Forum
            </button>
          </form>
          <p className="mt-8 text-[9px] uppercase tracking-[0.4em] font-bold italic font-label" style={{ color: 'rgba(139,176,184,0.6)' }}>
            Free to join. Opt-out anytime.
          </p>
        </div>
      </section>

      {/* ── 7. FOOTER ── */}
      <footer className="text-white pt-24 pb-12 px-12" style={{ backgroundColor: '#11262B' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 max-w-[1440px] mx-auto">
          {/* Brand Col */}
          <div className="col-span-1">
            <div className="mb-10">
              <img
                src="https://lh3.googleusercontent.com/aida/ADBb0uij5k7AVG2BPCY0MFV2493gRfkVSUaP2PmvR8DUGfsWEW3FT4ssOP7cEMCAuJ10j4mOUjPSonF-tqr25x7tWBuoYscMSBd49YGDK4ZmKDBLgR2DrHQ4bJHlVUcS0JMqoN3lCeDy0KjFlLZRJuTkCksPeXTgzT3PKaIBPl61sNTjvPqUAM4ocMzKxdtiDlT4hC48Xw4bHiLsRYkwZBUHPLe1DPL-2EDeFrdqDORLXAN2EnNN9HDr17oKTNgDgptYYtjCa_TJT7LKnYk"
                alt="TBF Logo"
                className="h-10"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 opacity-80 font-body">
              The premier digital atelier for India's high-growth entrepreneurs, celebrating the intersection of ambition, culture, and high-craft.
            </p>
            <div className="flex gap-4">
              {(['public', 'alternate_email', 'podcasts'] as const).map((icon) => (
                <a key={icon} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-teal/20 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">Sections</h5>
            {['The Founders', 'Creators', 'The Exchange', 'Future', 'The Suite'].map((l) => (
              <Link key={l} href={NAV_HREFS[l] ?? '#'} className="text-slate-300 hover:text-white transition-colors text-sm font-body">{l}</Link>
            ))}
          </div>

          {/* Corporate */}
          <div className="flex flex-col gap-5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">Corporate</h5>
            {['Masthead', 'Contact', 'Advertise', 'Careers'].map((l) => (
              <a key={l} href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-body">{l}</a>
            ))}
          </div>

          {/* Membership */}
          <div className="flex flex-col gap-5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">Membership</h5>
            {['Manage Subscription', 'Gift Membership', 'Corporate Access', 'Privacy Policy'].map((l) => (
              <a key={l} href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-body">{l}</a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1440px] mx-auto">
          <span className="text-[10px] tracking-widest uppercase text-slate-500 font-body">
            © {new Date().getFullYear()} THE BOMBAY FORUM. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-10 text-[10px] tracking-widest uppercase text-slate-500 font-body">
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
