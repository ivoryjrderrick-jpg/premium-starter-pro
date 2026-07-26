import HeroVisual from '@/components/hero/HeroVisual';
import { CallButton, LinkButton } from '@/components/CTA';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden">
      <HeroVisual />

      <div className="relative mx-auto max-w-6xl px-5 pb-40 pt-12 sm:pb-44 sm:pt-24 lg:pb-52 lg:pt-32">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-navy-800/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
            {site.city}, {site.state} — done for you
          </p>

          <h1 className="mt-6 text-[2.125rem] font-bold leading-[1.1] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Every call answered.
            <br />
            Every appointment booked.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slateLight sm:text-xl">
            Most owners lose work to voicemail — after hours, out on a job, or when
            two calls come in at once. This answers all of them, books straight to
            your calendar, and puts urgent callers through to your phone.
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/90">
            I build it for you. I&apos;m local. When something breaks, you call me.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton variant="primary">Hear it answer a call</CallButton>
            <LinkButton href="/pricing" variant="secondary">
              See pricing
            </LinkButton>
          </div>

          <p className="mt-4 text-sm text-slateMuted">
            Calls {site.phone.display} — that&apos;s the system picking up, any hour.
            Ask for a person and it transfers you to me. Same thing your customers get.
          </p>
        </div>
      </div>
    </section>
  );
}
