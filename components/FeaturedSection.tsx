const featuredArticles = [
  {
    category: "Bombay",
    title: "The Bean Economy: Why Specialty Coffee is India's New Gold.",
    excerpt:
      "How local roasteries are challenging global giants with terroir-driven narratives and aggressive retail footprints.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUV91hU8blW_K9rfM8xyav_O0knO-wjsrppIV_UX2cDEcOeH0N2V6rlcM8ZHqrE6J0Bc_y_BcuRyjrchaLlIhAXRVg53sfVNjyyTdy8nu1gjJ0BhnnXVEe1DqhnelwLRi6BSCaujueRZqSRwIDxH54MqPS3RQ5LGsNhnNR6GPiSzmQQPB2T_JRE9zZ0bq2FNR_wlu8UnwOQMcjo11cDuLxSzylE0CHfReZF-IfCVKnq7oABiCCGFIKzNVc6XQL4u8DWNZTYciieWTx",
  },
  {
    category: "Creators",
    title:
      "Investing in the Avant-Garde: A Guide to the Contemporary Indian Art Market.",
    excerpt:
      "Beyond the masters—identifying the next generation of visual storytellers before they hit the auction blocks.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARxhVwPnqHyrvNOeR48JqVhjWp2fglzmL8K27Lek679JyKOnuAY9oDzkJXfd3joyuMTdyO82QStGKCgLwwaaFdm3Rc9BzwwrVuQcmgnJ66BDesKLYQQeSeBPIMT0W5WXip6VujtYvWel6YfN8pVTfiK9bIDuPiSxUyQR9_fU6TtNgprcAvRhz2jt5j_GIJ64vFa3OGYb5y2sFifPXIZIFvnTS7tOMQao8SBlC9b3Xs-KHSCwxPPVzznX5hthTvnMBScak4eeyk5yWN",
  },
  {
    category: "Future",
    title:
      "Quiet Power: The Silent Revolution of India's Premium EV Segment.",
    excerpt:
      "Inside the bespoke workshops building the electric future for India's 0.1%.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5SksybXJ5UAHvCElnAsPX9jYvUFrYS3Dp2yPxc2HjiK6xGYmMoNQxyF7uBgGuAWbWQUJ7oUpGD18KWeCgD-EFEkAcABIpxOIcKY1AKUoaHNzKnnjTvN50pAyZg_Lj_FVUb1s-zv2uqE3mPOZWqWld1E_-9xaHjd5AqoiXk2K9SXK78Urw5_SJXXqLN75FCsMS8bsnt6NOlqinZXw_AQmu6D0qq318YUSPY0eB4cN1mVckUhfIEu3e7FayErp7IYFVHjtADZJV3xQ",
  },
];

export default function FeaturedSection() {
  return (
    <section className="mb-32">
      <div className="flex justify-between items-end mb-16 border-b border-outline-variant/30 pb-6">
        <h2 className="font-headline text-4xl">Featured This Week</h2>
        <a
          href="#"
          className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-accent-teal pb-1 hover:text-accent-teal transition-colors"
        >
          View All Stories
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {featuredArticles.map((article, idx) => (
          <article key={idx} className="group">
            <div className="aspect-[4/5] bg-surface-container mb-8 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt={article.title}
                src={article.image}
              />
            </div>
            <span className="text-accent-teal text-[10px] font-bold uppercase tracking-widest">
              {article.category}
            </span>
            <h3 className="font-headline text-3xl mt-4 mb-4 leading-tight group-hover:text-accent-teal transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
