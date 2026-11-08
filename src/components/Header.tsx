'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BrandLogo } from '@/components/BrandLogo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/petrol-price-in-pakistan', label: 'Petrol' },
    { href: '/diesel-price-in-pakistan', label: 'Diesel' },
    { href: '/hi-octane-price-in-pakistan', label: 'Hi-Octane' },
    { href: '/petrol-calculator', label: 'Calculators' },
    { href: '/petrol-price-history', label: 'History' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/petrol-price-history') {
      return pathname === '/petrol-price-history' || pathname === '/diesel-price-history' || pathname === '/fuel-price-changes';
    }
    if (href === '/blog') {
      return pathname.startsWith('/blog');
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-colors">
      {/* Status Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px] font-medium py-1 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white font-medium truncate">
              Today&apos;s Official Rates · Regulated by OGRA
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 shrink-0 text-[11px] font-mono">
            <span>Pakistan Standard Time (PKT)</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className="bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex items-center shrink-0 min-w-0">
              <BrandLogo size="md" showDomain={true} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
              {navLinks.map(link => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all duration-150 select-none ${
                      active
                        ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ThemeToggle />

              {/* Mobile Drawer Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-w-[38px] min-h-[38px] p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1 animate-fadeIn">
              {navLinks.map(link => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
