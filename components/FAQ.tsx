export type FaqItem = { question: string; answer: string };

/**
 * Native <details>/<summary> disclosure — keyboard accessible, works without
 * JavaScript, and announces expanded state to screen readers with no ARIA
 * bookkeeping of our own.
 */
export default function FAQ({
  items,
  headingId = 'faq-heading',
  title = 'Questions people actually ask',
}: {
  items: FaqItem[];
  headingId?: string;
  title?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-cream/10 bg-navy-800 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-5">
        <h2
          id={headingId}
          className="text-2xl font-bold tracking-tight text-cream sm:text-3xl"
        >
          {title}
        </h2>

        <ul className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
          {items.map((item) => (
            <li key={item.question}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-cream">{item.question}</h3>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-amber transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="pb-6 pr-9 leading-relaxed text-slateLight">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
