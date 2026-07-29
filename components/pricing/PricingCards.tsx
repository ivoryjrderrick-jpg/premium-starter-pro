import { CheckoutButton } from '@/components/CTA';
import { plans, site } from '@/lib/site';

/** Links come from config, so changing a Stripe URL never means editing a component. */
const CHECKOUT_LINKS: Record<string, string> = {
  founding: site.stripe.foundingLink,
  standard: site.stripe.standardLink,
};

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-amber"
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
  );
}

export default function PricingCards() {
  return (
    <section aria-labelledby="plans-heading" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 id="plans-heading" className="sr-only">
          Plans and pricing
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                plan.featured
                  ? 'border-amber/55 bg-navy-700 shadow-card'
                  : 'border-cream/12 bg-navy-800'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-cream">{plan.name}</h3>
                {plan.badge ? (
                  <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                    {plan.badge}
                  </span>
                ) : null}
              </div>

              {/* Monthly figure leads; setup fee is deliberately secondary. */}
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold tracking-tight text-cream sm:text-6xl">
                  ${plan.monthly}
                </span>
                <span className="text-lg text-slateMuted">/month</span>
              </p>
              <p className="mt-2 text-sm text-slateLight">
                ${plan.setup} one-time setup
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-relaxed text-cream">
                    <Check />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CheckoutButton
                  href={CHECKOUT_LINKS[plan.id] || undefined}
                  variant={plan.featured ? 'primary' : 'ghost'}
                >
                  {plan.featured ? 'Claim a founding spot' : 'Get started'}
                </CheckoutButton>
              </div>

              <p className="mt-4 text-sm text-slateMuted">{plan.footnote}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-cream">
          About 10% of what a full-time receptionist costs — working four times the
          hours.
        </p>

        {/* Must stay consistent with the fair-use clause in section 3 of the
            Terms. "No overage charges" used to sit here, which published an
            unlimited-usage promise the Terms did not back. */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slateMuted">
          No per-minute billing. Fair use up to 1,500 answered minutes a month —
          I&apos;ll call you before anything changes. Setup is billed once, up front.
          Comparison based on the estimates above. Pricing is subject to change; the
          rate agreed at signup is the rate that applies.
        </p>
      </div>
    </section>
  );
}
