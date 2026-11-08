import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoryExplorer } from '@/components/HistoryExplorer';
import { FAQSection } from '@/components/FAQSection';
import { HISTORY_PAGE_FAQS } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Fuel & Petrol Price History in Pakistan | Archive',
  description:
    'Full official historical record of Petrol, Diesel, and petroleum price changes in Pakistan. Filter revisions and effective dates.',
};

export default async function PetrolHistoryPage() {
  const allRevisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">

      <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">History</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            History Archive
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Fortnightly Records
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Fuel Price History in Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Historical pricing trends, notification dates, and rupee changes across all regulated fuel products.
        </p>
      </div>

      {/* Interactive History Explorer with Fuel Filter Tabs */}
      <HistoryExplorer initialFuelId="petrol" allRecords={allRevisions} />

      <AdPlacement slotId="history-mid" format="leaderboard" />

      {/* FAQs */}
      <FAQSection
        faqs={HISTORY_PAGE_FAQS}
        title="Fuel History FAQs"
        description="Key information regarding Pakistan's fuel revision cycles and historical pricing."
      />
    </div>
  );
}
