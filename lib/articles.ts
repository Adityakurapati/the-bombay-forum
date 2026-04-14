import { getArticles } from './firebase';
import { fetchRSSArticles } from './rss';
import { Article } from './types';

export async function getAllArticles(options: { includeRSS?: boolean } = {}): Promise<Article[]> {
  const [firebaseArticles, rssArticles] = await Promise.all([
    getArticles(),
    options.includeRSS ? fetchRSSArticles() : Promise.resolve([])
  ]);

  // Merge and sort by date descending
  const combined = [...firebaseArticles, ...rssArticles].sort((a, b) => {
    const dateA = new Date(a.createdAt || '').getTime();
    const dateB = new Date(b.createdAt || '').getTime();
    return dateB - dateA;
  });

  return combined;
}
