import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { FAQSection, FAQItem } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us & Editorial Research Desk | Pak Petrol Price',
  description:
    'Get in touch with the Pak Petrol Price (pakpetrolprice.pk) team. Report pricing discrepancies, submit press/media inquiries, or discuss data partnerships and advertising.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Pak Petrol Price',
    description:
      'Reach the research and editorial desk at Pak Petrol Price. Dedicated channels for consumer support, media inquiries, and partnerships.',
    url: 'https://pakpetrolprice.pk/contact',
    siteName: 'Pak Petrol Price',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Pak Petrol Price',
    description:
      'Official contact desk and inquiry channels for pakpetrolprice.pk.',
  },
};

const CONTACT_FAQS: FAQItem[] = [
  {
    question: 'How quickly does the Pak Petrol Price team respond to inquiries?',
    answer:
      'Our editorial and support desk reviews submissions continuously during business days (Monday to Friday, 9:00 AM to 6:00 PM PKT). We aim to respond to all general inquiries, price discrepancy reports, and media requests within 24 to 48 business hours.',
  },
  {
    question: 'How can I report a petrol pump charging higher than the official OGRA rate?',
    answer:
      'If a retail petrol station in Pakistan is overcharging beyond the official notified ceiling, you can submit the station name, location, and fuel grade through our contact form. While Pak Petrol Price is an independent monitoring portal and cannot levy regulatory fines, we document consumer complaints and recommend reporting violations directly to OGRA\'s Consumer Grievance Cell at ogra.org.pk or the relevant district administration.',
  },
  {
    question: 'Can journalists, news publications, and researchers quote Pak Petrol Price data?',
    answer:
      'Yes. Journalists, financial analysts, and academic researchers are welcome to cite our verified rates, historical tables, and calculations. Please provide attribution to "Pak Petrol Price (pakpetrolprice.pk)" along with a link back to the specific fuel rate or history page cited.',
  },
  {
    question: 'Do you offer API access or structured data feeds for commercial fleet management?',
    answer:
      'Yes. We provide custom data feeds and integration support for enterprise logistics fleets, fuel card providers, and accounting platforms. Select "Business / Advertising Inquiry" in the contact form to connect with our technical integrations team.',
  },
];

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Pak Petrol Price',
    url: 'https://pakpetrolprice.pk/contact',
    description:
      'Contact channels, editorial desk information, and support inquiry options for Pak Petrol Price.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Pak Petrol Price',
      url: 'https://pakpetrolprice.pk',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Editorial & Research Desk',
          email: 'pakpetrolprice@gmail.com',
          availableLanguage: ['English', 'Urdu'],
          areaServed: 'PK',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Advertising & Commercial Partnerships',
          email: 'pakpetrolprice@gmail.com',
          availableLanguage: ['English', 'Urdu'],
          areaServed: 'PK',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 w-full">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Contact Us</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Support &amp; Inquiries
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Contact Our Team
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Have a question regarding fuel rate calculations, notice a discrepancy at your local petrol station, or want to explore commercial advertising? Reach out through our dedicated channels below.
          </p>
        </div>

        {/* 3 Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <span className="text-2xl">📝</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Editorial &amp; Research Desk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              For price verification inquiries, historical archive questions, and regulatory gazette citations.
            </p>
            <div className="pt-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              pakpetrolprice@gmail.com
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <span className="text-2xl">📢</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Advertising &amp; Sponsorships
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore banner sponsorships, branded calculator integrations, and custom media campaigns.
            </p>
            <div className="pt-2">
              <Link href="/advertise" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                View Advertising Kit →
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm">
              Data &amp; Fleet Feeds
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Structured JSON feeds and automated notifications for fleet management software.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              Response: &lt; 24h PKT
            </div>
          </div>
        </div>

        {/* Interactive Form Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Send an Online Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Fill in the form below and our team will get back to your email directly.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>SLA: 24–48h</span>
            </div>
          </div>

          <ContactForm />
        </div>

        {/* Dedicated FAQ Section for Contact AEO / GEO */}
        <FAQSection
          faqs={CONTACT_FAQS}
          title="Frequently Asked Contact Questions"
          description="Direct answers regarding response SLAs, price violation reporting, and media citations."
        />
      </div>
    </>
  );
}
