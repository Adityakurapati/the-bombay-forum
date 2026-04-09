import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'The Suite | TBF Editorial',
  description: 'An investigation into the modern nuances of Indian luxury, from bespoke horology to heritage retreats.',
};

export default function SuitePage() {
  return (
    <>
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[795px] bg-[#11262B] flex items-end">
        <img
          alt="Luxury Penthouse View"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg5anWb0X_wLAgsAu1ogpkByr4ABGZj9bLYP_MdvxIbOuMcRR7YuNK6EN3ag9IptjV5aN-huJ-yS_D2hwOf3eTvXQcHg4sUTgcUBU251dcixW06eYNstJ0zqrTXYLt9Cc8yTZA83LFDDNK56VG5FWyakcskJmjw7_tyj_s1fxprpN6lP9pKTm4wEVy926ybr8YzedpkdJqD3Fwd7eaC8ApZYb1gJ6YsDcvVolKdLhqOfcvwiJpmH9PrWFoifZ4lAP64DP99TL5dHz5"
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
            An investigation into the modern nuances of Indian luxury, from the hushed corridors of
            heritage palaces to the precision of bespoke horology.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <nav className="sticky top-20 z-40 bg-surface/95 backdrop-blur-xl py-6 px-8 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto flex items-center justify-center overflow-x-auto whitespace-nowrap scrollbar-hide space-x-12">
          <button className="text-brand-red font-bold border-b-2 border-brand-red pb-1 uppercase tracking-widest text-xs font-label">
            All Collections
          </button>
          <button className="text-secondary hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-label">
            Hotels & Retreats
          </button>
          <button className="text-secondary hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-label">
            Design & Interiors
          </button>
          <button className="text-secondary hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-label">
            Travel
          </button>
          <button className="text-secondary hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-label">
            Watches & Style
          </button>
          <button className="text-secondary hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-label">
            Fine Dining
          </button>
        </div>
      </nav>

      {/* Content Canvas */}
      <main className="max-w-7xl mx-auto px-8 py-24 space-y-32">
        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Card 1 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden mb-6">
              <img
                alt="Bespoke Suit Detail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4b1aSVcmSDX9zTdtsvRSJTNsAM8LcZRtj1ffMEyHateqO7uRxnKSQ4xPQQ3pYf_Gfe5okkp0YA_VYgUdQ9ChPFORpX5Y-EyCv3_osRtLWDFi4vcx7QDrJ277lpukF9vr1AGN6RHx_2Hg4BB8c2V77nRwOuizRiPp3Z2mQ7lcr_rAonUcTziC0rGsKBpmSZgEQ0686MT-1RjqzyiEXw4n8kBrKqCwjkC0tPbP5sYWWHFPVoEPoJwJDefzHevpFplTpnDfGL9AKBCg9"
              />
            </div>
            <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
              The Suite — Style
            </span>
            <h3 className="text-2xl md:text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
              The Silent Language of Savile Row in Mumbai
            </h3>
            <p className="text-secondary text-sm leading-relaxed line-clamp-3">
              As bespoke tailoring finds a second home in India, we explore the craftsmen merging
              traditional British technique with heritage Indian silks.
            </p>
          </article>
          {/* Card 2 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden mb-6">
              <img
                alt="Luxury Interior Design"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdApxG1P6ieYuadCgCZ6yAao_jcHrIE4DIk0swLrHB1AnIMKnjNamdfL11Klm60ZqB5rQonyCStwlt-iKJyhgaDxinKjGwDunPn9V8uaebx7rD4CMLNjZJlAOtJmYmbT5Ju7RU-sS7vXCMsr4kCjFrebqf60Cpxz_UNVrR84QZwzhTzoU6QmQ1J5Vcl6COBHyZctj-yFAClvfZww0WKjy7AXqiyIXrVDKFZTL6mKe2o8oZDOQKzmPMlYFdjh4ach8n26mgWxvGab9B"
              />
            </div>
            <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
              The Suite — Design
            </span>
            <h3 className="text-2xl md:text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
              Modernism vs. Maximalism: The New Villa Aesthetic
            </h3>
            <p className="text-secondary text-sm leading-relaxed line-clamp-3">
              Interior designers are moving away from imported minimalism toward a textured,
              layered aesthetic that celebrates local craftsmanship.
            </p>
          </article>
          {/* Card 3 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden mb-6">
              <img
                alt="Luxury Watch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeUtF6R7BtsuLb_5NpiTsSL0flYN-c7jeptdvRQNayLleSiB2caPl4yJP8GaQDEOeNvNl0aHFHbvGfFs_J6bR5kdp4Y0Z3BgnJWX64hcrLbIBuHHB4Y9z7En0BXKRnl0nO94RY5hZX6wl_tZMLVpDO-1rlr31QnMJ0BNP4q-d__j0RHAAvA4WAq-OSYsz_VHpm4XuCOPaM11jkDjLd5dWpUj3iH4fX69fVH7jQgHwDuuj-ucV_uKPeYgNOcS3FvZKETTjQSYsDiufN"
              />
            </div>
            <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
              The Suite — Horology
            </span>
            <h3 className="text-2xl md:text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
              The Rise of the Indian Collector: Beyond the Patek
            </h3>
            <p className="text-secondary text-sm leading-relaxed line-clamp-3">
              In the quiet boardrooms of Mumbai, a new generation of collectors is hunting for
              independent watchmakers and vintage anomalies.
            </p>
          </article>
        </div>

        {/* Pull Quote */}
        <div className="relative py-12 border-l-4 border-tertiary-fixed pl-12 max-w-4xl mx-auto">
          <blockquote className="text-4xl md:text-5xl font-headline italic text-on-secondary-fixed leading-tight">
            "Luxury is not about the acquisition of objects, but the accumulation of moments that
            feel truly, singularly yours."
          </blockquote>
          <cite className="block mt-6 font-label uppercase tracking-widest text-xs text-secondary">
            — Vikram Sethi, Collector
          </cite>
        </div>

        {/* Featured Strip */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0B1929] text-white flex flex-col md:flex-row items-stretch min-h-[500px]">
          <div className="w-full md:w-1/2 relative">
            <img
              alt="Oberoi Suite"
              className="w-full h-full object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrR_NPb7gOiZoO4xAoRPQpVxPLeDg9MbHCl-6Xw8Gp822ob2fssaGJGbobZDiAcsuNrUIf36Boq6gASPy3Tdw1VofUWTq-TQLTTA1QYMWOs-B6qAdCQBtnKQGg0CPIPu5RMrQPKkoba_DE5G3ZpJn0A3f2vDOOts3YIENpWTHCq9eKoehN3BFEY5HeV4Y8Juzwn3Sr6nXqAGCe2ROSJ0J32YbkxlRX89lCGtvRywQMAnl0iXrwOOr2gWgYHNhsowjvnKUIAAgYqdXd"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 space-y-8">
            <span className="text-brand-red font-label uppercase tracking-[0.3em] text-xs font-bold">
              Deep Dive
            </span>
            <h2 className="text-5xl md:text-6xl font-headline leading-none tracking-tighter">
              The Alchemist's Ritual: A Private View of the Oberoi Suite
            </h2>
            <p className="text-slate-300 font-body text-lg max-w-lg leading-relaxed">
              Step inside the most exclusive residence in the city, where heritage hospitality meets
              futuristic digital integration. A night in Mumbai's most storied square footage.
            </p>
            <div>
              <Link
                href="/articles/alibaug-retreat"
                className="inline-block text-white uppercase tracking-widest text-xs font-bold border-b-2 border-brand-red pb-2 hover:text-brand-red transition-colors"
              >
                Read the Full Account
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <article className="flex flex-col md:flex-row gap-8 group cursor-pointer">
            <div className="w-full md:w-1/2 aspect-square overflow-hidden bg-surface-container">
              <img
                alt="Fine Dining"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9p3wyv3QZVYD9Bvr7JDcau-ckidmc3-ZUUX9y1M9ji6ZM-oeq6NWtVdDgirPkzbvL847n34alDh2G-TNbHKcYEdiNifyl4oQirPpyW79Q4ka3vthUREQJyy_H9mSMxrm6vFZV-moMvuLBnAYQB3BzT7k-0BvHOaLpLOVc5hRMBzrVTcD_Ng9vtsUUJByTdW0K6rAaHKPLL1Ww1iF7YYCU9l6DWrlwwMTve9_s_TFcVvGx96WutrnQnS6Y2ZTg67jaBITiglMeNfr5"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
                The Suite — Dining
              </span>
              <h3 className="text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
                The Evolution of the Indian Tasting Menu
              </h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                Chef Kabir Singh is reimagining coastal recipes through the lens of molecular
                gastronomy.
              </p>
              <span
                className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform"
              >
                arrow_forward
              </span>
            </div>
          </article>
          <article className="flex flex-col md:flex-row gap-8 group cursor-pointer">
            <div className="w-full md:w-1/2 aspect-square overflow-hidden bg-surface-container">
              <img
                alt="Himalayan Retreat"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDipMS0_cGBdImqmBG_BqBlnEVOAKMtPCWAewwJaHB28FgTv_EZHxQQQsR8it27OSNd5u8QJruW2USSc8mkmJUcAQcx36u4TGy20UY7qHe9eZ6jxGP5sYCjiqlNJmKC146enqiqTph6vz0F0kfvdqCXxRoNpzZX64XRL8IDtfDzlqOexk5K8oXR_IgriXamK1XJvLCXXvcRn8EL6i41cHuZ5pdCwqrrrMgFQhSlVFdFrep80q1bO7rRbWkU9yoG9PKgeFkqxGUItbRy"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
                The Suite — Retreats
              </span>
              <h3 className="text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors">
                High-Altitude Solitude: The New Spa Frontier
              </h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                Why India's ultra-high-net-worth individuals are heading to the Himalayas for
                digital detox.
              </p>
              <span
                className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform"
              >
                arrow_forward
              </span>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
