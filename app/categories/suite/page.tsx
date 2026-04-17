import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllSuiteData } from '@/lib/firebase';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';
import { SuiteFilterableGrid } from '@/components/suite/SuiteFilterableGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Suite | TBF Editorial',
  description: 'An investigation into the modern nuances of Indian luxury, from bespoke horology to heritage retreats.',
};

/* ── DEFAULTS ── */
const DEFAULT_HERO = {
  label: 'Editorial Special',
  title: 'Living Well, Deliberately.',
  subtitle: 'An investigation into the modern nuances of Indian luxury, from the hushed corridors of heritage palaces to the precision of bespoke horology.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5anWb0X_wLAgsAu1ogpkByr4ABGZj9bLYP_MdvxIbOuMcRR7YuNK6EN3ag9IptjV5aN-huJ-yS_D2hwOf3eTvXQcHg4sUTgcUBU251dcixW06eYNstJ0zqrTXYLt9Cc8yTZA83LFDDNK56VG5FWyakcskJmjw7_tyj_s1fxprpN6lP9pKTm4wEVy926ybr8YzedpkdJqD3Fwd7eaC8ApZYb1gJ6YsDcvVolKdLhqOfcvwiJpmH9PrWFoifZ4lAP64DP99TL5dHz5',
};

const DEFAULT_CARDS = [
  {
    tag: 'The Suite — Style',
    title: 'The Silent Language of Savile Row in Mumbai',
    excerpt: 'As bespoke tailoring finds a second home in India, we explore the craftsmen merging traditional British technique with heritage Indian silks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4b1aSVcmSDX9zTdtsvRSJTNsAM8LcZRtj1ffMEyHateqO7uRxnKSQ4xPQQ3pYf_Gfe5okkp0YA_VYgUdQ9ChPFORpX5Y-EyCv3_osRtLWDFi4vcx7QDrJ277lpukF9vr1AGN6RHx_2Hg4BB8c2V77nRwOuizRiPp3Z2mQ7lcr_rAonUcTziC0rGsKBpmSZgEQ0686MT-1RjqzyiEXw4n8kBrKqCwjkC0tPbP5sYWWHFPVoEPoJwJDefzHevpFplTpnDfGL9AKBCg9',
  },
  {
    tag: 'The Suite — Design',
    title: 'Modernism vs. Maximalism: The New Villa Aesthetic',
    excerpt: 'Interior designers are moving away from imported minimalism toward a textured, layered aesthetic that celebrates local craftsmanship.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdApxG1P6ieYuadCgCZ6yAao_jcHrIE4DIk0swLrHB1AnIMKnjNamdfL11Klm60ZqB5rQonyCStwlt-iKJyhgaDxinKjGwDunPn9V8uaebx7rD4CMLNjZJlAOtJmYmbT5Ju7RU-sS7vXCMsr4kCjFrebqf60Cpxz_UNVrR84QZwzhTzoU6QmQ1J5Vcl6COBHyZctj-yFAClvfZww0WKjy7AXqiyIXrVDKFZTL6mKe2o8oZDOQKzmPMlYFdjh4ach8n26mgWxvGab9B',
  },
  {
    tag: 'The Suite — Horology',
    title: 'The Rise of the Indian Collector: Beyond the Patek',
    excerpt: 'In the quiet boardrooms of Mumbai, a new generation of collectors is hunting for independent watchmakers and vintage anomalies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeUtF6R7BtsuLb_5NpiTsSL0flYN-c7jeptdvRQNayLleSiB2caPl4yJP8GaQDEOeNvNl0aHFHbvGfFs_J6bR5kdp4Y0Z3BgnJWX64hcrLbIBuHHB4Y9z7En0BXKRnl0nO94RY5hZX6wl_tZMLVpDO-1rlr31QnMJ0BNP4q-d__j0RHAAvA4WAq-OSYsz_VHpm4XuCOPaM11jkDjLd5dWpUj3iH4fX69fVH7jQgHwDuuj-ucV_uKPeYgNOcS3FvZKETTjQSYsDiufN',
  },
];

const DEFAULT_PULL_QUOTE = {
  quote: '"Luxury is not about the acquisition of objects, but the accumulation of moments that feel truly, singularly yours."',
  cite: '— Vikram Sethi, Collector',
};

const DEFAULT_STRIP = {
  label: 'Deep Dive',
  title: "The Alchemist's Ritual: A Private View of the Oberoi Suite",
  body: "Step inside the most exclusive residence in the city, where heritage hospitality meets futuristic digital integration. A night in Mumbai's most storied square footage.",
  link: '/articles/alibaug-retreat',
  linkText: 'Read the Full Account',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5anWb0X_wLAgsAu1ogpkByr4ABGZj9bLYP_MdvxIbOuMcRR7YuNK6EN3ag9IptjV5aN-huJ-yS_D2hwOf3eTvXQcHg4sUTgcUBU251dcixW06eYNstJ0zqrTXYLt9Cc8yTZA83LFDDNK56VG5FWyakcskJmjw7_tyj_s1fxprpN6lP9pKTm4wEVy926ybr8YzedpkdJqD3Fwd7eaC8ApZYb1gJ6YsDcvVolKdLhqOfcvwiJpmH9PrWFoifZ4lAP64DP99TL5dHz5',
};

const DEFAULT_SECOND_ROW = [
  {
    tag: 'The Suite — Dining',
    title: 'The Evolution of the Indian Tasting Menu',
    excerpt: 'Chef Kabir Singh is reimagining coastal recipes through the lens of molecular gastronomy.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9p3wyv3QZVYD9Bvr7JDcau-ckidmc3-ZUUX9y1M9ji6ZM-oeq6NWtVdDgirPkzbvL847n34alDh2G-TNbHKcYEdiNifyl4oQirPpyW79Q4ka3vthUREQJyy_H9mSMxrm6vFZV-moMvuLBnAYQB3BzT7k-0BvHOaLpLOVc5hRMBzrVTcD_Ng9vtsUUJByTdW0K6rAaHKPLL1Ww1iF7YYCU9l6DWrlwwMTve9_s_TFcVvGx96WutrnQnS6Y2ZTg67jaBITiglMeNfr5',
  },
  {
    tag: 'The Suite — Retreats',
    title: 'High-Altitude Solitude: The New Spa Frontier',
    excerpt: "Why India's ultra-high-net-worth individuals are heading to the Himalayas for digital detox.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDipMS0_cGBdImqmBG_BqBlnEVOAKMtPCWAewwJaHB28FgTv_EZHxQQQsR8it27OSNd5u8QJruW2USSc8mkmJUcAQcx36u4TGy20UY7qHe9eZ6jxGP5sYCjiqlNJmKC146enqiqTph6vz0F0kfvdqCXxRoNpzZX64XRL8IDtfDzlqOexk5K8oXR_IgriXamK1XJvLCXXvcRn8EL6i41cHuZ5pdCwqrrrMgFQhSlVFdFrep80q1bO7rRbWkU9yoG9PKgeFkqxGUItbRy',
  },
];

export default async function SuitePage() {
  let dbData: any = null;
  let allArticles: any[] = [];
  try {
    [dbData, allArticles] = await Promise.all([
      getAllSuiteData(),
      getAllArticles({ includeRSS: true })
    ]);
  } catch (e) {
    console.error('[Suite] Failed to load data:', e);
  }

  const suiteArticles = allArticles.filter((a: any) => a.category === 'cat_suite' && a.published !== false);

  const hero = DEFAULT_HERO;
  let featuredCards = dbData?.featuredCards?.length > 0 ? dbData.featuredCards : DEFAULT_CARDS;

  if (suiteArticles.length > 0) {
    const mapped = suiteArticles.map((a: any) => ({
      tag: a.tags?.[0] || 'THE SUITE • ARTICLE',
      title: a.title,
      excerpt: a.subtitle || a.excerpt,
      image: a.featuredImage,
      link: a.link,
      slug: a.slug
    }));
    featuredCards = [...mapped, ...featuredCards].slice(0, 6);
  }
  const pullQuote = dbData?.pullQuote || DEFAULT_PULL_QUOTE;
  const featuredStrip = dbData?.featuredStrip || DEFAULT_STRIP;
  const secondRow = dbData?.secondRow?.length > 0 ? dbData.secondRow : DEFAULT_SECOND_ROW;

  return (
    <>
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-100px)] bg-[#11262B] flex items-end">
        <img
          alt="Luxury Penthouse View"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={hero.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5anWb0X_wLAgsAu1ogpkByr4ABGZj9bLYP_MdvxIbOuMcRR7YuNK6EN3ag9IptjV5aN-huJ-yS_D2hwOf3eTvXQcHg4sUTgcUBU251dcixW06eYNstJ0zqrTXYLt9Cc8yTZA83LFDDNK56VG5FWyakcskJmjw7_tyj_s1fxprpN6lP9pKTm4wEVy926ybr8YzedpkdJqD3Fwd7eaC8ApZYb1gJ6YsDcvVolKdLhqOfcvwiJpmH9PrWFoifZ4lAP64DP99TL5dHz5'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-20">
          <span className="text-tertiary-fixed-dim font-label uppercase tracking-[0.3em] text-sm mb-4 block">
            Editorial Special
          </span>
          <h1 className="text-white text-7xl md:text-9xl font-headline leading-[0.9] tracking-tighter max-w-4xl">
            Living Well, Deliberately.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-body mt-8 max-w-xl leading-relaxed">
            An investigation into the modern nuances of Indian luxury, from the hushed corridors of heritage palaces to the precision of bespoke horology.
          </p>
        </div>
      </section>

      {/* Sticky Bar and Filtered Grid */}
      <SuiteFilterableGrid initialCards={featuredCards} />

      {/* Content Canvas (Remaining Sections) */}
      <main className="max-w-7xl mx-auto px-8 pb-32 space-y-32">
        {/* Pull Quote */}
        <div className="relative py-12 border-l-4 border-tertiary-fixed pl-12 max-w-4xl mx-auto">
          <blockquote className="text-4xl md:text-5xl font-headline italic text-on-secondary-fixed leading-tight">
            {pullQuote.quote}
          </blockquote>
          <cite className="block mt-6 font-label uppercase tracking-widest text-xs text-secondary">
            {pullQuote.cite}
          </cite>
        </div>

        {/* Featured Strip */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0B1929] text-white flex flex-col md:flex-row items-stretch min-h-[500px]">
          <div className="w-full md:w-1/2 relative">
            <img
              alt={featuredStrip.title}
              className="w-full h-full object-cover opacity-90"
              src={featuredStrip.image}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 space-y-8">
            <span className="text-brand-red font-label uppercase tracking-[0.3em] text-xs font-bold">
              {featuredStrip.label}
            </span>
            <h2 className="text-5xl md:text-6xl font-headline leading-none tracking-tighter">
              {featuredStrip.title}
            </h2>
            <p className="text-slate-300 font-body text-lg max-w-lg leading-relaxed">
              {featuredStrip.body}
            </p>
            <div>
              <Link
                href={featuredStrip.link || '#'}
                className="inline-block text-white uppercase tracking-widest text-xs font-bold border-b-2 border-brand-red pb-2 hover:text-brand-red transition-colors"
              >
                {featuredStrip.linkText || 'Read the Full Account'}
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {secondRow.map((item: any, i: number) => (
            <article key={i} className="flex flex-col md:flex-row gap-8 group cursor-pointer">
              <div className="w-full md:w-1/2 aspect-square overflow-hidden bg-surface-container">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={item.image}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
                  {item.tag}
                </span>
                <h3 className="text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">{item.excerpt}</p>
                <span className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
