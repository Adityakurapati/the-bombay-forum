import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllWealthData } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wealth | THE BOMBAY FORUM',
  description: 'Capital, investment intelligence, and the philosophy of building lasting wealth in the new India.',
};

const TEAL = '#2DD4BF';

/* ── Default fallback content ── */
const DEFAULT_HERO = {
  title: 'Money. Understood.',
  description: "Markets, capital and the financial moves shaping India's next generation of wealth."
};

const DEFAULT_TICKER = {
  sensex: { value: '72,431.11', change: '0.42%' },
  nifty:  { value: '22,040.70', change: '0.38%' },
  gold:   { value: '₹66,240',   change: '0.12%' },
  usdInr: { value: '83.14',     change: '0.05%' }
};

const DEFAULT_LEAD = {
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfnt9A9WhRQDVjY4EpJE04f_mgWjcfyDG_c47Jp5Vb0XLJsS-wdbjNLDrB-9dNdW9mU0FuDuIG5CcGdqpvsVILCTFrGgfFaIpfL_FS5OqD1LpQxxZJFAAzZIcqaUkOVwzwr6amH5mDQUZ1HuPSlJL1hImfBFmHL08I4sgTw8j7IfPQCHLea2y-DDNl4EhzES5lOjg_aVVWl9ohVj9eTZxkn2vBrS0QpBJpLLX5p2b-YR6PvL1FyVt9NaTTC73-5pgMGVRvyxtyBh9w",
  category: "WEALTH • ANALYSIS",
  title: "India’s New Wealthy Are Playing a Completely Different Game.",
  author: "ARJUN KHANNA",
  date: "MARCH 14, 2024",
  excerpt: "Moving beyond traditional equities and real estate, the new generation of Indian high-net-worth individuals is diversifying into private equity, digital assets, and global alternative investments like never before.",
  slug: "#"
};

const DEFAULT_SIDE_STORIES = [
  { id: '1', category: 'WEALTH • FUNDING', title: 'The Startup Winter is Thawing: Why VC Dry Powder is Finally Moving.', slug: '#' },
  { id: '2', category: 'WEALTH • REAL ESTATE', title: "Mumbai's Sky-High Ambitions: The Premiumization of the Suburbs.", slug: '#' },
  { id: '3', category: 'WEALTH • PERSONAL FINANCE', title: 'Tax Efficiency for the Modern Portfolio: A 2024 Guide.', slug: '#' },
  { id: '4', category: 'WEALTH • GLOBAL', title: 'The Fed Pivot and the Impact on Emerging Market Liquidity.', slug: '#' }
];

const DEFAULT_PULSE = [
  { id: '1', title: 'Stock Markets', description: 'Institutional flow remains strong despite valuation concerns in mid-caps. The focus shifts toward heavyweights as volatility indices creep higher ahead of quarterly reports.' },
  { id: '2', title: 'Startup Funding', description: 'Series B rounds are seeing a resurgence as unit economics improve across the board. Fintech and Clean Energy remain the primary magnets for capital allocation.' },
  { id: '3', title: 'Real Estate', description: 'Luxury residential demand in Bangalore and Hyderabad is outpacing supply, leading to a 15% Y-o-Y increase in capital values for premium gated communities.' }
];

const DEFAULT_STORY_GRID = [
  { id: '1', category: 'WEALTH • MARKETS', title: "The Retail Investor's Paradox.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4JM8Ir55bADxTD5UUwcuKTy3dsihbJ2EFK-0nRu-lqelIYZFl6wgj1PXbnG5MRDsyor3ARi3oT9jOLl0OPELnuqPhvzzTjGZOg8TLd0P2Iof3_K2w0oUptCGiotuyII-Tp0JdIH0t15o6m0jSaUYIr0Yxg8yJQU6lurgxq6SmlYeBp6naQEV73l_f476MAwy8WFL6UYqB0RNWdfxA76rkZWAUGqjJs9NlWP5HyljKpKzINArYh6xCtCrHGVkQ_6fp92Ogh-IhoIwS", slug: "#" },
  { id: '2', category: 'WEALTH • CAPITAL', title: "Family Offices: The New Power Brokers.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9cpNtQww0uYa8eK8OOEN11y3ESOJoLZhRDFnAlaVvsrbn2wAIi6gxEhPAp49bkVpQdsQ51nmqWk9j75iLfgrJWnZqY82u9eDUHSD9naR2nZBeLv9WIcj3D4jjLywbrSAqI-j2cz-uGXPG8GvOYUdNCBHvCXn1mA-lkkvxZ4l0FaoTd24iu3XqQLpq3G3FjJcL6LaK9mqQvyYC0EbyBZ-_Ln8IdfORu0xUeqqU_pOUHIM5N_JJ2K61FtiRSPQ_Oqq5iO536I2UXbOJ", slug: "#" },
  { id: '3', category: 'WEALTH • COMMODITIES', title: "Gold's Timeless Allure in Digital Times.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7BEji4Rfxsc9uaDm92BhJKteJCpeEqIL_XbM8586WBB9DSJNJ7N9akeh95DbZaM49P7H8Lmc4c_uHiKRU9XOM8IjoIu9GgIeyhnsm9HOpwWWSaqNWWea98xLl-0pRdFpXLMG498bLbOBSOt4UqmMh1loFyPpzRA71jzNObBm3BzsvVEJgE1Z5Wr0UBJJpo1HqDjr3oxswAUQfLxTkHAC5NMZLMyWJZGkv0ZMps02UtHaCrrY30lm5qkEzjEQvRUYbmmvZYz0hmFT_", slug: "#" },
  { id: '4', category: 'WEALTH • VENTURE', title: "The Unicorn Herd: Who Survives 2025?", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7UCUWRzhE-9M6HKolX1RxWFaqgIJ4t6ytMqkSD7NB739-HkzX8JFaTcLikLuyBen53CPIpmLdlecWt-c8LUpmJnj2JsYfT1n5HVgA5BP3ZtKgifrHWD68EP9EfQtAcZ5OKKJ92p3he_DxiIateXgM6uphbcQI4IEV_1vIgJaIOL-1Jn3KEPAZSOTxsVQUOzU2H_Ayog6TCjxBSiR4o2TyGMfIrWXRcDnvYUpgSUOkaUU8cuopJv3VyufqiLshy5kaRjdltPHIIeah", slug: "#" },
  { id: '5', category: 'WEALTH • PROFILE', title: "The CEO's Guide to Wealth Preservation.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuJ-t57AJFPTnA7vUNOLeoK3yVcipk9aOSfpCEX4MYAuUz6TnFYwpfxLxXMvDNlfgDZlX-LDt9VLg7EdRcbhS-eeDAljCMvYkzBf2yMZ-_evyT_LVEFgkEDB4NVsIbNlO_iIWsPR2Kyi2pqnXrwiMJhVJO98a9VXDDPXfPt0Lu9aM3USMkpT1fKsn9qjgxL0VKA6xHdAmgWcroRvYG4EqJrnVnanouM_Ua1LbZ18EFBMtJXCdmi_LFRIPt9Suso-XAgcRX2yBGM7_L", slug: "#" },
  { id: '6', category: 'WEALTH • FOREX', title: "Rupee Resilience: Navigating the Carry Trade.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgapYT9-rgUzI0QBVTjXn023uQZqAk2WHmcABZBL3CbfTabAjeRzwim5lDpDGzKB3Ca-v8u1jds_jyOqQRBzQWlTJV7zBebON4lue_tIAtpFp_tiXzj97T7P84-ADs9IRIHjODdfRsZT7plUlX4L_Oxf-DzrtG3hfplGmULq6ay9gHenWXCed-mCF6FA-stqLvbp9xgmxGZ2ywVB8hiYGk2d3hpo-MeNqMqMGOFYpuk88-7sYVmD28PKFdVYY5DuhzItjOQZf6nG_B", slug: "#" }
];

const DEFAULT_OPINION = {
  quote: '"The next generation of Indian wealth will not be inherited. It will be built."',
  authorName: "Vikram Sethi",
  authorTitle: "Managing Director, Capital Forge",
  ctaLabel: "Read the Full Essay",
  link: "#"
};

export default async function WealthPage() {
  /* ── Fetch data ── */
  let raw: any = null;
  try {
    raw = await getAllWealthData();
  } catch (err) {
    console.error('[WealthPage] Firebase fetch failed:', err);
  }

  /* ── Merge with defaults ── */
  const hero          = raw?.hero         ? { ...DEFAULT_HERO, ...raw.hero } : DEFAULT_HERO;
  const ticker        = raw?.ticker       ? { ...DEFAULT_TICKER, ...raw.ticker } : DEFAULT_TICKER;
  const lead          = raw?.leadStory    ? { ...DEFAULT_LEAD, ...raw.leadStory } : DEFAULT_LEAD;
  const sideStories   = raw?.sideStories?.length ? raw.sideStories : DEFAULT_SIDE_STORIES;
  const pulseItems    = raw?.pulseItems?.length  ? raw.pulseItems : DEFAULT_PULSE;
  const storyGrid     = raw?.storyGrid?.length   ? raw.storyGrid : DEFAULT_STORY_GRID;
  const opinion       = raw?.opinionStrip ? { ...DEFAULT_OPINION, ...raw.opinionStrip } : DEFAULT_OPINION;

  return (
    <>
      <TopBar />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="w-full bg-[#0B1929] text-white md:h-[calc(100vh-100px)] flex flex-col justify-center px-6 md:px-10">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 md:gap-8">
            <div>
              <span className="text-[#2DD4BF] text-xs font-bold tracking-[0.3em] uppercase border-b border-[#2DD4BF] pb-1 font-label">WEALTH</span>
              <h1 className="text-5xl md:text-8xl mt-6 font-light leading-tight tracking-tighter font-headline italic">
                {hero.title}
              </h1>
              <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-2xl font-body font-extralight leading-relaxed">
                {hero.description}
              </p>
            </div>

            {/* Market Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-t border-white/10">
              {['sensex', 'nifty', 'gold', 'usdInr'].map((key) => {
                const item = ticker[key];
                const label = key === 'usdInr' ? 'USD/INR' : key === 'gold' ? 'Gold (10g)' : key === 'nifty' ? 'Nifty 50' : 'Sensex';
                const isDown = item.change?.includes('-');
                return (
                  <div key={key} className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase font-label">{label}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-bold font-body">{item.value}</span>
                      <span className={`text-xs flex items-center font-body ${isDown ? 'text-red-400' : 'text-green-400'}`}>
                        <span className="material-symbols-outlined scale-75">
                          {isDown ? 'arrow_drop_down' : 'arrow_drop_up'}
                        </span>
                        {item.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lead Story Section */}
        <section className="bg-[#F5F5F0] py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Story */}
            <div className="lg:col-span-2 group">
              <Link href={lead.slug || '#'}>
                <div className="relative overflow-hidden aspect-[16/9] bg-surface-dim">
                  <img alt={lead.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={lead.image}/>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{lead.category}</span>
                  <h2 className="text-5xl font-medium leading-[1.1] group-hover:text-primary transition-colors cursor-pointer font-headline">{lead.title}</h2>
                  <div className="flex items-center gap-4 text-xs font-bold text-on-surface/60 uppercase tracking-widest font-label">
                    <span>BY {lead.author}</span>
                    <span>{lead.date}</span>
                  </div>
                  <p className="text-lg text-on-surface/80 leading-relaxed font-body font-light">
                    {lead.excerpt}
                  </p>
                  <button className="w-fit border-b-2 border-primary pt-2 pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-all font-label">Read Story</button>
                </div>
              </Link>
            </div>

            {/* Secondary Stories */}
            <div className="flex flex-col divide-y divide-on-surface/10">
              {sideStories.map((item: any) => (
                <Link key={item.id} href={item.slug || '#'} className="py-8 first:pt-0 group cursor-pointer block">
                  <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{item.category}</span>
                  <h3 className="mt-3 text-2xl font-medium leading-snug group-hover:text-primary transition-colors font-headline">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Market Pulse Strip */}
        <section className="bg-surface-container py-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-on-surface/50 font-label">Market Pulse</h2>
              <div className="flex-grow h-[1px] bg-on-surface/10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {pulseItems.map((item: any) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <h4 className="text-xl font-bold font-body">{item.title}</h4>
                  <p className="text-sm text-on-surface/70 leading-relaxed font-body">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Grid */}
        <section className="bg-[#F5F5F0] py-20 md:py-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline italic mb-12 md:mb-16">Latest from Wealth</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-16 gap-x-12">
              {storyGrid.map((item: any) => (
                <Link key={item.id} href={item.slug || '#'} className="group cursor-pointer block">
                  <div className="aspect-[4/3] bg-surface-dim overflow-hidden font-body">
                    <img alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.image}/>
                  </div>
                  <div className="mt-6 flex flex-col gap-2">
                    <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{item.category}</span>
                    <h3 className="text-2xl font-medium leading-tight group-hover:underline underline-offset-4 decoration-1 font-headline">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Opinion */}
        <section className="w-full bg-[#0B1929] py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
            <div className="w-12 h-1 bg-[#2DD4BF]"></div>
            <blockquote className="text-4xl md:text-6xl text-white font-headline italic leading-tight">
              {opinion.quote}
            </blockquote>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-body font-bold">{opinion.authorName}</span>
              <span className="text-slate-400 text-sm font-body uppercase tracking-[0.2em] mt-1 font-label">{opinion.authorTitle}</span>
            </div>
            <Link href={opinion.link || '#'}>
              <button className="bg-[#2DD4BF] text-[#0B1929] px-10 py-4 text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 font-label">
                {opinion.ctaLabel || 'Read the Full Essay'}
              </button>
            </Link>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-white py-20 md:py-24 px-6 md:px-10 border-t border-surface-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-4 italic">Get the Wealth Brief — every Friday.</h2>
            <p className="text-on-surface/60 font-body mb-10">A curated distillation of the week's most important financial moves, delivered directly to your inbox.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input className="flex-grow bg-surface-container-low border-0 px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface/40 font-body" placeholder="Email Address" type="email"/>
              <button className="bg-primary text-white px-12 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#800018] font-label" type="submit">
                Subscribe
              </button>
            </form>
            <p className="mt-6 text-[10px] text-on-surface/40 font-body uppercase tracking-widest">By subscribing, you agree to our Terms and Privacy Policy.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
