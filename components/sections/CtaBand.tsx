import { CallButton, LinkButton } from '@/components/CTA';
import { site } from '@/lib/site';

export default function CtaBand({
  heading = 'Hear it before you buy it',
  body = 'Call any hour. The system answers, asks what you need, checks the calendar, books the slot. Then ask for a person and it transfers you to me — that transfer is the escalation your customers get, and you get to watch it work.',
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
              If I can&apos;t pick up, it takes your details and texts me right then
              instead of leaving you in voicemail. That&apos;s the fallback your
              customers get too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
