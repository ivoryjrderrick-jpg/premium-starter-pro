import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import HowItWorks from '@/components/sections/HowItWorks';
import Different from '@/components/sections/Different';
import WhoItsFor from '@/components/sections/WhoItsFor';
import SocialProof from '@/components/sections/SocialProof';
import RiskReversal from '@/components/sections/RiskReversal';
import CtaBand from '@/components/sections/CtaBand';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description:
    `Your phone answered 24/7 by a system built for you. Books appointments to your calendar, ` +
    `sends SMS confirmations, transfers urgent calls to your phone. Local to ${site.city}, ${site.state}.`,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Different />
      <WhoItsFor />
      <SocialProof />
      <RiskReversal />
      <CtaBand />
    </>
  );
}
