import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout, { MailingAddress } from '@/components/legal/LegalLayout';
import { site, retention } from '@/lib/site';

/**
 * Privacy Policy — supplied by the owner for carrier / TCR review.
 *
 * ⚠️  Two things the source document flagged, repeated here so they don't get
 *     lost:
 *
 *  1. The subprocessor list below must match what you actually use. Remove any
 *     you don't.
 *  2. The retention periods come from `retention` in lib/site.ts and must match
 *     what your systems actually do.
 *
 * The source also carried a trailing "this document is a draft prepared for
 * compliance review" line. That is deliberately NOT rendered — publishing it
 * would tell a TCR reviewer your compliance page is a draft. It is guidance for
 * you, not page copy.
 *
 * Not legal advice. Have a licensed Colorado attorney review before taking on
 * paying customers.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.legalName} collects, uses, and protects information from callers and client businesses.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`${site.legalName} ("we," "us") provides AI-powered phone answering and appointment booking services to home service businesses in Colorado. This policy explains what information we collect, how we use it, and the choices you have.`}
    >
      <h2>Overview</h2>
      <p>
        This policy covers two groups: <strong>our business clients</strong>{' '}
        (contractors who subscribe to our service) and <strong>callers</strong>{' '}
        (people who call those businesses and reach our assistant).
      </p>
      <p>
        Our text messaging program — what we send, how often, and how to stop — is
        described in full in our <Link href="/sms">SMS Terms of Service</Link>.
      </p>

      <h2>Information we collect</h2>

      <h3>From callers</h3>
      <p>When you call a business that uses our service, we may collect:</p>
      <ul>
        <li>Your phone number</li>
        <li>Your name</li>
        <li>Your service address</li>
        <li>
          The nature of your request (for example, &ldquo;no heat,&rdquo;
          &ldquo;annual maintenance&rdquo;)
        </li>
        <li>Appointment details you schedule</li>
        <li>An audio recording and written transcript of the call</li>
      </ul>

      <h3>From our business clients</h3>
      <ul>
        <li>Business name, address, and contact information</li>
        <li>Owner and staff names, email addresses, and phone numbers</li>
        <li>
          Business hours, service area, technician availability, and pricing
          information you provide
        </li>
        <li>Calendar availability, in order to schedule appointments</li>
        <li>Billing information, processed by our payment provider</li>
      </ul>

      <h3>Automatically</h3>
      <ul>
        <li>Call metadata such as time, duration, and originating number</li>
        <li>Basic website analytics</li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        <strong>
          We do not create, extract, store, or use voiceprints or any other
          biometric identifiers.
        </strong>{' '}
        Our system recognizes returning callers by phone number only. We do not
        perform voice matching, voice authentication, or speaker identification of
        any kind.
      </p>
      <p>
        We do not collect Social Security numbers, financial account numbers, health
        information, or government ID numbers. Please do not provide this
        information during a call.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To answer calls and schedule appointments on behalf of our client businesses</li>
        <li>To send appointment confirmations and reminders</li>
        <li>To notify business owners of bookings and emergency calls</li>
        <li>To produce call summaries and reporting for our client businesses</li>
        <li>To improve the accuracy and quality of our service</li>
        <li>To provide customer support</li>
        <li>To bill our client businesses</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>
        We do not sell personal information. We do not use caller information for
        our own marketing.
      </p>

      <h2>Mobile information</h2>
      <p>
        <strong>
          No mobile information will be shared with third parties or affiliates for
          marketing or promotional purposes.
        </strong>{' '}
        Information sharing with subprocessors described below is solely to support
        the operation of our service, and those parties are not permitted to use
        mobile information for their own marketing.
      </p>
      <p>
        Text messaging originator opt-in data and consent are not shared with any
        third party.
      </p>

      <h2>Who we share information with</h2>
      <p>
        <strong>The business you called.</strong> Caller information, appointment
        details, transcripts, and recordings are made available to the client
        business you contacted. That business is responsible for its own handling of
        your information.
      </p>
      <p>
        <strong>Service providers (subprocessors)</strong> that operate parts of our
        platform:
      </p>
      <ul>
        <li>Voice AI processing and call handling</li>
        <li>Telephony and SMS delivery</li>
        <li>Data storage and hosting</li>
        <li>Payment processing</li>
        <li>Calendar scheduling</li>
      </ul>
      <p>
        These providers process information only as needed to deliver our service
        and are bound by their own confidentiality and security obligations.
      </p>
      <p>
        <strong>Legal requirements.</strong> We may disclose information where
        required by law, subpoena, or court order, or to protect the safety of any
        person.
      </p>
      <p>
        <strong>Business transfer.</strong> If our business is sold or merged,
        information may transfer as part of that transaction.
      </p>

      <h2>Call recording</h2>
      <p>
        Calls answered on behalf of our client businesses may be recorded and
        transcribed. Colorado is a one-party consent state, and our client business
        is a party to these calls. Our assistant nonetheless discloses at the start
        of every call that the call may be recorded.
      </p>
      <p>
        If you do not want to be recorded, you may end the call and contact the
        business by another method.
      </p>

      <h2>How long we keep information</h2>
      <ul>
        <li>
          <strong>Call recordings:</strong> {retention.callRecordings}, then deleted
        </li>
        <li>
          <strong>Transcripts and call summaries:</strong> {retention.transcripts}
        </li>
        <li>
          <strong>Appointment and contact records:</strong> for the duration of our
          agreement with the client business, plus {retention.appointmentRecords}
        </li>
        <li>
          <strong>Billing records:</strong> as required by tax and accounting law
        </li>
      </ul>
      <p>
        Client businesses may request shorter retention periods. When our agreement
        with a client business ends, we delete or return their data within{' '}
        {retention.offboarding} on request.
      </p>

      <h2>Your rights</h2>
      <p>
        Colorado residents have rights under the Colorado Privacy Act, including the
        right to access, correct, delete, and obtain a portable copy of personal
        data, and to opt out of targeted advertising, sale of personal data, and
        certain profiling. We do not engage in targeted advertising, sale of
        personal data, or profiling.
      </p>
      <p>
        To exercise any right, contact us at{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within the
        time required by law. You may appeal a denial by replying to our response.
      </p>
      <p>
        Where we process information on behalf of a client business, we act as that
        business&apos;s service provider. We will forward your request to them and
        assist in fulfilling it.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard measures including encryption in transit, access
        controls, tenant data isolation, and restricted administrative access. No
        system is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        Our service is not directed to children under 13, and we do not knowingly
        collect their personal information. If you believe a child has provided
        information, contact us and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy. The effective date above reflects the most recent
        version. Material changes will be communicated to our client businesses
        directly.
      </p>

      <h2>Contact</h2>
      <MailingAddress />
    </LegalLayout>
  );
}
