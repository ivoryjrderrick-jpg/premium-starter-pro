import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { CallButton } from '@/components/CTA';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    `Talk to ${site.legalName} in ${site.city}, ${site.state} about AI phone answering and ` +
    'appointment booking for your business. Call, email, or send a message.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-cream sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slateLight">
        Fastest way is to call. You&apos;ll hear the system answer — which is the
        demo — and it will put you through to me or take your details.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-amber">
            Direct
          </h2>

          <dl className="mt-5 space-y-6">
            <div>
              <dt className="text-sm text-slateMuted">Phone</dt>
              <dd className="mt-1">
                <a
                  className="text-2xl font-semibold text-cream underline-offset-4 hover:text-amber hover:underline"
                  href={site.phone.href}
                >
                  {site.phone.display}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slateMuted">Email</dt>
              <dd className="mt-1">
                <a
                  className="text-lg text-cream underline-offset-4 hover:text-amber hover:underline"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slateMuted">Based in</dt>
              <dd className="mt-1 text-lg text-cream">
                {site.city}, {site.state}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slateMuted">Hours</dt>
              <dd className="mt-1 leading-relaxed text-cream">
                I answer during business hours, Mountain Time.
                <span className="block text-slateLight">
                  The system answers the other 128.
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <CallButton variant="primary">Call now</CallButton>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-amber">
            Send a message
          </h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
