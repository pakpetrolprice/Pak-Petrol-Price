import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculatorSuite } from '@/components/FuelCalculatorSuite';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { getPetrolPageFaqs } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Petrol Price in Pakistan Today | Latest Rates',
  description:
    'Current verified Petrol price in Pakistan per litre. View price breakdown, recent changes, and historical revisions.',
};

export default async function PetrolPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');

  const petrol = products.find(p => p.id === 'petrol')!;
  const currentPrice = latestPrices['petrol'];
  const petrolRate = currentPrice?.pricePkr ?? 379.25;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const petrolFaqs = getPetrolPageFaqs(petrolRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 w-full">

      {/* Header Info */}
      <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Petrol</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Rate
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Super Petrol (92 RON)
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Petrol Price in Pakistan Today
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Official consumer price for Petrol across all filling stations in Pakistan, notified by OGRA &amp; Ministry of Energy.
        </p>
      </div>

      {/* Featured Primary Price Card */}
      <div className="w-full">
        <PriceCard product={petrol} record={currentPrice} featured={true} />
      </div>

      {/* Official OGRA Source Verification Bar */}
      <OgraStatusWidget products={products} latestPrices={latestPrices} />

      {/* ZONE 2: Rate Trend Chart */}
      <section className="space-y-4">
        <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            Petrol Price Trend
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Historical price movement across recent fortnightly revisions.
          </p>
        </div>
        <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
          <PriceChart records={petrolHistory} productName="Petrol" />
        </div>
      </section>

      {/* ZONE 3: Historical Revisions Table */}
      <section className="space-y-4">
        <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            Recent Petrol Price Revisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Official price revisions announced in government notifications.
          </p>
        </div>
        <div className="w-full">
          <HistoricalTable records={petrolHistory} />
        </div>
      </section>

      {/* ZONE 4: Dedicated Fuel & Commute Calculator Suite */}
      <section className="space-y-5">
        <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            Petrol Cost Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Calculate your vehicle fill-up cost or estimate trip fuel expenses.
          </p>
        </div>

        <FuelCalculatorSuite
          petrolPrice={petrolRate}
          dieselPrice={dieselRate}
          hiOctanePrice={hiOctaneRate}
        />
      </section>

      {/* ZONE 5: FAQs */}
      <section className="w-full">
        <FAQSection
          faqs={petrolFaqs}
          title="Petrol Pricing FAQs"
          description="Common questions about petrol taxation, petroleum levy, and OGRA revisions."
        />
      </section>

      <AdPlacement slotId="petrol-page-bottom" format="leaderboard" />
    </div>
  );
}
