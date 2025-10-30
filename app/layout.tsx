
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/LenisProvider';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  // 👇 add this line
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: 'Acme — Premium Starter Pro',
  description: 'Next.js, Tailwind, premium motion pack, Stripe Checkout, SEO, a11y.',
  openGraph: { images: ['/og.jpg'] },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <LenisProvider>
          <Header />
          <div id="main">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
