import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <span className="text-9xl font-headline font-black text-brand-navy">404</span>
        </div>
        <h1 className="font-headline text-5xl text-primary mb-4">Stuck in Colaba</h1>
        <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
          The page you're looking for has wandered off into the bustling streets of Colaba. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-block px-8 py-4 bg-primary text-white font-label uppercase tracking-widest text-sm hover:bg-brand-navy transition-colors">
            Back to Homepage
          </Link>
          <Link href="/categories/founders" className="inline-block px-8 py-4 border-2 border-primary text-primary font-label uppercase tracking-widest text-sm hover:bg-surface-container transition-colors">
            Explore Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
