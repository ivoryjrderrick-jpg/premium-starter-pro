/** Trades lead, but the list stays deliberately open — the system doesn't care
 *  what the appointment is for. */
const INDUSTRIES = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Garage doors',
  'Landscaping',
  'Auto repair',
  'Veterinary clinics',
  'Med spas',
  'Dental practices',
  'Property management',
  'Professional services',
];

export default function WhoItsFor() {
  return (
    <section aria-labelledby="who-heading" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="who-heading"
          className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          Who it&apos;s for
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slateLight">
          If your business runs on inbound calls and booked appointments, it fits.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((industry) => (
            <li
              key={industry}
              className="rounded-full border border-cream/15 bg-navy-800 px-4 py-2 text-sm font-medium text-cream"
            >
              {industry}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl leading-relaxed text-slateMuted">
          Not on the list? The question isn&apos;t your industry — it&apos;s whether
          you lose money when a call goes unanswered. Call and ask.
        </p>
      </div>
    </section>
  );
}
