'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELD =
  'w-full rounded-xl border border-cream/15 bg-navy-800 px-4 py-3 text-cream ' +
  'placeholder:text-slateMuted focus:border-amber/60 min-h-[48px]';

function Field({
  id,
  label,
  type = 'text',
  required = false,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    // min-w-0 for the same reason as the page-level grid: an input's intrinsic
    // width would otherwise stop this grid cell shrinking on narrow screens.
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-cream">
        {label}{' '}
        {required ? (
          <span className="text-amber" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-slateMuted">(optional)</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`mt-2 ${FIELD}`}
      />
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const endpoint = site.formEndpoint;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill a hidden field. Bail silently so bots
    // get a success screen and stop retrying.
    if (data.get('company_website')) {
      setStatus('success');
      return;
    }

    // No endpoint configured yet — hand off to the user's mail client rather
    // than posting into a void and losing the lead.
    if (!endpoint) {
      const body = [
        `Name: ${data.get('name') ?? ''}`,
        `Business: ${data.get('business') ?? ''}`,
        `Phone: ${data.get('phone') ?? ''}`,
        `Email: ${data.get('email') ?? ''}`,
        // Carried through so the consent decision is recorded alongside the
        // number, not just captured in the browser and lost.
        `SMS consent: ${data.get('sms_consent') ? 'YES' : 'no'}`,
        '',
        `${data.get('message') ?? ''}`,
      ].join('\n');

      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Website enquiry — ${data.get('business') || data.get('name') || 'New lead'}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      form.reset();
      setStatus('success');
      setMessage("Got it. I'll get back to you within one business day.");
    } catch {
      setStatus('error');
      setMessage(
        `That didn't send. Call ${site.phone.display} or email ${site.email} and I'll pick it up directly.`,
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
      <p className="text-sm text-slateMuted">
        <span className="text-amber" aria-hidden="true">
          *
        </span>{' '}
        Required
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required autoComplete="name" />
        <Field
          id="business"
          label="Business name"
          required
          autoComplete="organization"
        />
        <Field id="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field id="email" label="Email" type="email" required autoComplete="email" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-cream">
          What&apos;s going on with your calls?{' '}
          <span className="text-slateMuted">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`mt-2 ${FIELD}`}
          placeholder="How many calls a day, what you do with them now, and what's slipping."
        />
      </div>

      {/*
        Express written consent for SMS, captured at the point the number is
        collected. Deliberately OPTIONAL and unchecked by default — conditioning
        a service on messaging consent is exactly what the TCPA prohibits, so
        the form submits fine either way. The disclosures sit in the label
        itself, which is what carrier and TCR reviewers look for.
      */}
      <div className="rounded-xl border border-cream/10 bg-navy-800/60 p-4">
        <div className="flex gap-3">
          <input
            id="sms_consent"
            name="sms_consent"
            type="checkbox"
            value="yes"
            className="mt-1 h-5 w-5 shrink-0 accent-amber"
          />
          <label htmlFor="sms_consent" className="text-sm leading-relaxed text-slateLight">
            <span className="font-medium text-cream">
              Text me about my enquiry.
            </span>{' '}
            By checking this box you agree to receive text messages from{' '}
            {site.legalName} about your enquiry at the number provided. Consent is
            not a condition of purchase. Message frequency varies. Message and data
            rates may apply. Reply STOP to opt out, HELP for help.
          </label>
        </div>
      </div>

      {/* Honeypot — hidden from people and from assistive tech, visible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-amber px-6 py-3.5 font-semibold text-navy transition-colors hover:bg-amber-bright disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : 'Send it over'}
      </button>

      {/* Announced to screen readers without stealing focus. */}
      <p
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={`text-sm ${status === 'error' ? 'text-amber-bright' : 'text-slateLight'}`}
      >
        {message}
      </p>

      <p className="text-sm text-slateMuted">
        Rather just talk?{' '}
        <a className="text-amber underline underline-offset-4" href={site.phone.href}>
          {site.phone.display}
        </a>
      </p>

      <p className="text-sm text-slateMuted">
        See our{' '}
        <Link className="text-amber underline underline-offset-4" href="/sms">
          SMS Terms
        </Link>{' '}
        and{' '}
        <Link className="text-amber underline underline-offset-4" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
