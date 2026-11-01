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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100 dark:bg-slate-900/80 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-900 dark:text-white px-2">
            Select Tool:
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('tank')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
              activeTab === 'tank'
                ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>⛽</span>
            <span>Vehicle Tank Fill-Up Cost</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trip')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
              activeTab === 'trip'
                ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>🛣️</span>
            <span>Trip &amp; Commute Cost Estimator</span>
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
