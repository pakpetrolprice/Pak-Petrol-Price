'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PriceRecord } from '@/types/fuel';

interface PriceChartProps {
  records: PriceRecord[];
  productName: string;
}

export function PriceChart({ records, productName }: PriceChartProps) {
  if (!records || records.length === 0) {
    return null;
  }

  // Format records chronologically for chart display
  const chartData = [...records]
    .sort((a, b) => new Date(a.effectiveStart).getTime() - new Date(b.effectiveStart).getTime())
    .map(r => {
      const d = new Date(r.effectiveStart);
      const label = `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })}`;
      return {
        date: label,
        fullDate: d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
        price: r.pricePkr,
        identifier: r.notificationIdentifier || 'OGRA Gazette Revision',
      };
    });

  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];
  const initialPrice = prices[0];
  const ytdChange = currentPrice - initialPrice;
  const ytdPct = ((ytdChange / initialPrice) * 100).toFixed(2);

  const yDomainMin = Math.floor(minPrice - 8);
  const yDomainMax = Math.ceil(maxPrice + 8);

  return (
    <div className="space-y-5 w-full">
      {/* High-Level Financial Analytics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Current Rate
          </span>
          <span className="text-base sm:text-lg font-black text-slate-950 dark:text-white tabular-nums price-num mt-0.5 block">
            Rs. {currentPrice.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Period High
          </span>
          <span className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 tabular-nums price-num mt-0.5 block">
            Rs. {maxPrice.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Period Low
          </span>
          <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums price-num mt-0.5 block">
            Rs. {minPrice.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Net Trajectory
          </span>
          <span
            className={`text-base sm:text-lg font-bold tabular-nums price-num mt-0.5 block ${
              ytdChange <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {ytdChange > 0 ? `+Rs. ${ytdChange.toFixed(2)}` : `-Rs. ${Math.abs(ytdChange).toFixed(2)}`}
            <span className="text-xs ml-1 font-mono font-medium">({ytdPct}%)</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-80 md:h-96 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1', opacity: 0.4 }}
            />
            <YAxis
              domain={[yDomainMin, yDomainMax]}
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => `Rs.${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950/95 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs backdrop-blur-md space-y-1">
                      <span className="font-mono text-emerald-400 text-[11px] block">{data.fullDate}</span>
                      <div className="flex items-baseline gap-1 text-white">
                        <span className="text-xs text-slate-400">Rs.</span>
                        <span className="font-mono font-black text-lg">{Number(data.price).toFixed(2)}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">PKR</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[200px]">
                        {data.identifier}
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#059669"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#rateGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
