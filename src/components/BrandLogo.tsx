'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showDomain?: boolean;
  clickable?: boolean;
}

export function BrandLogo({
  size = 'md',
  showDomain = true,
  clickable = true,
}: BrandLogoProps) {
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 rounded-xl text-sm',
    lg: 'w-12 h-12 rounded-2xl text-base',
  }[size];

  const titleSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  const domainSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }[size];

  const content = (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Precision Vector Fuel Icon */}
      <div
        className={`${iconDimensions} bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-500 dark:via-emerald-600 dark:to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 group-hover:shadow-emerald-700/30 transition-all shrink-0 ring-1 ring-white/20`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-xs"
        >
          {/* Stylized Fuel Dispenser Body */}
          <path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
          <path d="M15 9h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5a1.5 1.5 0 0 0-3-1" />
          <path d="M3 22h12" />
          {/* Gauge Window */}
          <rect x="6" y="6" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
          {/* Nozzle Handle Drop */}
          <circle cx="21" cy="7" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Typography & Domain Branding */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`${titleSize} font-black text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate`}
          >
            Pak Petrol Price
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        {showDomain && (
          <span
            className={`${domainSize} font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase leading-none mt-0.5`}
          >
            pakpetrolprice.pk
          </span>
        )}
      </div>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link href="/" aria-label="Pak Petrol Price Home" className="inline-block">
      {content}
    </Link>
  );
}
