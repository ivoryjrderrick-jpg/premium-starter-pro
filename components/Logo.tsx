import Image from 'next/image';

/**
 * The Rocky Mountain Booking mark.
 *
 * This is the real logo, extracted from the supplied artwork with a transparent
 * background rather than the circular photo badge it was delivered in. Two
 * reasons: the photographic backdrop turns to noise at header size, and a
 * transparent mark sits correctly on both the header navy and the lighter
 * footer navy without showing a disc edge.
 *
 * Intrinsic ratio is roughly 3.3:1, so callers should set a height and leave
 * the width to `w-auto`.
 */
export default function Logo({
  className = 'h-6 w-auto',
  title,
}: {
  className?: string;
  /** Pass to make the mark a labelled image; omit where a wordmark sits beside it. */
  title?: string;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt={title ?? ''}
      width={320}
      height={97}
      // Header brand asset — eager so it doesn't pop in after first paint.
      priority
      // The asset is already sized for its largest render (~92px wide, so 320px
      // is better than 3x on retina). Skipping the optimizer avoids the
      // "sharp missing in production" warning when self-hosting, and a round
      // trip through /_next/image for a 9.6KB file that never changes.
      unoptimized
      className={className}
      // Decorative when the adjacent wordmark already carries the name.
      aria-hidden={title ? undefined : true}
    />
  );
}
