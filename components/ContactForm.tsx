'use client';

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
    <div>
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
    </form>
  );
}
