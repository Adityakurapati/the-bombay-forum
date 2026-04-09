export default function HeroSection() {
  return (
    <article className="lg:w-[65%] group cursor-pointer">
      <div className="relative overflow-hidden aspect-[16/10] mb-8">
        <img
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="luxury corporate office with glass walls overlooking a sunset mumbai skyline"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeakS4d7VAvGc94-5fbGDm5WDMQdhR0A3601e4zlDRf-B8K-W-1YpVmwXtECbAYyLLz5sLv-ke-MUUgmmIJZ1c_s3N5VG6FEVJbYQLuPgW9X6LLQ-Ou8cmxNlQDyjalx6huDiz_L9CPbKA5SpGDvYYOB7Yau4n2B2ik4yz62Xt_6g81BMwWkE5gdoYKn1ukjlhzZUvr96Zjw0CNlHq-pR5UXUU-93sc9tHTduxODiLkCXWbZhTdNTc-hrLAebS1kSCb79Xx_aAafGi"
        />
        <div
          className="absolute top-8 left-8 bg-[#11262B] text-white text-[10px] font-bold tracking-widest px-4 py-1.5 uppercase"
        >
          Cover Story
        </div>
      </div>
      <div>
        <h1 className="font-headline text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-8 text-primary">
          The New Arbiters of Indian Venture.
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed opacity-80">
          How a fresh wave of operators-turned-investors is dismantling the
          traditional Bombay club and rewriting the rules of Series A capital.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <span className="h-[1px] w-12 bg-accent-teal"></span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
            By Vikram Sethi • 12 Min Read
          </span>
        </div>
      </div>
    </article>
  );
}
