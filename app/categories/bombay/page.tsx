import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllBombayData } from '@/lib/firebase';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bombay | THE BOMBAY FORUM',
  description: "Chronicles of Mumbai's evolving culture, architecture, food, and the stories that define the city's soul.",
};

/* ── DEFAULTS (shown when DB is empty) ── */
const DEFAULT_HERO = {
  title: 'The City That Never Settles.',
  subtitle: "Chronicles of Mumbai's evolving culture, architecture, food, and the stories that define the city's soul.",
  ticker: [
    { label: 'AQI', value: '112', badge: 'Moderate', badgeColor: 'text-yellow-400' },
    { label: 'TRAFFIC INDEX', value: 'High', badge: 'Peak', badgeColor: 'text-red-400' },
    { label: 'LOCAL TEMP', value: '32°C', badge: 'Humid', badgeColor: 'text-blue-400' },
    { label: 'TRANSIT', value: 'Normal', badge: 'On Time', badgeColor: 'text-green-400' },
  ],
};

const DEFAULT_LEAD_STORY = {
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnXjqHsjlTXQTo482LeWLj3QI75OjDIWux9SXXJFA8ycCcVGUy4u8fpeYEWGWKKP5AirFqT9e7NsYtBHVibaSxQbTsd_ZveFxvn-kiRUMohgHCmr5pqxNX1VXlATI4dNExyAwV19e6Fz1vbESx00Mi1z_jPgE-GemJ7ZKzk-fq_c9zN7TZgWDL7lPVOCLEb0dWobK65b7vWF59XzsIqzF92DfG317L6QC5nGqSBDoZfScP1LV4Cx4cwpOY-2IVx-_Vdq4GCeuUs-Gl',
  tag: 'BOMBAY • ARCHITECTURE',
  title: 'The Art Deco Renaissance of Marine Drive.',
  author: 'ARJUN KHANNA',
  date: 'MARCH 14, 2024',
  excerpt: "Exploring the pastel facades and nautical motifs that define Mumbai's most iconic coastline in a new golden era of preservation.",
};

const DEFAULT_SIDE_STORIES = [
  { tag: 'BOMBAY • GASTRONOMY', title: 'Gateway to the Gastronomy: The Evolving Palate of Colaba.' },
  { tag: 'BOMBAY • CULTURE', title: 'The Street Photographers of Southern Tip.' },
  { tag: 'BOMBAY • HERITAGE', title: 'The Lost Mills of Central Mumbai.' },
  { tag: 'BOMBAY • URBANISM', title: 'The Coastal Road and the Changing Geography.' },
];

const DEFAULT_PULSE = [
  { title: 'Infrastructure', body: 'The new aqua line is reshaping daily commutes, drastically reducing travel time between Colaba and Seepz.' },
  { title: 'Culture', body: 'The indie music scene finds a new home in the revived acoustic halls of the Royal Opera House.' },
  { title: 'Real Estate', body: 'Luxury residential demand in the suburbs is outpacing supply, leading to a new wave of sky-high developments.' },
];

const DEFAULT_STORY_GRID = [
  { tag: 'BOMBAY • DISTRICTS', title: 'The Secrets of Fort.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4JM8Ir55bADxTD5UUwcuKTy3dsihbJ2EFK-0nRu-lqelIYZFl6wgj1PXbnG5MRDsyor3ARi3oT9jOLl0OPELnuqPhvzzTjGZOg8TLd0P2Iof3_K2w0oUptCGiotuyII-Tp0JdIH0t15o6m0jSaUYIr0Yxg8yJQU6lurgxq6SmlYeBp6naQEV73l_f476MAwy8WFL6UYqB0RNWdfxA76rkZWAUGqjJs9NlWP5HyljKpKzINArYh6xCtCrHGVkQ_6fp92Ogh-IhoIwS' },
  { tag: 'BOMBAY • HERITAGE', title: "Kala Ghoda's Revival.", image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9cpNtQww0uYa8eK8OOEN11y3ESOJoLZhRDFnAlaVvsrbn2wAIi6gxEhPAp49bkVpQdsQ51nmqWk9j75iLfgrJWnZqY82u9eDUHSD9naR2nZBeLv9WIcj3D4jjLywbrSAqI-j2cz-uGXPG8GvOYUdNCBHvCXn1mA-lkkvxZ4l0FaoTd24iu3XqQLpq3G3FjJcL6LaK9mqQvyYC0EbyBZ-_Ln8IdfORu0xUeqqU_pOUHIM5N_JJ2K61FtiRSPQ_Oqq5iO536I2UXbOJ' },
  { tag: 'BOMBAY • SOCIETY', title: 'The New Social Clubs.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7BEji4Rfxsc9uaDm92BhJKteJCpeEqIL_XbM8586WBB9DSJNJ7N9akeh95DbZaM49P7H8Lmc4c_uHiKRU9XOM8IjoIu9GgIeyhnsm9HOpwWWSaqNWWea98xLl-0pRdFpXLMG498bLbOBSOt4UqmMh1loFyPpzRA71jzNObBm3BzsvVEJgE1Z5Wr0UBJJpo1HqDjr3oxswAUQfLxTkHAC5NMZLMyWJZGkv0ZMps02UtHaCrrY30lm5qkEzjEQvRUYbmmvZYz0hmFT_' },
  { tag: 'BOMBAY • NIGHTLIFE', title: 'After Hours in Bandra.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7UCUWRzhE-9M6HKolX1RxWFaqgIJ4t6ytMqkSD7NB739-HkzX8JFaTcLikLuyBen53CPIpmLdlecWt-c8LUpmJnj2JsYfT1n5HVgA5BP3ZtKgifrHWD68EP9EfQtAcZ5OKKJ92p3he_DxiIateXgM6uphbcQI4IEV_1vIgJaIOL-1Jn3KEPAZSOTxsVQUOzU2H_Ayog6TCjxBSiR4o2TyGMfIrWXRcDnvYUpgSUOkaUU8cuopJv3VyufqiLshy5kaRjdltPHIIeah' },
  { tag: 'BOMBAY • PLACES', title: 'The Hidden Libraries.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuJ-t57AJFPTnA7vUNOLeoK3yVcipk9aOSfpCEX4MYAuUz6TnFYwpfxLxXMvDNlfgDZlX-LDt9VLg7EdRcbhS-eeDAljCMvYkzBf2yMZ-_evyT_LVEFgkEDB4NVsIbNlO_iIWsPR2Kyi2pqnXrwiMJhVJO98a9VXDDPXfPt0Lu9aM3USMkpT1fKsn9qjgxL0VKA6xHdAmgWcroRvYG4EqJrnVnanouM_Ua1LbZ18EFBMtJXCdmi_LFRIPt9Suso-XAgcRX2yBGM7_L' },
  { tag: 'BOMBAY • ESSAY', title: 'Monsoons on the Promenades.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgapYT9-rgUzI0QBVTjXn023uQZqAk2WHmcABZBL3CbfTabAjeRzwim5lDpDGzKB3Ca-v8u1jds_jyOqQRBzQWlTJV7zBebON4lue_tIAtpFp_tiXzj97T7P84-ADs9IRIHjODdfRsZT7plUlX4L_Oxf-DzrtG3hfplGmULq6ay9gHenWXCed-mCF6FA-stqLvbp9xgmxGZ2ywVB8hiYGk2d3hpo-MeNqMqMGOFYpuk88-7sYVmD28PKFdVYY5DuhzItjOQZf6nG_B' },
];

const DEFAULT_OPINION = {
  quote: '"The city doesn\'t age, it only gains more character."',
  author: "Ayesha D'Souza",
  authorTitle: 'Curator, Heritage Trust',
};

export default async function BombayPage() {
  let dbData: any = null;
  let allArticles: any[] = [];
  try {
    [dbData, allArticles] = await Promise.all([
      getAllBombayData(),
      getAllArticles({ includeRSS: true })
    ]);
  } catch (e) {
    console.error('[Bombay] Failed to load data:', e);
  }

  const bombayArticles = allArticles.filter((a: any) => a.category === 'cat_bombay' && a.published !== false);

  const hero = DEFAULT_HERO;
  const leadStory = dbData?.leadStory || DEFAULT_LEAD_STORY;
  const sideStories = dbData?.sideStories?.length > 0 ? dbData.sideStories : DEFAULT_SIDE_STORIES;
  const pulseItems = dbData?.pulseItems?.length > 0 ? dbData.pulseItems : DEFAULT_PULSE;
  let storyGrid = dbData?.storyGrid?.length > 0 ? dbData.storyGrid : DEFAULT_STORY_GRID;

  if (bombayArticles.length > 0) {
    const mapped = bombayArticles.map((a: any) => ({
      tag: a.tags?.[0] || 'BOMBAY • ARTICLE',
      title: a.title,
      image: a.featuredImage,
      link: a.link,
      slug: a.slug
    }));
    storyGrid = [...mapped, ...storyGrid].slice(0, 9);
  }
  const opinion = dbData?.opinionStrip || DEFAULT_OPINION;

  const ticker = hero.ticker;

  return (
    <>
      <TopBar />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="w-full bg-[#0B1929] text-white md:h-[calc(100vh-100px)] flex flex-col justify-center px-6 md:px-10">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 md:gap-8">
            <div>
              <span className="text-[#2DD4BF] text-xs font-bold tracking-[0.3em] uppercase border-b border-[#2DD4BF] pb-1 font-label">BOMBAY</span>
              <h1 className="text-5xl md:text-8xl mt-6 font-light leading-tight tracking-tighter font-headline italic">
                The City That Never Settles.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-2xl font-body font-extralight leading-relaxed">
                Chronicles of Mumbai's evolving culture, architecture, food, and the stories that define the city's soul.
              </p>
            </div>

            {/* City Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-t border-white/10">
              {ticker.map((item: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase font-label">{item.label}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-bold font-body">{item.value}</span>
                    <span className={`text-xs flex items-center font-body ${item.badgeColor || 'text-slate-300'}`}>{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Story Section */}
        <section className="bg-[#F5F5F0] py-20 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Story */}
            <div className="lg:col-span-2 group">
              <div className="relative overflow-hidden aspect-[16/9] bg-surface-dim">
                <img
                  alt={leadStory.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={leadStory.image}
                />
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{leadStory.tag}</span>
                <h2 className="text-5xl font-medium leading-[1.1] group-hover:text-primary transition-colors cursor-pointer font-headline">{leadStory.title}</h2>
                <div className="flex items-center gap-4 text-xs font-bold text-on-surface/60 uppercase tracking-widest font-label">
                  {leadStory.author && <span>BY {leadStory.author}</span>}
                  {leadStory.date && <span>{leadStory.date}</span>}
                </div>
                {leadStory.excerpt && (
                  <p className="text-lg text-on-surface/80 leading-relaxed font-body font-light">{leadStory.excerpt}</p>
                )}
                <button className="w-fit border-b-2 border-primary pt-2 pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-all font-label">Read Story</button>
              </div>
            </div>

            {/* Secondary Stories */}
            <div className="flex flex-col divide-y divide-on-surface/10">
              {sideStories.map((story: any, i: number) => (
                <div key={i} className={`${i === 0 ? 'pb-8' : 'py-8'} group cursor-pointer`}>
                  <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{story.tag}</span>
                  <h3 className="mt-3 text-2xl font-medium leading-snug group-hover:text-primary transition-colors font-headline">{story.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City Pulse Strip */}
        <section className="bg-surface-container py-16 px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-on-surface/50 font-label">City Pulse</h2>
              <div className="flex-grow h-[1px] bg-on-surface/10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {pulseItems.map((item: any, i: number) => (
                <div key={i} className="flex flex-col gap-4">
                  <h4 className="text-xl font-bold font-body">{item.title}</h4>
                  <p className="text-sm text-on-surface/70 leading-relaxed font-body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Grid */}
        <section className="bg-[#F5F5F0] py-24 px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-headline italic mb-16">Latest from Bombay</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
              {storyGrid.map((item: any) => (
                <Link 
                  key={item.id || item.title} 
                  href={item.link || (item.slug ? `/articles/${item.slug}` : '#')}
                  target={item.link ? '_blank' : '_self'}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-[4/3] bg-surface-dim overflow-hidden font-body relative">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={item.image}
                    />
                  </div>
                  <div className="mt-6 flex flex-col gap-2">
                    <span className="text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase font-label">{item.tag}</span>
                    <h3 className="text-2xl font-medium leading-tight group-hover:underline underline-offset-4 decoration-1 font-headline">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Opinion */}
        <section className="w-full bg-[#0B1929] py-32 px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
            <div className="w-12 h-1 bg-[#2DD4BF]"></div>
            <blockquote className="text-5xl md:text-6xl text-white font-headline italic leading-tight">
              {opinion.quote}
            </blockquote>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-body font-bold">{opinion.author}</span>
              <span className="text-slate-400 text-sm font-body uppercase tracking-[0.2em] mt-1 font-label">{opinion.authorTitle}</span>
            </div>
            <button className="bg-[#2DD4BF] text-[#0B1929] px-10 py-4 text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 font-label">
              Read the Full Essay
            </button>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-white py-24 px-10 border-t border-surface-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-headline mb-4 italic">Get the Bombay Journal — every Sunday.</h2>
            <p className="text-on-surface/60 font-body mb-10">The stories, people, and places that define Mumbai's soul, delivered directly to your inbox.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input className="flex-grow bg-surface-container-low border-0 px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface/40 font-body" placeholder="Email Address" type="email" />
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
