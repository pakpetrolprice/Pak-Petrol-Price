import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-16 sm:mt-24 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand info (2 columns wide on lg) */}
          <div className="sm:col-span-2 space-y-4">
            <BrandLogo size="md" showDomain={true} inverted={true} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s independent platform for live verified petrol prices, historical fuel rates, and travel cost calculators.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sourced from official OGRA gazette circulars</span>
            </div>
            <div className="pt-1 text-xs font-mono text-slate-400">
              <span>Desk: </span>
              <a href="mailto:pakpetrolprice@gmail.com" className="text-slate-300 hover:text-white transition">
                pakpetrolprice@gmail.com
              </a>
            </div>
          </div>

          {/* Column 1: Fuel Rates */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Fuel Rates
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/petrol-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Super Petrol (92 RON)
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  High-Speed Diesel (HSD)
                </Link>
              </li>
              <li>
                <Link href="/hi-octane-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Hi-Octane (97 RON)
                </Link>
              </li>
              <li>
                <Link href="/kerosene-oil-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Kerosene Oil (SKO)
                </Link>
              </li>
              <li>
                <Link href="/light-diesel-oil-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Light Diesel Oil (LDO)
                </Link>
              </li>
              <li>
                <Link href="/lpg-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  LPG Cylinders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Insights */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Tools &amp; History
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/fuel-cost-calculator" className="text-slate-400 hover:text-white transition">
                  Fuel Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/fuel-tank-calculator" className="text-slate-400 hover:text-white transition">
                  Fuel Tank Fill-Up Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-calculator" className="text-slate-400 hover:text-white transition">
                  All Calculators Suite
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-history" className="text-slate-400 hover:text-white transition">
                  Petrol Price History
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-history" className="text-slate-400 hover:text-white transition">
                  Diesel Price History
                </Link>
              </li>
              <li>
                <Link href="/fuel-price-changes" className="text-slate-400 hover:text-white transition">
                  Price Revisions Ledger
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition">
                  Market News &amp; Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Compliance */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition">
                  About Us &amp; Methodology
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-slate-400 hover:text-white transition">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition">
                  Contact Support Desk
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white transition">
                  Regulatory Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-slate-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p className="max-w-2xl text-center md:text-left">
            Official petroleum retail maximums in Pakistan are notified fortnightly by OGRA &amp; Ministry of Energy. Pak Petrol Price is an independent benchmark monitoring platform.
          </p>
          <p className="shrink-0 text-slate-400 font-semibold">
            &copy; 2026 Pak Petrol Price (pakpetrolprice.pk)
          </p>
        </div>
      </div>
    </footer>
  );
}
