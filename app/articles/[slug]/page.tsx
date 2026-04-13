import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getArticleBySlug, getArticles } from '@/lib/firebase';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found | THE BOMBAY FORUM' };
  }
  return {
    title: `${article.title} | THE BOMBAY FORUM`,
    description: article.excerpt || article.subtitle,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles (same category, excluding current)
  const allArticles = await getArticles();
  const related = allArticles
    .filter((a: any) => a.category === article.category && a.id !== article.id && a.published)
    .slice(0, 3);

  // Split content into paragraphs for rendering
  const paragraphs = (article.content || '').split('\n\n').filter((p: string) => p.trim());

  // Calculate read time
  const readTime = article.readTime || Math.max(1, Math.ceil((article.content || '').split(' ').length / 200));

  // Format date
  const dateStr = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '';

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Article Header */}
        <section className="px-6 pt-12 pb-8 bg-surface">
          <span className="inline-block px-3 py-1 bg-brand-teal text-brand-navy text-[10px] font-label font-bold tracking-[0.2em] mb-6">
            {(article.category || 'EDITORIAL').toUpperCase()}
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-brand-navy mb-6 italic">
            {article.title}
          </h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-8">
            {article.subtitle || article.excerpt}
          </p>
          <div className="flex items-center gap-4 border-t border-on-surface/5 pt-6">
            <div className="w-10 h-10 bg-surface-container-highest flex-shrink-0 overflow-hidden">
              {article.authorImage ? (
                <img
                  alt={article.author}
                  className="w-full h-full object-cover"
                  src={article.authorImage}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-on-surface-variant font-label">
                  {(article.author || 'A').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <span className="block text-sm font-label font-bold uppercase tracking-wider text-brand-navy">
                {article.author}
              </span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">
                {dateStr} • {readTime} Min Read
              </span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {article.featuredImage && (
          <section className="w-full">
            <div className="aspect-[16/9] w-full bg-surface-container-highest overflow-hidden">
              <img
                alt={article.title}
                className="w-full h-full object-cover"
                src={article.featuredImage}
              />
            </div>
            <div className="px-6 py-4 italic text-sm font-headline text-on-surface-variant bg-surface-container-low">
              {article.subtitle || article.excerpt}
            </div>
          </section>
        )}

        {/* Article Body */}
        <article className="px-6 py-12 max-w-2xl mx-auto space-y-8">
          {paragraphs.map((paragraph: string, index: number) => {
            // First paragraph gets drop-cap styling
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="font-body text-lg leading-relaxed first-letter:text-5xl first-letter:font-headline first-letter:text-brand-navy first-letter:mr-3 first-letter:float-left"
                >
                  {paragraph}
                </p>
              );
            }
            return (
              <p key={index} className="font-body text-lg leading-relaxed text-on-surface-variant">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Author Bio */}
        <section className="mx-6 my-12 p-8 bg-surface-container-low flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-surface-container-highest">
            {article.authorImage ? (
              <img
                alt={article.author}
                className="w-full h-full object-cover"
                src={article.authorImage}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-on-surface-variant font-headline">
                {(article.author || 'A').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h3 className="font-headline text-2xl font-bold text-brand-navy">{article.author}</h3>
          <span className="font-label text-[10px] uppercase tracking-widest text-brand-teal mb-4 block">
            {article.authorBio || 'Contributing Writer'}
          </span>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="py-16" style={{ backgroundColor: 'rgba(227,227,222,0.3)' }}>
            <div className="px-6 mb-8 flex justify-between items-end">
              <h2 className="font-label text-xs font-bold tracking-[0.2em] text-brand-navy uppercase">
                MORE ARTICLES
              </h2>
              <span className="material-symbols-outlined text-brand-navy">arrow_forward</span>
            </div>
            <div className="flex overflow-x-auto no-scrollbar px-6 gap-6">
              {related.map((item: any) => (
                <Link href={`/articles/${item.slug}`} key={item.id} className="flex-shrink-0 w-72 block">
                  <div className="aspect-[3/4] mb-4 overflow-hidden bg-surface-container-highest">
                    {item.featuredImage && (
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover"
                        src={item.featuredImage}
                      />
                    )}
                  </div>
                  <span className="font-label text-[9px] font-bold text-brand-teal uppercase tracking-widest">
                    {(item.category || '').toUpperCase()}
                  </span>
                  <h4 className="font-headline text-xl font-bold text-brand-navy mt-2 italic">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="px-6 py-16 text-center" style={{ backgroundColor: 'rgba(139,176,184,0.2)' }}>
          <h2 className="font-headline text-3xl font-bold text-brand-navy italic mb-2">
            The Saturday Communiqué
          </h2>
          <p className="font-body text-sm text-brand-navy/70 mb-8 max-w-xs mx-auto">
            Elite insights delivered to your inbox every Saturday morning. Exclusively for the
            discerning reader.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <input
              className="bg-surface border-none p-4 text-xs font-label tracking-widest focus:ring-1 focus:ring-brand-navy outline-none"
              placeholder="YOUR EMAIL ADDRESS"
              type="email"
            />
            <button
              className="text-white p-4 text-xs font-label font-bold tracking-[0.3em] uppercase"
              style={{ backgroundColor: '#0B1929' }}
            >
              SUBSCRIBE
            </button>
          </div>
        </section>
      </main>

      {/* Article Footer */}
      <footer className="px-6 py-16" style={{ backgroundColor: '#0B1929' }}>
        <div className="grid grid-cols-2 gap-y-12 mb-16">
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">
              THE SECTIONS
            </h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/categories/founders" className="hover:text-brand-teal transition-colors">Founders</Link></li>
              <li><Link href="/categories/creators" className="hover:text-brand-teal transition-colors">Creators</Link></li>
              <li><Link href="/categories/wealth" className="hover:text-brand-teal transition-colors">Wealth</Link></li>
              <li><Link href="/categories/future" className="hover:text-brand-teal transition-colors">Future</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">
              THE SUITE
            </h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/categories/bombay" className="hover:text-brand-teal transition-colors">Bombay</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">The Communiqué</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">SUPPORT</h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/policies" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies" className="hover:text-brand-teal transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="flex flex-col justify-end">
            <Link href="/">
              <span className="text-5xl font-headline text-white uppercase tracking-tighter leading-none">
                T<span className="text-brand-red">B</span>F
              </span>
            </Link>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5">
          <p className="text-[9px] font-label text-white/30 tracking-[0.3em] uppercase">
            © 2024 THE BOMBAY FORUM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </>
  );
}
