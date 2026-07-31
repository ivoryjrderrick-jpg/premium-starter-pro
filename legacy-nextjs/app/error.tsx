'use client';

import { site } from '@/lib/site';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
      <h1 className="text-4xl font-bold tracking-tight text-cream sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-slateLight">
        Try again — and if it keeps happening, call {site.phone.display} and I&apos;ll
        sort it out.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-amber px-6 py-3.5 font-semibold text-navy hover:bg-amber-bright"
        >
          Try again
        </button>
        <a
          href={site.phone.href}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-amber/45 px-6 py-3.5 font-semibold text-amber hover:bg-amber/10"
        >
          Call {site.phone.display}
        </a>
      </div>
    </section>
  );
}
