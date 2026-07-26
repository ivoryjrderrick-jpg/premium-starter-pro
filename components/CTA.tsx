import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Shared CTA primitives.
 *
 * Everything that dials, links to Stripe, or points at another page routes
 * through here so the phone number and checkout URLs live in exactly one place
 * (lib/site.ts, overridable by env var) rather than being pasted into pages.
 */

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold ' +
  'transition-colors duration-150 min-h-[48px]';

const variants: Record<Variant, string> = {
  primary: 'bg-amber text-navy hover:bg-amber-bright shadow-amber',
  secondary:
    'border border-amber/45 text-amber hover:bg-amber/10 hover:border-amber/70',
  ghost: 'border border-cream/20 text-cream hover:bg-cream/5 hover:border-cream/40',
};

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px] shrink-0"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 3.8c0-.7.6-1.3 1.3-1.3h2.3c.6 0 1.1.4 1.2 1l.6 2.8c.1.5-.1 1-.5 1.3l-1.4 1a11.4 11.4 0 0 0 5.4 5.4l1-1.4c.3-.4.8-.6 1.3-.5l2.8.6c.6.1 1 .6 1 1.2v2.3c0 .7-.6 1.3-1.3 1.3A14.7 14.7 0 0 1 2.5 3.8Z" />
    </svg>
  );
}

/**
 * Click-to-call button. Defaults to the configured demo number but takes a
 * `phone` prop so any instance can dial somewhere else.
 */
export function CallButton({
  children,
  phone = site.phone.e164,
  variant = 'primary',
  className = '',
  showNumber = false,
}: {
  children: React.ReactNode;
  phone?: string;
  variant?: Variant;
  className?: string;
  showNumber?: boolean;
}) {
  return (
    <a
      href={`tel:${phone}`}
      className={`${base} ${variants[variant]} ${className}`}
      data-analytics="click-to-call"
    >
      <PhoneIcon />
      <span>
        {children}
        {showNumber ? (
          <span className="hidden sm:inline"> — {site.phone.display}</span>
        ) : null}
      </span>
    </a>
  );
}

/**
 * Checkout / external CTA. Give it a `href` (a Stripe Payment Link, typically).
 * When no link is configured it falls back to the contact page rather than
 * rendering a dead button.
 */
export function CheckoutButton({
  children,
  href,
  fallbackHref = '/contact',
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  fallbackHref?: string;
  variant?: Variant;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} w-full ${className}`;

  if (!href) {
    return (
      <Link href={fallbackHref} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      // Stripe Payment Links open on Stripe's domain.
      rel="noopener"
      data-analytics="checkout"
    >
      {children}
    </a>
  );
}

/** Internal page link styled as a button. */
export function LinkButton({
  children,
  href,
  variant = 'secondary',
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
