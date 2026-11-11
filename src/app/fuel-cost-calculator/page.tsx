import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { FuelCalculator } from '@/components/FuelCalculator';
import { FAQSection } from '@/components/FAQSection';
import { FUEL_COST_CALCULATOR_FAQS } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator Pakistan | Calculate Petrol & Diesel Trip Cost',
  description:
    'Calculate exact petrol, diesel, and hi-octane fuel cost per KM and trip expenses for cars, bikes, and SUVs in Pakistan using live verified OGRA rates.',
  keywords: [
    'fuel cost calculator pakistan',
    'petrol trip calculator pakistan',
    'petrol cost per km pakistan',
    'diesel trip calculator',
    'lahore to islamabad petrol cost',
    'karachi to hyderabad fuel cost',
    'fuel consumption calculator pakistan',
  ],
  alternates: {
    canonical: 'https://pakpetrolprice.pk/fuel-cost-calculator',
  },
  openGraph: {
    title: 'Fuel Cost Calculator Pakistan | Petrol & Diesel Trip Estimator',
    description:
      'Calculate precise fuel cost per KM and journey expense across Pakistan with today’s live OGRA rates for Alto, Corolla, Civic, CD 70 & all vehicles.',
    url: 'https://pakpetrolprice.pk/fuel-cost-calculator',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function FuelCostCalculatorPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 335.00;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 364.00;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  // Schema.org SoftwareApplication & FAQPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://pakpetrolprice.pk/fuel-cost-calculator#app',
        name: 'Fuel Cost Calculator Pakistan',
        url: 'https://pakpetrolprice.pk/fuel-cost-calculator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PKR',
        },
        description:
          'Free online tool to calculate petrol, diesel, and journey expenses per kilometer across Pakistan with live OGRA rates.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://pakpetrolprice.pk/fuel-cost-calculator#faq',
        mainEntity: FUEL_COST_CALCULATOR_FAQS.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-10 w-full">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs & Page Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/petrol-calculator" className="hover:text-emerald-600 transition">
            Calculators
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Fuel Cost Calculator</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            ⚡ Journey &amp; Commute Tool
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live OGRA Benchmark Rates
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Fuel Cost Calculator Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Calculate your exact petrol and diesel fuel expense per kilometer (KM), single trip or return journey cost, and total fuel consumption using today&apos;s verified government rates.
        </p>

        {/* Quick Cross Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
          <span className="text-slate-500">Also explore:</span>
          <Link
            href="/fuel-tank-calculator"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            ⛽ Fuel Tank Fill-Up Calculator →
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/petrol-calculator"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600"
          >
            All Fuel Calculators Hub
          </Link>
        </div>
      </div>

      {/* Main Interactive Tool */}
      <section className="w-full">
        <FuelCalculator
          initialPetrolPrice={petrolPrice}
          initialDieselPrice={dieselPrice}
          initialHiOctanePrice={hiOctanePrice}
        />
      </section>

      {/* How Fuel Cost Calculation Works Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
            📐 Calculation Formula
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            How Is Trip Fuel Cost Calculated?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Fuel expense calculation depends on three key variables: journey distance, vehicle fuel economy (km/L), and today&apos;s petrol rate per litre:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-emerald-400">
            Total Fuel Cost (PKR) = (Distance in KM ÷ Mileage in KM/L) × Price per Litre
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-emerald-400">
            Cost per KM (PKR) = Price per Litre ÷ Mileage in KM/L
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Example: If traveling 375 KM from Lahore to Islamabad in a car delivering 14 km/L at Rs. 335/L: (375 ÷ 14) × 335 = Rs. 8,973 one-way.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
            💡 Mileage Optimization
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            How to Improve Fuel Average in Pakistan
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Maintain Proper Tyre Pressure:</strong> Under-inflated tyres increase rolling resistance by 10%, burning unnecessary fuel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Cruise at 80–100 KM/H:</strong> Driving above 110 KM/H on motorways exponentially elevates aerodynamic drag.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Clean Air Filter Regularly:</strong> Pakistan’s dusty road conditions clog engine air filters, reducing fuel efficiency.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Avoid Aggressive Braking &amp; Acceleration:</strong> Gentle throttle input saves up to 15% fuel during urban city commutes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Popular Vehicles Cost per KM Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div>
          <h2 className="font-black text-slate-950 dark:text-white text-xl sm:text-2xl tracking-tight">
            Popular Vehicle Fuel Cost Per Kilometer in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Real-world mixed city driving estimates at today&apos;s active fuel rates:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Vehicle</th>
                <th className="py-3 px-3">Fuel Type</th>
                <th className="py-3 px-3">Average Mileage</th>
                <th className="py-3 px-3 text-right">Cost Per 1 KM</th>
                <th className="py-3 px-3 text-right">Cost Per 100 KM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Honda CD 70</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">55 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 55).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 55) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Honda CG 125 / YBR</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">42 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 42).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 42) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Suzuki Alto (660cc)</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">19 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 19).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 19) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Suzuki Cultus / Wagon R</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">16 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 16).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 16) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Toyota Yaris / City 1.3</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">14 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 14).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 14) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Toyota Corolla 1.6 / Civic</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Petrol</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">12 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {(petrolPrice / 12).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 12) * petrolPrice).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Toyota Fortuner / Revo Diesel</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Diesel</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">10 km/L</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-blue-600">Rs. {(dieselPrice / 10).toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">Rs. {((100 / 10) * dieselPrice).toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Intercity Highway Route Distances Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div>
          <h2 className="font-black text-slate-950 dark:text-white text-xl sm:text-2xl tracking-tight">
            Popular Intercity Route Fuel Estimations in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Common motorway distances and estimated one-way fuel cost for a typical 1.3L sedan (14 km/L):
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="font-black text-slate-950 dark:text-white block mb-1">Lahore to Islamabad</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-xs block">M-2 Motorway: ~375 KM</span>
            <span className="font-mono text-xs font-bold text-emerald-600 block mt-1">Approx. Rs. {((375 / 14) * petrolPrice).toFixed(0)}</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="font-black text-slate-950 dark:text-white block mb-1">Karachi to Hyderabad</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-xs block">M-9 Motorway: ~165 KM</span>
            <span className="font-mono text-xs font-bold text-emerald-600 block mt-1">Approx. Rs. {((165 / 14) * petrolPrice).toFixed(0)}</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="font-black text-slate-950 dark:text-white block mb-1">Islamabad to Peshawar</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-xs block">M-1 Motorway: ~180 KM</span>
            <span className="font-mono text-xs font-bold text-emerald-600 block mt-1">Approx. Rs. {((180 / 14) * petrolPrice).toFixed(0)}</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="font-black text-slate-950 dark:text-white block mb-1">Multan to Lahore</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-xs block">M-3/M-4 Motorway: ~340 KM</span>
            <span className="font-mono text-xs font-bold text-emerald-600 block mt-1">Approx. Rs. {((340 / 14) * petrolPrice).toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* SEO FAQs */}
      <FAQSection
        faqs={FUEL_COST_CALCULATOR_FAQS}
        title="Fuel Cost Calculator FAQs"
        description="Frequently asked questions about calculating fuel cost per kilometer, intercity travel petrol consumption, and fuel saving in Pakistan."
      />
    </div>
  );
}
