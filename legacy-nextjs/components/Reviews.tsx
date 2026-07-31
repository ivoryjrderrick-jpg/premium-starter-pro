export type Review = {
  name: string;
  business: string;
  /** Whole or half stars, 0–5. */
  rating: number;
  text: string;
  /** Display string, e.g. "March 2026". Shown as-is. */
  date: string;
};

/**
 * Reviews section.
 *
 * Pass a `reviews` array and it renders cards; leave it empty (the default) and
 * it renders an honest empty state. Nothing here is invented — no placeholder
 * names, no sample star ratings.
 *
 * Note on structured data: there is deliberately no Review/AggregateRating
 * JSON-LD. Google does not accept self-serving reviews hosted on your own site
 * for local business rich results, and marking them up anyway risks a manual
 * action. The plan is to link out to Google reviews, which is the right way to
 * get stars in search.
 */

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <p className="flex items-center gap-0.5">
      <span className="sr-only">Rated {rating} out of 5</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${star <= rounded ? 'text-amber' : 'text-cream/20'}`}
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </p>
  );
}

export default function Reviews({ reviews = [] }: { reviews?: Review[] }) {
  const hasReviews = reviews.length > 0;

  return (
    <section aria-labelledby="reviews-heading" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="reviews-heading"
          className="text-2xl font-bold tracking-tight text-cream sm:text-3xl"
        >
          Reviews
        </h2>

        {hasReviews ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={`${review.name}-${review.business}`}
                className="rounded-xl border border-cream/10 bg-navy-800 p-6 shadow-card"
              >
                <figure>
                  <Stars rating={review.rating} />
                  <blockquote className="mt-4 leading-relaxed text-cream">
                    <p>{review.text}</p>
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-slateLight">
                    <span className="font-semibold text-amber">{review.name}</span>
                    <br />
                    {review.business}
                    <span className="mt-1 block text-slateMuted">{review.date}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
            I&apos;m new. There aren&apos;t any yet. When founding clients have been
            running a few months I&apos;ll link the Google reviews here — good or bad.
          </p>
        )}
      </div>
    </section>
  );
}
