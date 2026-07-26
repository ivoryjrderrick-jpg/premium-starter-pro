/**
 * Risk reversal band.
 *
 * Used on both the landing page (above the final CTA) and the pricing page
 * (beneath the plan cards), so it lives in one place — the promise should never
 * be worded two different ways.
 *
 * Deliberately quiet: a lighter navy band and a thin amber rule, matching the
 * pull-quote treatment in the problem section. A loud callout box would read as
 * a sales gimmick and undercut the point it's making.
 */
export default function RiskReversal() {
  return (
    <section aria-labelledby="risk-heading" className="bg-navy-800 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl border-l-2 border-amber pl-6 sm:pl-8">
          <h2
            id="risk-heading"
            className="text-2xl font-bold tracking-tight text-cream sm:text-3xl"
          >
            Thirty days. Then you decide.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slateLight">
            Run it for a month. If it isn&apos;t catching calls you&apos;d have
            missed, we stop — no penalty, and you keep every appointment it booked.
            I&apos;ll release your number and hand over your data the same week.
          </p>
        </div>
      </div>
    </section>
  );
}
