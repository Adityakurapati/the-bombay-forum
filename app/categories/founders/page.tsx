import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'The Founders | THE BOMBAY FORUM',
  description: "Stories of the founders building businesses that will define the next decade of India.",
};

/* ─── DATA ─── */
const FEATURED_WEEK = [
  {
    sub: 'SUSTAINABILITY',
    title: 'The circular economy of textiles.',
    excerpt: 'How Vidhi Sharma is transforming pre-loved garments into luxury upholstery for global exports.',
    author: 'Aditya Varma',
    read: '8 Min Read',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGBHl-Xssne7LqKs1LXyJXA5Z7rWEGaw2Ebn7-k0Uy5jjn8TmLstfdPUq-O8Dod5-xN0mKIA61stXK3e5W_wpJmg2sbQffMJaidAW8MQjly8ItsNC2FPCxT5XDL-HLzMdBOP1oRq8muTIK66_CQ5s_SRVNcgVsY9cNcbF-7SHpl84oSAJTt6BReUDeTY9v0OtLxYmrv6ubzV27ZT1k7h1Lu63kke-AcQvhczAc9IR2SEngpSx-RXg2aYsk9T_pPHLATap-dae7gxbw',
  },
  {
    sub: 'FINTECH',
    title: 'The democratization of credit.',
    excerpt: 'The challenge of providing credit to 500 million unbanked Indians through micro-infrastructure.',
    author: 'Sana Kapoor',
    read: '12 Min Read',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5dl50k213GKuqyOUxJOR5ZLZzTKuC89C0Q5kazW2KydXTWiRzMTR70IDDD5XgLY88yndJ9EmZL04jZhrM4f7ykocxcbpGF1VtkveTuN0wDVhaFQFU6wG7qljC3wHkx-TH9cqfuF0V43vSq_TELeUm8fAacs-x81Y5PR0YOGrAZVQmLJb0z9hlglFfwPHTpvfyp0poef1ZUlimm79Dv2BIJot-Q1lDymH9__e0WEgnYLnZCj6zrhpXUExi1_rgxY_gBLDDp4v1m4H2',
  },
  {
    sub: 'LIFESTYLE',
    title: 'Heritage as a modern brand asset.',
    excerpt: 'Redefining Indian luxury for the global stage by focusing on deep-rooted craftsmanship.',
    author: 'Rohan Das',
    read: '6 Min Read',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIFhDju-t7jhIkH9pBXMGYdWQvdM2ui73SQeNa5SJ5GIJUGRxPJVB4QuHTsUSAEHBthVpcZwtLtFvAQOnQli4-Xn8AYuSvhms6UTrL9lLGJ9GmTZAyon_OY5JAOPQ354mkVZzZlia2W_siVXIiaTlwQdBeL0xfF1vHuS9pxC5ipSDKWp0h_gz6wnWIhR1PYRU2O6yERmlN3gtWMcFXCOrmsMdPnwIpsCiKPM0KxdexfUct8mzxAaR0m7UpX7ZJ38CpUytICoEkGkLq',
  },
];

const ONES_TO_WATCH = [
  { name: 'Aman Mehra',  company: 'Solaris AI',   city: 'Bengaluru' },
  { name: 'Isha Patil',  company: 'Vayu Health',  city: 'Pune' },
  { name: 'Kabir Singh', company: 'BlockRoot',    city: 'Hyderabad' },
  { name: 'Meera Joshi', company: 'Terraform',    city: 'Mumbai' },
  { name: 'Zayan Mirza', company: 'Q-Core',       city: 'Delhi' },
];

/* reusable teal colour as a constant so TS doesn't complain */
const TEAL = '#2A9D8F';

export default function FoundersPage() {
  return (
    <>
      <TopBar />
      <Header />

      {/* ── 1. HERO ── */}
      <header className="relative w-full h-[795px] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0B1929' }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL77Y80uPMF7YvDxrWCRXWGzTtbhLO0vP8MXO5C-ja0hEjWor64rNo_FgDb79p1urwj2DsNHvKjSG-fLH0M2cty6Z92Riednp3FLnMUX46RJ61sQmu05F5VgYu0c0TM2h3NCCKUFKmBxrWfuN-TZdW98Dxyi7GLiOiG2vo1afJasHOGjdzQ_Sm0rYzzFhDA_9gzzCZW-ki3MwfRjj_btTHp298J7BwA6hqw9APhCxaGPDWAwcM4HGudUdFQM8P0hiyOAP3TniDEHkj"
            alt="The Architects of India"
            className="w-full h-full object-cover opacity-60"
            style={{ filter: 'grayscale(0.3)' }}
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-12 pb-24">
          <div className="max-w-2xl">
            <span
              className="inline-block text-white px-4 py-1 text-[10px] tracking-[0.3em] font-bold uppercase mb-6 font-label"
              style={{ backgroundColor: TEAL }}
            >
              THE FOUNDERS
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-white mb-6 leading-[0.9] tracking-tighter">
              The New Architects of India.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light font-body max-w-lg tracking-wide">
              Stories of the founders building businesses that will define the next decade.
            </p>
          </div>
        </div>
      </header>

      {/* ── 2. FEATURED FOUNDER ── */}
      <section className="overflow-hidden" style={{ backgroundColor: '#F5F5F0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[800px]">
          {/* Portrait */}
          <div className="relative h-[600px] md:h-auto overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTzqbTCh-FLYYMPvcvTuknpMbh1Gg_9JJnyk3rpCBcvJX-TQ4-DB0Q-tKykeFf-iOItoGEDC1dx3dU68lIKbtee4jcgyJHQpTImVmVVAKNZzXjJvtIJT4hvcL5BuQequTNXY5vxuvAfh8GWewVESuFlwS3NfpjEnalbBwQJR0vk3Mo_p08BnbW5bYSL-4NyuWkG0W7TrNoOJAT9EG4cXbTNXxJZ2XIBjXcVCUkqjSmgRIauXBwB1gat3UwaPSCqL3MadKu5bZAvZb2"
              alt="Nithin Kamath Portrait"
              className="w-full h-full object-cover brightness-90"
              style={{ filter: 'grayscale(1) brightness(0.9) contrast(1.1)' }}
            />
          </div>

          {/* Content */}
          <div
            className="flex flex-col justify-center px-8 md:px-20 py-20"
            style={{ backgroundColor: '#F5F5F0' }}
          >
            <span
              className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 font-label"
              style={{ color: TEAL }}
            >
              FEATURED FOUNDER
            </span>
            <h2
              className="text-5xl md:text-7xl font-headline mb-2 tracking-tighter"
              style={{ color: '#0B1929' }}
            >
              Nithin Kamath
            </h2>
            <p className="text-sm font-label uppercase tracking-widest text-secondary mb-12">
              Zerodha Founder &amp; CEO
            </p>

            {/* Pull Quote */}
            <div className="pl-8 mb-12" style={{ borderLeft: `4px solid ${TEAL}` }}>
              <blockquote
                className="text-3xl md:text-4xl font-headline italic leading-tight font-light"
                style={{ color: '#0B1929' }}
              >
                "The goal is to build something that lasts, not just something that grows."
              </blockquote>
            </div>

            {/* Body */}
            <div className="max-w-md space-y-6 text-sm leading-relaxed font-body mb-10" style={{ color: 'rgba(11,25,41,0.8)' }}>
              <p>Nithin Kamath pioneered the discount brokerage model in India, fundamentally changing how a generation interacts with the capital markets.</p>
              <p>His philosophy on bootstrapping and sustainable growth has become a blueprint for the next wave of Indian startups eschewing hyper-capitalism for longevity.</p>
              <p>Under his leadership, Zerodha has remained profitable since inception while serving millions of retail investors across the subcontinent.</p>
            </div>

            <Link
              href="/founders/nithin-kamath"
              className="inline-flex items-center font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:gap-4 font-label gap-2"
              style={{ color: TEAL }}
            >
              Read Their Story <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED THIS WEEK ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-32 bg-surface">
        <div className="flex items-center gap-4 mb-16">
          <h3
            className="text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap font-label"
            style={{ color: '#0B1929' }}
          >
            FEATURED THIS WEEK
          </h3>
          <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(11,25,41,0.1)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {FEATURED_WEEK.map((art) => (
            <article key={art.title} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-8">
                <img
                  src={art.img}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block font-label"
                style={{ color: TEAL }}
              >
                {art.sub}
              </span>
              <h4
                className="text-3xl font-headline mb-4 leading-tight transition-colors hover:text-[#2A9D8F]"
                style={{ color: '#0B1929' }}
              >
                {art.title}
              </h4>
              <p className="text-sm text-secondary/80 font-body mb-6 line-clamp-3">{art.excerpt}</p>
              <div
                className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-label"
                style={{ color: 'rgba(82,95,114,0.6)' }}
              >
                <span>{art.author}</span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'rgba(11,25,41,0.2)' }}
                />
                <span>{art.read}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 4. ONES TO WATCH ── */}
      <section className="w-full py-20" style={{ backgroundColor: '#E8ECE9' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <h3
            className="text-[10px] tracking-[0.4em] font-bold uppercase mb-12 font-label"
            style={{ color: '#0B1929' }}
          >
            ONES TO WATCH
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {ONES_TO_WATCH.map((p) => (
              <div key={p.name} className="flex flex-col">
                <span className="text-xl font-headline mb-1" style={{ color: '#0B1929' }}>
                  {p.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest font-bold mb-1 font-label"
                  style={{ color: TEAL }}
                >
                  {p.company}
                </span>
                <span
                  className="text-[10px] font-medium font-label"
                  style={{ color: 'rgba(82,95,114,0.6)' }}
                >
                  {p.city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SPOTLIGHT STRIP ── */}
      <section className="py-24" style={{ backgroundColor: '#0B1929' }}>
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-24">
            <div className="flex-shrink-0">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-[0.1em]">
                THE OBEROI GROUP
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed tracking-wide font-body">
                A legacy of excellence spanning generations. We partner with the founders who define
                hospitality and corporate excellence, providing a stage for India's most influential
                voices to converge and create the future of Indian industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
