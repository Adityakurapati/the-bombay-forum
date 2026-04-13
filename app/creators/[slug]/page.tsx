import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCreatorBySlug, getCreators, getArticles } from '@/lib/firebase';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const creator = await getCreatorBySlug(slug);
  if (!creator) {
    return { title: 'Creator Not Found | THE BOMBAY FORUM' };
  }
  return {
    title: creator.metaTitle || `${creator.name} | Creator Profile | THE BOMBAY FORUM`,
    description: creator.metaDescription || creator.bio,
  };
}

export default async function CreatorPage({ params }: PageProps) {
  const { slug } = await params;
  const [creator, allArticles] = await Promise.all([
    getCreatorBySlug(slug),
    getArticles()
  ]);

  if (!creator) {
    notFound();
  }

  // Bio paragraphs
  const bioParagraphs = creator.bioParagraphs?.length
    ? creator.bioParagraphs
    : creator.bio
    ? [creator.bio]
    : [];

  // Social labels
  const socialLabels = creator.socialLabels?.length
    ? creator.socialLabels
    : Object.keys(creator.socialLinks || {}).map((k: string) => k.toUpperCase());

  // Editorial sections
  const editorialSections = creator.editorialSections || [];

  // Work images
  const workImages = creator.workImages || [];

  // Tags
  const tags = creator.tags?.length
    ? creator.tags
    : [creator.specialization?.toUpperCase(), creator.location?.toUpperCase()].filter(Boolean);

  // Network creators from data or fetch other creators
  let networkCreators = creator.networkCreators || [];
  if (networkCreators.length === 0) {
    const allCreators = await getCreators();
    networkCreators = allCreators
      .filter((c: any) => c.id !== creator.id)
      .slice(0, 4)
      .map((c: any) => ({
        name: c.name,
        role: c.specialization || c.title || '',
        image: c.image || c.heroImage || '',
        slug: c.slug,
      }));
  }

  // Fetch associated articles
  const associatedArticles = allArticles.filter(
    (a: any) => a.associatedProfileId === creator.id && a.published !== false
  );

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Hero Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[795px]">
          <div className="relative overflow-hidden h-[530px] md:h-auto">
            {(creator.heroImage || creator.image) && (
              <img
                alt={`${creator.name} — portrait`}
                className="w-full h-full object-cover"
                src={creator.heroImage || creator.image}
              />
            )}
          </div>
          <div className="bg-surface-container-low flex flex-col justify-center px-8 md:px-20 py-16">
            <span className="font-label tracking-[0.3em] text-xs uppercase text-secondary mb-6 block">
              {creator.specialization?.toUpperCase() || creator.title?.toUpperCase() || 'CREATOR'}
              {creator.location ? ` · ${creator.location.toUpperCase()}` : ''}
            </span>
            <h1 className="font-headline text-6xl md:text-8xl leading-none tracking-tight mb-8">
              {creator.name}
            </h1>
            {(creator.heroDescription || creator.bio) && (
              <p className="font-body text-lg text-secondary leading-relaxed mb-8 max-w-lg">
                {creator.heroDescription || creator.bio}
              </p>
            )}
            {socialLabels.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12">
                {socialLabels.map((label: string) => (
                  <span
                    key={label}
                    className="px-6 py-2 bg-white text-[10px] tracking-widest font-bold uppercase border border-outline-variant/20 cursor-pointer hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            {(creator.quote || creator.tagline) && (
              <div className="border-l-4 border-brand-teal pl-8 mb-12">
                <p className="font-headline italic text-2xl text-on-surface leading-snug">
                  &ldquo;{creator.quote || creator.tagline}&rdquo;
                </p>
              </div>
            )}
            <div className="space-y-6 font-body text-on-surface/80 leading-relaxed max-w-xl">
              {bioParagraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href="#work"
              className="mt-12 inline-flex items-center space-x-4 font-label uppercase tracking-widest text-sm font-bold group"
            >
              <span>Explore Their Work</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* Editorial Body */}
        <article className="bg-white py-24 px-6">
          <div className="max-w-[720px] mx-auto">
            {/* Editorial Sections */}
            {editorialSections.map((section: any, idx: number) => (
              <section key={idx} className="mb-20">
                <h3 className="font-headline text-4xl mb-8">{section.heading}</h3>
                <div className="font-body text-lg leading-loose text-on-surface/90 space-y-6">
                  {section.paragraphs?.map((p: string, pi: number) => (
                    <p key={pi} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}

                  {/* Section image */}
                  {section.image && (
                    <figure className="my-12">
                      <img
                        alt={section.imageAlt || section.heading}
                        className="w-full aspect-video object-cover"
                        src={section.image}
                      />
                      {section.imageCaption && (
                        <figcaption className="mt-4 font-label text-[10px] tracking-widest text-secondary uppercase text-center">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              </section>
            ))}

            {/* Pull Quote */}
            {creator.pullQuote && (
              <section className="mb-20 py-16 border-y border-outline-variant/10">
                <div className="border-l-4 border-brand-teal pl-10">
                  <h4 className="font-headline text-4xl italic mb-4">
                    &ldquo;{creator.pullQuote}&rdquo;
                  </h4>
                  {creator.pullQuoteCite && (
                    <cite className="font-label text-xs uppercase tracking-widest text-secondary not-italic">
                      — {creator.pullQuoteCite}
                    </cite>
                  )}
                </div>
              </section>
            )}

            {/* The Work */}
            <section className="mb-20" id="work">
              <h3 className="font-headline text-4xl mb-6">The Work</h3>
              {creator.workDescription && (
                <p className="font-body text-lg mb-12 text-on-surface/80">
                  {creator.workDescription}
                </p>
              )}
              {workImages.length > 0 && (
                <div className="grid grid-cols-12 gap-4 mb-12">
                  {workImages.map((img: any, i: number) => (
                    <div
                      key={i}
                      className={`${img.span || 'col-span-12'} h-80 overflow-hidden`}
                    >
                      <img
                        alt={img.alt || 'Work image'}
                        className="w-full h-full object-cover"
                        src={img.src}
                      />
                    </div>
                  ))}
                </div>
              )}
              {creator.highlightStat && (
                <div className="bg-surface-container py-12 px-8 flex flex-col items-center justify-center text-center">
                  <span className="font-headline text-7xl text-primary mb-2">{creator.highlightStat}</span>
                  {creator.highlightLabel && (
                    <span className="font-label tracking-[0.3em] text-xs uppercase font-bold">
                      {creator.highlightLabel}
                    </span>
                  )}
                </div>
              )}
            </section>

            {/* Works list (from original data model) */}
            {creator.works && creator.works.length > 0 && !workImages.length && (
              <section className="mb-20">
                <h3 className="font-headline text-4xl mb-8">Notable Works</h3>
                <ul className="space-y-3 font-body text-lg text-on-surface/80">
                  {creator.works.map((work: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-brand-teal rounded-full flex-shrink-0" />
                      {work}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-12 border-t border-outline-variant/20">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold tracking-widest font-label border border-on-surface/10 px-4 py-1 text-secondary uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio */}
            {creator.authorName && (
              <div className="mt-20 flex items-center space-x-6 p-8 bg-surface-bright border border-outline-variant/10">
                {creator.authorImage && (
                  <img
                    alt={`${creator.authorName}`}
                    className="w-16 h-16 rounded-full object-cover"
                    src={creator.authorImage}
                  />
                )}
                <div>
                  <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase block mb-1">
                    PROFILE BY
                  </span>
                  <h5 className="font-headline text-xl">{creator.authorName}</h5>
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
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-3 block font-label">
                      {art.tags?.[0] || 'CREATORS'}
                    </span>
                    <h4 className="text-2xl font-headline group-hover:text-brand-teal transition-colors mb-3">
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

        {/* Creator Network Strip */}
        {networkCreators.length > 0 && (
          <section className="bg-surface py-24 px-8 border-t border-outline-variant/10">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-headline text-4xl">The Atelier Network</h2>
                <Link
                  href="/categories/creators"
                  className="font-label text-xs tracking-widest uppercase border-b-2 border-primary pb-1"
                >
                  View All Creators
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {networkCreators.map((c: any) => (
                  <Link
                    key={c.name}
                    href={c.slug ? `/creators/${c.slug}` : '#'}
                    className="group cursor-pointer block"
                  >
                    <div className="aspect-[4/5] overflow-hidden mb-4">
                      {c.image && (
                        <img
                          alt={c.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                          src={c.image}
                        />
                      )}
                    </div>
                    <span className="font-label text-[10px] tracking-widest text-secondary uppercase">
                      {c.role}
                    </span>
                    <h4 className="font-headline text-2xl mt-2">{c.name}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section
          className="py-32 px-8 text-center text-white"
          style={{ backgroundColor: '#0B1929' }}
        >
          <div className="max-w-2xl mx-auto">
            <span className="font-label tracking-[0.4em] text-xs uppercase text-brand-red mb-6 block font-bold">
              ESSENTIAL DISPATCH
            </span>
            <h2 className="font-headline text-5xl md:text-6xl mb-8 leading-tight">
              The Saturday Communiqué
            </h2>
            <p className="font-body text-white/60 text-lg mb-12">
              Weekly meditations on cinema, architecture, and the evolving soul of Mumbai. Delivered
              every Saturday at dawn.
            </p>
            <form className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto">
              <input
                className="flex-1 bg-white/5 border-none text-white font-label text-xs tracking-widest px-6 py-5 placeholder:text-white/30 focus:ring-1 focus:ring-brand-red outline-none"
                placeholder="YOUR EMAIL ADDRESS"
                type="email"
              />
              <button
                className="text-white font-label text-xs tracking-widest font-bold px-10 py-5 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C8102E' }}
                type="submit"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
