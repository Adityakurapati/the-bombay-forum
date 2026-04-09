'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple client-side auth guard (replace with real auth as needed)
    if (email && password.length >= 6) {
      localStorage.setItem('adminEmail', email);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen selection:bg-primary selection:text-white"
      style={{ backgroundColor: '#0B1929' }}
    >
      {/* Decorative corner */}
      <div className="fixed top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <div className="absolute top-12 -right-12 rotate-45 border-r border-white w-full h-full" />
      </div>
      <div className="fixed bottom-12 left-12 hidden lg:flex flex-col space-y-1 opacity-20">
        <div className="w-12 h-0.5 bg-white" />
        <div className="w-8 h-0.5 bg-white" />
        <span className="text-[9px] text-white uppercase tracking-[0.4em] pt-2">Ver: 4.0.2</span>
      </div>

      {/* Login Card */}
      <main className="w-full max-w-md px-6 py-12 flex flex-col items-center">
        {/* Brand */}
        <div className="text-center mb-16 space-y-4">
          <div className="text-white font-headline text-6xl tracking-tighter font-black select-none">
            T<span style={{ color: '#C8102E' }}>B</span>F
          </div>
          <div className="space-y-1">
            <h1 className="text-white font-headline text-3xl tracking-tighter">Admin Portal</h1>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase" style={{ color: '#bac7dd' }}>
              THE BOMBAY FORUM
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="w-full space-y-10" onSubmit={handleSubmit}>
          {error && (
            <p className="text-[11px] text-center font-bold uppercase tracking-widest font-label" style={{ color: '#ffb3b1' }}>
              {error}
            </p>
          )}

          {/* Email */}
          <div className="relative group">
            <label
              className="block text-slate-400 text-[11px] uppercase tracking-widest mb-2 transition-colors group-focus-within:text-secondary-fixed-dim font-label"
              htmlFor="email"
            >
              Institutional Email
            </label>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-slate-500 mr-3 text-lg">alternate_email</span>
              <input
                id="email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@thebombayforum.com"
                className="w-full bg-transparent border-0 border-b border-white/20 text-white font-body px-0 py-3 focus:ring-0 focus:border-secondary-fixed-dim transition-all placeholder:text-slate-700 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="flex justify-between items-end mb-2">
              <label
                className="block text-slate-400 text-[11px] uppercase tracking-widest transition-colors group-focus-within:text-secondary-fixed-dim font-label"
                htmlFor="password"
              >
                Access Key
              </label>
              <a href="#" className="text-[10px] text-slate-500 hover:text-white uppercase tracking-tighter transition-colors font-label">
                Recover
              </a>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-slate-500 mr-3 text-lg">lock</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-0 border-b border-white/20 text-white font-body px-0 py-3 focus:ring-0 focus:border-secondary-fixed-dim transition-all placeholder:text-slate-700 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full font-label font-bold uppercase tracking-[0.2em] py-5 text-sm hover:bg-white transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-60"
              style={{
                backgroundColor: '#bac7dd',
                color: '#0f1c2c',
                boxShadow: '0px 20px 40px rgba(15,28,44,0.4)',
              }}
            >
              {loading ? 'Authenticating...' : 'Enter the Forum'}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="text-slate-600 font-label text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} TBF Editorial Group. Authorized Personnel Only.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/policies" className="text-slate-700 hover:text-slate-400 text-[9px] uppercase tracking-tighter transition-colors font-label">
              Privacy Protocol
            </Link>
            <a href="#" className="text-slate-700 hover:text-slate-400 text-[9px] uppercase tracking-tighter transition-colors font-label">
              Security Audit
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
