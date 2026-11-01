import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { getPetrolPageFaqs } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Petrol Price in Pakistan Today | Latest Motor Gasoline Rates',
  description:
    'Current verified Petrol (Motor Spirit / Super) price in Pakistan per litre. View price breakdown, recent government increases/decreases, and historical revisions.',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">

      {/* Header Info */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>● Regulated Fuel Rate · Motor Spirit (Euro 5)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Petrol Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Official ex-depot consumer sale price for Petrol across all filling stations in Pakistan. Regulated by OGRA and notified by the Federal Ministry of Energy.
        </p>
      </div>

      {/* Featured Primary Price Card */}
      <div className="w-full">
        <PriceCard product={petrol} record={currentPrice} featured={true} />
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
            Petrol Price Trend (2026)
          </h2>
        </div>
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-sm">
          <PriceChart records={petrolHistory} productName="Petrol" />
        </div>
      </section>

      {/* ZONE 3: Historical Revisions Table (Full Width) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
            <span>📋 Government Notifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Recent Petrol Price Revisions
          </h2>
        </div>
        <div className="w-full">
          <HistoricalTable records={petrolHistory} />
        </div>
      </section>

      {/* ZONE 4: Dedicated Calculators Suite (Balanced 2-Column Space) */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-1">
            <span>⚡ Interactive Budget Tools</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Petrol Cost Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <TankFillCalculator
            compact={false}
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
          />
          <FuelCalculator
            initialPetrolPrice={petrolRate}
            initialDieselPrice={dieselRate}
            initialHiOctanePrice={hiOctaneRate}
          />
        </div>
      </section>

      {/* ZONE 5: Full-Width FAQs */}
      <section className="w-full">
        <FAQSection
          faqs={petrolFaqs}
          title="Petrol Pricing FAQs (Pakistan)"
          description="Detailed answers on how petrol is taxed, petroleum levy rates, and fortnightly revisions by OGRA."
        />
      </section>

      <AdPlacement slotId="petrol-page-bottom" format="leaderboard" />
    </div>
  );
}
