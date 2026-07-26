import FaqAccordion from '@/components/FaqAccordion';
import { serializeJsonLd } from '@/lib/json-ld';

export type FaqItem = { question: string; answer: string };

/**
 * Server component wrapper. Keeping the JSON-LD here rather than inside the
 * client accordion guarantees the structured data is in the server-rendered
 * HTML, and it always covers every question — including the ones collapsed
 * behind "See more questions".
 */
export default function FAQ({
  items,
  headingId = 'faq-heading',
  title = 'Questions people actually ask',
  initialVisible = 6,
}: {
  items: FaqItem[];
  headingId?: string;
  title?: string;
  initialVisible?: number;
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

        <FaqAccordion items={items} initialVisible={initialVisible} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </section>
  );
}
