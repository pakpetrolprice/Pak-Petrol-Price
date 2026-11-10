'use client';

import React from 'react';
import { PriceRecord, FuelProduct } from '@/types/fuel';

interface OgraStatusWidgetProps {
  products: FuelProduct[];
  latestPrices: Record<string, PriceRecord>;
}

export function OgraStatusWidget({ latestPrices }: OgraStatusWidgetProps) {
  const petrolRecord = latestPrices['petrol'];
  const formattedVerifiedDate = petrolRecord?.effectiveStart
    ? new Intl.DateTimeFormat('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Karachi',
      }).format(new Date(petrolRecord.effectiveStart))
    : 'Current Cycle';

  const crawlDate = petrolRecord?.verificationTimestamp ? new Date(petrolRecord.verificationTimestamp) : null;
  const formattedCrawlTime = crawlDate && !isNaN(crawlDate.getTime())
    ? new Intl.DateTimeFormat('en-PK', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Karachi',
      }).format(crawlDate)
    : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
        <span className="text-slate-600 dark:text-slate-300 font-medium truncate sm:overflow-visible sm:whitespace-normal">
          Official rates notified by <strong className="text-slate-900 dark:text-white font-semibold">OGRA &amp; Ministry of Energy</strong>. Applicable nationwide.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
        <span>Effective: {formattedVerifiedDate}</span>
        {formattedCrawlTime && (
          <>
            <span>·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Crawler: {formattedCrawlTime}
            </span>
          </>
        )}
        <span>·</span>
        <a
          href="https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline inline-flex items-center gap-1"
        >
          <span>OGRA Gazette</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}
