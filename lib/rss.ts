import Parser from 'rss-parser';
import { Article } from './types';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['enclosure', 'enclosure'],
    ],
  },
});

const DEFAULT_RSS_URL = 'https://techcrunch.com/feed/';

// Basic mapping of RSS categories to internal ones
const CATEGORY_MAP: Record<string, string> = {
  'AI': 'cat_future',
  'Artificial Intelligence': 'cat_future',
  'Technology': 'cat_future',
  'Future': 'cat_future',
  'Startups': 'cat_founders',
  'VC': 'cat_founders',
  'Venture Capital': 'cat_founders',
  'Founders': 'cat_founders',
  'Business': 'cat_founders',
  'Finance': 'cat_wealth',
  'Markets': 'cat_wealth',
  'Economy': 'cat_wealth',
  'Art': 'cat_creators',
  'Culture': 'cat_creators',
  'Design': 'cat_creators',
  'Food': 'cat_suite',
  'Travel': 'cat_suite',
  'Lifestyle': 'cat_suite',
  'Bombay': 'cat_bombay',
  'Mumbai': 'cat_bombay',
};

function mapCategory(categories: string[] = []): string {
  if (!categories || categories.length === 0) return 'cat_insights';
  
  for (const cat of categories) {
    const matched = CATEGORY_MAP[cat];
    if (matched) return matched;
  }
  
  return 'cat_insights';
}

function extractImage(item: any): string {
  // Try media:content
  if (item.mediaContent && item.mediaContent.length > 0) {
    return item.mediaContent[0].$.url;
  }
  // Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }
  // Try content for img tag
  const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch) return imgMatch[1];
  
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop';
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
        featuredImage: extractImage(item),
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
