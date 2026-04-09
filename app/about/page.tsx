import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { TopBar } from '@/components/TopBar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About | THE BOMBAY FORUM',
  description:
    'The Bombay Forum is an independent editorial platform for India\'s builders, thinkers, and tastemakers.',
};

const SECTIONS_GRID = [
  { sub: 'VENTURE', title: 'The Founders', desc: 'Profiles of the visionaries redefining the Indian industrial landscape.', href: '/categories/founders' },
  { sub: 'CULTURE', title: 'Creators', desc: 'The artists and thinkers shaping the new aesthetic of the subcontinent.', href: '/categories/creators' },
  { sub: 'CAPITAL', title: 'Wealth', desc: 'Deep dives into the movements of capital and new economic power centers.', href: '/categories/wealth' },
  { sub: 'HORIZON', title: 'Future', desc: 'Analyzing the technological and social shifts of the next decade.', href: '/categories/future' },
  { sub: 'PREMIUM', title: 'The Suite', desc: 'Executive intelligence and luxury lifestyle for the global Indian.', href: '/categories/suite' },
  { sub: 'LOCAL', title: 'Bombay', desc: 'The pulse of our home city: architecture, policy, and urban life.', href: '/categories/bombay' },
];

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="pt-[104px]">
        {/* Manifesto Hero */}
        <section className="py-40 px-12" style={{ backgroundColor: '#0B1929' }}>
          <div className="max-w-4xl mx-auto">
            <span className="block text-brand-teal text-[10px] tracking-[0.3em] uppercase mb-8 font-bold font-label">
              ABOUT
            </span>
            <h1 className="text-white text-7xl md:text-8xl leading-[0.92] tracking-tighter mb-10 font-headline">
              We Cover the India That's Being Built.
            </h1>
            <p className="text-white/60 text-xl max-w-xl leading-relaxed font-body">
              The Bombay Forum is an independent editorial platform for India's builders, thinkers, and tastemakers.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-32 px-12" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <div className="border-l-4 border-brand-teal pl-12 py-12">
              <blockquote className="text-4xl md:text-5xl italic text-on-secondary-fixed leading-tight font-headline">
                "TBF exists at the intersection of ambition, culture, and high-craft. It is not a news feed. It is a point of view."
              </blockquote>
              <cite className="block mt-8 font-label uppercase tracking-widest text-xs text-secondary not-italic">
                — The Editorial Manifesto
              </cite>
            </div>
          </div>
        </section>

        {/* Our Sections Grid */}
        <section className="bg-white py-24 px-12">
          <div className="max-w-7xl mx-auto">
            <div className="border-b border-outline-variant/30 mb-16 pb-4">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-on-surface-variant font-label">
                OUR SECTIONS
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {SECTIONS_GRID.map((section, i) => (
                <Link
                  key={section.title}
                  href={section.href}
                  className={`block p-8 border-surface-container-highest hover:bg-surface-container transition-colors duration-300 border-b border-r ${
                    i % 3 === 2 ? 'border-r-0' : ''
                  } ${i >= 3 ? 'border-b-0 md:border-b-0' : ''}`}
                  style={{ backgroundColor: '#F4F4EF' }}
                >
                  <span className="block text-brand-teal text-[10px] tracking-[0.3em] uppercase mb-4 font-bold font-label">
                    {section.sub}
                  </span>
                  <h3 className="text-2xl font-headline mb-3" style={{ color: '#0f1c2c' }}>
                    {section.title}
                  </h3>
                  <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                    {section.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-32 px-12" style={{ backgroundColor: '#0B1929' }}>
          <div className="max-w-4xl mx-auto text-white">
            <span className="block text-brand-teal text-[10px] tracking-[0.3em] uppercase mb-12 font-bold font-label">
              WHAT WE BELIEVE
            </span>
            <div className="space-y-16">
              {[
                { h: 'Independence over access.', p: 'We prioritize critical distance over the comfort of corporate boardrooms. Truth is found in the gaps between the press releases.' },
                { h: 'Depth over volume.', p: 'The world doesn\'t need more news; it needs more understanding. We publish fewer stories to ensure every word carries weight.' },
                { h: 'Craft over clicks.', p: 'Design and writing are inseparable. We treat our digital canvas with the same reverence as a master lithographic print.' },
              ].map((item) => (
                <div key={item.h}>
                  <h3 className="text-4xl font-headline mb-4 leading-tight">{item.h}</h3>
                  <p className="text-sm font-body text-slate-400 leading-relaxed max-w-2xl">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work With Us CTA */}
        <section className="py-24 px-12 text-center" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-headline text-primary mb-6">Want to be part of TBF?</h2>
            <p className="text-lg font-body text-on-surface-variant opacity-80 mb-12">
              We partner with select brands and individuals who share our commitment to high-craft editorial excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/spotlight"
                className="text-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-opacity font-label"
                style={{ backgroundColor: '#11262B' }}
              >
                Spotlight Packages
              </Link>
              <Link
                href="mailto:editorial@thebombayforum.com"
                className="border-b-2 border-primary text-primary px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all font-label"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-white py-24 px-12 border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-[10px] tracking-[0.5em] uppercase font-bold text-primary mb-6 font-label">
              THE DISPATCH
            </span>
            <h2 className="text-5xl font-headline mb-8 leading-tight" style={{ color: '#0f1c2c' }}>
              Weekly Intelligence, Delivered.
            </h2>
            <div className="flex flex-col md:flex-row gap-0 max-w-xl mx-auto">
              <input
                className="flex-grow bg-surface-container-low border-none p-5 text-[11px] tracking-widest font-bold focus:ring-1 focus:ring-primary outline-none uppercase font-label"
                placeholder="EMAIL ADDRESS"
                type="email"
              />
              <button
                className="text-white px-8 py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-opacity font-label"
                style={{ backgroundColor: '#9e001f' }}
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="mt-6 text-[10px] font-body text-on-surface-variant tracking-widest">
              PRIVATE. EXCLUSIVE. ESSENTIAL.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
