import { Metadata } from 'next';
import Link from 'next/link';
import { FAQSection, FAQItem } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'About Us, Data Methodology & Verification | Pak Petrol Price',
  description:
    'Learn about Pak Petrol Price (pakpetrolprice.pk): Pakistan\'s authoritative fuel price monitoring platform. Discover our fortnightly verification methodology, data sources, and editorial standards.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us & Verification Methodology | Pak Petrol Price',
    description:
      'Pakistan\'s independent fuel rate monitoring platform. Verified OGRA notifications, historical pricing archives, and consumer calculators.',
    url: 'https://pakpetrolprice.pk/about',
    siteName: 'Pak Petrol Price',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Pak Petrol Price | Pakistan Fuel Rate Benchmark',
    description:
      'Official verification standards and methodology for monitoring Pakistani petroleum prices.',
  },
};

const ABOUT_FAQS: FAQItem[] = [
  {
    question: 'Is Pak Petrol Price affiliated with the Government of Pakistan or OGRA?',
    answer:
      'No. Pak Petrol Price (pakpetrolprice.pk) is an independent digital information and consumer energy benchmark platform. We are not a government agency or an arm of OGRA. We source and audit publicly available official gazette circulars issued by the Oil and Gas Regulatory Authority (OGRA) and the Federal Ministry of Energy to provide citizens with accurate, transparent, and timely fuel pricing data.',
  },
  {
    question: 'How quickly are new petrol and diesel prices published on the platform?',
    answer:
      'In Pakistan, the federal government announces fortnightly petroleum price revisions on the 15th and final day of every calendar month. Our verification desk ingests and cross-references the official Ministry of Energy gazette circular within minutes of public release, ensuring motorists have verified pump rates before the 12:00 AM midnight effective time.',
  },
  {
    question: 'Where does your historical fuel price archive come from?',
    answer:
      'Our historical price archive is compiled directly from successive authorized notifications issued by OGRA and the Petroleum Division of the Ministry of Energy over recent years. Each historical price point in our database is linked to its official gazette cycle and notification date.',
  },
  {
    question: 'Why are fuel rates identical across major cities like Karachi, Lahore, and Islamabad?',
    answer:
      'Under Pakistan’s Inland Freight Equalization Margin (IFEM) mechanism administered by OGRA, transport freight charges across refineries, ports, and inland depots are equalized nationwide. As a result, ex-depot consumer retail ceilings for Super Petrol and High-Speed Diesel are uniform across designated filling stations throughout the country.',
  },
  {
    question: 'Can commercial transport companies and researchers use your data?',
    answer:
      'Yes. Transport logistics operators, fleet managers, corporate procurement desks, and economic researchers actively use our verified rate tables, historical curves, and interactive trip calculators for cost accounting, fuel reimbursement audits, and inflation tracking.',
  },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Pak Petrol Price',
    url: 'https://pakpetrolprice.pk/about',
    description:
      'Pakistan\'s independent petroleum benchmark tracking and consumer energy portal, providing verified OGRA rates, historical price curves, and travel calculators.',
    publisher: {
      '@type': 'Organization',
      name: 'Pak Petrol Price',
      url: 'https://pakpetrolprice.pk',
      logo: 'https://pakpetrolprice.pk/opengraph-image',
      foundingDate: '2024',
      areaServed: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      knowsAbout: [
        'Petroleum Pricing in Pakistan',
        'OGRA Regulations & Circulars',
        'Inland Freight Equalization Margin (IFEM)',
        'Petroleum Development Levy (PDL)',
        'Fuel Economy & Trip Cost Calculation',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 w-full">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">About Us</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            About the Platform
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            About Pak Petrol Price
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Pakistan&apos;s authoritative, independent digital benchmark platform for verified petroleum prices, historical pricing curves, and interactive commute budget calculators.
          </p>
        </div>

        {/* AEO Core Direct Definition Snippet */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Platform Overview &amp; Mandate
          </span>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            <strong>Pak Petrol Price (pakpetrolprice.pk)</strong> is an independent consumer information portal established to deliver immediate, verified, and transparent petroleum pricing data to motorists, transport fleet operators, and businesses across Pakistan. We monitor and publish official rates notified by the <strong>Oil and Gas Regulatory Authority (OGRA)</strong> and the <strong>Federal Ministry of Energy (Petroleum Division)</strong> for Super Petrol (92 RON), High-Speed Diesel (HSD), Hi-Octane (97 RON), Light Diesel Oil, Kerosene, and Liquefied Petroleum Gas (LPG).
          </p>
        </div>

        {/* 4 Core Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
            <span className="text-2xl">🏛️</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Official Data Source
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every rate is cross-referenced with authorized Federal Gazette notifications and OGRA circulars.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
            <span className="text-2xl">⏱️</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Fortnightly Revisions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Updated on the 1st and 16th of each month, tracking 12:00 AM midnight statutory price adjustments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
            <span className="text-2xl">📊</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Historical Ledger
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Complete chronological archive of rupee deltas, percentage variances, and price trends since 2024.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
            <span className="text-2xl">🧮</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Financial Calculators
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Interactive tank fill-up and motorway travel cost estimators tailored for Pakistani vehicle models.
            </p>
          </div>
        </div>

        {/* Detailed Methodology Section */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Data Integrity &amp; Verification Protocol
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              How We Verify &amp; Publish Fuel Prices
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              In Pakistan, retail petroleum pricing is heavily regulated under the Petroleum Products (Petroleum Development Levy) Ordinance and statutory OGRA circulars. Our data pipeline follows a strict three-tier verification protocol:
            </p>

            <ol className="list-decimal pl-5 space-y-3 font-medium">
              <li>
                <strong className="text-slate-900 dark:text-white">OGRA Calculation &amp; Recommendation:</strong> On the 15th and final working day of each fortnight, OGRA submits price adjustment calculations based on Arab Gulf Mean FOB Platts benchmarks and SBP weighted average exchange rates.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Ministry of Energy Gazette Issuance:</strong> Following Prime Minister and Finance Division approval, the Petroleum Division issues the official consumer maximum ex-depot rate notifications.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Independent Audit &amp; Edge Sync:</strong> Our research desk cross-references the gazette numbers, updates the national pricing database, calculates exact rupee deltas, and synchronizes the rates across edge servers nationwide.
              </li>
            </ol>
          </div>
        </section>

        {/* Editorial Standards & Impartiality */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Editorial Independence &amp; Consumer Trust
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pak Petrol Price is 100% independent. We maintain zero commercial affiliations with any individual Oil Marketing Company (including PSO, Shell Pakistan, TotalParco, or Attock Petroleum). Our mission is solely focused on delivering accurate pricing data, consumer rights awareness, and practical budgeting utilities for Pakistani motorists and businesses.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <Link
              href="/contact"
              className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Contact our research desk</span>
              <span>→</span>
            </Link>
            <Link
              href="/advertise"
              className="font-bold text-slate-700 dark:text-slate-300 hover:underline inline-flex items-center gap-1"
            >
              <span>Advertising opportunities</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Dedicated FAQ Section for AEO / GEO */}
        <FAQSection
          faqs={ABOUT_FAQS}
          title="Frequently Asked Questions About Us"
          description="Direct answers on our platform mandate, data sources, update schedules, and verification protocols."
        />
      </div>
    </>
  );
}
