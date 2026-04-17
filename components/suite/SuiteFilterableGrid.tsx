'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Card {
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  link?: string;
  slug?: string;
  category?: string;
}

interface SuiteFilterableGridProps {
  initialCards: Card[];
}

const CATEGORIES = [
  'All Collections',
  'Hotels & Retreats',
  'Design & Interiors',
  'Travel',
  'Watches & Style',
  'Fine Dining',
];

export function SuiteFilterableGrid({ initialCards }: SuiteFilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState('All Collections');

  const filteredCards = useMemo(() => {
    if (activeCategory === 'All Collections') return initialCards;

    return initialCards.filter((card) => {
      // Direct category match (from admin)
      if (card.category === activeCategory) return true;

      // Tag-based match (for articles)
      const tag = (card.tag || '').toLowerCase();
      const active = activeCategory.toLowerCase();

      if (active === 'hotels & retreats' && (tag.includes('hotel') || tag.includes('retreat'))) return true;
      if (active === 'design & interiors' && (tag.includes('design') || tag.includes('interior'))) return true;
      if (active === 'travel' && tag.includes('travel')) return true;
      if (active === 'watches & style' && (tag.includes('watch') || tag.includes('style') || tag.includes('horology'))) return true;
      if (active === 'fine dining' && (tag.includes('dining') || tag.includes('food') || tag.includes('restaurant'))) return true;

      return false;
    });
  }, [activeCategory, initialCards]);

  return (
    <>
      {/* Filter Bar */}
      <nav className="sticky top-[56px] z-40 bg-surface/95 backdrop-blur-xl py-6 px-8 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto flex items-center justify-center overflow-x-auto whitespace-nowrap scrollbar-hide space-x-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-all uppercase tracking-widest text-xs font-label pb-1 border-b-2 hover:text-brand-red ${activeCategory === cat
                ? 'text-brand-red font-bold border-brand-red'
                : 'text-secondary border-transparent'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Featured Grid wrapped in max-w for proper alignment */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 min-h-[400px]">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, i) => (
              <Link
                key={i}
                href={card.link || (card.slug && card.slug !== '#' ? `/articles/${card.slug}` : '#')}
                target={card.link ? '_blank' : '_self'}
                className="group block animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <article className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-6">
                    <img
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={card.image}
                    />
                  </div>
                  <span className="text-tertiary font-label uppercase tracking-widest text-[10px] font-bold block mb-3">
                    {card.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-headline text-on-secondary-fixed leading-tight mb-4 group-hover:text-brand-red transition-colors text-primary">
                    {card.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed line-clamp-3">{card.excerpt}</p>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center animate-in fade-in duration-500 border border-dashed border-outline-variant/30">
              <p className="text-secondary font-label uppercase tracking-widest text-[10px]">No items found in this collection.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
