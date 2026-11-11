import { FAQItem } from '@/components/FAQSection';

/**
 * High-Volume Google Search Query & "People Also Ask" (PAA) FAQs for Pakistan
 * Optimized for Featured Snippets, Voice Search, and Schema.org FAQPage structured data.
 */

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'What is the petrol price in Pakistan today?',
    answer:
      'The current official price of Super Petrol (92 RON) in Pakistan is officially notified by the Oil & Gas Regulatory Authority (OGRA) and the Ministry of Energy. Check the live rate card at the top of this page for the exact, active rate per litre verified against official government gazettes.',
  },
  {
    question: 'When is the next petrol price announcement in Pakistan?',
    answer:
      'In Pakistan, petrol prices are reviewed on a fortnightly schedule (every 15 days). Official revisions are announced on the 15th/16th and the final day (30th or 31st) of every month, taking legal effect at 12:00 AM midnight across all fuel stations nationwide.',
  },
  {
    question: 'Is petrol price the same in Karachi, Lahore, Islamabad, and Rawalpindi?',
    answer:
      'Yes. Under OGRA’s Inland Freight Equalization Margin (IFEM) mechanism, transportation and freight costs across depots and refineries are equalized. Therefore, consumer pump rates for Super Petrol and High-Speed Diesel are identical across all designated stations in Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, and Faisalabad.',
  },
  {
    question: 'How much is the Petroleum Development Levy (PDL) and tax on petrol in Pakistan?',
    answer:
      'Under current federal fiscal policy, the Government of Pakistan levies the Petroleum Development Levy (PDL) per litre on Super Petrol and High-Speed Diesel. General Sales Tax (GST) on petrol is currently set at 0%. Retail prices also account for ex-refinery costs, IFEM freight margins, OMC distribution margins, and dealer commissions.',
  },
  {
    question: 'What is the difference between Super Petrol (92 RON) and Hi-Octane (97 RON)?',
    answer:
      'Regular Super Petrol has an octane rating of 92 RON and is price-regulated by the federal government for standard passenger cars and motorcycles. Hi-Octane (RON 97) is deregulated, providing higher knock resistance for luxury, turbocharged, and high-compression engines. Hi-Octane retail rates are set independently by oil companies such as PSO, Shell, and Total.',
  },
  {
    question: 'Who decides petrol prices in Pakistan — OGRA or the Ministry of Finance?',
    answer:
      'OGRA (Oil & Gas Regulatory Authority) calculates and recommends fortnightly price adjustments based on international crude oil benchmarks (Arabian Light / Brent), Platt’s index, and the USD/PKR exchange rate. The Prime Minister and the Ministry of Finance / Petroleum Division review and grant final approval before issuance.',
  },
  {
    question: 'What was the highest petrol price recorded in Pakistan history?',
    answer:
      'The highest historical petrol price in Pakistan crossed Rs. 330 to Rs. 380+ per litre following severe global energy shocks, currency devaluation, and fiscal reforms agreed with international lending institutions.',
  },
];

export function getPetrolPageFaqs(currentPrice?: number): FAQItem[] {
  const formattedPrice = currentPrice ? `Rs. ${currentPrice.toFixed(2)}` : 'Rs. 379.25';
  const price = currentPrice || 379.25;

  return [
    {
      question: 'What is the price of 1 litre of Petrol in Pakistan today?',
      answer: `Today, 1 litre of Super Petrol (92 RON) in Pakistan is officially notified at ${formattedPrice} under verified circulars issued by OGRA and the Ministry of Energy.`,
    },
    {
      question: 'How many litres of petrol can I get in Rs. 1,000, Rs. 2,000, or Rs. 5,000?',
      answer: `At the current rate of ${formattedPrice} per litre: Rs. 1,000 gets approx ${(1000 / price).toFixed(2)} litres; Rs. 2,000 gets approx ${(2000 / price).toFixed(2)} litres; and Rs. 5,000 gives you approx ${(5000 / price).toFixed(2)} litres of Super Petrol.`,
    },
    {
      question: 'How much does it cost to fill a motorcycle or car petrol tank in Pakistan?',
      answer: `At today's rate: A standard Honda CD 70 with a 9-litre tank costs approx Rs. ${Math.round(9 * price).toLocaleString('en-PK')} to fill empty-to-full. A Suzuki Alto (660cc, 27-litre tank) costs approx Rs. ${Math.round(27 * price).toLocaleString('en-PK')}. A 50-litre sedan (Toyota Corolla or Honda Civic) costs approx Rs. ${Math.round(50 * price).toLocaleString('en-PK')} for a 100% full tank.`,
    },
    {
      question: 'Can I mix Hi-Octane with regular Super Petrol in my car in Pakistan?',
      answer:
        'Yes. Mixing 92 RON Super Petrol with 97 RON Hi-Octane is safe and widely practiced by Pakistani car owners to obtain a cost-effective 94–95 RON blend, improving engine responsiveness, eliminating engine knocking, and maintaining fuel injectors.',
    },
    {
      question: 'Why do petrol prices increase when the US Dollar appreciates against the Pakistani Rupee?',
      answer:
        'Because Pakistan imports over 70% of its petroleum products and crude oil in US Dollars, any depreciation of the Pakistani Rupee (PKR) automatically raises the landed import cost in local currency, even when international oil barrel prices remain stable.',
    },
  ];
}

export const PETROL_PAGE_FAQS: FAQItem[] = getPetrolPageFaqs(379.25);

export function getDieselPageFaqs(currentPrice?: number): FAQItem[] {
  const formattedPrice = currentPrice ? `Rs. ${currentPrice.toFixed(2)}` : 'Rs. 395.82';

  return [
    {
      question: 'What is the High-Speed Diesel (HSD) price in Pakistan today?',
      answer: `The current official notified price of High-Speed Diesel (HSD) in Pakistan is ${formattedPrice} per litre as approved by the federal government and OGRA.`,
    },
    {
      question: 'Why is diesel often more expensive than petrol in Pakistan?',
      answer:
        'Diesel prices frequently exceed petrol prices due to higher international refining processing margins, robust global industrial demand, and Pakistan’s substantial dependence on imported finished diesel products for commercial transit and farming.',
    },
    {
      question: 'Which vehicles and machinery use High-Speed Diesel in Pakistan?',
      answer:
        'Diesel is the lifeline of Pakistan’s transport infrastructure, powering intercity freight trailers, Bedford and Hino cargo trucks, Daewoo/Faisal Movers passenger buses, agricultural tube-wells and tractors, and commercial 4x4s such as Toyota Hilux Revo and Fortuner Diesel.',
    },
    {
      question: 'Why does a diesel price increase immediately trigger inflation in Pakistan?',
      answer:
        'Almost all agricultural produce (wheat, rice, vegetables, milk) and manufactured commodities are transported from farms and ports via diesel trucks. When diesel rates rise, transporters increase freight charges, leading to higher food and consumer prices across Pakistani bazaars within 24 to 48 hours.',
    },
  ];
}

export const DIESEL_PAGE_FAQS: FAQItem[] = getDieselPageFaqs(395.82);

export const CALCULATOR_PAGE_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate fuel cost per kilometer (KM) for my vehicle?',
    answer:
      'To calculate cost per KM: divide the current fuel price per litre by your vehicle’s mileage (km per litre). For instance, if petrol is Rs. 380/litre and your car delivers 14 km/L, your cost per kilometer is approximately Rs. 27.14 per KM (380 ÷ 14).',
  },
  {
    question: 'What is the average petrol mileage of Suzuki Alto, Corolla, Civic, and CD 70 in Pakistan?',
    answer:
      'Real-world city driving averages in mixed Pakistani traffic with AC: Suzuki Alto 660cc (17–19 km/L), Suzuki Cultus / Wagon R (15–16 km/L), Toyota Corolla (11–13 km/L), Honda Civic (10–12 km/L), KIA Sportage (9–10 km/L), and Honda CD 70 motorcycle (50–55 km/L).',
  },
  {
    question: 'How much petrol is needed for travel from Lahore to Islamabad via M-2 Motorway?',
    answer:
      'The distance from Lahore to Islamabad via the M-2 Motorway is approximately 375 KM. A standard 1.3L–1.6L car delivering 14 km/L on highway cruise requires approximately 26.8 litres of petrol (approx Rs. 10,100 to Rs. 10,500 one-way at current rates).',
  },
  {
    question: 'How much fuel is required from Karachi to Hyderabad via M-9 Motorway?',
    answer:
      'The Karachi to Hyderabad distance via the M-9 Motorway is roughly 165 KM. A compact car averaging 15 km/L consumes approximately 11 litres of fuel (approx Rs. 4,100 to Rs. 4,300 one-way).',
  },
  {
    question: 'Does turning on the car air conditioner (AC) consume more petrol in Pakistan?',
    answer:
      'Yes. In hot Pakistani summers, running the vehicle AC increases engine load and elevates fuel consumption by 10% to 20%, reducing city fuel economy by approximately 1.5 to 3 km per litre in stop-and-go traffic.',
  },
];

export const HISTORY_PAGE_FAQS: FAQItem[] = [
  {
    question: 'Where can I find official past petrol prices in Pakistan for audit and expense reimbursement?',
    answer:
      'Our historical price archive records every verified fortnightly price adjustment dating back from 2024 to 2026, complete with effective dates, paisa change values, and official regulatory gazette notification identifiers.',
  },
  {
    question: 'Why did Pakistan switch to a 15-day (fortnightly) fuel price revision cycle?',
    answer:
      'The Government of Pakistan adopted a 15-day revision cycle to prevent severe financial buildup on oil marketing companies and pass international crude price fluctuations and exchange rate shifts gradually to consumers rather than in large monthly shocks.',
  },
  {
    question: 'How can I verify if a past petrol price on this website is authentic?',
    answer:
      'Every historical entry in our audit log corresponds to an official circular issued by the Oil & Gas Regulatory Authority (OGRA) or Ministry of Energy, accessible via the official regulatory source link provided in the table.',
  },
];

export const CITY_PAGE_FAQS: FAQItem[] = [
  {
    question: 'Why are petrol rates the same in Karachi, Lahore, and Islamabad?',
    answer:
      'Under the Inland Freight Equalization Margin (IFEM) supervised by OGRA, intercity transportation expenses from port refineries to inland storage depots are pooled, ensuring uniform ex-depot consumer prices across designated filling stations nationwide.',
  },
  {
    question: 'Do any fuel prices differ by city in Pakistan?',
    answer:
      'Yes. Deregulated fuels such as Hi-Octane (RON 97) and CNG may carry regional price variations based on private oil marketing company supply chain costs and local station overheads.',
  },
];

export const FUEL_COST_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate trip fuel cost for my vehicle in Pakistan?',
    answer:
      'To calculate trip fuel expense: divide your total journey distance (in kilometers) by your vehicle’s average fuel economy (km per litre), then multiply the resulting litres by the current official fuel price per litre. For example, traveling 100 KM in an Alto averaging 18 km/L consumes 5.56 litres, costing approx. Rs. 1,860 at Rs. 335/litre.',
  },
  {
    question: 'What is the formula to calculate fuel cost per kilometer (KM)?',
    answer:
      'The formula is: Cost per KM = Current Fuel Price per Litre ÷ Vehicle Mileage (km/L). For instance, if petrol is Rs. 335/L and your car delivers 14 km/L, your running cost is Rs. 23.93 per kilometer. For a CD 70 delivering 55 km/L, the running cost is only Rs. 6.09 per kilometer.',
  },
  {
    question: 'What is the real-world petrol average of popular cars and bikes in Pakistan?',
    answer:
      'Real-world city averages in mixed Pakistani traffic with AC: Suzuki Alto 660cc (17–19 km/L), Suzuki Cultus / Wagon R (15–16 km/L), Suzuki Swift (13–14 km/L), Toyota Yaris 1.3 (13–15 km/L), Toyota Corolla 1.6 (11–13 km/L), Honda Civic 1.5 Turbo (10–12 km/L), KIA Sportage (9–10 km/L), and Honda CD 70 motorcycle (50–55 km/L).',
  },
  {
    question: 'How much petrol is needed for travel from Lahore to Islamabad via M-2 Motorway?',
    answer:
      'The distance from Lahore to Islamabad via the M-2 Motorway is approximately 375 KM. A standard 1.3L–1.6L sedan delivering 14 km/L on highway cruise requires approximately 26.8 litres of petrol (approx Rs. 8,978 one-way at Rs. 335/L). A Suzuki Alto averaging 20 km/L on highway needs approx. 18.75 litres (approx Rs. 6,281).',
  },
  {
    question: 'How much fuel is required from Karachi to Hyderabad via M-9 Motorway?',
    answer:
      'The Karachi to Hyderabad distance via the M-9 Motorway is roughly 165 KM. A compact car averaging 15 km/L consumes approximately 11 litres of fuel (approx Rs. 3,685 one-way at current Rs. 335/L rates). A return trip requires approx. 22 litres (Rs. 7,370).',
  },
  {
    question: 'Does turning on the car air conditioner (AC) consume more petrol in Pakistan?',
    answer:
      'Yes. In hot Pakistani summers, running the vehicle AC increases engine load and elevates fuel consumption by 10% to 20%, reducing city fuel economy by approximately 1.5 to 3 km per litre in stop-and-go traffic.',
  },
  {
    question: 'What is the most economical speed to drive on Pakistani motorways for best fuel mileage?',
    answer:
      'The sweet spot for maximum fuel efficiency on motorways like M-2, M-3, and M-5 is between 80 km/h and 100 km/h. Driving at 120 km/h or above dramatically increases aerodynamic drag, causing up to 15% to 25% higher fuel consumption.',
  },
  {
    question: 'Are petrol and diesel prices uniform across all petrol pumps in Pakistan?',
    answer:
      'Yes. Super Petrol (92 RON) and High-Speed Diesel (HSD) are strictly price-controlled by OGRA and the Ministry of Energy under the Inland Freight Equalization Margin (IFEM). Authorized PSO, Shell, Total Parco, and Attock Petroleum stations must sell at the exact notified rate nationwide.',
  },
];

export const FUEL_TANK_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate the full tank fill-up cost for my vehicle in Pakistan?',
    answer:
      'To calculate the cost of a full tank: multiply your vehicle’s total tank capacity (in litres) by the active fuel price per litre. If your tank is already partially full (e.g. half tank), multiply the remaining capacity needed by today’s price. Use our interactive Fuel Tank Calculator above to instantly calculate costs for any vehicle model.',
  },
  {
    question: 'What is the fuel tank capacity of Suzuki Alto 660cc, Cultus, and Swift in Pakistan?',
    answer:
      'The fuel tank capacity of the Suzuki Alto (660cc) is 27 Litres. The Suzuki Cultus and Wagon R both feature a 35-Litre tank. The new Suzuki Swift 1.2L has a 37-Litre fuel tank capacity.',
  },
  {
    question: 'What is the fuel tank capacity of Toyota Corolla, Yaris, and Honda Civic?',
    answer:
      'Toyota Corolla (Altis / GLi) features a 50-Litre fuel tank. Toyota Yaris has a 42-Litre tank. Honda Civic (1.5 Turbo / 1.8) has a 47-Litre tank, while the Honda City (1.2L / 1.5L) has a 40-Litre capacity.',
  },
  {
    question: 'How many litres of petrol does a Honda CD 70 or CG 125 motorcycle tank hold?',
    answer:
      'A Honda CD 70 has a fuel tank capacity of 9.0 Litres (including approx. 1 Litre reserve). A Honda CG 125 has a 9.2-Litre tank (including approx. 2 Litres reserve). The Yamaha YBR 125 features a larger 13.0-Litre tank.',
  },
  {
    question: 'How many litres are in the reserve tank of a car in Pakistan?',
    answer:
      'Most passenger cars in Pakistan (Corolla, Civic, Alto, City) do not have a physically separate reserve tank. Instead, the low fuel warning light illuminates when approximately 10% to 15% of the total capacity remains (usually 4 to 7 litres in sedans, and 2.5 to 3.5 litres in small hatchbacks).',
  },
  {
    question: 'Can driving on an empty or low fuel tank damage my car in Pakistan?',
    answer:
      'Yes. In modern EFI cars, the electric fuel pump is submerged inside the fuel tank and cooled by the surrounding fuel. Driving frequently with the low fuel light on causes the pump to overheat. It also pulls settled debris and sediment from the bottom of the tank into the fuel filter and injectors.',
  },
  {
    question: 'How much does it cost to top-off a half-empty fuel tank?',
    answer:
      'To top-off a half-empty tank, you only pay for 50% of your tank’s volume. For example, refilling a half-empty 50-Litre Toyota Corolla tank requires 25 litres, costing approx. Rs. 8,375 at Rs. 335/litre, saving you from running low during sudden price adjustments.',
  },
  {
    question: 'What is the best time of day to fill petrol in Pakistan?',
    answer:
      'Early morning or late evening is the ideal time to refuel. Fuel expands in hot afternoon temperatures and becomes less dense. During cooler hours, petrol is denser, meaning you get marginally more mass and energy per pumped litre.',
  },
];
