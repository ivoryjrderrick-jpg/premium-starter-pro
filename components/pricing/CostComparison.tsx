const OPTIONS = [
  {
    label: 'A full-time receptionist',
    cost: '$55,000–72,000',
    unit: 'per year, fully loaded',
    hours: '40 hours a week',
    detail:
      'Salary, payroll tax, benefits, training. Off nights, weekends, holidays, sick days and vacation.',
    highlight: false,
  },
  {
    label: 'A traditional answering service',
    cost: '$300–2,500',
    unit: 'per month',
    hours: 'Varies by plan',
    detail:
      'Takes a message and passes it along. Nothing gets booked, and you still have to call everyone back.',
    highlight: false,
  },
  {
    label: 'This',
    cost: 'From $497',
    unit: 'per month',
    hours: '168 hours a week',
    detail:
      'Answers every call, books the appointment on your calendar, and transfers the urgent ones to your phone.',
    highlight: true,
  },
];

export default function CostComparison() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="border-y border-cream/10 bg-navy-800 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="comparison-heading"
          className="text-2xl font-bold tracking-tight text-cream sm:text-3xl"
        >
          What answering your phone costs today
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slateLight">
          Worth setting against each other before you look at a number.
        </p>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {OPTIONS.map((option) => (
            <li
              key={option.label}
              className={`flex flex-col rounded-xl border p-6 ${
                option.highlight
                  ? 'border-amber/50 bg-navy-700 shadow-card'
                  : 'border-cream/10 bg-navy-700/50'
              }`}
            >
              <h3
                className={`text-sm font-semibold uppercase tracking-wider ${
                  option.highlight ? 'text-amber' : 'text-slateMuted'
                }`}
              >
                {option.label}
              </h3>

              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span
                  className={`text-3xl font-bold tracking-tight ${
                    option.highlight ? 'text-amber' : 'text-cream'
                  }`}
                >
                  {option.cost}
                </span>
                <span className="text-sm text-slateMuted">{option.unit}</span>
              </p>

              <p
                className={`mt-3 text-sm font-semibold ${
                  option.highlight ? 'text-cream' : 'text-slateLight'
                }`}
              >
                {option.hours}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slateMuted">
                {option.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
