import type { Metadata } from 'next';
import LegalLayout, { MailingAddress } from '@/components/legal/LegalLayout';
import { site } from '@/lib/site';

/**
 * ⚠️  Written to satisfy carrier / 10DLC registration requirements, including
 *     the explicit SMS disclosures reviewers look for. It is not legal advice —
 *     have an attorney review before launch if you want belt and braces.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.legalName} collects, uses, and protects information, including SMS messaging terms.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This policy explains what information ${site.legalName} ("we," "us," or "our") collects, why we collect it, how we use it, and the choices you have. It applies to this website and to the call answering and appointment booking services we provide.`}
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName} is a limited liability company based in {site.city},{' '}
        {site.state}. We build and operate AI-assisted phone answering and
        appointment booking systems for service businesses. You can reach us using
        the details at the end of this policy.
      </p>

      <h2>Information we collect</h2>

      <h3>Information you give us directly</h3>
      <p>
        When you contact us through this website, call us, or become a client, we
        collect the information you choose to provide. That typically includes your
        name, business name, phone number, email address, and anything you write in
        a message to us.
      </p>

      <h3>Information collected when our system answers a call</h3>
      <p>
        When our system answers a call on behalf of a client business, we may
        collect and process:
      </p>
      <ul>
        <li>The caller&apos;s phone number and the time and duration of the call</li>
        <li>
          A recording and/or written transcript of the call, where permitted by law
          and disclosed to the caller
        </li>
        <li>
          Information the caller provides in order to book an appointment — name,
          callback number, service address, the nature of the request, and preferred
          appointment times
        </li>
        <li>Appointment details written to the client business&apos;s calendar</li>
      </ul>
      <p>
        Where we process this information on behalf of a client business, that
        business is the owner of the information and we act as its service provider.
        We use it to deliver the service and for nothing else.
      </p>

      <h3>Information collected automatically on this website</h3>
      <p>
        Our web host and any analytics we run may record standard technical
        information such as IP address, browser type, referring page, and pages
        visited. This site does not use advertising cookies, and it does not store
        data in your browser&apos;s local storage or session storage.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To answer calls, book appointments, and send confirmations and reminders</li>
        <li>To transfer urgent calls and send call summaries to the client business</li>
        <li>To respond to enquiries and provide support</li>
        <li>To bill for services and keep ordinary business records</li>
        <li>To maintain, troubleshoot, and improve the reliability of the service</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>
        We do not sell personal information. We do not use information collected on
        behalf of a client business to market to that business&apos;s customers.
      </p>

      {/* ── Carrier-required SMS disclosures ─────────────────────────────── */}
      <h2>SMS and text messaging</h2>

      <h3>What messages we send</h3>
      <p>
        When you or your customers provide a mobile number in connection with our
        service, we send <strong>transactional service messages only</strong>. These
        are appointment confirmations, appointment reminders, scheduling changes or
        cancellations, and — for our clients — notifications summarising calls that
        came in and alerts about urgent calls. We do not send marketing or
        promotional text messages through this service.
      </p>

      <h3>Consent</h3>
      <p>
        Mobile numbers are collected when a caller books an appointment and agrees to
        receive a confirmation, or when a client business provides its own number to
        receive call notifications. Consent to receive text messages is not a
        condition of purchasing any goods or services.
      </p>

      <h3>Message frequency</h3>
      <p>
        <strong>Message frequency varies.</strong> The number of messages you receive
        depends on how many appointments you book or, for client businesses, how many
        calls come in. There is no fixed number of messages per period.
      </p>

      <h3>Message and data rates</h3>
      <p>
        <strong>Message and data rates may apply.</strong> Your mobile carrier&apos;s
        standard messaging and data charges apply to any messages you send or receive.
        We do not charge you for text messages, but your carrier may.
      </p>

      <h3>How to opt out</h3>
      <p>
        <strong>Reply STOP to any message to opt out</strong> at any time. You will
        receive a single confirmation message and then no further messages, other
        than as required to complete a transaction already in progress. You may also
        opt out by calling or emailing us using the details below. Replying{' '}
        <strong>UNSTOP</strong> or <strong>START</strong> will resume messages.
      </p>

      <h3>How to get help</h3>
      <p>
        <strong>Reply HELP to any message</strong> for assistance, or contact us
        directly at <a href={`mailto:${site.email}`}>{site.email}</a> or{' '}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>

      <h3>Carrier liability</h3>
      <p>
        Mobile carriers are not liable for delayed or undelivered messages. Message
        delivery depends on your carrier&apos;s network and is not guaranteed.
      </p>

      <h3>Mobile opt-in data</h3>
      <p>
        <strong>
          We do not sell, rent, or share mobile opt-in information or phone numbers
          with third parties or affiliates for their marketing purposes.
        </strong>{' '}
        Mobile opt-in data and consent are never shared for marketing. Phone numbers
        are shared only with the messaging and telephony providers strictly necessary
        to deliver the messages you have asked for, and those providers are
        contractually restricted to that purpose.
      </p>

      <h2>When we share information</h2>
      <p>We share information only in these situations:</p>
      <ul>
        <li>
          <strong>Service providers.</strong> Telephony, messaging, calendar, hosting,
          and payment providers that operate the service on our behalf. They may use
          the information only to provide their service to us.
        </li>
        <li>
          <strong>The client business.</strong> Call details and appointment
          information collected on a business&apos;s behalf are provided to that
          business.
        </li>
        <li>
          <strong>Legal requirements.</strong> Where we are required to by law, legal
          process, or to protect the rights and safety of people or property.
        </li>
        <li>
          <strong>Business transfer.</strong> If the business is sold or merged,
          information may transfer as part of that transaction.
        </li>
      </ul>

      <h2>Call recording</h2>
      <p>
        Where calls are recorded, callers are notified at the start of the call.
        Colorado is a one-party consent state, but requirements differ elsewhere and
        some calls cross state lines, so notice is given on every recorded call.
        Recording can be disabled for a client business on request.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep information for as long as needed to provide the service and to meet
        legal, tax, and accounting obligations. Call recordings and transcripts are
        retained for a limited operational period and then deleted. A client business
        may request deletion of its data at any time, subject to records we are
        required to keep.
      </p>

      <h2>Security</h2>
      <p>
        We use commercially reasonable administrative and technical safeguards to
        protect information, including encrypted transmission and access controls. No
        method of transmission or storage is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may ask us to access, correct, or delete personal information we hold
        about you, and you may opt out of text messages at any time as described
        above. Colorado residents have rights under the Colorado Privacy Act,
        including the right to access, correct, delete, and obtain a portable copy of
        personal data, and to opt out of targeted advertising and sale of personal
        data — neither of which we do. To exercise any of these rights, contact us
        using the details below. We will not discriminate against you for making a
        request.
      </p>

      <h2>Children</h2>
      <p>
        This service is intended for businesses and is not directed to children under
        13. We do not knowingly collect personal information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The effective date at the top of
        this page shows when it was last revised. Material changes will be posted
        here.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy, or requests about your information, can be sent
        to:
      </p>
      <MailingAddress />
    </LegalLayout>
  );
}
