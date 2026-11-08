import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-16 sm:mt-24 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand info */}
          <div className="sm:col-span-2 space-y-4">
            <BrandLogo size="md" showDomain={true} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s authoritative commodity benchmark monitoring platform for officially verified OGRA petroleum ceilings, high-speed diesel tariffs, and historical gazette revisions.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Directly verified against Federal Gazette circulars</span>
            </div>
          </div>

          {/* Quick links: Rates */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Fuel Rates
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/petrol-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Petrol Rate Today
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  High-Speed Diesel
                </Link>
              </li>
              <li>
                <Link href="/hi-octane-price-in-pakistan" className="text-slate-400 hover:text-white transition">
                  Hi-Octane (RON 97)
                </Link>
              </li>
              <li>
                <Link href="/fuel-price-changes" className="text-slate-400 hover:text-white transition">
                  Price Revision Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Archive */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Tools &amp; History
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/petrol-calculator" className="text-slate-400 hover:text-white transition">
                  Tank Fill-Up Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-calculator#calculator" className="text-slate-400 hover:text-white transition">
                  Motorway Travel Estimator
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-history" className="text-slate-400 hover:text-white transition">
                  Petrol Historical Archive
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-history" className="text-slate-400 hover:text-white transition">
                  Diesel Historical Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Compliance &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition">
                  Methodology &amp; Verification
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
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition">
                  Contact Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
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
