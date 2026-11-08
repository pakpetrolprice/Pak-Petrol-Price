import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs: FAQItem[];
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle,
  description,
  faqs,
}: FAQSectionProps) {
  const displaySubtitle = description || subtitle || 'Everything you need to know about fuel pricing and price revisions in Pakistan.';

  // Generate FAQ schema.org structured data for SEO rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-label="Frequently Asked Questions" className="w-full my-6 sm:my-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xs transition-colors w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* Dedicated Full-Width Row Per FAQ Accordion Stack */}
        <div className="space-y-3 sm:space-y-3.5 w-full">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 open:border-emerald-500/40 dark:open:border-emerald-500/40 open:bg-white dark:open:bg-slate-800/70 transition-all cursor-pointer shadow-xs w-full"
            >
              <summary className="flex justify-between items-center gap-4 text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 select-none list-none pr-1 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl [&::-webkit-details-marker]:hidden cursor-pointer">
                <span className="leading-snug">{faq.question}</span>
                <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white dark:bg-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 group-open:rotate-180 transition-all shadow-xs border border-slate-200/70 dark:border-slate-600/70">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-3 border-t border-slate-200/60 dark:border-slate-700/60 max-w-5xl">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
