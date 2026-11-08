'use client';

import React, { useState } from 'react';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { FuelCalculator } from '@/components/FuelCalculator';

interface FuelCalculatorSuiteProps {
  petrolPrice: number;
  dieselPrice: number;
  hiOctanePrice: number;
}

export function FuelCalculatorSuite({
  petrolPrice,
  dieselPrice,
  hiOctanePrice,
}: FuelCalculatorSuiteProps) {
  const [activeTab, setActiveTab] = useState<'tank' | 'trip'>('tank');

  return (
    <div className="w-full space-y-6">
      {/* High-End Segmented Control Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100/80 dark:bg-slate-900/80 p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Calculator Mode:
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('tank')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.98] ${
              activeTab === 'tank'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
              <path d="M15 9h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5a1.5 1.5 0 0 0-3-1" />
              <path d="M3 22h12" />
            </svg>
            <span>Vehicle Tank Fill-Up</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trip')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.98] ${
              activeTab === 'trip'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Trip &amp; Commute Cost</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Vehicle Tank Fill-Up Cost (Full 100% Width) */}
      {activeTab === 'tank' && (
        <div className="w-full animate-fadeIn">
          <TankFillCalculator
            compact={false}
            petrolPrice={petrolPrice}
            dieselPrice={dieselPrice}
            hiOctanePrice={hiOctanePrice}
          />
        </div>
      )}

      {/* Tab 2: Trip & Commute Cost Estimator + Motorway Benchmarks (Full 100% Width) */}
      {activeTab === 'trip' && (
        <div className="w-full space-y-6 animate-fadeIn">
          <FuelCalculator
            initialPetrolPrice={petrolPrice}
            initialDieselPrice={dieselPrice}
            initialHiOctanePrice={hiOctanePrice}
          />

          {/* Motorway Benchmark Guide */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xl">🛣️</span>
              <div>
                <h3 className="font-black text-base text-slate-950 dark:text-white">
                  Common Motorway Route Benchmarks (Pakistan)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Official distances between major Pakistani transport hubs for one-way journey planning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Lahore to Islamabad</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black text-xs block">M-2 Motorway (~375 KM)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Karachi to Hyderabad</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black text-xs block">M-9 Motorway (~165 KM)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Islamabad to Peshawar</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black text-xs block">M-1 Motorway (~180 KM)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">Multan to Lahore</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black text-xs block">M-3 Motorway (~340 KM)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
