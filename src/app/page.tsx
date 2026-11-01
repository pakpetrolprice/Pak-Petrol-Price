import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { HOME_FAQS } from '@/lib/faq-data';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export default async function HomePage() {
  const products = await FuelRepository.getActiveProducts();
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');
  const recentRevisions = await FuelRepository.getAllApprovedRevisions();

  const petrol = products.find(p => p.id === 'petrol');
  const otherFuels = products.filter(p => p.id !== 'petrol');

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const kerosenePrice = latestPrices['kerosene']?.pricePkr ?? 330.96;
  const ldoPrice = latestPrices['ldo']?.pricePkr ?? 275.24;
  const lpgPrice = latestPrices['lpg']?.pricePkr ?? 279.34;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Petrol Price Today in Pakistan',
    url: 'https://petrolpricepakistan.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://petrolpricepakistan.pk/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    hasPart: [
      {
        '@type': 'Product',
        name: 'Petrol',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: petrolPrice.toString(),
          priceValidUntil: '2026-10-31',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Product',
        name: 'Diesel',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: dieselPrice.toString(),
          priceValidUntil: '2026-10-31',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14 w-full">
        {/* ============================================================ */}
        {/* ZONE 1: LIVE RATE BOARD & OFFICIAL SOURCE VERIFICATION       */}
        {/* ============================================================ */}
        <section aria-label="Current Fuel Rates" className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                  Petrol Price Today in Pakistan
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                  Official Ex-Depot Rates Regulated by OGRA &amp; Federal Ministry of Energy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              <span>📅 Current Circular:</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black">27 October 2026</span>
            </div>
          </div>

          <h2 className="sr-only">Verified Pakistani Petroleum Prices &amp; Fuel Rates</h2>
          
          {/* Primary Featured Hero Card (Petrol) */}
          {petrol && (
            <div className="w-full">
              <PriceCard
                product={petrol}
                record={latestPrices[petrol.id]}
                featured={true}
              />
            </div>
          )}

          {/* Secondary Fuel Cards (Diesel, Hi-Octane, Kerosene, Light Diesel, LPG) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                All Other Regulated Petroleum Products
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Official Consumer Rates
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {otherFuels.map(product => (
                <PriceCard
                  key={product.id}
                  product={product}
                  record={latestPrices[product.id]}
                  featured={false}
                />
              ))}
            </div>
          </div>

          {/* Official OGRA Source Verification Bar */}
          <OgraStatusWidget products={products} latestPrices={latestPrices} />
        </section>

        {/* ============================================================ */}
        {/* ZONE 2: HISTORICAL TREND ANALYSIS (Full-Width Canvas)        */}
        {/* ============================================================ */}
        <section aria-label="Historical Price Trend" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
                <span>📈 Official Historical Trend</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Petrol Price History &amp; Trend (PKR / Litre)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Verified official revision curve from authorized government publications
              </p>
            </div>
            <Link
              href="/petrol-price-history"
              className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-2 shrink-0"
            >
              Full History Archive →
            </Link>
          </div>

          <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-sm">
            <PriceChart records={petrolHistory} productName="Petrol" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 3: RECENT OFFICIAL ADJUSTMENTS LEDGER (Full-Width Table) */}
        {/* ============================================================ */}
        <section aria-label="Recent Fuel Revisions" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
                <span>📋 Government Notifications</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Recent Official Price Adjustments
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Exact rupee adjustments calculated between consecutive verified notifications
              </p>
            </div>
            <Link
              href="/fuel-price-changes"
              className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
            >
              All Price Changes →
            </Link>
          </div>

          <div className="w-full">
            <HistoricalTable records={recentRevisions.slice(0, 6)} showProductColumn={true} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 4: DEDICATED FUEL & COMMUTE CALCULATOR SUITE            */}
        {/* ============================================================ */}
        <section aria-label="Fuel Cost Calculators" id="calculators" className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
              <span>⚡ Interactive Budget Tools</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Fuel Cost &amp; Commute Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              Calculate exact tank fill-up expenses for your vehicle or estimate one-way and round-trip journey budgets.
            </p>
          </div>

          {/* Balanced 2-Column Spacious Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Tool: Vehicle Tank Fill-Up Estimator */}
            <div className="w-full">
              <TankFillCalculator
                compact={false}
                petrolPrice={petrolPrice}
                dieselPrice={dieselPrice}
                hiOctanePrice={hiOctanePrice}
              />
            </div>

            {/* Right Tool: Trip Cost Estimator & Motorway Benchmarks */}
            <div className="space-y-6 w-full">
              <FuelCalculator
                initialPetrolPrice={petrolPrice}
                initialDieselPrice={dieselPrice}
                initialHiOctanePrice={hiOctanePrice}
              />

              {/* Intercity Distance & Motorway Benchmarks */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-base">🛣️</span>
                  <h3 className="font-black text-sm text-slate-950 dark:text-white">
                    Common Motorway Route Benchmarks
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Lahore to Islamabad</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">M-2 (~375 KM)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Karachi to Hyderabad</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">M-9 (~165 KM)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Islamabad to Peshawar</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">M-1 (~180 KM)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Multan to Lahore</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">M-3 (~340 KM)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 5: FULL-WIDTH KNOWLEDGE & FAQ CENTER                    */}
        {/* ============================================================ */}
        <section aria-label="Frequently Asked Questions" className="w-full">
          <FAQSection
            faqs={HOME_FAQS}
            title="Frequently Asked Questions (Petrol &amp; Fuel Rates in Pakistan)"
            description="Accurate, official answers regarding petroleum pricing mechanisms, fortnightly OGRA notifications, and retail variations in Pakistan."
          />
        </section>

        {/* Bottom Leaderboard Ad */}
        <AdPlacement slotId="home-bottom-banner" format="leaderboard" />
      </div>
    </>
  );
}
