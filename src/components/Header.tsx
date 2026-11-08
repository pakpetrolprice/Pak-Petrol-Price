'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BrandLogo } from '@/components/BrandLogo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fuelsOpen, setFuelsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  const fuelsDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setFuelsOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fuelsDropdownRef.current && !fuelsDropdownRef.current.contains(event.target as Node)) {
        setFuelsOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isFuelActive =
    pathname === '/petrol-price-in-pakistan' ||
    pathname === '/diesel-price-in-pakistan' ||
    pathname === '/hi-octane-price-in-pakistan';

  const isMoreActive =
    pathname === '/about' ||
    pathname === '/advertise' ||
    pathname === '/contact';

  const isHistoryActive =
    pathname === '/petrol-price-history' ||
    pathname === '/diesel-price-history' ||
    pathname === '/fuel-price-changes';

  return (
    <header className="sticky top-0 z-50 w-full transition-colors">
      {/* Top Status Bar */}
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
      <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex items-center shrink-0 min-w-0">
              <BrandLogo size="md" showDomain={true} />
            </div>

            {/* Desktop Navigation Links (Clean & Grouped) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60 text-xs font-bold">
              {/* Home */}
              <Link
                href="/"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none ${
                  pathname === '/'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                Home
              </Link>

              {/* 1. Fuels Dropdown */}
              <div
                ref={fuelsDropdownRef}
                className="relative"
                onMouseEnter={() => setFuelsOpen(true)}
                onMouseLeave={() => setFuelsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setFuelsOpen(!fuelsOpen)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none inline-flex items-center gap-1.5 cursor-pointer ${
                    isFuelActive || fuelsOpen
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                  aria-expanded={fuelsOpen}
                >
                  <span>Fuels</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${fuelsOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {fuelsOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-52 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-fadeIn">
                    <Link
                      href="/petrol-price-in-pakistan"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div>
                        <span className="block">Super Petrol</span>
                        <span className="block text-[10px] font-normal text-slate-400">Regular 92 RON</span>
                      </div>
                    </Link>
                    <Link
                      href="/diesel-price-in-pakistan"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <span className="block">High-Speed Diesel</span>
                        <span className="block text-[10px] font-normal text-slate-400">HSD Euro 5</span>
                      </div>
                    </Link>
                    <Link
                      href="/hi-octane-price-in-pakistan"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <div>
                        <span className="block">Hi-Octane</span>
                        <span className="block text-[10px] font-normal text-slate-400">Premium 97 RON</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Calculators */}
              <Link
                href="/petrol-calculator"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none ${
                  pathname === '/petrol-calculator'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                Calculators
              </Link>

              {/* History */}
              <Link
                href="/petrol-price-history"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none ${
                  isHistoryActive
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                History
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none ${
                  pathname.startsWith('/blog')
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                Blog
              </Link>

              {/* 2. More Dropdown (About, Advertise, Contact) */}
              <div
                ref={moreDropdownRef}
                className="relative"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none inline-flex items-center gap-1.5 cursor-pointer ${
                    isMoreActive || moreOpen
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                  aria-expanded={moreOpen}
                >
                  <span>More</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-52 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-fadeIn">
                    <Link
                      href="/about"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="block">About Us</span>
                        <span className="block text-[10px] font-normal text-slate-400">Our mission &amp; data</span>
                      </div>
                    </Link>
                    <Link
                      href="/advertise"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                      <div>
                        <span className="block">Advertise With Us</span>
                        <span className="block text-[10px] font-normal text-slate-400">Partner &amp; reach motorists</span>
                      </div>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <span className="block">Contact Us</span>
                        <span className="block text-[10px] font-normal text-slate-400">Feedback &amp; inquiries</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Direct Contact Button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all select-none"
              >
                <span>Contact</span>
              </Link>

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

          {/* Mobile Drawer with Clean Sections */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-4 animate-fadeIn text-sm">
              {/* Section 1: Fuels */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Fuel Rates
                </span>
                <Link
                  href="/petrol-price-in-pakistan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Super Petrol (92 RON)
                </Link>
                <Link
                  href="/diesel-price-in-pakistan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  High-Speed Diesel (HSD)
                </Link>
                <Link
                  href="/hi-octane-price-in-pakistan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Hi-Octane (97 RON)
                </Link>
              </div>

              {/* Section 2: Tools & News */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Tools &amp; Content
                </span>
                <Link
                  href="/petrol-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Fuel Calculators
                </Link>
                <Link
                  href="/petrol-price-history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Price History
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Blog &amp; News
                </Link>
              </div>

              {/* Section 3: Company */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Company
                </span>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  About Us
                </Link>
                <Link
                  href="/advertise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Advertise With Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 rounded-xl font-bold text-emerald-700 dark:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Contact Desk
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
