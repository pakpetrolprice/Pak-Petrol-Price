import React from 'react';
import Link from 'next/link';
import { PriceRecord, FuelProduct } from '@/types/fuel';
import { VerificationEngine } from '@/lib/verification-engine';

interface PriceCardProps {
  product: FuelProduct;
  record?: PriceRecord | null;
  featured?: boolean;
}

export function PriceCard({ product, record, featured = false }: PriceCardProps) {
  if (!record) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{product.displayName}</span>
          <p className="text-sm text-slate-500 font-medium mt-1">Pending official revision publication.</p>
        </div>
      </div>
    );
  }

  const freshness = VerificationEngine.checkFreshness(record.verificationTimestamp, 72);
  const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);

  const formattedEffectiveDate = new Intl.DateTimeFormat('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  }).format(new Date(record.effectiveStart));

  const verifiedDate = record.verificationTimestamp ? new Date(record.verificationTimestamp) : null;
  const formattedVerifiedTime = verifiedDate && !isNaN(verifiedDate.getTime())
    ? new Intl.DateTimeFormat('en-PK', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Karachi',
      }).format(verifiedDate)
    : null;

  // ==========================================
  // 1. PRIMARY FEATURED HERO CARD (PETROL)
  // ==========================================
  if (featured) {
    return (
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 sm:p-8 transition-all overflow-hidden w-full">
        {/* Top Status & Unit Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official OGRA Rate</span>
            </span>

            {formattedVerifiedTime && (
              <span
                title={`Crawler verified live at ${formattedVerifiedTime} PKT`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified: {formattedVerifiedTime}</span>
              </span>
            )}
          </div>

          <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
            Per {product.unit === 'litre' ? 'Litre' : product.unit}
          </span>
        </div>

        {/* Hero Price Display */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              {product.displayName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Nationwide consumer rate across all filling stations in Pakistan.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-baseline gap-1 text-slate-950 dark:text-white">
              <span className="text-2xl sm:text-3xl font-bold text-slate-400 select-none">
                Rs.
              </span>
              <span className="text-5xl sm:text-6xl font-black tracking-tight tabular-nums price-num">
                {record.pricePkr.toFixed(2)}
              </span>
            </div>

            {/* Change Delta Pill */}
            <div className="pt-2 flex items-center gap-2">
              {change.direction === 'INCREASE' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/80 px-2.5 py-0.5 rounded-md">
                  <span>▲</span>
                  <span>+Rs. {change.changePkr.toFixed(2)} (+{change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'DECREASE' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                  <span>▼</span>
                  <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'UNCHANGED' && (
                <span className="inline-flex items-center text-xs font-bold font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                  Unchanged
                </span>
              )}
              <span className="text-xs text-slate-400 font-medium">
                vs previous cycle
              </span>
            </div>
          </div>
        </div>

        {freshness.warning && (
          <div className="my-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 font-medium">
            <span className="font-bold">Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Clean Meta Row (No clutter, 2 items) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono">
            <span>Effective:</span>
            <span className="font-bold text-slate-900 dark:text-white">{formattedEffectiveDate}</span>
          </div>

          <a
            href={record.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Verified from OGRA Portal</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. SECONDARY COMPACT FUEL CARDS
  // ==========================================
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full">
      <div>
        {/* Product Name & Unit */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {product.displayName}
          </h3>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            /{product.unit}
          </span>
        </div>

        {/* Small Verified Time Badge */}
        {formattedVerifiedTime && (
          <div className="mb-2">
            <span
              title={`Crawler verified live at ${formattedVerifiedTime} PKT`}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-[10px] font-mono font-medium text-emerald-800 dark:text-emerald-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <span>Verified: {formattedVerifiedTime}</span>
            </span>
          </div>
        )}

        {/* Price Display */}
        <div className="my-2 flex items-baseline gap-1">
          <span className="text-xs font-semibold text-slate-400">Rs.</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight tabular-nums price-num">
            {record.pricePkr.toFixed(2)}
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5 mb-2">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 px-2 py-0.5 rounded">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-[11px] font-semibold font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              Unchanged
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Details Link */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
          {formattedEffectiveDate}
        </span>
        <Link
          href={`/${product.slug}`}
          className="font-bold text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
        >
          <span>Details</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
