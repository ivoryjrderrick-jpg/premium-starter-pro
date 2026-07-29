import type { Metadata } from 'next';
import LegalLayout, { MailingAddress } from '@/components/legal/LegalLayout';
import { site } from '@/lib/site';

/**
 * ⚠️  Drafted to match how the business actually operates (month to month,
 *     30 days notice, liability capped at three months of fees, no outcome
 *     guarantees). It is not legal advice — have an attorney review it,
 *     particularly the liability and indemnity sections.
 */

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms governing AI phone answering and appointment booking services provided by ${site.legalName}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro={`These terms govern the services provided by ${site.legalName} ("we," "us," or "our") to you ("Client"). By purchasing or using the service, you agree to them.`}
    >
      <h2>1. The service</h2>
      <p>
        We design, build, configure, and operate an AI-assisted phone answering and
        appointment booking system for the Client&apos;s business. Depending on the
        plan purchased, the service includes:
      </p>
      <ul>
        <li>Answering inbound calls to a number designated by the Client, 24 hours a day</li>
        <li>Answering common questions using information supplied by the Client</li>
        <li>Booking appointments to a calendar system designated by the Client</li>
        <li>Sending SMS appointment confirmations and reminders</li>
        <li>Transferring calls identified as urgent to a phone number designated by the Client</li>
        <li>Sending the Client text summaries of calls received</li>
        <li>Setup, configuration, and ongoing support</li>
      </ul>
      <p>
        We may improve or modify how the service works over time. We will not
        materially reduce the functionality described above during a paid period
        without notice.
      </p>

      <h2>2. Setup</h2>
      <p>
        A one-time setup fee is charged before configuration begins. Setup typically
        takes about one week from the initial consultation and requires the
        Client&apos;s reasonable cooperation — providing business information, call
        handling preferences, calendar access, and availability for a review call.
        Delays caused by the Client may extend this. The setup fee covers work
        performed and is non-refundable once configuration has begun.
      </p>

      <h2>3. Term, billing, and cancellation</h2>
      <p>
        <strong>The service is month to month.</strong> There is no long-term
        contract and no minimum term beyond the first month. Monthly fees are billed
        in advance on a recurring basis from the date the service goes live.
      </p>
      <p>
        <strong>Either party may cancel with 30 days written notice.</strong> Notice
        may be sent by email to the address at the end of these terms. Service
        continues through the end of the 30-day notice period and the final month is
        payable. Fees already paid are not refunded on cancellation, and setup fees
        are never refundable.
      </p>
      <p>
        Founding client rates, where offered, are locked for six months from the date
        service goes live. After that period the then-current standard rate applies,
        and we will give at least 30 days notice before any rate change takes effect.
      </p>
      <p>
        We may suspend the service if fees are more than 10 days overdue, after
        giving the Client notice and a reasonable opportunity to pay.
      </p>

      <h3>Fair use</h3>
      <p>
        Plans include reasonable use of up to <strong>1,500 answered minutes per
        month</strong> per Client. If usage exceeds that ceiling in a given month,
        we will contact the Client to discuss the account before applying any
        additional charges. Additional minutes beyond the ceiling are billed at{' '}
        <strong>$0.35 per minute</strong>. This ceiling exists to protect against
        unusual volume and is not expected to affect normal use.
      </p>

      <h2>4. Client responsibilities</h2>
      <p>The Client is responsible for:</p>
      <ul>
        <li>
          Providing accurate information about its business, services, pricing,
          availability, and what constitutes an urgent call
        </li>
        <li>
          Maintaining its own telephone service, calendar software, and any other
          third-party accounts the service connects to
        </li>
        <li>Reviewing appointments booked and responding to transferred urgent calls</li>
        <li>Complying with all laws applicable to its own business and communications</li>
      </ul>

      <h3>Consent for contacts supplied by the Client</h3>
      <p>
        <strong>
          The Client is solely responsible for obtaining and maintaining all legally
          required consents from any person whose contact information the Client
          provides to us or whose number is used with the service.
        </strong>{' '}
        This includes any consent required under the Telephone Consumer Protection
        Act, applicable state telemarketing and messaging laws, and carrier
        requirements. The Client represents that it has such consent, will honor opt-out
        requests promptly, and will not use the service to contact anyone who has
        withdrawn consent. The Client indemnifies us against claims arising from its
        failure to do so.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        The service may not be used for unlawful, deceptive, harassing, or fraudulent
        purposes, for unsolicited marketing or robocalling, or in any way that
        violates carrier rules or messaging regulations. We may suspend or terminate
        the service immediately for a breach of this section.
      </p>

      <h2>6. Availability</h2>
      <p>
        We will use <strong>commercially reasonable efforts</strong> to keep the
        service available and functioning properly, and to respond promptly to
        problems the Client reports. The service depends on third-party telephony,
        messaging, calendar, and hosting providers, as well as on the Client&apos;s
        own phone and internet service.
      </p>
      <p>
        <strong>We do not offer a guaranteed uptime percentage or a service level
        agreement.</strong> The service may be unavailable during maintenance, during
        third-party outages, or due to circumstances outside our reasonable control.
      </p>

      <h2>7. No guarantee of outcomes</h2>
      <p>
        <strong>
          We do not guarantee any particular business result.
        </strong>{' '}
        We make no representation or warranty regarding the number of calls answered,
        appointments booked, leads generated, revenue earned, or customers retained.
        Any figures, examples, or comparisons shown on our website or discussed during
        a sales conversation are illustrative only and are not a promise of results.
      </p>
      <p>
        The service uses automated systems that interpret natural speech. It will not
        handle every call perfectly. It may misunderstand a caller, misclassify the
        urgency of a call, or fail to book an appointment correctly. The Client
        accepts this as an inherent characteristic of the service and agrees to
        maintain its own judgment and oversight over its operations, including for
        emergency and safety-related matters.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        Except as expressly stated in these terms, the service is provided &ldquo;as
        is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind,
        whether express, implied, or statutory, including any implied warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        <strong>
          Our total aggregate liability arising out of or relating to the service,
          under any theory of liability, will not exceed the total fees actually paid
          by the Client to us in the three (3) months immediately preceding the event
          giving rise to the claim.
        </strong>
      </p>
      <p>
        We will not be liable for indirect, incidental, special, consequential,
        exemplary, or punitive damages, or for lost profits, lost revenue, lost
        business, lost data, or missed business opportunities, even if we have been
        advised of the possibility of such damages.
      </p>
      <p>
        Nothing in these terms limits liability that cannot lawfully be limited,
        including liability for fraud, willful misconduct, or gross negligence.
      </p>

      <h2>10. Confidentiality</h2>
      <p>
        Each party will protect the other&apos;s non-public business information with
        reasonable care and use it only to perform under these terms. Our handling of
        personal information is described in our <a href="/privacy">Privacy Policy</a>,
        which forms part of these terms.
      </p>

      <h2>11. Intellectual property</h2>
      <p>
        We retain ownership of the systems, configurations, prompts, scripts, tooling,
        and know-how used to deliver the service. The Client retains ownership of its
        own business information, customer data, call records, and appointment data.
        On cancellation, the Client may request an export of its call and appointment
        data. The Client grants us a limited license to use its business information
        solely to operate the service.
      </p>

      <h2>12. Termination for breach</h2>
      <p>
        Either party may terminate immediately if the other materially breaches these
        terms and fails to cure the breach within 15 days of written notice. On
        termination, we will disable the service and the Client should redirect its
        phone number. Fees accrued up to termination remain payable.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>
        We may update these terms. Material changes take effect 30 days after we post
        them or notify the Client, whichever is later. Continuing to use the service
        after that date means the Client accepts the revised terms. If the Client does
        not accept them, it may cancel under section 3.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Colorado, without regard
        to its conflict of laws rules. The parties agree to the exclusive jurisdiction
        of the state and federal courts located in El Paso County, Colorado. Each
        party agrees to attempt to resolve any dispute in good faith directly before
        filing a claim.
      </p>

      <h2>15. General</h2>
      <p>
        If any provision of these terms is found unenforceable, the rest remain in
        effect. Our failure to enforce a provision is not a waiver of it. The Client
        may not assign these terms without our written consent. These terms, together
        with the Privacy Policy and any written order or proposal, are the entire
        agreement between the parties regarding the service.
      </p>

      <h2>16. Website content and accessibility</h2>
      <p>
        Information on this website, including pricing, comparisons, and
        descriptions of the service, is provided for general information and may
        change without notice. Cost comparisons shown are estimates for
        illustration and are not quotes; the rate agreed at signup is the rate that
        applies. Nothing on this website is an offer capable of acceptance until we
        have confirmed it in writing.
      </p>
      <p>
        We aim to keep this website usable with a keyboard, with a screen reader,
        and at increased zoom levels, and we work toward the WCAG 2.1 AA
        guidelines. Accessibility is an ongoing effort rather than a fixed state.
        If you have difficulty using any part of this site, contact us using the
        details below and we will help you directly and work to fix the problem.
      </p>

      <h2>17. Contact</h2>
      <p>Notices under these terms, including cancellation notices, should be sent to:</p>
      <MailingAddress />
    </LegalLayout>
  );
}
