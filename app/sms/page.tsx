import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout, { MailingAddress } from '@/components/legal/LegalLayout';
import { site } from '@/lib/site';

/**
 * SMS Terms of Service — the page TCR / carrier reviewers open during 10DLC or
 * toll-free verification. It must be publicly reachable without a login, which
 * is why it's linked from the footer on every page.
 *
 * ⚠️  Do not deploy while the mailing address in lib/site.ts is still a
 *     placeholder. Reviewers read this page and a bracketed placeholder is a
 *     straightforward rejection.
 *
 * The source document ended with a "this document is a draft prepared for
 * compliance review" line. That is deliberately NOT rendered — telling a
 * reviewer your compliance page is a draft invites a rejection. It's guidance
 * for the owner, not page copy.
 *
 * Not legal advice. Have a licensed Colorado attorney review before taking on
 * paying customers.
 */

export const metadata: Metadata = {
  title: 'SMS Terms of Service',
  description: `Text messaging terms for ${site.legalName}: what messages we send, message frequency, rates, and how to opt out with STOP or get help with HELP.`,
  alternates: { canonical: '/sms' },
};

export default function SmsTermsPage() {
  return (
    <LegalLayout
      title="SMS Terms of Service"
      // "appointment-based" rather than "home service" so this matches the
      // audience the site actually markets to. See the note in privacy/page.tsx.
      intro={`${site.legalName} ("Rocky Mountain Booking," "we," "us") provides an AI-powered phone answering and appointment booking service to appointment-based businesses in Colorado, including HVAC, plumbing, and electrical contractors. When you call one of our client businesses and we answer on their behalf, we may send you a text message related to that call.`}
    >
      <h2>Who receives messages from us</h2>
      <p>
        <strong>Callers and customers of our client businesses.</strong> If you call
        a business that uses Rocky Mountain Booking and you schedule a service
        appointment during that call, we may text you a confirmation.
      </p>
      <p>
        <strong>Our client business owners and their staff.</strong> If your business
        subscribes to our service, we send you operational notifications about calls
        we handle on your behalf.
      </p>

      <h2>What messages we send</h2>
      <p>To callers and customers:</p>
      <ul>
        <li>Appointment confirmations with the business name, date, time, and address</li>
        <li>Appointment reminders, changes, or cancellations</li>
        <li>Follow-up when a business needs to reach you about your request</li>
      </ul>
      <p>To our client businesses:</p>
      <ul>
        <li>New booking notifications</li>
        <li>Escalated emergency call alerts</li>
        <li>Daily and monthly summaries of calls handled</li>
      </ul>
      <p>
        All of our messages are transactional.{' '}
        <strong>We do not send marketing or promotional text messages.</strong>
      </p>

      <h2>How you opt in</h2>
      <p>
        <strong>Callers and customers.</strong> You opt in verbally during a phone
        call that you initiate to one of our client businesses. Our automated
        assistant will ask whether it may send a text confirmation to the number you
        are calling from. Your affirmative answer is recorded and timestamped in our
        system. If you decline, we will not text you.
      </p>
      <p>
        <strong>Business clients.</strong> You opt in by providing your mobile number
        and affirmatively consenting to SMS notifications when you sign up for our
        service.
      </p>
      <p>
        <strong>Website enquiries.</strong> If you contact us through the form on
        this website, you may tick an optional box to receive text messages about
        your enquiry at the number you provide. The box is unticked by default, and
        submitting the form without ticking it means we will not text you. Consent is
        never a condition of purchase.
      </p>
      <p>
        We never send a text message to obtain consent, and we do not purchase, rent,
        or import phone number lists.
      </p>

      <h2>Message frequency</h2>
      <p>
        <strong>Message frequency varies</strong> based on call and appointment
        activity. Callers typically receive one to three messages per appointment.
        Business clients typically receive messages as calls are handled, plus one
        daily summary.
      </p>

      <h2>Cost</h2>
      <p>
        <strong>Message and data rates may apply.</strong> Rocky Mountain Booking
        does not charge you for text messages. Charges, if any, come from your mobile
        carrier under your own plan.
      </p>

      <h2>How to stop messages</h2>
      <p>
        <strong>Reply STOP to any message from us.</strong> You will receive one
        confirmation that you have been unsubscribed, and we will send no further
        messages to that number.
      </p>
      <p>
        You may also contact us at <a href={`mailto:${site.email}`}>{site.email}</a>{' '}
        or <a href={site.phone.href}>{site.phone.display}</a> to be removed.
      </p>
      <p>
        Opting out of text messages does not cancel a scheduled appointment. To
        change or cancel an appointment, call the business directly.
      </p>

      <h2>How to get help</h2>
      <p>
        <strong>Reply HELP to any message from us</strong>, or contact us at{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> or{' '}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>

      <h2>Supported carriers</h2>
      <p>
        Carriers are not liable for delayed or undelivered messages. Delivery is
        subject to your carrier&apos;s network and effective transmission.
      </p>

      <h2>Calls may be recorded</h2>
      <p>
        Calls answered by Rocky Mountain Booking on behalf of our client businesses
        may be recorded and transcribed for quality assurance, accuracy of
        appointment details, and record keeping. Our assistant discloses this at the
        start of each call. See our <Link href="/privacy">Privacy Policy</Link> for
        how recordings and transcripts are handled.
      </p>

      <h2>You are speaking with an automated assistant</h2>
      <p>
        Calls are answered by an AI assistant, not a human. The assistant identifies
        itself as automated at the beginning of every call. If you ask to speak with
        a person, the assistant will take a message or transfer you when a person is
        available.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The effective date above reflects the most recent
        version. Continued use of our service after changes are posted constitutes
        acceptance.
      </p>

      <h2>Contact</h2>
      <MailingAddress />
    </LegalLayout>
  );
}
