import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `AI Phone Answering & Appointment Booking | ${site.city}, ${site.state}`,
    template: `%s | ${site.name}`,
  },
  description:
    `Done-for-you AI phone system for ${site.city} service businesses. Answers every call 24/7, ` +
    'books appointments to your calendar, sends SMS confirmations, and transfers urgent calls to your phone.',
  applicationName: site.name,
  keywords: [
    'AI phone answering Colorado Springs',
    'answering service Colorado Springs',
    'AI receptionist for contractors',
    'HVAC call answering service',
    'appointment booking phone system',
    '24/7 call answering Colorado',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    url: site.url,
    title: `AI Phone Answering & Appointment Booking | ${site.city}, ${site.state}`,
    description:
      'Every call answered. Every appointment booked. Built, installed, and supported locally.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Every call answered. Every appointment booked.`,
    description: `Done-for-you AI phone systems for appointment-based businesses in ${site.city}.`,
  },
  robots: { index: true, follow: true },
  // Local-intent signals for search engines.
  other: {
    'geo.region': 'US-CO',
    'geo.placename': site.city,
  },
};

export const viewport: Viewport = {
  themeColor: '#0D1220',
  colorScheme: 'dark',
};

/**
 * LocalBusiness structured data. Helps Google associate the site with
 * Colorado Springs for "near me" style queries.
 */
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.legalName,
  description:
    'Done-for-you AI phone answering and appointment booking systems for service businesses.',
  url: site.url,
  telephone: site.phone.e164,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Colorado Springs' },
    { '@type': 'State', name: 'Colorado' },
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-navy text-cream">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
