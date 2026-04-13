import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getFounderBySlug, getFounders, getArticles } from '@/lib/firebase';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const founder = await getFounderBySlug(slug);
  if (!founder) {
    return { title: 'Founder Not Found | THE BOMBAY FORUM' };
  }
  return {
    title: founder.metaTitle || `${founder.name} | The Founders Series | THE BOMBAY FORUM`,
    description: founder.metaDescription || founder.bio || `${founder.title} of ${founder.company}`,
  };
}

export default async function FounderPage({ params }: PageProps) {
  const { slug } = await params;
  const [founder, allArticles] = await Promise.all([
    getFounderBySlug(slug),
    getArticles()
  ]);

  if (!founder) {
    notFound();
  }

  // Build bio paragraphs
  const bioParagraphs = founder.bioParagraphs?.length
    ? founder.bioParagraphs
    : founder.bio
    ? [founder.bio]
    : [];

  // Build stats
  const stats = founder.stats?.length
    ? founder.stats
    : [
        { label: 'COMPANY', value: founder.company || '—' },
        { label: 'ROLE', value: founder.title || '—' },
      ];

  // Build editorial sections
  const editorialSections = founder.editorialSections || [];

  // Build tags
  const tags = founder.tags?.length
    ? founder.tags
    : [founder.company?.toUpperCase(), founder.title?.toUpperCase()].filter(Boolean);

  // Build archive items
  const archiveItems = founder.archiveItems || [];

  // Fetch other founders for archive section if no archive items
  let otherFounders: any[] = [];
  if (archiveItems.length === 0) {
    const allFounders = await getFounders();
    otherFounders = allFounders
      .filter((f: any) => f.id !== founder.id)
      .slice(0, 3);
  }

  // Fetch associated articles
  const associatedArticles = allArticles.filter(
    (a: any) => a.associatedProfileId === founder.id && a.published !== false
  );

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* HERO */}
        <section className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-100px)]">
          {/* Portrait */}
          <div className="w-full md:w-1/2 bg-slate-900 overflow-hidden">
            {(founder.heroImage || founder.image) && (
              <img
                alt={`${founder.name} — high contrast studio portrait`}
                className="w-full h-full object-cover grayscale contrast-125"
                src={founder.heroImage || founder.image}
              />
            )}
          </div>
          {/* Content */}
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center" style={{ backgroundColor: '#F5F5F0' }}>
            <div className="mb-6">
              <span
                className="text-white text-[10px] font-bold tracking-[0.2em] px-3 py-1 font-label"
                style={{ backgroundColor: '#11262B' }}
              >
                THE FOUNDERS
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl font-headline tracking-tight leading-none mb-4">
              {founder.name}
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] mb-12 font-label" style={{ color: '#11262B' }}>
              {founder.company?.toUpperCase()} · {founder.title?.toUpperCase()}
            </p>
            {(founder.quote || founder.tagline) && (
              <div className="border-l-4 pl-8 mb-12" style={{ borderColor: '#11262B' }}>
                <blockquote className="text-3xl font-headline italic text-on-surface leading-tight">
                  &ldquo;{founder.quote || founder.tagline}&rdquo;
                </blockquote>
              </div>
            )}
            <div className="space-y-6 text-on-surface-variant font-body leading-relaxed max-w-xl">
              {bioParagraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        {stats.length > 0 && (
          <section className="py-16 px-8 md:px-24" style={{ backgroundColor: '#11262B' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat: any) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="text-slate-400 text-[10px] tracking-[0.2em] font-bold font-label">
                    {stat.label}
                  </span>
                  <span className="text-white text-3xl font-headline">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Article Body */}
        <article className="bg-white py-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Intro text from tagline/bio */}
            {founder.tagline && (
              <p className="text-xl md:text-2xl font-body leading-relaxed text-on-surface mb-16">
                {founder.tagline}
              </p>
            )}

            {/* Editorial Sections */}
            {editorialSections.map((section: any, idx: number) => (
              <div key={idx} className="mb-16">
                <h2 className="text-3xl font-headline mb-8 text-on-surface">{section.heading}</h2>
                <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                  {section.paragraphs?.map((p: string, pi: number) => (
                    <p key={pi} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>

                {/* Section image */}
                {section.image && (
                  <div className="my-12 -mx-6 md:-mx-24 overflow-hidden">
                    <img
                      alt={section.imageAlt || section.heading}
                      className="w-full aspect-video object-cover"
                      src={section.image}
                    />
                    {section.imageCaption && (
                      <p className="mt-4 font-label text-[10px] tracking-widest text-secondary uppercase text-center px-6">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* Section pull quote */}
                {section.pullQuote && (
                  <blockquote className="text-5xl md:text-6xl font-headline italic leading-tight my-16 text-on-primary-fixed-variant">
                    &ldquo;{section.pullQuote}&rdquo;
                  </blockquote>
                )}

                {/* Section highlight stat */}
                {section.highlightStat && (
                  <div className="bg-surface-container-low p-12 my-12 text-center">
                    <span className="text-slate-500 text-[10px] tracking-widest block mb-4 uppercase font-label">
                      {section.highlightLabel || ''}
                    </span>
                    <h3 className="text-6xl md:text-7xl font-headline" style={{ color: '#11262B' }}>
                      {section.highlightStat}
                    </h3>
                  </div>
                )}
              </div>
            ))}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-24">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold border border-outline px-4 py-2 hover:bg-on-background hover:text-white transition-colors cursor-pointer font-label"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio */}
            {(founder.authorName) && (
              <div className="flex items-center gap-6 p-8 bg-surface-container-lowest border-t border-b border-outline-variant/30 mb-24">
                {founder.authorImage && (
                  <img
                    alt={`${founder.authorName}`}
                    className="w-20 h-20 rounded-full object-cover"
                    src={founder.authorImage}
                  />
                )}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1 font-label">
                    Written By
                  </span>
                  <h4 className="text-xl font-headline">{founder.authorName}</h4>
                  {founder.authorBio && (
                    <p className="text-sm text-on-surface-variant font-body">
                      {founder.authorBio}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* ── ASSOCIATED ARTICLES ── */}
        {associatedArticles.length > 0 && (
          <section className="py-24 px-8 md:px-24 bg-surface">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-6 mb-16">
                <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap font-label text-brand-navy">
                  IN CONVERSATION
                </h3>
                <div className="h-[1px] w-full bg-brand-navy/10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {associatedArticles.map((art: any) => (
                  <Link key={art.id} href={`/articles/${art.slug}`} className="group block">
                    <div className="aspect-[16/9] overflow-hidden mb-6 bg-surface-container-low">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary mb-3 block font-label">
                      {art.tags?.[0] || 'FEATURED'}
                    </span>
                    <h4 className="text-2xl font-headline group-hover:text-primary transition-colors mb-3">
                      {art.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 font-body mb-4">
                      {art.subtitle || art.excerpt}
                    </p>
                    <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/40 uppercase font-label">
                      {art.readTime} MIN READ
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* From the Archive */}
        {(archiveItems.length > 0 || otherFounders.length > 0) && (
          <section className="bg-surface-container-low py-24 px-8 md:px-24">
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-center mb-16 font-label">
              FROM THE ARCHIVE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {archiveItems.length > 0
                ? archiveItems.map((item: any) => (
                    <div key={item.title} className="group cursor-pointer">
                      <div className="aspect-[4/5] overflow-hidden mb-6 bg-white">
                        {item.img && (
                          <img
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            src={item.img}
                          />
                        )}
                      </div>
                      <h4 className="text-2xl font-headline mb-2">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant font-body">{item.sub}</p>
                    </div>
                  ))
                : otherFounders.map((f: any) => (
                    <Link
                      key={f.id}
                      href={`/founders/${f.slug}`}
                      className="group block"
                    >
                      <div className="aspect-[4/5] overflow-hidden mb-6 bg-surface-container-low">
                        <img
                          src={f.image || f.heroImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'}
                          alt={f.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <h4 className="text-2xl font-headline group-hover:text-primary transition-colors mb-1">
                        {f.name}
                      </h4>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-label">
                        {f.company}
                      </p>
                    </Link>
                  ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="py-32 px-8 text-center bg-white border-t border-outline-variant/10">
          <span className="text-[10px] font-bold tracking-[0.5em] mb-8 block text-slate-500 uppercase font-label">
            Weekly Dispatch
          </span>
          <h2 className="text-6xl md:text-8xl font-headline mb-12 tracking-tighter">
            The Saturday Communiqué
          </h2>
          <p className="max-w-xl mx-auto text-on-surface-variant mb-12 font-body">
            Essential insights into the minds of the people building the future. No noise. Just the
            signals that matter.
          </p>
          <form className="max-w-md mx-auto flex gap-0">
            <input
              className="w-full bg-surface-container-high border-none px-6 py-4 text-[10px] tracking-widest focus:ring-0 outline-none font-label"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button
              className="text-white px-8 py-4 text-[10px] font-bold tracking-widest transition-colors font-label"
              style={{ backgroundColor: '#11262B' }}
              type="submit"
            >
              SUBSCRIBE
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
