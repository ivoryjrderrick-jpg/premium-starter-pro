const MISSES = [
  {
    title: 'After hours and weekends',
    body: 'Someone with a problem at 9pm hits your voicemail. They hang up and call the next name on the list. You never know it happened.',
  },
  {
    title: "While you're working",
    body: "You're under a truck or in front of a customer. The phone rings. You'll get to it later — if you remember, and if they're still waiting.",
  },
  {
    title: 'Two calls at once',
    body: 'The second one gets a busy signal or rings out. Most people who reach a voicemail box do not call back a second time.',
  },
];

export default function Problem() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="border-t border-cream/10 bg-navy-800 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="problem-heading"
          className="max-w-2xl text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          The calls you don&apos;t answer
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
          You already know where the leaks are. They just don&apos;t show up on any
          report, because a call that never got answered leaves no record.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MISSES.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-cream/10 bg-navy-700 p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-amber">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slateLight">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl border-l-2 border-amber pl-5 text-lg leading-relaxed text-cream">
          Take your average job value. Multiply it by the calls that went to
          voicemail last week. That number is what this is competing against — not
          the monthly fee.
        </p>
      </div>
    </section>
  );
}
