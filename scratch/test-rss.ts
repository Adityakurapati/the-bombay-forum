import { fetchRSSArticles } from '../lib/rss';

async function test() {
  console.log('Fetching RSS articles...');
  const articles = await fetchRSSArticles();
  console.log(`Fetched ${articles.length} articles.`);
  
  articles.slice(0, 5).forEach((article, i) => {
    console.log(`\nArticle ${i + 1}: ${article.title}`);
    console.log(`Category: ${article.category}`);
    console.log(`Image: ${article.featuredImage}`);
  });
}

test().catch(console.error);
