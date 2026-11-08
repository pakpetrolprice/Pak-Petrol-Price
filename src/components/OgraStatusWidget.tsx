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
    : 'Active Cycle';

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs w-full">
      {/* Header with Verification Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
              Regulatory Audit &amp; Official OGRA Gazette Verification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              All prices shown on this platform are cross-referenced with authorized Federal Ministry notifications.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Govt Gazette Verified</span>
          </span>
        </div>
      </div>

      {/* 4-Column Audit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            Regulatory Authority
          </span>
          <span className="block font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
            OGRA &amp; Ministry of Energy
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            Active Gazette Code
          </span>
          <span className="block font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm truncate">
            {petrolRecord?.notificationIdentifier || 'OGRA-NOTIFIED-CYCLE'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="block text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            Audit Check Timestamp
          </span>
          <span className="block font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
            {formattedVerifiedDate} PKT
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1 flex flex-col justify-between">
          <span className="block text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            Public Gazette Portal
          </span>
          <a
            href="https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 text-xs sm:text-sm mt-0.5"
          >
            <span className="truncate">price.ogra.org.pk</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
