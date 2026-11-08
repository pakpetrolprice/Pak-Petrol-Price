'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showDomain?: boolean;
  clickable?: boolean;
  inverted?: boolean;
}

export function BrandLogo({
  size = 'md',
  showDomain = true,
  clickable = true,
  inverted = false,
}: BrandLogoProps) {
  const iconSize = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
  }[size];

  const titleSize = {
    sm: 'text-base font-extrabold tracking-tight',
    md: 'text-lg sm:text-xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
  }[size];

  const sublineSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }[size];

  const titleColor = inverted
    ? 'text-white'
    : 'text-slate-900 dark:text-white';

  const sublineColor = inverted
    ? 'text-slate-400'
    : 'text-slate-400 dark:text-slate-500';

  const content = (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Precision Commodity Mark */}
      <div
        className={`${iconSize} relative bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 dark:from-emerald-500 dark:via-teal-600 dark:to-slate-950 flex items-center justify-center text-white shadow-xs group-hover:shadow-md group-hover:shadow-emerald-500/20 group-hover:scale-[1.02] transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shrink-0`}
      >
        {/* Subtle grid pattern background in mark */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
        
        {/* Clean Geometric Vector Mark: Fuel Drop with Metric Bar */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Stylized droplet with precision gauge */}
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 12v4" strokeWidth="2.5" stroke="#34d399" />
          <circle cx="12" cy="18" r="1" fill="#34d399" />
        </svg>
      </div>

      {/* Typography & Subline */}
      <div className="flex flex-col min-w-0">
        <span
          className={`${titleSize} ${titleColor} transition-colors duration-200 truncate leading-tight`}
        >
          Pak Petrol <span className="text-emerald-500 dark:text-emerald-400">Price</span>
        </span>
        {showDomain && (
          <span
            className={`${sublineSize} font-mono ${sublineColor} tracking-wide mt-0.5 leading-none`}
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
    <Link href="/" aria-label="Pak Petrol Price Home" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg">
      {content}
    </Link>
  );
}
