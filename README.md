# UI/UX Layout Redesign — Detailed Implementation Plan

This document details the exact, step-by-step code implementation to transform the website from the cramped 8/4 sidebar layout into a spacious, standard-compliant **"One Job Per Section"** architecture.

---

## 📋 Overview of Files to Modify

| Step | Target File | Core Change |
| :--- | :--- | :--- |
| **1** | [`src/components/FAQSection.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/components/FAQSection.tsx) | Redesign to full-width container with a balanced 2-column accordion grid on desktop (`lg:grid-cols-2`). |
| **2** | [`src/components/OgraStatusWidget.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/components/OgraStatusWidget.tsx) | Remove redundant 6-product price chips; streamline into an official horizontal verification banner. |
| **3** | [`src/app/page.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/app/page.tsx) | Disassemble the `lg:grid-cols-12` split. Lay out the 5 dedicated full-width sections in logical reading order. |
| **4** | [`src/components/TankFillCalculator.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/components/TankFillCalculator.tsx) | Remove cramped sidebar constraints; ensure generous touch targets and input padding. |
| **5** | Product Subpages ([`petrol`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/app/petrol-price-in-pakistan/page.tsx), [`diesel`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/app/diesel-price-in-pakistan/page.tsx)) | Apply the same 5-zone structure so all fuel pages share consistent, readable UX. |

---

## 🛠️ Step-by-Step Code Implementation

### Step 1: Upgrade `FAQSection.tsx` (Full-Width 2-Column Desktop Grid)

**Problem**: FAQs are currently rendered in a single narrow column, causing massive empty white space on desktop.  
**Solution**: Divide the FAQ array into two balanced columns on desktop (`grid grid-cols-1 lg:grid-cols-2 gap-4`), wrapping each FAQ in its own clean card with generous padding.

#### Code Specification (`src/components/FAQSection.tsx`):
```tsx
export function FAQSection({
  title = 'Frequently Asked Questions (FAQs)',
  subtitle,
  description,
  faqs,
}: FAQSectionProps) {
  // Schema generation remains intact...
  return (
    <section aria-label="Frequently Asked Questions" className="w-full my-8 sm:my-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span>❓ Official Answers &amp; Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* 2-Column Balanced Desktop Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <summary className="flex justify-between items-start gap-4 text-sm sm:text-base font-bold text-slate-950 dark:text-white select-none list-none">
                <span className="leading-snug">{faq.question}</span>
                <span className="shrink-0 w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-open:rotate-180 transition-transform shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Step 2: Streamline `OgraStatusWidget.tsx` (Eliminate Data Duplication)

**Problem**: The sidebar widget currently duplicates the 6 fuel product prices that are already rendered in the top cards.  
**Solution**: Transform it into a clean, horizontal official verification status bar that sits right below the live rate cards.

#### Code Specification (`src/components/OgraStatusWidget.tsx`):
- Display 4 key verification indicators in a single responsive row:
  1. **Regulatory Authority**: OGRA & Federal Ministry of Energy
  2. **Notification Code**: `OGRA-REVISION-2026-10-24`
  3. **Effective Period**: Active Fortnight
  4. **Source Link**: `price.ogra.org.pk ↗`
- Remove the redundant bottom grid of fuel price chips.

---

### Step 3: Restructure Homepage (`src/app/page.tsx`)

**Problem**: Everything from the chart to the table, calculator, and FAQs was placed in an `lg:col-span-8` container next to an overloaded `lg:col-span-4` sidebar.  
**Solution**: Replace the 12-column grid with 5 sequential, full-width sections separated by `space-y-12 sm:space-y-16`.

#### Layout Sequence in `src/app/page.tsx`:
```tsx
export default async function HomePage() {
  // Data fetch logic remains unchanged...

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16 w-full">

      {/* ZONE 1: LIVE RATE BOARD & VERIFICATION */}
      <section id="live-rates" className="space-y-6">
        {/* Header Bar */}
        <HeaderBar ... />

        {/* Primary Featured Hero Card (Petrol) */}
        <PriceCard product={petrol} record={latestPrices['petrol']} featured={true} />

        {/* Secondary Regulated Fuel Products (5-column grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {otherFuels.map(product => (
            <PriceCard key={product.id} product={product} record={latestPrices[product.id]} />
          ))}
        </div>

        {/* Streamlined OGRA Verification Strip */}
        <OgraStatusWidget products={products} latestPrices={latestPrices} />
      </section>

      {/* ZONE 2: HISTORICAL TREND ANALYSIS (Full Width) */}
      <section id="price-history" className="space-y-4">
        <SectionHeading
          badge="📈 Official Trend Analysis"
          title="Petrol Price History & Trend (PKR / Litre)"
          description="Verified fortnightly revision curve published by OGRA and Federal Ministry of Energy."
          actionLink={{ href: '/petrol-price-history', text: 'Full History Archive →' }}
        />
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm">
          <PriceChart records={petrolHistory} productName="Petrol" />
        </div>
      </section>

      {/* ZONE 3: OFFICIAL REVISIONS LEDGER (Full Width) */}
      <section id="recent-adjustments" className="space-y-4">
        <SectionHeading
          badge="📋 Government Notifications"
          title="Recent Official Price Adjustments"
          description="Sequential revisions comparing consecutive OGRA notification circulars."
          actionLink={{ href: '/fuel-price-changes', text: 'All Price Changes →' }}
        />
        <div className="w-full">
          <HistoricalTable records={recentRevisions.slice(0, 6)} showProductColumn={true} />
        </div>
      </section>

      {/* ZONE 4: DEDICATED FUEL & COMMUTE CALCULATOR SUITE (Balanced 2 Columns) */}
      <section id="calculators" className="space-y-6">
        <SectionHeading
          badge="⚡ Interactive Budget Tools"
          title="Fuel Cost & Trip Calculators"
          description="Calculate exact refill expenses for your vehicle or estimate intercity motorway travel fuel budgets."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Tool A: Vehicle Tank Fill-Up Estimator */}
          <TankFillCalculator
            petrolPrice={petrolPrice}
            dieselPrice={dieselPrice}
            hiOctanePrice={hiOctanePrice}
            compact={false}
          />

          {/* Tool B: Journey / Trip Distance Estimator + Motorway Benchmarks */}
          <div className="space-y-6">
            <FuelCalculator
              initialPetrolPrice={petrolPrice}
              initialDieselPrice={dieselPrice}
              initialHiOctanePrice={hiOctanePrice}
            />
            {/* Motorway Benchmark Guide */}
            <MotorwayBenchmarksCard />
          </div>
        </div>
      </section>

      {/* ZONE 5: FULL-WIDTH KNOWLEDGE & FAQ CENTER */}
      <section id="faqs" className="w-full">
        <FAQSection
          faqs={HOME_FAQS}
          title="Frequently Asked Questions (Petrol & Fuel Rates in Pakistan)"
          description="Accurate, official answers regarding petroleum pricing mechanisms, fortnightly OGRA notifications, and retail variations in Pakistan."
        />
      </section>

    </div>
  );
}
```

---

## 🔍 Verification & Acceptance Criteria

After applying the changes, verify the layout against these criteria:

1. **Desktop Viewport (1280px - 1920px)**:
   - [ ] No asymmetrical 8/4 dead spaces.
   - [ ] Chart spans the full container width with easy-to-read dates.
   - [ ] FAQs span 100% width in an elegant 2-column grid.
   - [ ] Vehicle Tank Calculator and Trip Calculator sit comfortably side-by-side without squished inputs.
2. **Mobile Viewport (375px - 640px)**:
   - [ ] Each section stacks logically without overflow or clipped text.
   - [ ] Steppers, buttons, and dropdowns maintain 44px+ accessible touch targets.
3. **Data Integrity**:
   - [ ] All prices match active Supabase/OGRA records.
   - [ ] Zero duplicated price chips in the viewport.

---

## 🚀 Execution Order

1. Update [`src/components/FAQSection.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/components/FAQSection.tsx).
2. Update [`src/components/OgraStatusWidget.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/components/OgraStatusWidget.tsx).
3. Update [`src/app/page.tsx`](file:///c:/Users/Hp/Desktop/PetrolPriceProject/src/app/page.tsx).
4. Verify in the running dev server at `http://localhost:3000`.
5. Apply the pattern to fuel product pages (`/petrol-price-in-pakistan`, `/diesel-price-in-pakistan`).
