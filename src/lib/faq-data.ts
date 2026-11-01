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
