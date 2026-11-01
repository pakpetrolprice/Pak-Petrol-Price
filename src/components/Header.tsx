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
    { href: '/petrol-price-history', label: 'History' },
    { href: '/fuel-price-changes', label: 'Changes' },
    { href: '/petrol-calculator', label: 'Calculators' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/petrol-price-history') {
      return pathname === '/petrol-price-history' || pathname === '/diesel-price-history';
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors w-full">
      {/* Top verified bar - slim & space-efficient */}
      <div className="bg-emerald-900 dark:bg-emerald-950 text-emerald-100 text-[10px] sm:text-xs py-1 px-3 sm:px-4 font-semibold tracking-wide border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-1">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-white truncate">Official OGRA &amp; Ministry of Energy Rates</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-200 text-[10px] sm:text-xs font-semibold shrink-0">
            <span>Fortnightly Cycle · October 2026</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo brand */}
          <div className="flex items-center shrink-0 min-w-0">
            <BrandLogo size="md" showDomain={true} />
          </div>

          {/* Desktop Nav Links with ACTIVE page highlight */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition select-none ${
                    active
                      ? 'bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-500/50 dark:bg-emerald-600 dark:text-white'
                      : 'text-slate-700 dark:text-slate-200 font-bold hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ThemeToggle />

            {/* Mobile Hamburger Button (Accessible 44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[40px] min-h-[40px] p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center active:scale-95 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with 44px accessible touch targets */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 animate-fadeIn">
            {navLinks.map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-sm transition active:scale-[0.99] ${
                    active
                      ? 'bg-emerald-600 text-white font-black shadow-xs ring-1 ring-emerald-500/50'
                      : 'text-slate-800 dark:text-slate-200 font-bold hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
