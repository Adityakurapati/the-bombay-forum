'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV = [
  { icon: 'dashboard', label: 'Overview', href: '/admin/dashboard' },
  { icon: 'article', label: 'Articles', href: '/admin/articles' },
  { icon: 'group', label: 'Founders & Creators', href: '/admin/profiles' },
  { icon: 'rocket_launch', label: 'Future', href: '/admin/future' },
  { icon: 'location_city', label: 'Bombay', href: '/admin/bombay' },
  { icon: 'diamond', label: 'The Suite', href: '/admin/suite' },
  { icon: 'payments', label: 'Wealth', href: '/admin/wealth' },
  { icon: 'home', label: 'Homepage', href: '/admin/homepage' },
  { icon: 'star', label: 'Spotlight', href: '/spotlight' },
  { icon: 'mail', label: 'Newsletter', href: '#' },
  { icon: 'search', label: 'SEO', href: '/admin/seo' },
  { icon: 'settings', label: 'Settings', href: '#' },
];



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLogin) return <>{children}</>;
  if (!ready) return null;

  function handleLogout() {
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  }

  return (
    <div className="flex min-h-screen font-body text-on-surface" style={{ backgroundColor: '#fafaf5' }}>
      
      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#071014] flex items-center justify-between px-6 z-[60] border-b border-white/10">
        <div className="flex items-center gap-3">
          <h1 className="font-headline text-xl font-black text-white tracking-tighter">
            T<span style={{ color: '#C8102E' }}>B</span>F
          </h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>
      </header>

      {/* ── SIDEBAR BACKDROP ── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 flex flex-col py-8 border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#071014' }}
      >
        {/* Logo */}
        <div className="px-8 mb-12 hidden md:block">
          <h1 className="font-headline text-2xl font-black text-white tracking-tighter">
            T<span style={{ color: '#C8102E' }}>B</span>F
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-slate-500 mt-1">
            Editorial Admin
          </p>
        </div>

        {/* Logo (Mobile view spacing) */}
        <div className="px-8 mb-8 md:hidden">
           <h1 className="font-headline text-2xl font-black text-white tracking-tighter">
            ADMIN
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
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
      <div className={`flex-1 flex flex-col min-h-screen pt-16 md:pt-0 transition-all duration-300 md:ml-64`}>
        {children}
      </div>
    </div>
  );
}
