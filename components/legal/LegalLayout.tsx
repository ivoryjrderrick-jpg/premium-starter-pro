import { site, legalEffectiveDate } from '@/lib/site';

/**
 * Shared shell + prose styling for the Privacy Policy and Terms pages.
 *
 * Styling is done with descendant selectors instead of per-element classes so
 * the legal copy stays readable as plain semantic markup — these are documents
 * that get edited by hand, sometimes by a lawyer rather than a developer.
 */
const PROSE = [
  '[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-cream',
  '[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-amber',
  '[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-slateLight',
  '[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:leading-relaxed [&_li]:text-slateLight',
  '[&_a]:text-amber [&_a]:underline [&_a]:underline-offset-4',
  '[&_strong]:text-cream [&_strong]:font-semibold',
].join(' ');

/** Physical mailing address block — required for SMS/carrier registration. */
export function MailingAddress() {
  return (
    <address className="mt-4 rounded-xl border border-amber/30 bg-navy-800 p-5 not-italic leading-relaxed text-cream">
      <strong className="block font-semibold">{site.legalName}</strong>
      <span className="block text-slateLight">{site.address.line1}</span>
      <span className="block text-slateLight">{site.address.line2}</span>
      <a className="mt-2 block text-amber underline underline-offset-4" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <a className="block text-amber underline underline-offset-4" href={site.phone.href}>
        {site.phone.display}
      </a>
    </address>
  );
}

export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-cream sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-slateMuted">
        Effective date: {legalEffectiveDate} · Last updated: {legalEffectiveDate}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-cream">{intro}</p>

      <div className={PROSE}>{children}</div>
    </article>
  );
}
