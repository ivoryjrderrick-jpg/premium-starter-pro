import { site } from '@/lib/site';

const POINTS = [
  {
    title: 'Local, and you have my number',
    body: `I'm in ${site.city}. When something needs changing or it isn't behaving, you call me and I fix it. No ticket queue, no support portal, no time zone in the way.`,
  },
  {
    title: 'Done for you, start to finish',
    body: 'I write the scripts, connect your calendar, set up the number, test it against real calls, and hand it over working. There is nothing for you to configure.',
  },
  {
    title: 'Urgent calls actually get through',
    body: 'A burst pipe is not a message to read tomorrow. Urgent callers are transferred to your phone live, and you get a text summary either way.',
  },
  {
    title: 'Not a self-serve app',
    body: "You're not buying a dashboard and a login. You're buying a system that was built around how your business already takes calls.",
  },
];

export default function Different() {
  return (
    <section
      aria-labelledby="different-heading"
      className="border-y border-cream/10 bg-navy-800 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="different-heading"
          className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          What makes this different
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
          The technology is not the differentiator. Plenty of people sell software
          that answers phones.
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4">
              <svg
                viewBox="0 0 24 24"
                className="mt-1 h-6 w-6 shrink-0 text-amber"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-cream">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-slateLight">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
