import type { Metadata } from 'next';
import CostComparison from '@/components/pricing/CostComparison';
import PricingCards from '@/components/pricing/PricingCards';
import RiskReversal from '@/components/sections/RiskReversal';
import Reviews from '@/components/Reviews';
import FAQ, { type FaqItem } from '@/components/FAQ';
import CtaBand from '@/components/sections/CtaBand';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Straightforward pricing, no per-minute billing. $497/month founding rate or $697/month standard, ' +
    `plus a one-time $500 setup. Done-for-you AI phone answering in ${site.city}, ${site.state}.`,
  alternates: { canonical: '/pricing' },
};

const FAQS: FaqItem[] = [
  {
    question: 'What if it mishandles an urgent call?',
    answer:
      'It is built to escalate rather than guess. During setup we define what counts as urgent for your ' +
      'business — the specific situations and the words customers actually use — and anything matching ' +
      'gets transferred to your phone live, with a text summary either way. If you cannot pick up, it ' +
      'takes the details and texts you immediately rather than leaving the caller with nothing. It will ' +
      'not be perfect and I am not going to claim otherwise. That is a large part of why being local ' +
      'matters: if it gets one wrong, you call me and the script is corrected that week, not filed as a ticket.',
  },
  {
    question: 'Can I keep my current number?',
    answer:
      'Yes, and most people do. The simplest route is call forwarding — your published number stays ' +
      'exactly as it is, and calls forward to the system when you do not pick up or outside your hours. ' +
      'That takes about ten minutes with your carrier and I walk you through it. If you would rather ' +
      'move the number over completely, we can port it instead. Either way you keep the number your ' +
      'customers and your trucks already have.',
  },
  {
    question: 'What if I already have an answering service?',
    answer:
      'Keep it for the first month. Run this alongside it and leave the answering service in place as a ' +
      'backstop — there is no reason to cut it over on faith. What you are comparing is messages taken ' +
      'against appointments actually booked, and that difference shows up fast. If you are paying a ' +
      'service in the $300–2,500 range, cancelling it typically covers most or all of this.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'About a week. One call to go through how your phone works today, what you get asked, and what ' +
      'counts as an emergency. A few days for me to build it, connect your calendar, and test it against ' +
      'real call scenarios. Then a review call where you hear it answer before anything goes live. The ' +
      'work is on my side — you need to be available for two conversations.',
  },
  {
    question: "What's not included?",
    answer:
      'It answers your phone. It does not make outbound sales calls, run marketing or SMS campaigns, or ' +
      'chase old leads. It does not replace your calendar software or your phone service — you keep what ' +
      'you already use and I connect to it. It is not a human being, so any caller who wants a person ' +
      'gets transferred to you. And it does not do general software or website work beyond the call system.',
  },
  {
    question: "What happens if it doesn't know the answer?",
    answer:
      'It says so, then takes the details or transfers the call. It does not invent answers about your ' +
      'pricing, your availability, or what a repair will cost. During setup we load the questions you ' +
      'genuinely get asked so the common ones are covered, and anything outside that is handed to you ' +
      'rather than guessed at.',
  },
  {
    question: 'Am I locked into a contract?',
    answer:
      'No. Month to month with 30 days notice to cancel. The setup fee is one-time and is not refundable ' +
      'once the system has been built, since that is the part where the work happens. Founding clients ' +
      'have their monthly rate locked for six months.',
  },
  // ── Behind "See more questions" ────────────────────────────────────────────
  // Still rendered server-side and present in the DOM; collapsed with CSS only.
  {
    question: 'Can it handle two calls at once?',
    answer:
      "Yes. That's one of the bigger differences from a person — nobody gets a busy signal.",
  },
  {
    question: "What if my schedule changes or someone's out?",
    answer:
      "It only books what's actually open on your calendar. Block the time and it won't offer it. " +
      "If it can't confirm something, it takes the details and texts you rather than guessing.",
  },
  {
    question: 'Do I have to change how I work?',
    answer:
      'No. Your number stays the same, your calendar stays the same. The only thing that changes is ' +
      'that calls get answered.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'About twenty minutes. Your services, your hours, what counts as urgent, and your cell number ' +
      'for escalations. I handle the rest.',
  },
  {
    question: "What happens to my customers' information?",
    answer:
      "It stays yours. Names and numbers go to your calendar and your phone, nowhere else. It's in " +
      'the agreement.',
  },
  {
    question: 'Do you work outside Colorado Springs?',
    answer:
      'Yes — Pueblo through Fort Collins, and remote anywhere. Local just means I can show up if it matters.',
  },
  {
    question: "What if it's not working out?",
    answer:
      "Thirty days notice, no penalty. I'll release your number and hand over your data. I'd rather " +
      'you leave clean than stay annoyed.',
  },
  {
    question: 'Can it do more than book appointments?',
    answer:
      "Eventually, yes — reminders, review requests, follow-up on quotes. Right now I'm focused on " +
      'answering and booking, and doing that part properly.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-16 sm:pt-20">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-cream sm:text-5xl">
          Straightforward pricing. No per-minute billing.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slateLight">
          One monthly fee, one setup fee. You are not billed by the call or by the
          minute. Plans include up to 1,500 answered minutes a month — if you ever
          go past that, I call you before anything changes.
        </p>
      </section>

      {/* Anchor the value before showing any of our own numbers. */}
      <CostComparison />

      <PricingCards />

      <RiskReversal />

      {/* Empty until there are real reviews. Pass a `reviews` array to render
          cards — see components/Reviews.tsx. */}
      <Reviews />

      {/* The first 7 show by default; the remaining 8 sit behind "See more
          questions" but are still server-rendered into the DOM. */}
      <FAQ items={FAQS} title="Questions people actually ask" initialVisible={7} />

      <CtaBand
        heading="Hear it, then decide"
        body="Call and listen to it handle a booking start to finish. Then ask for a person and watch it transfer you to me. That transfer is the part you're actually paying for."
        showPricingLink={false}
      />

      <section
        aria-labelledby="pricing-contact-heading"
        className="mx-auto max-w-3xl px-5 pb-8"
      >
        <h2
          id="pricing-contact-heading"
          className="text-2xl font-bold tracking-tight text-cream sm:text-3xl"
        >
          Or send me the details
        </h2>
        <p className="mt-3 leading-relaxed text-slateLight">
          Tell me what you run and how your calls come in now. I&apos;ll tell you
          straight whether this is worth it for you.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
