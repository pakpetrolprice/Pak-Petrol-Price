import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculatorSuite } from '@/components/FuelCalculatorSuite';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { HOME_FAQS } from '@/lib/faq-data';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';
import { WordPressService } from '@/lib/wordpress';

export default async function HomePage() {
  const products = await FuelRepository.getActiveProducts();
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');
  const recentRevisions = await FuelRepository.getAllApprovedRevisions();
  const latestArticles = await WordPressService.getPosts(3);

  const petrol = products.find(p => p.id === 'petrol');
  const otherFuels = products.filter(p => p.id !== 'petrol');

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pak Petrol Price',
    url: 'https://pakpetrolprice.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pakpetrolprice.pk/?q={search_term_string}',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 w-full">
        {/* ============================================================ */}
        {/* ZONE 1: LIVE FUEL RATES                                      */}
        {/* ============================================================ */}
        <section aria-label="Current Fuel Rates" className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Rates
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Fortnightly Notification
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Petrol &amp; Fuel Prices in Pakistan Today
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Official consumer rates notified by the Government of Pakistan and OGRA.
              </p>
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
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                Other Fuel Rates
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Diesel · Hi-Octane · Kerosene · LPG
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
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
          <div className="pt-1">
            <OgraStatusWidget products={products} latestPrices={latestPrices} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 2: PRICE TREND                                          */}
        {/* ============================================================ */}
        <section aria-label="Historical Price Trend" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Petrol Price Trend
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Historical price movement across recent fortnightly revisions (PKR / Litre).
              </p>
            </div>
            <Link
              href="/petrol-price-history"
              className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Full History</span>
              <span>→</span>
            </Link>
          </div>

          <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
            <PriceChart records={petrolHistory} productName="Petrol" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 3: RECENT PRICE CHANGES                                 */}
        {/* ============================================================ */}
        <section aria-label="Recent Fuel Revisions" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Recent Price Changes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Official price adjustments announced in recent notifications.
              </p>
            </div>
            <Link
              href="/fuel-price-changes"
              className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors shrink-0"
            >
              <span>All Changes</span>
              <span>→</span>
            </Link>
          </div>

          <div className="w-full">
            <HistoricalTable records={recentRevisions.slice(0, 6)} showProductColumn={true} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 4: FUEL CALCULATORS                                     */}
        {/* ============================================================ */}
        <section aria-label="Fuel Cost Calculators" id="calculators" className="space-y-5">
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Fuel Cost Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Estimate vehicle tank fill-up cost or calculate travel budget for your trip.
            </p>
          </div>

          <FuelCalculatorSuite
            petrolPrice={petrolPrice}
            dieselPrice={dieselPrice}
            hiOctanePrice={hiOctanePrice}
          />
        </section>

        {/* ============================================================ */}
        {/* ZONE 5: FUEL NEWS & UPDATES (Headless WordPress CMS)          */}
        {/* ============================================================ */}
        {latestArticles.length > 0 && (
          <section aria-label="Latest Fuel Market News" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                  Latest from the Blog
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Guides, updates, and news on fuel prices in Pakistan.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors shrink-0"
              >
                <span>View All Posts</span>
                <span>→</span>
              </Link>
            </div>

            <div className={`grid grid-cols-1 ${latestArticles.length === 1 ? 'max-w-xl' : latestArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
              {latestArticles.map(article => (
                <article
                  key={article.slug || `${article.id}`}
                  className="group bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={article.featuredImage}
                        alt={article.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-sm border border-white/10">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span>{article.formattedDate}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="font-bold text-slate-950 dark:text-white text-base tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      {article.author}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Article →</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ZONE 6: FREQUENTLY ASKED QUESTIONS                           */}
        {/* ============================================================ */}
        <section aria-label="Frequently Asked Questions" className="w-full">
          <FAQSection
            faqs={HOME_FAQS}
            title="Frequently Asked Questions"
            description="Clear answers regarding fuel pricing, fortnightly revision schedules, and rates in Pakistan."
          />
        </section>

        {/* Bottom Leaderboard Ad */}
        <AdPlacement slotId="home-bottom-banner" format="leaderboard" />
      </div>
    </>
  );
}
