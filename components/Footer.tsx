import Link from 'next/link';

const SECTIONS = [
  { label: 'The Founders', href: '/categories/founders' },
  { label: 'Creators', href: '/categories/creators' },
  { label: 'The Exchange', href: '/categories/wealth' },
  { label: 'Future', href: '/categories/future' },
  { label: 'The Suite', href: '/categories/suite' },
];

const CORPORATE = [
  { label: 'Masthead', href: '/about' },
  { label: 'Contact', href: 'mailto:editorial@thebombayforum.com' },
  { label: 'Advertise', href: '#' },
  { label: 'Careers', href: '#' },
];

const MEMBERSHIP = [
  { label: 'Manage Subscription', href: '#' },
  { label: 'Gift Membership', href: '#' },
  { label: 'Corporate Access', href: '#' },
  { label: 'Privacy Policy', href: '/policies#privacy' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white pt-24 pb-12 px-12" style={{ backgroundColor: '#11262B' }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 max-w-[1440px] mx-auto">

        {/* ── Brand Col ── */}
        <div className="col-span-1">
          <div className="mb-10">
            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0uij5k7AVG2BPCY0MFV2493gRfkVSUaP2PmvR8DUGfsWEW3FT4ssOP7cEMCAuJ10j4mOUjPSonF-tqr25x7tWBuoYscMSBd49YGDK4ZmKDBLgR2DrHQ4bJHlVUcS0JMqoN3lCeDy0KjFlLZRJuTkCksPeXTgzT3PKaIBPl61sNTjvPqUAM4ocMzKxdtiDlT4hC48Xw4bHiLsRYkwZBUHPLe1DPL-2EDeFrdqDORLXAN2EnNN9HDr17oKTNgDgptYYtjCa_TJT7LKnYk"
              alt="TBF Logo"
              className="h-10"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 opacity-80 font-body">
            The premier digital atelier for India's high-growth entrepreneurs, celebrating
            the intersection of ambition, culture, and high-craft.
          </p>
          <div className="flex gap-4">
            {(['public', 'alternate_email', 'podcasts'] as const).map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-teal/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Sections ── */}
        <div className="flex flex-col gap-5">
          <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">
            Sections
          </h5>
          {SECTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-body"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── Corporate ── */}
        <div className="flex flex-col gap-5">
          <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">
            Corporate
          </h5>
          {CORPORATE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-body"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── Membership ── */}
        <div className="flex flex-col gap-5">
          <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-accent-teal font-label">
            Membership
          </h5>
          {MEMBERSHIP.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-body"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1440px] mx-auto">
        <span className="text-[10px] tracking-widest uppercase text-slate-500 font-body">
          © {year} THE BOMBAY FORUM. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-10 text-[10px] tracking-widest uppercase text-slate-500 font-body">
          {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((label) => (
            <a key={label} href="#" className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
