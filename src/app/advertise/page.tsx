import { Metadata } from 'next';
import Link from 'next/link';
import { FAQSection, FAQItem } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Advertise With Us | Target Millions of Motorists in Pakistan',
  description:
    'Explore high-impact digital advertising opportunities on Pak Petrol Price (pakpetrolprice.pk). Connect with car owners, daily commuters, and transport operators across Pakistan.',
  alternates: {
    canonical: '/advertise',
  },
  openGraph: {
    title: 'Advertise With Us | Pak Petrol Price',
    description:
      'Reach Pakistan\'s highest-intent automotive and commuter audience. Premium banner placements, calculator sponsorships, and native content.',
    url: 'https://pakpetrolprice.pk/advertise',
    siteName: 'Pak Petrol Price',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Advertise on Pak Petrol Price',
    description:
      'Digital media placements and automotive sponsorship opportunities on Pakistan\'s fuel benchmark portal.',
  },
};

const ADVERTISE_FAQS: FAQItem[] = [
  {
    question: 'What types of advertising placements are available on Pak Petrol Price?',
    answer:
      'We offer high-visibility leaderboard banners (728x90 desktop / 320x100 mobile), native in-content display cards (300x250 and 336x280), exclusive tool sponsorships inside our vehicle tank fill-up and motorway journey calculators, and sponsored editorial guides in our Market Insights section.',
  },
  {
    question: 'Who is the primary audience on pakpetrolprice.pk?',
    answer:
      'Our audience consists of active vehicle owners, daily car and motorcycle commuters, ride-hailing drivers (InDrive, Yango, Uber, Bykea), long-distance interstate motorway travelers, and commercial logistics managers across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.',
  },
  {
    question: 'Can advertisers run category-exclusive or time-targeted campaigns during price revision days?',
    answer:
      'Yes. Fuel revision days (the 1st and 16th of each month) experience massive surges in traffic as motorists and fleet owners verify new rates. We offer exclusive 48-hour "Price Revision Takeover" packages guaranteeing 100% share of voice during these high-volume cycles.',
  },
  {
    question: 'How do we request a custom media kit and advertising rate card?',
    answer:
      'You can request our current media kit, impression statistics, and CPM / fixed tenancy rate cards by contacting our commercial desk via the contact form or directly emailing pakpetrolprice@gmail.com with your brand details and intended campaign flight dates.',
  },
];

export default function AdvertisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Advertise on Pak Petrol Price',
    url: 'https://pakpetrolprice.pk/advertise',
    description:
      'Digital advertising and brand sponsorship opportunities targeting Pakistani motorists, vehicle owners, and commercial transport operators.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PKR',
      offerCount: '4',
      availability: 'https://schema.org/InStock',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Motorists, Vehicle Owners, Fleet Managers, Commuters in Pakistan',
      geographicArea: {
        '@type': 'Country',
        name: 'Pakistan',
      },
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
          <span className="text-slate-900 dark:text-white font-bold">Advertise With Us</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Media &amp; Sponsorships
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Advertise on Pak Petrol Price
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Connect your brand directly with Pakistan&apos;s most engaged automotive audience, daily commuters, and transport operators at the exact moment they evaluate fuel spending.
          </p>
        </div>

        {/* AEO Value Proposition Direct Block */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Why Partner With Pak Petrol Price
          </span>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            <strong>Pak Petrol Price (pakpetrolprice.pk)</strong> attracts high-intent consumers actively planning vehicle maintenance, monthly travel budgets, and commercial logistics across Pakistan. When fuel prices revise every fortnight, our platform serves as the definitive reference point for millions of Pakistani motorists—delivering extraordinary visibility and click-through performance for automotive brands, insurance providers, banking products, and consumer tech.
          </p>
        </div>

        {/* Audience Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Primary Audience
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              Motorists &amp; Fleets
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Car owners, bike commuters, and logistics managers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Geographic Focus
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              100% Pakistan
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Karachi, Lahore, Islamabad, and nationwide metros.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Peak Traffic Surges
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Fortnightly Spikes
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Massive traffic spikes on 1st &amp; 16th revision dates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Contextual Alignment
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              High Purchasing Intent
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visitors calculating fuel, travel, and vehicle costs.
            </p>
          </div>
        </div>

        {/* Available Ad Formats Grid */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Premium Ad Formats &amp; Placement Inventory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Choose from high-impact display units, native cards, or exclusive interactive tool sponsorships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold uppercase">
                  Top Visibility
                </span>
                <span className="text-xs font-mono text-slate-400">728×90 / 320×100</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                1. Above-The-Fold Leaderboard
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Positioned immediately below the navigation bar and above live commodity price cards. Highest viewability and instant first-impression brand recall.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-mono text-[10px] font-bold uppercase">
                  Interactive Engagement
                </span>
                <span className="text-xs font-mono text-slate-400">Native Integration</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                2. Calculator Suite Sponsorship
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Exclusive brand placement directly inside the vehicle tank fill-up and motorway travel cost calculators. Ideal for auto lubricants, tires, and credit cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-mono text-[10px] font-bold uppercase">
                  High Click-Through
                </span>
                <span className="text-xs font-mono text-slate-400">300×250 / Responsive</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                3. In-Feed Content Cards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Placed seamlessly between the historical price trend chart and the recent price revisions table. Guarantees prolonged reader attention and high engagement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold uppercase">
                  Thought Leadership
                </span>
                <span className="text-xs font-mono text-slate-400">Editorial Article</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                4. Sponsored Market Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Authoritative sponsored articles published in our Blog &amp; Insights section, indexed permanently in Google Search and distributed across social feeds.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-950 text-white border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to Launch Your Campaign?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Contact our advertising team today to receive our latest media kit, traffic analytics, and custom campaign proposals.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all text-center"
            >
              Contact Us →
            </Link>
          </div>
        </div>

        {/* Dedicated Advertiser FAQs */}
        <FAQSection
          faqs={ADVERTISE_FAQS}
          title="Frequently Asked Advertising Questions"
          description="Detailed guidance regarding campaign formats, revision spike takeovers, and media kit requests."
        />
      </div>
    </>
  );
}
