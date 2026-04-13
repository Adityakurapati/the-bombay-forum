'use client';

import { useEffect, useState } from 'react';

export function TopBar() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(
      new Date()
        .toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        .toUpperCase()
    );
  }, []);

  return (
    <aside className="bg-surface-container-high text-[10px] tracking-[0.2em] uppercase py-2 px-4 md:px-8 flex justify-between items-center border-b border-outline-variant/20">
      <div className="flex items-center gap-4 md:gap-6">
        <span className="hidden sm:inline">MUMBAI, MH</span>
        <span>{dateStr}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-accent-teal transition-colors">
          share
        </span>
        <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-accent-teal transition-colors">
          rss_feed
        </span>
      </div>
    </aside>
  );
}
