import { CallButton, LinkButton } from '@/components/CTA';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-cream sm:text-5xl">
        That page isn&apos;t here
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-slateLight">
        The link is wrong or the page has moved. The phone still works, though.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <CallButton variant="primary">Call us</CallButton>
        <LinkButton href="/" variant="secondary">
          Back to home
        </LinkButton>
      </div>
    </section>
  );
}
