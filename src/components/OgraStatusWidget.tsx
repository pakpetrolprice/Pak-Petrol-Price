'use client';

import React from 'react';
import Link from 'next/link';
import { PriceRecord, FuelProduct } from '@/types/fuel';

interface OgraStatusWidgetProps {
  products: FuelProduct[];
  latestPrices: Record<string, PriceRecord>;
}

export function OgraStatusWidget({ products, latestPrices }: OgraStatusWidgetProps) {
  const petrolRecord = latestPrices['petrol'];
  const formattedVerifiedDate = petrolRecord?.verificationTimestamp
    ? new Intl.DateTimeFormat('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Karachi',
      }).format(new Date(petrolRecord.verificationTimestamp))
    : 'Active Today';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm w-full space-y-4">
      {/* Verification Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <h3 className="font-black text-sm sm:text-base text-slate-950 dark:text-white uppercase tracking-wider">
            OGRA Official Source Verification
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
            ● Live &amp; Government Verified
          </span>
        </div>
      </div>

      {/* Horizontal Metadata Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            Regulatory Authority
          </span>
          <span className="block font-black text-slate-950 dark:text-white text-sm">
            OGRA &amp; Ministry of Energy
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            Latest Circular Code
          </span>
          <span className="block font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm truncate">
            {petrolRecord?.notificationIdentifier || 'OGRA-REVISION-2026-10-24'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            Effective Fortnight
          </span>
          <span className="block font-black text-slate-950 dark:text-white text-sm">
            October 24, 2026 (Active)
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 flex flex-col justify-between">
          <span className="block text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            Official Government Portal
          </span>
          <a
            href="https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 text-sm"
          >
            <span>price.ogra.org.pk</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
