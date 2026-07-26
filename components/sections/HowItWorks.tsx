/**
 * The Coverage System — four named stages.
 *
 * Naming the stages is doing sales work, not decoration: it makes the service
 * read as a system that was designed rather than a process improvised per
 * client. `stage` is the product vocabulary, `title` stays in the plain
 * operator voice used everywhere else.
 */
const STAGES = [
  {
    step: '01',
    stage: 'Answer',
    title: 'The call comes in',
    body: 'Your number rings the way it always has. The system picks up on the first or second ring, any hour of any day. Nobody waits, and nobody hits voicemail.',
  },
  {
    step: '02',
    stage: 'Qualify',
    title: 'It works out what they need',
    body: 'A real conversation, not a phone tree. It answers the questions you actually get asked, and finds out what the job is, where it is, and how soon they need somebody.',
  },
  {
    step: '03',
    stage: 'Book',
    title: 'It books straight to your calendar',
    body: 'It only offers what is genuinely open, books the slot, and sends your customer an SMS confirmation. You get a text telling you who called and what they want.',
  },
  {
    step: '04',
    stage: 'Escalate',
    title: 'Urgent calls come straight to you',
    body: 'An emergency does not become a message. It transfers the caller to your phone live and texts you the summary either way. If you cannot pick up, it takes the details rather than leaving them stranded.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateMuted">
          How it works
        </p>
        <h2
          id="how-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          The Coverage System
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
          Four stages. Nothing for you to run.
        </p>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border border-cream/10 bg-navy-800 p-7 shadow-card"
            >
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-sm font-bold tracking-[0.2em] text-amber"
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-amber">
                  {item.stage}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-cream">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slateLight">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
