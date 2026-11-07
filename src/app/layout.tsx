import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { NetlifyBadgeRemover } from '@/components/NetlifyBadgeRemover';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#064e3b' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pakpetrolprice.pk'),
  title: {
    default: 'Pak Petrol Price | Today Fuel Rates in Pakistan (OGRA Verified)',
    template: '%s | Pak Petrol Price',
  },
  description:
    'Check today petrol price and diesel price in Pakistan at pakpetrolprice.pk. Officially verified rates from OGRA circulars and Ministry of Energy notifications with live calculator and history.',
  keywords: [
    'pak petrol price',
    'petrol price today pakistan',
    'pakpetrolprice.pk',
    'petrol rate in pakistan',
    'diesel price today',
    'ogra petroleum prices',
    'fuel price revision pakistan',
    'hi octane price pakistan',
    'kerosene oil price pakistan',
    'lpg price pakistan',
    'petrol calculator pakistan',
  ],
  authors: [{ name: 'Pak Petrol Price Research Team', url: 'https://pakpetrolprice.pk/about' }],
  creator: 'Pak Petrol Price',
  publisher: 'Pak Petrol Price',
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Pak Petrol Price | Official OGRA Verified Rates in Pakistan',
    description:
      'Verified petrol, diesel and hi-octane rates in Pakistan with historical changes and fuel cost calculator on pakpetrolprice.pk.',
    url: 'https://pakpetrolprice.pk',
    siteName: 'Pak Petrol Price',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Pak Petrol Price - Official OGRA Verified Rates in Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pak Petrol Price | Official OGRA Rates in Pakistan',
    description:
      'Official verified petroleum prices, diesel rates, and fuel cost calculators in Pakistan on pakpetrolprice.pk.',
    images: ['/opengraph-image'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'pakpetrolprice-verification',
  },
};

const jsonLdGlobal = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://pakpetrolprice.pk/#organization',
      name: 'Pak Petrol Price',
      url: 'https://pakpetrolprice.pk',
      logo: 'https://pakpetrolprice.pk/opengraph-image',
      description: 'Official verified petroleum prices, diesel rates, and fuel cost calculators in Pakistan on pakpetrolprice.pk.',
      sameAs: [
        'https://price.ogra.org.pk',
        'https://www.petroleum.gov.pk',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://pakpetrolprice.pk/#website',
      url: 'https://pakpetrolprice.pk',
      name: 'Pak Petrol Price',
      publisher: {
        '@id': 'https://pakpetrolprice.pk/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans text-base leading-relaxed selection:bg-emerald-300 selection:text-emerald-950 transition-colors duration-200 overflow-x-hidden w-full max-w-full">
        <GoogleAnalytics />
        <NetlifyBadgeRemover />
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full max-w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
