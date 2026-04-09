import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'TBF Spotlight | Editorial Packages | THE BOMBAY FORUM',
  description:
    'Connect your brand with Mumbai\'s most influential audience through deep editorial storytelling and targeted digital amplification.',
};

export default function SpotlightPage() {
  return (
    <>
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-dark-navy text-white px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-accent-teal font-['Manrope'] text-xs font-bold uppercase tracking-[0.3em] block mb-6">TBF SPOTLIGHT</span>
          <h1 className="text-5xl md:text-8xl font-headline tracking-tighter mb-8 leading-tight">Be Part of The<br />Bombay Forum.</h1>
          <p className="text-white/60 max-w-2xl mx-auto font-body text-lg md:text-xl leading-relaxed">
            Connect your brand with Mumbai's most influential audience through deep editorial storytelling and targeted digital amplification.
          </p>
        </div>
      </section>

      {/* What is a Spotlight */}
      <section className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-on-surface-variant font-['Manrope'] text-xs font-bold uppercase tracking-[0.3em] block mb-12 text-center">WHAT YOU GET</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-10 border-t-4 border-primary">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">auto_stories</span>
              <h3 className="text-2xl font-headline mb-4">Editorial Feature</h3>
              <p className="text-sm text-on-secondary-fixed-variant leading-relaxed font-body">
                A professionally written narrative focusing on your brand's heritage, vision, and the people behind the craft.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-10 border-t-4 border-primary">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">campaign</span>
              <h3 className="text-2xl font-headline mb-4">Social Amplification</h3>
              <p className="text-sm text-on-secondary-fixed-variant leading-relaxed font-body">
                Direct engagement across our premium social ecosystem, reaching over 200k active Mumbaikars daily.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-10 border-t-4 border-primary">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">mail</span>
              <h3 className="text-2xl font-headline mb-4">Newsletter Placement</h3>
              <p className="text-sm text-on-secondary-fixed-variant leading-relaxed font-body">
                Priority placement in 'The Daily Bulletin', landing directly in the inboxes of the city's key decision makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-on-surface-variant font-['Manrope'] text-xs font-bold uppercase tracking-[0.3em] block mb-16 text-center">PACKAGES</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Card 1: The Mention */}
            <div className="border border-surface-container-highest p-12 flex flex-col items-center text-center">
              <h4 className="text-sm font-bold uppercase tracking-widest text-accent-teal mb-6">The Mention</h4>
              <div className="text-4xl font-headline mb-8 text-on-surface">₹9,999</div>
              <ul className="space-y-4 mb-12 font-body text-sm text-on-surface-variant flex-grow">
                <li>Social Media Mention</li>
                <li>Logo in Newsletter</li>
                <li>Single Event Coverage</li>
                <li>-</li>
              </ul>
              <button className="w-full py-4 bg-accent-teal text-white font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all">Select Plan</button>
            </div>
            {/* Card 2: The Feature (Featured) */}
            <div className="bg-deep-navy p-12 flex flex-col items-center text-center scale-105 z-10 shadow-2xl">
              <h4 className="text-sm font-bold uppercase tracking-widest text-tertiary-fixed-dim mb-6">The Feature</h4>
              <div className="text-4xl font-headline mb-8 text-white">₹49,999</div>
              <ul className="space-y-4 mb-12 font-body text-sm text-white/70 flex-grow">
                <li>Full Editorial Article</li>
                <li>3x Social Media Posts</li>
                <li>Newsletter Spotlight Feature</li>
                <li>Custom Photo Session</li>
              </ul>
              <button className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all">Most Popular</button>
            </div>
            {/* Card 3: The Cover */}
            <div className="border border-surface-container-highest p-12 flex flex-col items-center text-center">
              <h4 className="text-sm font-bold uppercase tracking-widest text-accent-teal mb-6">The Cover</h4>
              <div className="text-4xl font-headline mb-8 text-on-surface">₹99,999</div>
              <ul className="space-y-4 mb-12 font-body text-sm text-on-surface-variant flex-grow">
                <li>Hero Website Placement</li>
                <li>Exclusive Video Interview</li>
                <li>Lead Newsletter Slot</li>
                <li>Dedicated Brand Microsite</li>
              </ul>
              <button className="w-full py-4 bg-accent-teal text-white font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all">Select Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Past Spotlights */}
      <section className="py-20 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <span className="text-on-surface-variant font-['Manrope'] text-xs font-bold uppercase tracking-[0.3em] block mb-12">FEATURED BRANDS</span>
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4 grayscale opacity-60">
            <div className="bg-white px-8 py-6 flex items-center justify-center min-w-[160px]">
              <img alt="Brand 1" className="h-12 object-contain" data-alt="minimalist typography logo of a luxury fashion brand in monochrome on white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWiTGjPe4m7qivcNWJwrnQ_H-YlRJpRwguoa9UG0IRTU6kJWfxiBH7_FvK23pj5vTssLqvcckUJSpsNn85wgKTVgButEoCQP-qJTyhzvvr6Y0Kdl2VCIDi0P83XmZ-K-FBsVDml0T_vtaAyC9UsZupgJ81VdV2TlBsQ6c2Peoq1T6N-IxcMeSkw1u-2ggMr0sasNRQ98DFbNSXhE5qn-mAPfPLFF3Qq2w1KOq5Yx8hTK7w4_CXL1Cm1Snv6DsZeln05MfFA-XQAT8i"/>
            </div>
            <div className="bg-white px-8 py-6 flex items-center justify-center min-w-[160px]">
              <img alt="Brand 2" className="h-12 object-contain" data-alt="elegant architectural studio logo with clean lines and sans-serif font in black and white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXxz8T5vHpxtIh9KdkrRHcBOp3E47KAxsfFiZsGo5T2NAy2i0zUSED1GIIc1yAVEtIbn757jS7JPSvaJVdiEutl4YhsGfOtMYhRIZtIe6-a4hZwuiJsVTlOAFuMFZggACl0InwYdhixYMbYgWbBR9pMQHiV2NIFr1jkK7GhKGy5zCRIvmXYdW-h2X_Mn5C9QcZn9WQ-GtpEAD0nFqvr2fBAWIzfk34FodWAUXe99gsY71PfcnL5Vt7fFg9lvVCrpU7kWNXatAUY671"/>
            </div>
            <div className="bg-white px-8 py-6 flex items-center justify-center min-w-[160px]">
              <img alt="Brand 3" className="h-12 object-contain" data-alt="high-end watchmaker logo featuring a crest and refined serif lettering in grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFTr4Vx-n8ZUlr0pc5WpcWBX-9I8fHaxUjO2-UCa4RD0-qPpHKS1dJVxfx9kNBhk4VFpx-qyMTyKkq_W2TOAp0xFNulqOa3k126J578kvR93OK6OLPBVlM5xIrseFpGdKgT5rH7kJdF7gIIroGfBlCFAZalUpqyiVHk--pmBllfvA339CqA4s2OsOWkTtbWxvbC7QIRcplaPQUv-GSmKNh-ETkuGesBZdZYBGh2YBezcFViM5xDTzU-WoPkc0pFhDRYURTm7UsrjN0"/>
            </div>
            <div className="bg-white px-8 py-6 flex items-center justify-center min-w-[160px]">
              <img alt="Brand 4" className="h-12 object-contain" data-alt="modern hospitality brand logo with abstract geometric shape and bold lettering monochrome" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeuOe4sevh9YWd3j00I3ItoHkf3EwewX1bhebo4_eGACI8jTAFdSI8aEfy9Zh0GwlcyeZQo21lsKlq0wxnTIu_HJKUXNf5R0JUAYEKnYSfgq1I9tApRvEiSXMOSj7zZ-EWYpH27-9YatitqoMRRnzIq_3TblcxQgWP5U23mEcdeJ0FmqDKeFfy-O8iXqtSFWvashAA8o-SLYXeDtXhnmIY3KDKNw-fmVq_Qjm6MgL_Y20sHKtDNsGyhY_AbCBPMnRAo4fT5OvzpIH-"/>
            </div>
            <div className="bg-white px-8 py-6 flex items-center justify-center min-w-[160px]">
              <img alt="Brand 5" className="h-12 object-contain" data-alt="artisan cafe logo with hand-drawn organic elements and rustic typography in black and white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBGYBKjF_9vRwGkVIUPFzEiJFt-wE0-6zDL7eDzGQd3-VfE764uG1ywIOHkRdCDUORuh2GLG6a2CX9dDgBjSsW9WWP3B28wKXxAeW-nQEMOkMnKyKTYAa1F4kvWhxrBngvEDLvlxnKV7aq9pK9AgbfT_ICx4opBGETHKZ-YJHr8W2WfLdto815lLSWgqbWqtFtm464QkOc_6nFdE2W8OlW2oCsKUI2EWR7Ou16vcKJsmYkuQi02Y_V0uoFb5dbj6mPDaiq5ZSWmQI0"/>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="py-24 bg-white px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline mb-4">Apply for a Spotlight.</h2>
          <p className="text-on-surface-variant font-body mb-12">Tell us about your brand. Our editorial board reviews applications weekly.</p>
          <form className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">Brand Name</label>
              <input className="w-full border-b-2 border-surface-container-highest bg-transparent focus:border-primary focus:ring-0 px-0 py-3 font-body outline-none transition-all" placeholder="Enter your business name" type="text" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">Email Address</label>
                <input className="w-full border-b-2 border-surface-container-highest bg-transparent focus:border-primary focus:ring-0 px-0 py-3 font-body outline-none transition-all" placeholder="name@brand.com" type="email" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">Website URL</label>
                <input className="w-full border-b-2 border-surface-container-highest bg-transparent focus:border-primary focus:ring-0 px-0 py-3 font-body outline-none transition-all" placeholder="www.brand.com" type="url" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">Package Interest</label>
              <select className="w-full border-b-2 border-surface-container-highest bg-transparent focus:border-primary focus:ring-0 px-0 py-3 font-body outline-none transition-all appearance-none cursor-pointer" defaultValue="The Feature (₹49,999)">
                <option>The Mention (₹9,999)</option>
                <option>The Feature (₹49,999)</option>
                <option>The Cover (₹99,999)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">Your Message</label>
              <textarea className="w-full border-b-2 border-surface-container-highest bg-transparent focus:border-primary focus:ring-0 px-0 py-3 font-body outline-none transition-all resize-none" placeholder="Briefly describe your story..." rows={4}></textarea>
            </div>
            <button className="w-full py-6 bg-dark-navy text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-black transition-all" type="submit">Submit Application</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
