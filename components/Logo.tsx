/**
 * Golden geometric mountain range mark.
 *
 * Decorative when it sits next to the wordmark (the text carries the name), so
 * it's aria-hidden there; pass a `title` to make it a standalone labelled image.
 */
export default function Logo({
  className = 'h-8 w-8',
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 40"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* Back ridge — deeper amber so the range reads with depth at 24px. */}
      <path d="M2 34 L14 12 L22 24 L30 8 L46 34 Z" fill="#C98F2E" />
      {/* Front ridge */}
      <path d="M2 34 L14 12 L26 34 Z" fill="#F5B84A" />
      {/* Snow cap on the tall peak */}
      <path d="M30 8 L35 15 L32 16 L30 14 L27.5 16 Z" fill="#F4EFE6" />
      <path d="M0 34 H48 V37 H0 Z" fill="#F5B84A" opacity="0.45" />
    </svg>
  );
}
