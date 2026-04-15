import Parser from 'rss-parser';
import { Article } from './types';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

const DEFAULT_RSS_URL = 'https://techcrunch.com/feed/';

// Basic mapping of RSS categories to internal ones
const CATEGORY_MAP: Record<string, string> = {
  'Bombay': 'cat_bombay',
  'Mumbai': 'cat_bombay',
  'Enterprise': 'cat_founders',
  'Apps': 'cat_creators',
  'Media & Entertainment': 'cat_creators',
  'Media': 'cat_creators',
  'Hardware': 'cat_future',
  'Transportation': 'cat_future',
  'Security': 'cat_future',
  'Fintech': 'cat_wealth',
  'Climate': 'cat_future',
  'Startup': 'cat_founders',
  'Venture': 'cat_founders',
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  cat_future: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
  cat_wealth: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2000&auto=format&fit=crop',
  cat_founders: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop',
  cat_creators: 'https://images.unsplash.com/photo-1499780332044-1f63057a80b3?q=80&w=2000&auto=format&fit=crop',
  cat_suite: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2000&auto=format&fit=crop',
  cat_bombay: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2000&auto=format&fit=crop',
  cat_insights: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop',
};

function mapCategory(categories: string[] = []): string {
  if (!categories || categories.length === 0) return 'cat_insights';
  
  for (const cat of categories) {
    const matched = CATEGORY_MAP[cat];
    if (matched) return matched;
  }
  
  return 'cat_insights';
}

function extractImage(item: any, category: string): string {
  // 1. Try media:content
  if (item.mediaContent && item.mediaContent.length > 0) {
    const url = item.mediaContent[0].$.url || item.mediaContent[0].url;
    if (url) return url;
  }
  
  // 2. Try media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
    return item.mediaThumbnail.$.url;
  }

  // 3. Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }

  // 4. Try scanning HTML content for images
  const searchContent = item.contentEncoded || item.content || item.description || '';
  const imgMatch = searchContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch) return imgMatch[1];
  
  // 5. Category-aware Fallback
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.cat_insights;
}

export async function fetchRSSArticles(feedUrl: string = DEFAULT_RSS_URL): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    
    return feed.items.map((item: any) => {
      const category = mapCategory(item.categories);
      
      return {
        id: `rss_${item.guid || item.link}`,
        title: item.title || 'Untitled Article',
        subtitle: item.contentSnippet?.slice(0, 100) || '',
        content: item.content || '',
        excerpt: item.contentSnippet || '',
        category: category,
        author: item.creator || item.author || 'TBF Insights',
        featuredImage: extractImage(item, category),
        slug: item.link || '#',
        link: item.link,
        readTime: 5, // Default
        published: true,
        createdAt: item.isoDate || new Date().toISOString(),
        updatedAt: item.isoDate || new Date().toISOString(),
        tags: item.categories || [],
      };
    });
  } catch (error) {
    console.error('[v0] Fetch RSS Error:', error);
    return [];
  }
}
