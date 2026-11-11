import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { FAQSection } from '@/components/FAQSection';
import { FUEL_TANK_CALCULATOR_FAQS } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Fuel Tank Fill-Up Cost Calculator Pakistan | Car & Bike Tank Capacity',
  description:
    'Calculate the exact cost to completely fill up or top-off your vehicle fuel tank in Pakistan. Verified tank capacities for Alto, Cultus, Civic, Corolla, CD 70, Sportage & Fortuner.',
  keywords: [
    'fuel tank calculator pakistan',
    'petrol full tank price pakistan',
    'car fuel tank capacity pakistan',
    'suzuki alto full tank price',
    'toyota corolla fuel tank cost',
    'honda cd 70 full tank price',
    'tank fill up cost calculator',
  ],
  alternates: {
    canonical: 'https://pakpetrolprice.pk/fuel-tank-calculator',
  },
  openGraph: {
    title: 'Fuel Tank Fill-Up Cost Calculator Pakistan | Car & Bike Capacities',
    description:
      'Find out how much money is required to fill your petrol or diesel vehicle tank from empty to full at today’s official OGRA notified rates.',
    url: 'https://pakpetrolprice.pk/fuel-tank-calculator',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function FuelTankCalculatorPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 335.00;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 364.00;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  // Schema.org WebApplication & FAQPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://pakpetrolprice.pk/fuel-tank-calculator#app',
        name: 'Fuel Tank Fill-Up Cost Calculator Pakistan',
        url: 'https://pakpetrolprice.pk/fuel-tank-calculator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PKR',
        },
        description:
          'Free online tool to calculate vehicle fuel tank fill-up and top-off costs for cars and motorcycles in Pakistan.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://pakpetrolprice.pk/fuel-tank-calculator#faq',
        mainEntity: FUEL_TANK_CALCULATOR_FAQS.map(faq => ({
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

  const vehicleTanks = [
    { name: 'Honda CD 70', category: 'Bike', capacity: 9.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Honda CG 125', category: 'Bike', capacity: 9.2, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Yamaha YBR 125', category: 'Bike', capacity: 13.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Suzuki Alto (660cc)', category: 'Hatchback', capacity: 27.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Suzuki Cultus / Wagon R', category: 'Hatchback', capacity: 35.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Suzuki Swift 1.2', category: 'Hatchback', capacity: 37.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Honda City (1.2 / 1.5)', category: 'Sedan', capacity: 40.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Toyota Yaris', category: 'Sedan', capacity: 42.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Honda Civic (1.5T / 1.8)', category: 'Sedan', capacity: 47.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Toyota Corolla (Altis / GLi)', category: 'Sedan', capacity: 50.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Hyundai Elantra', category: 'Sedan', capacity: 50.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'KIA Sportage / Tucson', category: 'SUV', capacity: 62.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Haval H6 / Jolion', category: 'SUV', capacity: 58.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'MG HS', category: 'SUV', capacity: 55.0, fuel: 'Petrol', rate: petrolPrice },
    { name: 'Toyota Fortuner Diesel', category: 'SUV / 4x4', capacity: 80.0, fuel: 'Diesel', rate: dieselPrice },
    { name: 'Toyota Hilux Revo Diesel', category: 'Pickup / 4x4', capacity: 80.0, fuel: 'Diesel', rate: dieselPrice },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-10 w-full">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs & Header */}
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
          <span className="text-slate-900 dark:text-white font-bold">Fuel Tank Fill-Up Calculator</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 text-blue-800 dark:text-blue-300 font-mono text-[11px] font-bold">
            ⛽ Tank Capacity &amp; Refill Tool
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Current Rate Benchmarks
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Fuel Tank Fill-Up Cost Calculator Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Find out exactly how much money it costs to fill your petrol or diesel car, motorcycle, or SUV from 0 to 100% full, or calculate the price to top-off from quarter, half, or three-quarter tank.
        </p>

        {/* Quick Cross Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
          <span className="text-slate-500">Also explore:</span>
          <Link
            href="/fuel-cost-calculator"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            ⚡ Fuel Cost &amp; Trip Calculator →
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
        <TankFillCalculator
          petrolPrice={petrolPrice}
          dieselPrice={dieselPrice}
          hiOctanePrice={hiOctanePrice}
        />
      </section>

      {/* Official Vehicle Fuel Tank Capacity Reference Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div>
          <h2 className="font-black text-slate-950 dark:text-white text-xl sm:text-2xl tracking-tight">
            Official Fuel Tank Capacities &amp; Full Fill-Up Cost in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Standard OEM manufacturer fuel tank sizes and estimated 0–100% full tank fill-up expense at today&apos;s rates:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Vehicle Model</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Tank Capacity</th>
                <th className="py-3 px-3">Recommended Fuel</th>
                <th className="py-3 px-3 text-right">0 to 100% Full Tank Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {vehicleTanks.map(v => (
                <tr key={v.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{v.name}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-xs">{v.category}</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">{v.capacity} Litres</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{v.fuel}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Rs. {Math.round(v.capacity * v.rate).toLocaleString('en-PK')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide: Reserve Fuel & Fuel Pump Protection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold">
            ⚠️ Maintenance Advisory
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Why Driving On Low Fuel Damages Your Car
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In modern EFI and common-rail vehicles, the electric fuel pump is mounted inside the fuel tank and relies on the fuel itself for cooling and lubrication:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Pump Overheating:</strong> Running with less than a quarter tank leaves the pump exposed to air, causing it to overheat and fail prematurely.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Tank Sediment Ingestion:</strong> Rust, sediment, and moisture settle at the bottom of fuel tanks, which get sucked directly into fuel filters and injectors when running near empty.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Golden Rule:</strong> Refill your vehicle when the fuel gauge reaches 25% (quarter tank) to protect your fuel pump and avoid expensive workshop repairs.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
            💡 Refueling Best Practices
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Best Tips for Filling Fuel in Pakistan
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Fill in Cooler Hours:</strong> Petrol expands in blistering midday temperatures. Refueling early morning or late evening delivers denser fuel per litre.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Avoid Overfilling Beyond Auto-Click:</strong> When the dispenser gun clicks off, stop filling. Forcing extra fuel damages the evaporative emission canister (EVAP).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Choose High-Turnover Company Stations:</strong> Stations with rapid fuel turnover have fresher fuel with less tank condensation and sediment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Top Off Before Expected Fortnightly Hikes:</strong> Keep your tank topped-off around the 15th and end of each month if international crude trends signal price increases.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SEO FAQs */}
      <FAQSection
        faqs={FUEL_TANK_CALCULATOR_FAQS}
        title="Fuel Tank Fill-Up FAQs"
        description="Common queries regarding vehicle fuel tank capacities, reserve fuel quantity, and fuel tank refilling in Pakistan."
      />
    </div>
  );
}
