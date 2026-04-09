export default function FoundersSection() {
  return (
    <section className="mb-32 flex flex-col lg:flex-row gap-20 items-center">
      <div className="lg:w-1/2">
        <div className="relative">
          <img
            className="w-full aspect-[4/5] object-cover grayscale brightness-90"
            alt="low angle shot of a modern glass skyscraper in Mumbai's financial district"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW5SU1o2nzypuaLDehylYTI4qrEUsYw43QCcby-RuB5iB8MqhQqqjiv7TWwmj-b90qnxWr-ogKf3riSM6N-Mwz1ufEt6xSZ2Magfx1bNl-HqhnSRqcuDSYnwIlBQZC7AfsIlLVDxi61sXFsXfUe5tMg62oay6yYz0DKT3Xr4FxBJfrmJDpR2Tc2xOh7SBlAbEWRd3YLvTeKepUIi5E_0DHwQqwLr6l-WoaErt140J-xWY0dfMVaEpLg-QaXTRetLMZeutSeViP4Lw3"
          />
          <div className="absolute -bottom-10 -right-10 bg-white p-12 max-w-sm shadow-2xl hidden lg:block border-l-8 border-accent-teal">
            <p className="font-headline text-2xl italic text-primary mb-6">
              "The next decade of global innovation won't happen in Silicon
              Valley. It's happening in the streets of Bengaluru and the
              boardrooms of Mumbai."
            </p>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-teal">
              — Ratan Tata
            </span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2">
        <span className="text-accent-teal text-[11px] font-bold uppercase tracking-[0.4em] block mb-8">
          The Founders
        </span>
        <h2 className="font-headline text-6xl mb-10 leading-[1.1] text-primary">
          The Decacorn Manifesto: Why Profitability is the New Status Symbol.
        </h2>
        <div className="space-y-8 text-on-surface-variant leading-relaxed text-lg">
          <p>
            For the last decade, growth-at-all-costs was the North Star.
            Founders were celebrated for burning cash in pursuit of market
            share. Today, the tide has turned.
          </p>
          <p>
            In this deep-dive, we talk to the architects of India's most
            resilient unicorns who have pivoted from vanity metrics to
            sustainable unit economics. We explore the internal cultural shifts,
            the harsh budget cuts, and the eventual liberation that comes with
            being a 'default alive' business.
          </p>
        </div>
        <button className="mt-12 border-b-2 border-accent-teal pb-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-accent-teal transition-colors">
          Read the Full Investigation
        </button>
      </div>
    </section>
  );
}
