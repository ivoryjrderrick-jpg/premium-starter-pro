import Link from 'next/link';
import Logo from '@/components/Logo';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-cream/10 bg-navy-800">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-6 w-auto" />
              <span className="font-semibold tracking-tight text-cream">
                Rocky Mountain <span className="text-amber">Booking</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slateMuted">
              AI phone systems for appointment-based businesses. Built, installed,
              and supported locally from {site.city}, {site.state}.
            </p>
          </div>

          {/* Single column below sm: two columns left ~155px at 390px wide,
              which clipped the email address off the right edge. */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-14">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cream">Site</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="text-slateLight hover:text-amber" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-slateLight hover:text-amber" href="/pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="text-slateLight hover:text-amber" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cream">
                Get in touch
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="text-slateLight hover:text-amber" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  {/* break-words is a safety net for very narrow viewports
                      (~320px) — the address is one long unbreakable token. */}
                  <a
                    className="break-words text-slateLight hover:text-amber"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </li>
                <li className="pt-1 text-slateMuted">
                  {site.city}, {site.state}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream/10 pt-6 text-sm text-slateMuted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.city}, {site.state}.
          </p>
          {/* SMS Terms must be reachable from every page without a login —
              carrier / TCR reviewers look for exactly this link. */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-amber" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-amber" href="/terms">
              Terms of Service
            </Link>
            <Link className="hover:text-amber" href="/sms">
              SMS Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
