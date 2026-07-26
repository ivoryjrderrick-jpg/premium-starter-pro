'use client';

import { useId, useState } from 'react';
import type { FaqItem } from '@/components/FAQ';

/**
 * FAQ accordion with a "see more" group.
 *
 * Two things drive the implementation:
 *
 * 1. SEO — every question and answer is rendered into the DOM on the server,
 *    including the ones behind "See more questions". Nothing is conditionally
 *    rendered; collapsed content is clipped with CSS. The FAQPage JSON-LD on
 *    the parent lists all of them regardless.
 *
 * 2. Animation — heights are animated with the `grid-template-rows: 0fr -> 1fr`
 *    technique rather than max-height, so the transition is exact regardless of
 *    how long an answer is. No magic pixel values to keep in sync with copy.
 */

/**
 * Collapsed panels are clipped to zero height, but clipped content is still
 * announced by screen readers, so visibility is toggled too. On close the
 * visibility change is delayed until the height transition finishes; on open it
 * applies immediately. Reduced motion is handled globally in globals.css, which
 * zeroes both duration and delay.
 */
function collapsibleStyle(open: boolean): React.CSSProperties {
  return {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    visibility: open ? 'visible' : 'hidden',
    transitionProperty: 'grid-template-rows, visibility',
    // Per-property timing. `visibility` is a discrete property: it flips at the
    // END of its duration + delay, so giving it a duration would leave the
    // panel exposed to screen readers after it had visually collapsed. Zero
    // duration + a delay equal to the height transition flips it at exactly
    // the right moment, and immediately when opening.
    transitionDuration: '320ms, 0ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: open ? '0ms, 0ms' : '0ms, 320ms',
  };
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 text-amber transition-transform duration-200 motion-reduce:transition-none ${
        open ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqAccordion({
  items,
  initialVisible = 6,
}: {
  items: FaqItem[];
  /** How many questions show before the "See more" button. */
  initialVisible?: number;
}) {
  const baseId = useId();
  // One panel open at a time — index, or null when all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = items.slice(0, initialVisible);
  const hidden = items.slice(initialVisible);
  const extrasId = `${baseId}-extras`;

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  function toggleShowAll() {
    const next = !showAll;
    setShowAll(next);
    // Collapsing the group while one of its questions is open would leave an
    // open panel the user can no longer see. Close it on the way out.
    if (!next && openIndex !== null && openIndex >= initialVisible) {
      setOpenIndex(null);
    }
  }

  function renderItem(item: FaqItem, index: number) {
    const open = openIndex === index;
    const buttonId = `${baseId}-q-${index}`;
    const panelId = `${baseId}-a-${index}`;

    return (
      <li key={item.question} className="border-b border-cream/10">
        {/* The heading wraps the button so the question stays a real heading in
            the document outline, while the button carries the ARIA state. */}
        <h3>
          <button
            type="button"
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-cream transition-colors hover:text-amber motion-reduce:transition-none"
          >
            <span>{item.question}</span>
            <Chevron open={open} />
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          style={collapsibleStyle(open)}
        >
          {/* min-height:0 lets the 0fr row actually collapse to nothing. */}
          <div style={{ minHeight: 0, overflow: 'hidden' }}>
            <p className="pb-6 pr-9 leading-relaxed text-slateLight">{item.answer}</p>
          </div>
        </div>
      </li>
    );
  }

  return (
    <>
      <ul className="mt-8 border-t border-cream/10">
        {visible.map((item, index) => renderItem(item, index))}
      </ul>

      {hidden.length > 0 ? (
        <>
          {/* Rendered on the server and always present in the DOM — collapsed
              with CSS, never conditionally rendered, so crawlers see it. */}
          <div id={extrasId} style={collapsibleStyle(showAll)}>
            <div style={{ minHeight: 0, overflow: 'hidden' }}>
              <ul>
                {hidden.map((item, offset) =>
                  renderItem(item, initialVisible + offset),
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              aria-controls={extrasId}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-amber/45 px-6 py-3 font-semibold text-amber transition-colors hover:border-amber/70 hover:bg-amber/10 motion-reduce:transition-none"
            >
              {showAll ? 'Show fewer' : 'See more questions'}
              <Chevron open={showAll} />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
