import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getFounders } from '@/lib/firebase';
import { getAllArticles } from '@/lib/articles';

export const metadata = {
  title: 'The Founders | THE BOMBAY FORUM',
  description: "Stories of the founders building businesses that will define the next decade of India.",
};

/* reusable teal colour as a constant so TS doesn't complain */
const TEAL = '#2A9D8F';

export default async function FoundersPage() {
  const [allFounders, allArticles] = await Promise.all([
    getFounders(),
    getAllArticles({ includeRSS: true })
  ]);

  const founders = allFounders.filter((f: any) => f.status !== 'draft');
  const articles = allArticles.filter((a: any) => a.category === 'cat_founders' && a.published !== false);

  const featuredFounder = founders.length > 0 ? founders[0] : null;
  const onesToWatch = founders.length > 1 ? founders.slice(1, 6) : [];
  
  // Try to use articles, fallback to default if not enough data
  const featuredWeek = articles.length > 0 ? articles.slice(0, 3).map((a: any) => ({
    sub: a.tags?.[0] || 'FOUNDERS',
    title: a.title,
    excerpt: a.subtitle || a.excerpt || a.content?.substring(0, 100) + '...',
    author: a.author || 'TBF Editorial',
    read: a.readTime ? `${a.readTime} Min Read` : '5 Min Read',
    img: a.featuredImage || 'https://images.unsplash.com/photo-1590283603385-17ffb141ebbb?q=80&w=2000&auto=format&fit=crop',
    slug: a.slug,
    link: a.link
  })) : [
    {
      sub: 'SUSTAINABILITY',
      title: 'The circular economy of textiles.',
      excerpt: 'How Vidhi Sharma is transforming pre-loved garments into luxury upholstery for global exports.',
      author: 'Aditya Varma',
      read: '8 Min Read',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGBHl-Xssne7LqKs1LXyJXA5Z7rWEGaw2Ebn7-k0Uy5jjn8TmLstfdPUq-O8Dod5-xN0mKIA61stXK3e5W_wpJmg2sbQffMJaidAW8MQjly8ItsNC2FPCxT5XDL-HLzMdBOP1oRq8muTIK66_CQ5s_SRVNcgVsY9cNcbF-7SHpl84oSAJTt6BReUDeTY9v0OtLxYmrv6ubzV27ZT1k7h1Lu63kke-AcQvhczAc9IR2SEngpSx-RXg2aYsk9T_pPHLATap-dae7gxbw',
      slug: '#'
    },
    {
      sub: 'FINTECH',
      title: 'The democratization of credit.',
      excerpt: 'The challenge of providing credit to 500 million unbanked Indians through micro-infrastructure.',
      author: 'Sana Kapoor',
      read: '12 Min Read',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5dl50k213GKuqyOUxJOR5ZLZzTKuC89C0Q5kazW2KydXTWiRzMTR70IDDD5XgLY88yndJ9EmZL04jZhrM4f7ykocxcbpGF1VtkveTuN0wDVhaFQFU6wG7qljC3wHkx-TH9cqfuF0V43vSq_TELeUm8fAacs-x81Y5PR0YOGrAZVQmLJb0z9hlglFfwPHTpvfyp0poef1ZUlimm79Dv2BIJot-Q1lDymH9__e0WEgnYLnZCj6zrhpXUExi1_rgxY_gBLDDp4v1m4H2',
      slug: '#'
    },
    {
      sub: 'LIFESTYLE',
      title: 'Heritage as a modern brand asset.',
      excerpt: 'Redefining Indian luxury for the global stage by focusing on deep-rooted craftsmanship.',
      author: 'Rohan Das',
      read: '6 Min Read',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIFhDju-t7jhIkH9pBXMGYdWQvdM2ui73SQeNa5SJ5GIJUGRxPJVB4QuHTsUSAEHBthVpcZwtLtFvAQOnQli4-Xn8AYuSvhms6UTrL9lLGJ9GmTZAyon_OY5JAOPQ354mkVZzZlia2W_siVXIiaTlwQdBeL0xfF1vHuS9pxC5ipSDKWp0h_gz6wnWIhR1PYRU2O6yERmlN3gtWMcFXCOrmsMdPnwIpsCiKPM0KxdexfUct8mzxAaR0m7UpX7ZJ38CpUytICoEkGkLq',
      slug: '#'
    }
  ];

  const defaultOnesToWatch = [
    { name: 'Aman Mehra',  company: 'Solaris AI',   city: 'Bengaluru', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop' },
    { name: 'Isha Patil',  company: 'Vayu Health',  city: 'Pune', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop' },
    { name: 'Kabir Singh', company: 'BlockRoot',    city: 'Hyderabad', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop' },
    { name: 'Meera Joshi', company: 'Terraform',    city: 'Mumbai', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop' },
    { name: 'Zayan Mirza', company: 'Q-Core',       city: 'Delhi', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop' },
  ];

  return (
    <>
      <TopBar />
      <Header />

      {/* ── 1. HERO ── */}
      <header className="relative w-full h-[calc(100vh-100px)] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0B1929' }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL77Y80uPMF7YvDxrWCRXWGzTtbhLO0vP8MXO5C-ja0hEjWor64rNo_FgDb79p1urwj2DsNHvKjSG-fLH0M2cty6Z92Riednp3FLnMUX46RJ61sQmu05F5VgYu0c0TM2h3NCCKUFKmBxrWfuN-TZdW98Dxyi7GLiOiG2vo1afJasHOGjdzQ_Sm0rYzzFhDA_9gzzCZW-ki3MwfRjj_btTHp298J7BwA6hqw9APhCxaGPDWAwcM4HGudUdFQM8P0hiyOAP3TniDEHkj"
            alt="The Architects of India"
            className="w-full h-full object-cover opacity-60"
            style={{ filter: 'grayscale(0.3)' }}
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-12 pb-24">
          <div className="max-w-2xl">
            <span
              className="inline-block text-white px-4 py-1 text-[10px] tracking-[0.3em] font-bold uppercase mb-6 font-label"
              style={{ backgroundColor: TEAL }}
            >
              THE FOUNDERS
            </span>
            <h1 className="font-headline text-5xl md:text-8xl text-white mb-6 leading-[0.9] tracking-tighter">
              The New Architects of India.
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light font-body max-w-lg tracking-wide leading-relaxed">
              Stories of the founders building businesses that will define the next decade.
            </p>
          </div>
        </div>
      </header>

      {/* ── 2. FEATURED FOUNDER ── */}
      {featuredFounder && (
        <section className="overflow-hidden" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[800px]">
            {/* Portrait */}
            <div className="relative h-[600px] md:h-auto overflow-hidden">
              <img
                src={featuredFounder.heroImage || featuredFounder.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTzqbTCh-FLYYMPvcvTuknpMbh1Gg_9JJnyk3rpCBcvJX-TQ4-DB0Q-tKykeFf-iOItoGEDC1dx3dU68lIKbtee4jcgyJHQpTImVmVVAKNZzXjJvtIJT4hvcL5BuQequTNXY5vxuvAfh8GWewVESuFlwS3NfpjEnalbBwQJR0vk3Mo_p08BnbW5bYSL-4NyuWkG0W7TrNoOJAT9EG4cXbTNXxJZ2XIBjXcVCUkqjSmgRIauXBwB1gat3UwaPSCqL3MadKu5bZAvZb2'}
                alt={`${featuredFounder.name} Portrait`}
                className="w-full h-full object-cover brightness-90"
                style={{ filter: 'grayscale(1) brightness(0.9) contrast(1.1)' }}
              />
            </div>

            {/* Content */}
            <div
              className="flex flex-col justify-center px-6 md:px-20 py-16 md:py-20"
              style={{ backgroundColor: '#F5F5F0' }}
            >
              <span
                className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 font-label"
                style={{ color: TEAL }}
              >
                FEATURED FOUNDER
              </span>
              <h2
                className="text-4xl md:text-7xl font-headline mb-2 tracking-tighter"
                style={{ color: '#0B1929' }}
              >
                {featuredFounder.name}
              </h2>
              <p className="text-sm font-label uppercase tracking-widest text-secondary mb-8 md:mb-12">
                {featuredFounder.company} {featuredFounder.title ? ` ${featuredFounder.title}` : ''}
              </p>

              {/* Pull Quote */}
              <div className="pl-6 md:pl-8 mb-8 md:mb-12" style={{ borderLeft: `4px solid ${TEAL}` }}>
                <blockquote
                  className="text-2xl md:text-4xl font-headline italic leading-tight font-light"
                  style={{ color: '#0B1929' }}
                >
                  "{featuredFounder.quote || featuredFounder.tagline || 'The goal is to build something that lasts, not just something that grows.'}"
                </blockquote>
              </div>

              {/* Body */}
              <div className="max-w-md space-y-6 text-sm leading-relaxed font-body mb-10" style={{ color: 'rgba(11,25,41,0.8)' }}>
                {featuredFounder.bioParagraphs && featuredFounder.bioParagraphs.length > 0 ? (
                  featuredFounder.bioParagraphs.slice(0, 3).map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <p>{featuredFounder.bio}</p>
                )}
              </div>

              <Link
                href={`/founders/${featuredFounder.slug}`}
                className="inline-flex items-center font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:gap-4 font-label gap-2"
                style={{ color: TEAL }}
              >
                Read Their Story <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. FEATURED THIS WEEK ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 bg-surface">
        <div className="flex items-center gap-4 mb-16">
          <h3
            className="text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap font-label"
            style={{ color: '#0B1929' }}
          >
            FEATURED THIS WEEK
          </h3>
          <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(11,25,41,0.1)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {featuredWeek.map((art: any, index: number) => (
            <article key={index} className="group cursor-pointer">
              <Link 
                href={art.link || (art.slug !== '#' ? `/articles/${art.slug}` : '#')}
                target={art.link ? '_blank' : '_self'}
              >
                <div className="aspect-[3/4] overflow-hidden mb-8">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block font-label"
                  style={{ color: TEAL }}
                >
                  {art.sub}
                </span>
                <h4
                  className="text-3xl font-headline mb-4 leading-tight transition-colors hover:text-[#2A9D8F]"
                  style={{ color: '#0B1929' }}
                >
                  {art.title}
                </h4>
                <p className="text-sm text-secondary/80 font-body mb-6 line-clamp-3">{art.excerpt}</p>
                <div
                  className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-label"
                  style={{ color: 'rgba(82,95,114,0.6)' }}
                >
                  <span>{art.author}</span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'rgba(11,25,41,0.2)' }}
                  />
                  <span>{art.read}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── 4. ONES TO WATCH ── */}
      <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#E8ECE9' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3
            className="text-[10px] tracking-[0.4em] font-bold uppercase mb-12 font-label"
            style={{ color: '#0B1929' }}
          >
            ONES TO WATCH
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {onesToWatch.length > 0 ? onesToWatch.map((p: any) => (
              <Link key={p.id} href={`/founders/${p.slug}`} className="flex flex-col group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container-low">
                  <img
                    src={p.image || p.heroImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                </div>
                <span className="text-xl font-headline mb-1 group-hover:text-primary transition-colors" style={{ color: '#0B1929' }}>
                  {p.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest font-bold mb-1 font-label"
                  style={{ color: TEAL }}
                >
                  {p.company}
                </span>
                <span
                  className="text-[10px] font-medium font-label uppercase"
                  style={{ color: 'rgba(82,95,114,0.6)' }}
                >
                  {p.location || p.tags?.[2] || 'Mumbai'}
                </span>
              </Link>
            )) : defaultOnesToWatch.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container-low grayscale">
                  <img
                    src={p.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <span className="text-xl font-headline mb-1" style={{ color: '#0B1929' }}>
                  {p.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest font-bold mb-1 font-label"
                  style={{ color: TEAL }}
                >
                  {p.company}
                </span>
                <span
                  className="text-[10px] font-medium font-label"
                  style={{ color: 'rgba(82,95,114,0.6)' }}
                >
                  {p.city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMMUNITY DIRECTORY ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-20">
            <h3 className="text-[11px] tracking-[0.4em] font-bold uppercase whitespace-nowrap font-label text-brand-navy">
              THE COMMUNITY DIRECTORY
            </h3>
            <div className="h-[1px] w-full bg-brand-navy/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-20">
            {founders.map((p: any) => (
              <Link key={p.id} href={`/founders/${p.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden mb-8 bg-surface-container-low">
                  <img
                    src={p.image || p.heroImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-headline group-hover:text-primary transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-surface-dim font-label">
                    {p.company}
                  </p>
                  <p className="text-[9px] font-medium uppercase tracking-widest text-surface-dim/60 font-label">
                    {p.title} · {p.location || p.tags?.[2] || 'Mumbai'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SPOTLIGHT STRIP ── */}
      <section className="py-20 lg:py-24" style={{ backgroundColor: '#0B1929' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-24">
            <div className="flex-shrink-0">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-[0.1em]">
                THE OBEROI GROUP
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed tracking-wide font-body">
                A legacy of excellence spanning generations. We partner with the founders who define
                hospitality and corporate excellence, providing a stage for India's most influential
                voices to converge and create the future of Indian industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
