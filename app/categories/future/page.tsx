'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const TEAL = '#006A6A';

/* ── Static fallback data (shown while loading / if DB empty) ── */
const DEFAULT_LEAD = {
  leadImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ8VomQSVjynppc7Q_7mDwN_dpLcgOM_QBTWJBdXbL9zk7ZNaE5MOWxAW304LITOHoQoxQHXhg_p3LyxAzw02gbJTk-txBj7ORNI7uJWmP6bi_QacVN0UKvrSFKtQzIB4sz7EPRC6eWImhzicgO5XGac0jxTKGLDQxtlwy1zyHvUasHwRZCD2wq6x48VkRJL6F6wJbkf4Hxs8VU5zG2g46RnyeFew41oqldPEWp_l3BH77aFPTR6U034v16Rc6siltnMemKbSncJW5',
  leadCategory: 'FUTURE',
  leadTitle: 'The Intelligence Sovereign: India\'s Path to AGI.',
  leadAuthor: 'Aarav Malhotra',
  leadDate: 'October 24, 2024',
  leadExcerpt: 'As the global race for artificial general intelligence accelerates, India is carving out a unique strategy that prioritizes sovereign data over raw compute power.',
  leadLinkLabel: 'Read the Essay',
  leadSlug: '#',
};

const DEFAULT_SIDE_ITEMS = [
  { id: '1', sub: 'AI & ETHICS', title: 'The Digital Dharma: Coding Ethics into Silicon.', body: 'How ancient philosophical frameworks are finding new life in neural network alignment.' },
  { id: '2', sub: 'MOBILITY', title: 'Beyond the Battery: The Hydrogen Leap.', body: "Why India's logistics backbone is skipping the EV revolution for a cleaner alternative." },
  { id: '3', sub: 'SPACE ECONOMY', title: 'Low Orbit, High Stakes.', body: "The private players redefining India's commercial presence in the cosmos." },
  { id: '4', sub: 'FUTURE OF WORK', title: 'The Post-Office Paradigm.', body: 'Exploring the rise of decentralized autonomous organizations in the Indian tech sector.' },
];

const DEFAULT_SIGNAL_CARDS = [
  { id: '1', title: 'Vertical Farming in Tier-2 Cities', body: 'Localized food security is outperforming centralized logistics in cost-efficiency metrics.', signal: true },
  { id: '2', title: 'Metaverse Real Estate Hype', body: 'Capital flows are pivoting back to physical infrastructure as virtual land value cools.', signal: false },
  { id: '3', title: 'Programmable Biology Hubs', body: "Bengaluru's pivot to bio-manufacturing is mirroring the software boom of the 90s.", signal: true },
  { id: '4', title: 'Decentralized Power Grids', body: 'Solar-microgrids are finally decoupling rural prosperity from the main grid.', signal: true },
];

const DEFAULT_STORY_GRID = [
  { id: '1', sub: 'BIOTECH', title: 'The Longevity Dividend.', body: 'How Indian labs are tackling the genetic markers of metabolic aging.', read: '8 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzhYBj4CFKFUydM25qNvpIEuT8gLau5E4-14AWt3Jvv3MHGzjTdsrDC_NWZuEiZwIT3tc2OeKYyQZuFhWS5bGWqoGMRHJxQJtYRjab_b5CUz9hoXRjiMfEs1YX2wWytiDsGD8IHoSJL1jXzM9WvtDdhRlgZloY-W98LmsKJv4vXp_VyRKqO4H206iyI1TMQRQiLh8VeifpyWdnF53wmtyJzqZWFzLm_3uAW2-CDTIWzD6d04BKmFeCXiHQNRoiQmmN7gjqoszoDtA9' },
  { id: '2', sub: 'SPACE', title: 'The New Himalayan Observatory.', body: 'Ladakh emerges as the premier global hub for deep-space monitoring.', read: '12 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBkq55-l9uEkybc17qX73LpdP__I5_wMSY9r7DkJr86c5NAHqgH6xXw_VGfgpMcti50Ls1i3wxqEUjm6GZaYfP_oYDDzDcj8XIxLhuyTI2iFMeqzS2lZAluAdvpa0_BfxQNWVCQC2BCJQKk3E1yJSSWqKJ4LuMWWKFoCm8b86kO-c5n9jET_J3Fm_gJLcX837K3ikckjG0xMMFA1daWH7Px3XgYGoGXQk2H4W64FMw7CTZD-0gHoYGoJUc3Trogy-EMy-TZHo1nuNd' },
  { id: '3', sub: 'CLIMATE', title: 'The Cooling Crisis.', body: "Passive cooling architectural revolutions in India's hottest cities.", read: '15 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCol2voQUSOmX__kiIIzMs4xv6a7IdyBqUYl0fW_5RKJmcnxOiCX5ghJOXPoq9_mCyyIA2DjA2wJdrzsbaeY8MfxjBaRcSY416k_DSkKEqJUACg_OgfPILDWPDZJMsB7MdOv8cla6KTLcpAkHA0ctkeku8uORbov9ua7sgP3_BgdytKBFhRfzYb8c1WVmqoNtoN3eA0UvG8osHUUSz3xKRY8Rg2kqk1GL2hNcQDHSmoOWrYqGnd-2uUzv-apSwWgiPbsEzE2Bs9Bnms' },
  { id: '4', sub: 'FUTURE OF WEALTH', title: 'Tokenized Heritage.', body: 'Fractional ownership of tangible assets is redefining the middle-class portfolio.', read: '10 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuRrcpRE2dbbwCAoVIWDd5nsZJ1UlkSDTvWYDpAvrNs6AILXzIcm1Xlrnu2qot5z3Gf_s_oJ-WEl7VggGZnd-TaSL8aSalELDbTRHPBaV8yeNoUPy4qHBV_g8yxc9Zuef8MEVfJjEiG8HWxFQlNTgfi-gPtC-0x7T0PCex2wapLUlJGpXWzlnO9HJf_A8__pteIMNGrA4SapvgtkHfYtKVTRoj-Xap7XF1ruik1xG31-XVOPtVb4Dg5fI0_Pj2RD30gf3sHnbqIOlH' },
  { id: '5', sub: 'AUTONOMOUS SYSTEMS', title: 'The Last-Mile Automata.', body: "How robotic delivery is finally cracking the chaos of Mumbai's streets.", read: '7 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJreNJJPVXCctMPKZnlXZR3mHgNvOJjtwq8GQw1wZnyMQYjOwk0fM2RdRC9suRoFq3xbRpl6YEiVqHsg0olDpKHK8wKYhqnrVz4Y-fqLsWMESBVNKc442lkq7Hg6g0DIB5Usadc6VUkuPE9MmEAOFQYK242lx576mbv74kJ1kUUuoaSjuxQY0sPctWATK-GZiRabxtry70X3dCe-FFBgGNlTuB9sV2HJr8hUPpe-U8ng8W3TXWUhWjXdh9NuwzY-Emzkw-NLDBTHK5' },
  { id: '6', sub: 'AI', title: 'Silicon Bharat.', body: 'Inside the top-secret mission to manufacture indigenous high-end AI chips.', read: '18 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAq7NiOv1nEWIafFQiACFmRwA4mXt4AWqPnuQ6ON_avFpeed4X5rQKejYK0ZzCxtjs6MXKMZHGqtsbbjJougcsdCRs4qzMDnzF0PjxLvjlVQTvL0_FV2u5M7yc-1X9Z65RfIEzpQS71kdbCS2T0FktjwQB_OXIBfwEqqaAr54G29ZiflDaNWGMaPBcBKdRUVgg9UArqMre_Es0IEVk3q8RrOVmp8TpgYJvEwM5TWgHgvjGaVrfiTXPGuYNsZ-d_Z1fkZZvWSCF7zNw' },
];

const DEFAULT_OPINION = {
  quote: '"The next generation of Indian wealth will not be inherited. It will be built."',
  attribution: '— ROHINI RAO, PRINCIPAL AT AKASH VENTURES',
  linkLabel: 'Read the Full Essay',
  linkSlug: '#',
};

/* ── Types ── */
type SideItem    = { id: string; sub: string; title: string; body: string };
type SignalCard  = { id: string; title: string; body: string; signal: boolean };
type StoryItem   = { id: string; sub: string; title: string; body: string; read: string; img: string };
type LeadStory   = typeof DEFAULT_LEAD;
type OpinionStrip = typeof DEFAULT_OPINION;

/* ── Skeleton helpers ── */
function SideItemSkeleton() {
  return (
    <div className="flex flex-col border-t border-outline-variant/30 py-6 animate-pulse">
      <div className="w-20 h-2 bg-surface-container-highest mb-2" />
      <div className="w-full h-4 bg-surface-container-highest mb-2" />
      <div className="w-3/4 h-3 bg-surface-container-highest" />
    </div>
  );
}
function SignalCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest p-10 flex flex-col justify-between min-h-[300px] border-b-4 border-outline-variant animate-pulse">
      <div className="space-y-3">
        <div className="w-full h-5 bg-surface-container-highest" />
        <div className="w-3/4 h-3 bg-surface-container-highest" />
        <div className="w-1/2 h-3 bg-surface-container-highest" />
      </div>
      <div className="w-16 h-6 bg-surface-container-highest mt-6" />
    </div>
  );
}
function StoryItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-surface-container-highest mb-6" />
      <div className="w-16 h-2 bg-surface-container-highest mb-3" />
      <div className="w-full h-5 bg-surface-container-highest mb-4" />
      <div className="w-3/4 h-3 bg-surface-container-highest mb-2" />
      <div className="w-1/2 h-3 bg-surface-container-highest" />
    </div>
  );
}

export default function FuturePage() {
  const [lead, setLead] = useState<LeadStory>(DEFAULT_LEAD);
  const [sideItems, setSideItems] = useState<SideItem[]>([]);
  const [signalCards, setSignalCards] = useState<SignalCard[]>([]);
  const [storyGrid, setStoryGrid] = useState<StoryItem[]>([]);
  const [opinion, setOpinion] = useState<OpinionStrip>(DEFAULT_OPINION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/future')
      .then((r) => r.json())
      .then((data) => {
        if (data?.leadStory)   setLead({ ...DEFAULT_LEAD, ...data.leadStory });
        if (data?.sideItems?.length)   setSideItems(data.sideItems);
        if (data?.signalCards?.length) setSignalCards(data.signalCards);
        if (data?.storyGrid?.length)   setStoryGrid(data.storyGrid);
        if (data?.opinionStrip) setOpinion({ ...DEFAULT_OPINION, ...data.opinionStrip });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Use defaults while loading so layout never collapses */
  const displaySide    = loading || !sideItems.length    ? DEFAULT_SIDE_ITEMS    : sideItems;
  const displaySignal  = loading || !signalCards.length  ? DEFAULT_SIGNAL_CARDS  : signalCards;
  const displayStory   = loading || !storyGrid.length    ? DEFAULT_STORY_GRID    : storyGrid;

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* ── Hero (static) ── */}
        <section className="relative h-[707px] w-full overflow-hidden" style={{ backgroundColor: '#0B1929' }}>
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Futuristic Mumbai skyline at twilight"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmPae1J4q1JAMpooKxGPa1lRTA9irx0Kwr3-KxoJ_tK0pRPyqIXX0yHc-sxsiIuOKt1i9nDAIb9DDQwm1L-SwQsv2QLz4NmcddcqkhxPCYOfK6o_tdnNVXrrJdbOGJZ3ERcjC5lhKGy9LrRtMzyTEjseJq0nYdzrW9DyLAcDJ4VmlVjPV5IR8yxlp2hE-JTpE9cSvmIwC6MeluuSfgxAZ2brMVEdV853cCM6RBF9p3piUODKs2rhdGrgxIuJB3szjaWQA52uPLuEUl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-transparent to-transparent" />
          <div className="absolute bottom-20 left-12 max-w-4xl">
            <span className="font-label uppercase tracking-[0.3em] text-xs font-bold mb-6 block" style={{ color: TEAL }}>
              FUTURE
            </span>
            <h1 className="font-headline text-7xl md:text-9xl text-white font-bold leading-tight -tracking-tight mb-6">
              What Comes Next.
            </h1>
            <p className="font-headline italic text-2xl md:text-3xl text-white/80 max-w-2xl leading-relaxed">
              Technology, ideas and forces shaping the world India will live in.
            </p>
          </div>
        </section>

        {/* ── Lead Story ── */}
        <section className="bg-surface-container-lowest py-24 px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main */}
            <div className="lg:w-3/5 group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden mb-8">
                {loading ? (
                  <div className="w-full h-full bg-surface-container-highest animate-pulse" />
                ) : (
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={lead.leadTitle}
                    src={lead.leadImage}
                  />
                )}
              </div>
              <span className="font-label uppercase tracking-widest text-xs font-bold mb-4 block" style={{ color: TEAL }}>
                {lead.leadCategory}
              </span>
              {loading ? (
                <div className="space-y-3 mb-6">
                  <div className="w-full h-8 bg-surface-container-highest animate-pulse" />
                  <div className="w-4/5 h-8 bg-surface-container-highest animate-pulse" />
                </div>
              ) : (
                <h2 className="font-headline text-5xl md:text-6xl font-bold mb-6 text-on-surface leading-tight">
                  {lead.leadTitle}
                </h2>
              )}
              <div className="flex items-center gap-4 mb-6 font-label text-xs uppercase tracking-widest text-secondary">
                <span>{lead.leadAuthor}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: TEAL }} />
                <span>{lead.leadDate}</span>
              </div>
              <p className="font-body text-lg text-secondary mb-8 max-w-2xl leading-relaxed">
                {lead.leadExcerpt}
              </p>
              <Link href={lead.leadSlug} className="font-label font-bold flex items-center gap-2 group/link" style={{ color: TEAL }}>
                {lead.leadLinkLabel}
                <span className="transition-transform duration-300 group-hover/link:translate-x-2">→</span>
              </Link>
            </div>

            {/* Side Stack */}
            <div className="lg:w-2/5 flex flex-col">
              {loading
                ? [1, 2, 3, 4].map((i) => <SideItemSkeleton key={i} />)
                : displaySide.map((item) => (
                    <div key={item.id} className="flex flex-col border-t border-outline-variant/30 py-6 group cursor-pointer">
                      <span className="font-label uppercase tracking-widest text-[10px] font-bold mb-2" style={{ color: TEAL }}>
                        {item.sub}
                      </span>
                      <h3 className="font-headline text-2xl font-bold mb-2 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-secondary line-clamp-2">{item.body}</p>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* ── Signal vs Noise ── */}
        <section className="bg-surface-container-high py-24 px-12">
          <div className="max-w-7xl mx-auto">
            <span className="font-label uppercase tracking-[0.4em] text-xs font-bold text-secondary mb-12 block text-center">
              SIGNAL VS NOISE
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading
                ? [1, 2, 3, 4].map((i) => <SignalCardSkeleton key={i} />)
                : displaySignal.map((card) => (
                    <div
                      key={card.id}
                      className="bg-surface-container-lowest p-10 flex flex-col justify-between min-h-[300px] border-b-4"
                      style={{ borderBottomColor: card.signal ? TEAL : '#bac7dd' }}
                    >
                      <div>
                        <h4 className="font-headline text-2xl font-bold mb-4">{card.title}</h4>
                        <p className="font-body text-sm text-secondary leading-relaxed mb-6">{card.body}</p>
                      </div>
                      <span
                        className="text-white font-label text-[10px] font-bold tracking-[0.2em] py-1 px-3 w-fit"
                        style={{ backgroundColor: card.signal ? TEAL : '#525f72' }}
                      >
                        {card.signal ? 'SIGNAL' : 'NOISE'}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* ── Story Grid ── */}
        <section className="bg-surface py-24 px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-5xl font-bold">Latest from Future</h2>
            <div className="h-[1px] flex-grow mx-8 bg-outline-variant/30 hidden md:block" />
            <Link
              href="#"
              className="font-label text-xs uppercase tracking-widest font-bold border-b-2 pb-1"
              style={{ color: TEAL, borderBottomColor: TEAL }}
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
            {loading
              ? [1, 2, 3, 4, 5, 6].map((i) => <StoryItemSkeleton key={i} />)
              : displayStory.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-square overflow-hidden mb-6">
                      <img
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        alt={item.title}
                        src={item.img}
                      />
                    </div>
                    <span className="font-label uppercase tracking-widest text-[10px] font-bold mb-3 block" style={{ color: TEAL }}>
                      {item.sub}
                    </span>
                    <h3 className="font-headline text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed mb-4">{item.body}</p>
                    <span className="font-label text-[10px] text-outline uppercase tracking-widest">{item.read}</span>
                  </div>
                ))}
          </div>
        </section>

        {/* ── Opinion Strip ── */}
        <section className="py-32 px-12 text-center overflow-hidden relative" style={{ backgroundColor: '#0B1929' }}>
          <div className="max-w-4xl mx-auto relative z-10">
            {loading ? (
              <div className="space-y-6 animate-pulse">
                <div className="w-full h-12 bg-white/10 mx-auto" />
                <div className="w-3/4 h-12 bg-white/10 mx-auto" />
                <div className="w-48 h-4 bg-white/10 mx-auto" />
              </div>
            ) : (
              <>
                <blockquote className="font-headline italic text-4xl md:text-6xl text-white leading-tight mb-12">
                  {opinion.quote}
                </blockquote>
                <p className="font-label uppercase tracking-[0.3em] text-sm text-white/60 mb-8">
                  {opinion.attribution}
                </p>
                <Link href={opinion.linkSlug} className="font-label font-bold flex items-center justify-center gap-2 group/link" style={{ color: TEAL }}>
                  {opinion.linkLabel}
                  <span className="transition-transform duration-300 group-hover/link:translate-x-2">→</span>
                </Link>
              </>
            )}
          </div>
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border"
            style={{ borderColor: `${TEAL}33` }}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
