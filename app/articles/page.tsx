import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Articles | THE BOMBAY FORUM',
  description: 'The latest stories, insights, and editorial from The Bombay Forum and our curated partners.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles({ includeRSS: true });
  
  // Filter for published ones
  const publishedArticles = articles.filter(a => a.published !== false);
  
  const leadArticle = publishedArticles[0];
  const remainingArticles = publishedArticles.slice(1);

  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-[#F8F8F4] min-h-screen">
        {/* Page Title Section */}
        <section className="px-6 md:px-10 py-12 md:py-20 border-b border-on-surface/5">
          <div className="max-w-7xl mx-auto">
             <span className="text-accent-teal text-[11px] font-bold uppercase tracking-[0.4em] block mb-4 font-label">
              EDITORIAL
            </span>
            <h1 className="font-headline text-5xl md:text-8xl italic tracking-tighter text-primary">
              The Archive.
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-2xl mt-6 opacity-80 leading-relaxed">
              A collection of original reporting, analysis, and curated intelligence from across the globe.
            </p>
          </div>
        </section>

        {/* Lead Story */}
        {leadArticle && (
          <section className="px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
              <Link 
                href={leadArticle.link || `/articles/${leadArticle.slug}`} 
                target={leadArticle.link ? '_blank' : '_self'}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                  <img 
                    src={leadArticle.featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop'} 
                    alt={leadArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {leadArticle.link && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold tracking-widest uppercase font-label text-primary">
                      CURATED FEED
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-accent-teal text-[10px] font-bold uppercase tracking-widest font-label">
                    {leadArticle.category?.replace('cat_', '').toUpperCase() || 'INSIGHTS'}
                  </span>
                  <h2 className="font-headline text-4xl md:text-6xl mt-6 mb-8 leading-[1.05] group-hover:text-accent-teal transition-colors">
                    {leadArticle.title}
                  </h2>
                  <p className="text-xl text-on-surface-variant leading-relaxed font-body opacity-80 mb-10">
                    {leadArticle.subtitle || leadArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="h-[1px] w-12 bg-accent-teal" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-label">
                      {leadArticle.author} • {leadArticle.readTime || 5} Min Read
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Article Grid */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-t border-on-surface/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
              {remainingArticles.map((article) => (
                <Link 
                  key={article.id} 
                  href={article.link || `/articles/${article.slug}`}
                  target={article.link ? '_blank' : '_self'}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                    <img 
                      src={article.featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop'} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    {article.link && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase font-label text-primary">
                        CURATED
                      </div>
                    )}
                  </div>
                  <span className="text-accent-teal text-[10px] font-bold uppercase tracking-widest font-label">
                    {article.category?.replace('cat_', '').toUpperCase() || 'INSIGHTS'}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mt-4 mb-4 leading-tight group-hover:text-accent-teal transition-colors italic">
                    {article.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-body opacity-80">
                    {article.subtitle || article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 md:py-32 px-6 md:px-10 text-center border-t border-on-surface/5" style={{ backgroundColor: 'rgba(214,233,228,0.2)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-headline text-4xl md:text-6xl mb-8 text-primary">The Forum Intelligence.</h2>
            <p className="text-on-surface-variant font-body text-lg mb-12 opacity-80">
              Join 120,000+ pioneers receiving our curated intelligence on business, culture, and high-craft.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 border-b-2 border-primary max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="YOUR PROFESSIONAL EMAIL" 
                className="flex-grow bg-transparent border-none py-5 px-0 focus:ring-0 text-lg placeholder:text-primary/30 outline-none font-body"
              />
              <button 
                type="submit"
                className="py-5 px-10 text-[11px] font-bold uppercase tracking-[0.3em] hover:text-accent-teal transition-colors font-label"
              >
                Join the Forum
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
