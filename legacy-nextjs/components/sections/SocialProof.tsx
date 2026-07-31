import { CallButton } from '@/components/CTA';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TESTIMONIALS — DROP REAL ONES IN HERE
 * ─────────────────────────────────────────────────────────────────────────────
 * Add entries to this array and the section automatically switches from the
 * founding-client call-out to a testimonial grid. No other file needs editing.
 *
 *   { quote: 'Booked four jobs the first weekend I had it.',
 *     name: 'Dave R.',
 *     business: 'Summit Heating & Air',
 *     location: 'Colorado Springs, CO' }
 *
 * Left empty on purpose. Nothing here is invented — real quotes only.
 */
const TESTIMONIALS: {
  quote: string;
  name: string;
  business: string;
  location: string;
}[] = [];

export default function SocialProof() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="border-y border-cream/10 bg-navy-800 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        {TESTIMONIALS.length > 0 ? (
          <>
            <h2
              id="proof-heading"
              className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              What clients say
            </h2>
            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <li
                  key={item.name + item.business}
                  className="rounded-xl border border-cream/10 bg-navy-700 p-7 shadow-card"
                >
                  <figure>
                    <blockquote className="text-lg leading-relaxed text-cream">
                      <p>&ldquo;{item.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-5 text-sm text-slateLight">
                      <span className="font-semibold text-amber">{item.name}</span>
                      <br />
                      {item.business} — {item.location}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* Honest empty state. It sells the founding offer instead of faking
             proof this business hasn't earned yet. */
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              Founding clients
            </p>
            <h2
              id="proof-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              This is new, and I&apos;m not going to pretend otherwise
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slateLight">
              I&apos;m taking on three founding clients at a reduced rate. In
              exchange, I want an honest testimonial once the system has been
              answering your calls for a month — good or bad. If you&apos;d rather
              wait until other people have gone first, that&apos;s fair. Check back.
            </p>
            <div className="mt-8 flex justify-center">
              <CallButton variant="secondary">Talk to me about a founding spot</CallButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
