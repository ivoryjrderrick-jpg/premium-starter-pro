const STEPS = [
  {
    step: '01',
    title: 'The call comes in',
    body: 'Your number rings the way it always has. If you don’t pick up — or it’s after hours — the system answers on the second ring.',
  },
  {
    step: '02',
    title: 'It answers, then books or escalates',
    body: 'A real conversation, not a phone tree. It answers common questions, checks your calendar, and books the appointment. If the caller has an emergency, it transfers them to your phone instead.',
  },
  {
    step: '03',
    title: 'You get the appointment and a text',
    body: 'The appointment is on your calendar. Your customer gets an SMS confirmation. You get a text telling you who called and what they need.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="how-heading"
          className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          How it works
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
          Three steps. Nothing for you to run.
        </p>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border border-cream/10 bg-navy-800 p-7 shadow-card"
            >
              <span
                className="text-sm font-bold tracking-[0.2em] text-amber"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-cream">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slateLight">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
