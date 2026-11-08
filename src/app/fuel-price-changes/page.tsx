import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';

export const metadata: Metadata = {
  title: 'Fuel Price Changes in Pakistan | Recent Revisions',
  description:
    'Track official fuel price increases and decreases in Pakistan. Filter by fuel type to see exact price differences in PKR per litre.',
};

export default async function FuelPriceChangesPage() {
  const revisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full">

      <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            Price Revisions
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Chronological
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Fuel Price Changes in Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Official rupee price adjustments announced in recent notifications. Filter by fuel type below.
        </p>
      </div>

      <section className="space-y-4">
        <HistoricalTable
          records={revisions}
          showProductColumn={true}
          enableFuelFilter={true}
          defaultFilter="all"
        />
      </section>
    </div>
  );
}
