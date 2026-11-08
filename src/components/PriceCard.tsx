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
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">Pending official revision publication.</p>
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

  const formattedVerificationDate = new Intl.DateTimeFormat('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Karachi',
  }).format(new Date(record.verificationTimestamp));

  // Product ticker codes for institutional clarity
  const productTickers: Record<string, string> = {
    petrol: 'PK-MS92 · MOTOR SPIRIT',
    diesel: 'PK-HSD · HIGH SPEED DIESEL',
    'hi-octane': 'PK-RON97 · HI-OCTANE BLEND',
    kerosene: 'PK-SKO · SUPERIOR KEROSENE',
    ldo: 'PK-LDO · LIGHT DIESEL OIL',
    lpg: 'PK-LPG · LIQUEFIED PETROLEUM',
  };

  const ticker = productTickers[product.id] || product.displayName.toUpperCase();

  // ==========================================
  // 1. PRIMARY FEATURED HERO CARD (PETROL)
  // ==========================================
  if (featured) {
    return (
      <div className="relative bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs dark:shadow-md p-5 sm:p-7 md:p-8 transition-all overflow-hidden glow-card w-full">
        {/* Subtle decorative background gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        {/* Top Meta Bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-mono text-[11px] font-bold tracking-wider uppercase">
              {ticker}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official OGRA Benchmark</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            <span>Unit:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
              PKR / {product.unit === 'litre' ? 'Litre' : product.unit}
            </span>
          </div>
        </div>

        {/* Hero Price & Details Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {product.displayName} Rate Today
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Mandated nationwide consumer retail price at all oil marketing company filling stations (PSO, Shell, Total Parco, Attock Petroleum).
            </p>

            {/* Change Delta Pill */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {change.direction === 'INCREASE' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/80 px-2.5 py-1 rounded-lg">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 01-1.414 0L7.293 3.707a1 1 0 011.414-1.414L12 5.586l3.293-3.293a1 1 0 111.414 1.414L13.414 7A1 1 0 0112 7z" clipRule="evenodd" transform="rotate(180 10 10)" />
                  </svg>
                  <span>+Rs. {change.changePkr.toFixed(2)} (+{change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'DECREASE' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-lg">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 14.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 17z" clipRule="evenodd" />
                  </svg>
                  <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'UNCHANGED' && (
                <span className="inline-flex items-center text-xs font-bold font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  Unchanged (0.00%)
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                vs previous fortnightly cycle
              </span>
            </div>
          </div>

          {/* Right Main Rate Display Box */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 sm:p-6 text-center lg:text-right">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Current Consumer Rate
            </span>
            <div className="flex items-baseline justify-center lg:justify-end gap-1.5 text-slate-950 dark:text-white">
              <span className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-slate-500 select-none">
                Rs.
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight tabular-nums price-num">
                {record.pricePkr.toFixed(2)}
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 select-none">
                PKR
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
              Includes Petroleum Development Levy (PDL) &amp; GST
            </p>
          </div>
        </div>

        {freshness.warning && (
          <div className="my-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 font-medium">
            <span className="font-bold">Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Institutional 4-Column Audit Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-5 border-t border-slate-100 dark:border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Effective Date
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              {formattedEffectiveDate}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Next Revision
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              Fortnightly Midnight PKT
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Audit Timestamp
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 truncate block mt-0.5">
              {formattedVerificationDate}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Gazette Source
            </span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline inline-flex items-center gap-1 truncate mt-0.5"
            >
              <span>{record.sourceType === 'OGRA_NOTIFIED' ? 'OGRA Circular' : 'Official Notification'}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. SECONDARY COMPACT FUEL CARDS
  // ==========================================
  return (
    <div className="group bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full">
      <div>
        {/* Product Ticker Pill & Unit */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 truncate">
            {product.id === 'hi-octane'
              ? 'RON 97'
              : product.id === 'diesel'
              ? 'HSD EURO-5'
              : product.id === 'lpg'
              ? 'LPG CYL'
              : product.id.toUpperCase()}
          </span>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            /{product.unit}
          </span>
        </div>

        {/* Product Display Name */}
        <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-snug line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {product.displayName}
        </h3>

        {/* Price Display */}
        <div className="my-2.5 flex items-baseline gap-1">
          <span className="text-xs font-semibold text-slate-400">Rs.</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight tabular-nums price-num">
            {record.pricePkr.toFixed(2)}
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5 mb-3">
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
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
          Eff. {formattedEffectiveDate}
        </span>
        <Link
          href={`/${product.slug}`}
          className="font-bold text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
        >
          <span>Audit</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
