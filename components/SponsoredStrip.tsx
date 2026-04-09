export default function SponsoredStrip() {
  return (
    <section
      className="bg-[#11262B] py-14 px-8 mb-32 overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex items-center gap-8">
          <span className="text-accent-teal/60 text-[9px] uppercase tracking-[0.3em]">
            Sponsored by
          </span>
          <span className="text-white text-3xl font-headline tracking-widest opacity-90 uppercase">
            The Oberoi Group
          </span>
        </div>
        <p className="text-slate-300 font-body text-base italic max-w-md">
          "Experience the pinnacle of hospitality at the new Oberoi Mumbai
          penthouse suites."
        </p>
        <button className="text-white border border-accent-teal/40 px-10 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-accent-teal hover:text-[#11262B] transition-all">
          Explore the Collection
        </button>
      </div>
    </section>
  );
}
