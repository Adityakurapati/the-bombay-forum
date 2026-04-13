'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV = [
  { icon: 'dashboard', label: 'Overview', href: '/admin/dashboard' },
  { icon: 'article', label: 'Articles', href: '/admin/articles' },
  { icon: 'group', label: 'Founders & Creators', href: '/admin/profiles' },
  { icon: 'rocket_launch', label: 'Future', href: '/admin/future' },
  { icon: 'web', label: 'Homepage', href: '/' },
  { icon: 'star', label: 'Spotlight', href: '/spotlight' },
  { icon: 'mail', label: 'Newsletter', href: '#' },
  { icon: 'search', label: 'SEO', href: '/admin/seo' },
  { icon: 'settings', label: 'Settings', href: '#' },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  // Login page renders without the shell
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    if (!email && !isLogin) {
      router.push('/admin/login');
    } else {
      setReady(true);
    }
  }, [router, isLogin]);

  if (isLogin) return <>{children}</>;
  if (!ready) return null;

  function handleLogout() {
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  }

  return (
    <div className="flex min-h-screen font-body text-on-surface" style={{ backgroundColor: '#fafaf5' }}>
      {/* ── SIDEBAR ── */}
      <aside
        className="fixed left-0 top-0 h-full w-64 flex flex-col py-8 border-r border-white/5 z-50"
        style={{ backgroundColor: '#071014' }}
      >
        {/* Logo */}
        <div className="px-8 mb-12">
          <h1 className="font-headline text-2xl font-black text-white tracking-tighter">
            T<span style={{ color: '#C8102E' }}>B</span>F
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-slate-500 mt-1">
            Editorial Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href) && item.href !== '/';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-8 py-3 font-label uppercase tracking-widest text-[11px] transition-all duration-200 ${
                  active
                    ? 'text-white bg-white/10 border-l-[3px] border-brand-teal'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined mr-4 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-8 mt-auto pt-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center font-bold text-xs text-white font-label"
              style={{ backgroundColor: '#9e001f' }}
            >
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Admin</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Chief Editor</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/30 transition-colors font-label"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* ── CONTENT ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
