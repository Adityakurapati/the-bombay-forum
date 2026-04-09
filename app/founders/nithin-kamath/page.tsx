import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Nithin Kamath | The Founders Series | THE BOMBAY FORUM',
  description:
    'Founder & CEO of Zerodha — the pioneer of zero-brokerage investing in India.',
};

export default function NithinKamathPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* HERO */}
        <section className="flex flex-col md:flex-row min-h-screen">
          {/* Portrait */}
          <div className="w-full md:w-1/2 bg-slate-900 overflow-hidden">
            <img
              alt="Nithin Kamath — high contrast studio portrait"
              className="w-full h-full object-cover grayscale contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGK0zWi0m0mQ5GMF04JQpxzLwg3vl9MccLxBQVi4-ZGdQApvWPxKdueF8HgvLeCfJKGOtt2QKGdY6tDZnSJa-APvRHSfBcX9Gy8I_dGBgz7PoZh2hU1xcsm3kBDEVZ9u_VLH4e8l8CQRJpasc8DQsthhSoi4B0unyFFBUMo7ZXWcfnBCgRrRWC387H3A3vzh04J4voGs_JDVmxS_J1ikPMBIdbr5Xa5iJMa_qSy1OBtFLKFKuJAQQeITdAsAKAafBKYpN4ahNwSHqE"
            />
          </div>
          {/* Content */}
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center" style={{ backgroundColor: '#F5F5F0' }}>
            <div className="mb-6">
              <span
                className="text-white text-[10px] font-bold tracking-[0.2em] px-3 py-1 font-label"
                style={{ backgroundColor: '#11262B' }}
              >
                THE FOUNDERS
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl font-headline tracking-tight leading-none mb-4">
              Nithin Kamath
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] mb-12 font-label" style={{ color: '#11262B' }}>
              ZERODHA · FOUNDER &amp; CEO
            </p>
            <div className="border-l-4 pl-8 mb-12" style={{ borderColor: '#11262B' }}>
              <blockquote className="text-3xl font-headline italic text-on-surface leading-tight">
                "The goal was never to build a unicorn. It was to build a company that we would want
                to use ourselves, even if we were the only customers."
              </blockquote>
            </div>
            <div className="space-y-6 text-on-surface-variant font-body leading-relaxed max-w-xl">
              <p>
                Nithin Kamath is the pioneer of the zero-brokerage model in India. His journey from
                a teenage trader to the CEO of India's largest retail brokerage is a masterclass in
                patient, long-term thinking.
              </p>
              <p>
                By bootstrapping Zerodha to a multi-billion dollar valuation without a single cent
                of venture capital, Kamath has rewritten the playbook for Indian entrepreneurship.
              </p>
              <p>
                Beyond finance, he is now focused on 'Rainmatter,' an initiative to support
                grassroots startups working on climate change and health, reflecting a philosophy of
                holistic wealth.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-16 px-8 md:px-24" style={{ backgroundColor: '#11262B' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'FOUNDED', value: '2010' },
              { label: 'TEAM', value: '1.1k+' },
              { label: 'MARKETS', value: 'India' },
              { label: 'STRUCTURE', value: 'Bootstrapped' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-slate-400 text-[10px] tracking-[0.2em] font-bold font-label">
                  {stat.label}
                </span>
                <span className="text-white text-3xl font-headline">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Article Body */}
        <article className="bg-white py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-body leading-relaxed text-on-surface mb-16">
              In an era of hyper-funded burn-heavy startups, Nithin Kamath stands as an outlier.
              Zerodha has not only survived the volatile landscape of Indian fintech but has dominated
              it while remaining profitable from day one.
            </p>

            {/* The Beginning */}
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-8 text-on-surface">THE BEGINNING</h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  Nithin's trading journey began at age 17, driven more by passion than a plan. He
                  spent over a decade as a retail trader, understanding the pain points that would
                  later become the foundation of his business.{' '}
                  <strong>
                    "I wasn't an entrepreneur first; I was a user who was frustrated with how the
                    system worked,"
                  </strong>{' '}
                  he recalls.
                </p>
                <p>
                  In 2010, along with his brother Nikhil, he launched Zerodha—a portmanteau of
                  "Zero" and "Rodha" (the Sanskrit word for barrier). The idea was simple: remove the
                  friction and cost barriers for retail investors.
                </p>
                <p>
                  The early years were defined by frugality. Every rupee saved was reinvested into
                  building a robust trading platform, prioritizing engineering over marketing—a
                  strategy that eventually became their greatest competitive advantage.
                </p>
              </div>
            </div>

            {/* Inline Image */}
            <div className="mb-16 -mx-6 md:-mx-24 overflow-hidden">
              <img
                alt="Zerodha HQ — minimalist Bengaluru office"
                className="w-full aspect-video object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm4qzg_cVLmEb7aX1z4NHyPosJEDJlBuzlbUAhVDhBZ8qGxolY3QdA1sK_JLorHghatrqr9__3a8Rk6xbSRsLH19kV8tIJE6TXTtc0XhONaizzNoVnVL1Cbmw0bF97YhDFtKuX2Ndk0lQSpWvXpMm3d1i5_3hU_dTFrAcyOb81MKGxYDdvyvCrkizLk6cyYu01-oztztuab2obVjzDOlmGxYO4OEK9hmAxoP0mKRNbdbjNBSPy0LnrMIFCP6tvbz0m4Zu68LSkhZAB"
              />
            </div>

            {/* The Philosophy */}
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-8 text-on-surface">THE PHILOSOPHY</h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed mb-12">
                <p>
                  Kamath's philosophy revolves around the concept of 'Anti-Scale.' In a world
                  obsessed with growth at all costs, he advocates for sustainable growth that doesn't
                  compromise on employee well-being or customer trust.
                </p>
                <p>
                  This approach extended to their marketing—or lack thereof. Zerodha famously spends
                  zero on advertising, relying entirely on word-of-mouth and educational initiatives
                  like Varsity.
                </p>
              </div>
              <blockquote className="text-5xl md:text-6xl font-headline italic leading-tight mb-16 text-on-primary-fixed-variant">
                "If you have to sell something with a heavy discount, maybe what you are selling
                isn't worth the price."
              </blockquote>
            </div>

            {/* Building the Machine */}
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-8 text-on-surface">BUILDING THE MACHINE</h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  The technical architecture of Zerodha is built for extreme efficiency. Handling
                  millions of concurrent orders requires a level of precision that few global firms
                  can match. The focus has always been on the 'Plumbing' of the financial world.
                </p>
                <div className="bg-surface-container-low p-12 my-12 text-center">
                  <span className="text-slate-500 text-[10px] tracking-widest block mb-4 uppercase font-label">
                    Annual Profit (FY23)
                  </span>
                  <h3 className="text-6xl md:text-7xl font-headline" style={{ color: '#11262B' }}>
                    ₹3,200 Cr
                  </h3>
                </div>
                <p>
                  While competitors burned cash to acquire customers, Zerodha focused on product
                  stickiness. By the time the 2020 trading boom hit, they were perfectly positioned
                  to capture the influx of young, tech-savvy Indian investors.
                </p>
              </div>
            </div>

            {/* The Next Chapter */}
            <div className="mb-16">
              <h2 className="text-3xl font-headline mb-8 text-on-surface">THE NEXT CHAPTER</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Today, the mission has expanded. Through Rainmatter, the Kamath brothers are backing
                founders who are solving complex problems for India's future. It's not just about
                wealth creation anymore; it's about wealth distribution and environmental resilience.
              </p>
              <div className="mb-8 overflow-hidden">
                <img
                  alt="Sustainable botanical gardens at dawn"
                  className="w-full h-[400px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuLi0h2GV-MR8MalgPUR4RQMIM-U8EDFAQmKbAXBz_Y8XlLyKhP5B6QJMOosXN4AQK5cBL3lBsk7eWjKr2_wa3lQL4CievtdazvRT_n7aGc1em9AtM6sSrwDA47Gs_dllXhwrWwWnZLUzJQeqoOD02FgJkGv9AJgqtkevssFZJDJ_OChT3dui3nQu_p9zA0qGmNM2w3_4zlbLBvp3QtNv0e_nD6YZH65g8mhe3Bx7oHemIDDGTECCSC6JJqS-xzOchLESl2WlOWt2i"
                />
              </div>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                The legacy Nithin aims to leave is not one of market caps, but of impact. "The real
                success," he says, "is being able to wake up every morning and do exactly what you
                want, with the people you like."
              </p>
            </div>

            {/* What They Believe */}
            <div className="mb-24">
              <h2 className="text-3xl font-headline mb-8 text-on-surface">WHAT THEY BELIEVE</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                Integrity in finance is non-negotiable. For the Kamath brothers, this means being
                brutally honest with customers about the risks of trading. They are perhaps the only
                broker that actively discourages excessive trading through their 'Kill Switch'
                feature.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                It is this transparency that has built an ironclad brand in a sector usually plagued
                by mistrust.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-24">
              {['ZERODHA', 'FINTECH', 'BOOTSTRAPPED', 'BENGALURU', 'INVESTING'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold border border-outline px-4 py-2 hover:bg-on-background hover:text-white transition-colors cursor-pointer font-label"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <div className="flex items-center gap-6 p-8 bg-surface-container-lowest border-t border-b border-outline-variant/30 mb-24">
              <img
                alt="Vikram Sethi — Senior Editor TBF"
                className="w-20 h-20 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-cSQkC8-TuJ1DvOnsaEqKlqq1psYBSQXuSalODaGTID307HU69O-lv_gcG87v4cmkmQXRfwe8FJiwKBU-fzqBxnHx7fvQ_iFj97ygdD2PyitCTdZItDysR9cJoCJ_VuudaCJYjCvtJNEZU3I0hoe23AYJ82MFgd3GI-sj2_9AnWODnAESt3TXaSHrddYDxuVXyiU3PKVdDL1_0sV7OYGW02GEHHYzsMwTr925BMfbjDJrtxA9abNOBaPfO1aor8HG3tTLkDuyf9Ne"
              />
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1 font-label">
                  Written By
                </span>
                <h4 className="text-xl font-headline">Vikram Sethi</h4>
                <p className="text-sm text-on-surface-variant font-body">
                  Senior Editor, TBF Digital Atelier. Covering the intersection of capital and
                  character.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* From the Archive */}
        <section className="bg-surface-container-low py-24 px-8 md:px-24">
          <h3 className="text-[10px] font-bold tracking-[0.4em] text-center mb-16 font-label">
            FROM THE ARCHIVE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: 'The Architecture of Patience',
                sub: 'How Zerodha built a 2-billion dollar empire with zero marketing budget.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpnut7YVhXXUPZMENystWzcBd9vC48hlw4yh72MERNZHufCFvqyD_XK6j7NtO0fXOCPU12hBWi4jRe0o7dBirrz9KhzRreBVFvZMokAQu-tJV3IS630YxsU1FfXI-tBvwc2JFax5m9KZBfUY8pPM1vsW9WQGqR45uoz8T2cdnaogr6QQ4olAvA-C0ybsXQfGgT9iXs3CWmrh58TaWwihnV3uM7cAYWLjsP43ZU_R3d08qcSCviGbD9h2RlYPcrnQ-k1yXP7NzOMX2',
              },
              {
                title: 'The Rainmatter Effect',
                sub: "Nithin Kamath's bet on the founders solving India's climate crisis.",
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCutrAeLkyUSjANXHz82RFF3hiTF48XIZLA-dWkTAiLr90jl6IE2byhR6UxOXugYsfvkFRjWXRkNnUYrAZ74xycpcdNoQJbHZa-bLfPEYex2rdvxPuruzwf3HLfivlunYaYas5CgzBTz5YjNJclf2x0OWrJ9uAL9UwxDp5v4ZzpVTpx1w4ZaDtx-nd66F6mi6Jm4OzNAw7eZlclO6Ky688NuHk0uveKwy6ySQ3IoTcRh_6m2bX1bgeB9vDQbxkAv6aq-7AlOXtg1sy',
              },
              {
                title: 'The Bengaluru Manifesto',
                sub: "Why the silicon valley of India is evolving into a capital of conscious wealth.",
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO_O6YKkuJWrk_0obwfE46N_tZkyigyPF4tr-rxVKDxj13fmDDe0iSOaR-_qOyKoi0q3xDWS1bpaSyie_EpVSPiZELxLFiEHqV9a3wNMqkBNXPihQlXxWEAWO9pWW...',
              },
            ].map((item) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-white">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.img}
                  />
                </div>
                <h4 className="text-2xl font-headline mb-2">{item.title}</h4>
                <p className="text-sm text-on-surface-variant font-body">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-32 px-8 text-center bg-white border-t border-outline-variant/10">
          <span className="text-[10px] font-bold tracking-[0.5em] mb-8 block text-slate-500 uppercase font-label">
            Weekly Dispatch
          </span>
          <h2 className="text-6xl md:text-8xl font-headline mb-12 tracking-tighter">
            The Saturday Communiqué
          </h2>
          <p className="max-w-xl mx-auto text-on-surface-variant mb-12 font-body">
            Essential insights into the minds of the people building the future. No noise. Just the
            signals that matter.
          </p>
          <form className="max-w-md mx-auto flex gap-0">
            <input
              className="w-full bg-surface-container-high border-none px-6 py-4 text-[10px] tracking-widest focus:ring-0 outline-none font-label"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button
              className="text-white px-8 py-4 text-[10px] font-bold tracking-widest transition-colors font-label"
              style={{ backgroundColor: '#11262B' }}
              type="submit"
            >
              SUBSCRIBE
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
