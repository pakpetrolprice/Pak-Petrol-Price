import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculatorSuite } from '@/components/FuelCalculatorSuite';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { getDieselPageFaqs } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Diesel Price in Pakistan Today | Latest Official Rates',
  description:
    'Current verified Diesel price in Pakistan per litre. Official notifications from OGRA and Petroleum Division with historical trends.',
};

export default async function DieselPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const dieselHistory = await FuelRepository.getProductHistory('diesel');

  const diesel = products.find(p => p.id === 'diesel')!;
  const currentPrice = latestPrices['diesel'];
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselRate = currentPrice?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const dieselFaqs = getDieselPageFaqs(dieselRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>● Regulated Fuel Rate · High Speed Diesel (Euro 5)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Diesel Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Diesel is the primary fuel powering heavy logistics, public transit, and commercial passenger vehicles in Pakistan. Regulated by OGRA and notified by the Federal Ministry of Energy.
        </p>
      </div>

      {/* Featured Primary Diesel Price Card */}
      <div className="w-full">
        <PriceCard product={diesel} record={currentPrice} featured={true} />
      </div>

      {/* Official OGRA Source Verification Bar */}
      <OgraStatusWidget products={products} latestPrices={latestPrices} />

      {/* ZONE 2: Rate Trend Chart (Full Width) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
            <span>📈 Official Trend Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Diesel Price Trend (2026)
          </h2>
        </div>
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-sm">
          <PriceChart records={dieselHistory} productName="Diesel" />
        </div>
      </section>

      {/* ZONE 3: Historical Revisions Table (Full Width) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
            <span>📋 Government Notifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Recent Diesel Price Revisions
          </h2>
        </div>
        <div className="w-full">
          <HistoricalTable records={dieselHistory} />
        </div>
      </section>

      {/* ZONE 4: Dedicated Fuel & Commute Calculator Suite */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
            <span>⚡ Interactive Budget Tools</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Diesel Cost &amp; Commute Calculators
          </h2>
        </div>

        <FuelCalculatorSuite
          petrolPrice={petrolRate}
          dieselPrice={dieselRate}
          hiOctanePrice={hiOctaneRate}
        />
      </section>

      {/* ZONE 5: Full-Width FAQs */}
      <section className="w-full">
        <FAQSection
          faqs={dieselFaqs}
          title="Diesel Pricing FAQs (Pakistan)"
          description="Detailed explanations of how high-speed diesel prices are determined by OGRA, OMC distribution margins, and levy rates."
        />
      </section>

      <AdPlacement slotId="diesel-page-bottom" format="leaderboard" />
    </div>
  );
}
