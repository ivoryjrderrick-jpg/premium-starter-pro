import { CallButton, LinkButton } from '@/components/CTA';
import { site } from '@/lib/site';

export default function CtaBand({
  heading = 'Hear it before you buy it',
  body = `Call ${site.coverage.bot} and the system takes the call end to end — asks what you need, checks the calendar, books the slot. Any other time you get me, and we can talk it through instead.`,
  showPricingLink = true,
}: {
  heading?: string;
  body?: string;
  showPricingLink?: boolean;
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-2xl border border-amber/25 bg-navy-700 px-6 py-12 shadow-card sm:px-12 sm:py-16">
          {/* Amber wash behind the band, purely decorative. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber/10 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slateLight">{body}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CallButton variant="primary" showNumber>
                Call the demo line
              </CallButton>
              {showPricingLink ? (
                <LinkButton href="/pricing" variant="ghost">
                  See pricing
                </LinkButton>
              ) : null}
            </div>

            <p className="mt-5 text-sm text-slateMuted">
              Overnight, if a call is urgent, the system rings my phone rather than
              taking a message. That&apos;s the escalation your customers would get.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
