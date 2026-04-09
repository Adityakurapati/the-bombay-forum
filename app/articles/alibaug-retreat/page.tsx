import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'The Alibaug Retreat | THE BOMBAY FORUM',
  description:
    'Redefining Tropical Modernism — In the coastal whispers of Alibaug, a new architectural language emerges.',
};

const related = [
  {
    slug: '#',
    category: 'TRAVEL',
    title: 'The New Maldivian Solitude',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCO3AqmkEuKw6zxJJ8H4_SEsNHJXL_ZbAydh67N93jqWFG03i1cMljS3IsXDfqZ5feDrgW8PPlKV0bntwUZnMIpXY3hZi7lZylve-lKtbkjSh-zgO1w8hVxjKA5WYb0MC8D7z0wnqGZHvC92prsLRbK4rp3egu9fY7q7eONjK336j0GGoiozZ7l7Re-uHlcSGG35GGjgmqzUlTV6KkkNcuhle42OSXSdwRA4maXehGu1BJrttsVPATJHbegZQBSrT9E_EE3sHGCpuOL',
  },
  {
    slug: '#',
    category: 'DESIGN',
    title: 'Art Deco Revival in South Mumbai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABvdAV_kXI2z5Pv9OeUemv_Mppc7F7qbnol13ywkOwDt_bNt-YNjMeq79jH54J2Z7Vv6_p9wTPWD7xWsfYJm7Wg2VdKI7AnoGvYtrVlOtBbZ7La7B1nnMM2mWbqGHDlSSaxokwE33hTRrUyFH6T4f_PLfBHdlTJDx2xJ_yQMh24mr_QXQQ7k0S_gNv8WhP93RWHp9liuam1wBoLgK81FQapgGjNoAHVkZdBQ7Y-RrhlaWNCiCa-1YgEm_BbOwtjQdGriY88WP6Jpeo',
  },
  {
    slug: '#',
    category: 'REAL ESTATE',
    title: 'The Rise of the Heritage Villa',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-uyq5rMsIf9jtcqHfRinIgavYKAebY4n50G-McVIpwpFkIens6p-GN0lHSKnIqQzrw0ScJS8M5Af40LLt311yINxMkeR3QsMt7GH1iVHh0_wpWUjmqIdPsgmS-gCVd8GxAeoD1BajfR5WEeINgCWlyyIt6awzXUF-3enVZI4kcDNlU35RiV0HYyIUuuowvAv10-9wDf15EA3I8_WLHv4qSfuFZEWOSikbp-IFRqMHB_BmnRKK57LknAXOWnYBezoGHUnJlt2tmDs',
  },
];

export default function AlibaugRetreatPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Article Header */}
        <section className="px-6 pt-12 pb-8 bg-surface">
          <span className="inline-block px-3 py-1 bg-brand-teal text-brand-navy text-[10px] font-label font-bold tracking-[0.2em] mb-6">
            THE SUITE
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-brand-navy mb-6 italic">
            The Alibaug Retreat: Redefining Tropical Modernism
          </h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-8">
            In the coastal whispers of Alibaug, a new architectural language emerges—one that
            balances the brutality of concrete with the fluidity of the Konkan breeze.
          </p>
          <div className="flex items-center gap-4 border-t border-on-surface/5 pt-6">
            <div className="w-10 h-10 bg-surface-container-highest flex-shrink-0 overflow-hidden">
              <img
                alt="Vikram Seth"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcV9OzBWdZnSLZ0U9vqI-068ka0pyr-FUsl868_7AYdXEagH85usTWB1S7NCGLBAMkt6yB24wmrNbrYjiiPFDkOpDAe28IlroyVY-oyXuWbwOJmC47m3D3lBu92S1HWkKzZjRZg5dbRUld-Cdw3_WNNgL1XkoqGmUiyXJBQLXWgCdjEjO2lxr8-bW--1V_I6_hLX0iK0VfCL8vMFenMcytkLX0selcL2SulirrZJkD2Ga7PxW4pLrxX8GlAmODBqDtjdG1KeaEVYAn"
              />
            </div>
            <div>
              <span className="block text-sm font-label font-bold uppercase tracking-wider text-brand-navy">
                Vikram Seth
              </span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">
                Oct 24 • 12 Min Read
              </span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full">
          <div className="aspect-[16/9] w-full bg-surface-container-highest overflow-hidden">
            <img
              alt="Ultra-modern luxury villa in Alibaug"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGq2TWw06cedvvS3vNMzY6T_YQm3LdJbmBaelX72XS01tATPY07al81xn-4tz0ZMicy56qjH51BEuKjxXkWBxNUhF3uWp473nWBYCfPbvYIiOjGee8ZRIbMGt3LnMsDe8yDKNNPzZ1HLLycfw0HF_NsmC3l-W_LDdEBLthaNuPbeDjtOQy1AgR4kaLsI9qmuD2b5iYj0gp-rvIfwHbOCiTSVoVIKh5nuFUf_F_XA_PdDYp4HZL-41sFNnU8wDrXaRpRYWXS1EF2486"
            />
          </div>
          <div className="px-6 py-4 italic text-sm font-headline text-on-surface-variant bg-surface-container-low">
            "The structure breathes with the environment, rather than imposing upon it." — Lead
            Architect, Studio 11.
          </div>
        </section>

        {/* Article Body */}
        <article className="px-6 py-12 max-w-2xl mx-auto space-y-8">
          <p className="font-body text-lg leading-relaxed first-letter:text-5xl first-letter:font-headline first-letter:text-brand-navy first-letter:mr-3 first-letter:float-left">
            <strong>
              The coastal town of Alibaug has long been the silent confidante of Bombay's elite.
            </strong>{' '}
            But away from the weekend revelry, a quiet revolution in luxury living is taking shape.
            This retreat is not just a home; it is a manifesto for a sustainable future where
            high-end design exists in harmony with the tropical ecosystem.
          </p>

          <h2 className="font-headline text-3xl font-bold text-brand-navy mt-12 mb-4">
            A Dialogue with Nature
          </h2>
          <p className="font-body text-lg leading-relaxed text-on-surface-variant">
            Modernism in the tropics often falls into the trap of over-insulation. Here, the
            architects have opted for a "porous" design. Large basalt stone walls are punctuated by
            floor-to-ceiling glass, allowing the sea spray and the scent of wild jasmine to filter
            through the living spaces.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-12 pl-6 border-l-4 border-brand-teal">
            <p className="font-headline italic text-2xl text-brand-navy leading-snug">
              "Luxury is no longer about what you can exclude from your environment, but how deeply
              you can integrate within it."
            </p>
          </blockquote>

          <p className="font-body text-lg leading-relaxed text-on-surface-variant">
            The materiality of the house is local yet refined. Hand-carved stone from nearby
            quarries meets polished teak salvaged from old Bombay warehouses, creating a tactile
            narrative of the region's history.
          </p>

          <div className="my-10 bg-surface-container-highest aspect-square overflow-hidden">
            <img
              alt="Interior Detail — teak stairs against basalt stone"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6knu1XhtfAVr_qo6SJ_d9anRUP1IN0rvY2OmaKj6nWIcHif-HWU6GfAkSlZiyczJz1E5u6Y9Wz-2LD6wub88xHzJ6yAQoBm24GbRscbBaaJ5litd76twVfSUBYHUE10Qd_iiQj3ryIF2f6TUU158w1JTg8oEEoZS1OcJ4VHgG2UbIRYMPeYyjRnM1xYvVdxggbqGK80R-XLzDRuG8S1oMgqH6MYw4saHnmMiY8l6gimkj1GesWKowDvU2MK0VfBet3wn13vw7-hLQ"
            />
          </div>

          <h2 className="font-headline text-3xl font-bold text-brand-navy mt-12 mb-4">
            The Ethical Pivot
          </h2>
          <p className="font-body text-lg leading-relaxed text-on-surface-variant">
            Beyond the aesthetics lies a commitment to the land. The footprint of the retreat was
            carefully mapped to avoid felling a single coconut palm, resulting in a floor plan that
            meanders through the grove like a river.
          </p>
        </article>

        {/* Pull Stat */}
        <section className="px-6 py-16 text-center" style={{ backgroundColor: '#0B1929' }}>
          <div className="mb-2">
            <span className="text-brand-teal text-7xl font-headline font-bold">82%</span>
          </div>
          <div className="text-white font-label text-xs tracking-[0.4em] uppercase">
            PRESERVATION RATE
          </div>
          <p className="mt-4 text-white/60 font-body text-sm px-12">
            The percentage of original flora retained on-site during the three-year construction
            phase.
          </p>
        </section>

        {/* Author Bio */}
        <section className="mx-6 my-12 p-8 bg-surface-container-low flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
            <img
              alt="Vikram Seth"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzNrDyDpOT58qBXsXnQlzEM3f3sifiDLVE0Pzj4gcbMI_3ltGEs7ur88_xPMlQ9Z33zYDs6C3P-x5k8p1WNv3R-sKfEncmWqZ38iMlCqBeX_1q8Q-N5h0zQNJo5hPHtXvq3E73O3TQLMQXzHJxD9cx8EuglGeF2fJiuRLT6GGLQJbC_JCsczghQByRjzDGRZG3ShVKRXhnXQKKu85L-c4X0sWnjuhHkSj6BOtQJKbilCHsRQ8UDQbdSO5DFpJMJVCQSOU690K1VmJv"
            />
          </div>
          <h3 className="font-headline text-2xl font-bold text-brand-navy">Vikram Seth</h3>
          <span className="font-label text-[10px] uppercase tracking-widest text-brand-teal mb-4 block">
            Architecture Editor
          </span>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-sm">
            Vikram has been chronicling the evolution of Indian luxury architecture for over two
            decades. His work focuses on the intersection of heritage materials and contemporary
            functionality.
          </p>
        </section>

        {/* Related Articles */}
        <section className="py-16" style={{ backgroundColor: 'rgba(227,227,222,0.3)' }}>
          <div className="px-6 mb-8 flex justify-between items-end">
            <h2 className="font-label text-xs font-bold tracking-[0.2em] text-brand-navy uppercase">
              MORE FROM THE SUITE
            </h2>
            <span className="material-symbols-outlined text-brand-navy">arrow_forward</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar px-6 gap-6">
            {related.map((item) => (
              <div key={item.slug + item.title} className="flex-shrink-0 w-72">
                <div className="aspect-[3/4] mb-4 overflow-hidden">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover"
                    src={item.image}
                  />
                </div>
                <span className="font-label text-[9px] font-bold text-brand-teal uppercase tracking-widest">
                  {item.category}
                </span>
                <h4 className="font-headline text-xl font-bold text-brand-navy mt-2 italic">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-6 py-16 text-center" style={{ backgroundColor: 'rgba(139,176,184,0.2)' }}>
          <h2 className="font-headline text-3xl font-bold text-brand-navy italic mb-2">
            The Saturday Communiqué
          </h2>
          <p className="font-body text-sm text-brand-navy/70 mb-8 max-w-xs mx-auto">
            Elite insights delivered to your inbox every Saturday morning. Exclusively for the
            discerning reader.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <input
              className="bg-surface border-none p-4 text-xs font-label tracking-widest focus:ring-1 focus:ring-brand-navy outline-none"
              placeholder="YOUR EMAIL ADDRESS"
              type="email"
            />
            <button
              className="text-white p-4 text-xs font-label font-bold tracking-[0.3em] uppercase"
              style={{ backgroundColor: '#0B1929' }}
            >
              SUBSCRIBE
            </button>
          </div>
        </section>
      </main>

      {/* Article Footer */}
      <footer className="px-6 py-16" style={{ backgroundColor: '#0B1929' }}>
        <div className="grid grid-cols-2 gap-y-12 mb-16">
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">
              THE SECTIONS
            </h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/categories/founders" className="hover:text-brand-teal transition-colors">Founders</Link></li>
              <li><Link href="/categories/creators" className="hover:text-brand-teal transition-colors">Creators</Link></li>
              <li><Link href="/categories/wealth" className="hover:text-brand-teal transition-colors">Wealth</Link></li>
              <li><Link href="/categories/future" className="hover:text-brand-teal transition-colors">Future</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">
              THE SUITE
            </h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/categories/bombay" className="hover:text-brand-teal transition-colors">Bombay</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">The Communiqué</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 font-label text-[10px] tracking-[0.2em] mb-4">SUPPORT</h5>
            <ul className="space-y-2 font-label text-xs text-white/80">
              <li><Link href="/policies" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies" className="hover:text-brand-teal transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-brand-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="flex flex-col justify-end">
            <Link href="/">
              <span className="text-5xl font-headline text-white uppercase tracking-tighter leading-none">
                T<span className="text-brand-red">B</span>F
              </span>
            </Link>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5">
          <p className="text-[9px] font-label text-white/30 tracking-[0.3em] uppercase">
            © 2024 THE BOMBAY FORUM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </>
  );
}
