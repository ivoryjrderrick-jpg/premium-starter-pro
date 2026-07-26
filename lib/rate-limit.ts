/**
 * Minimal in-memory rate limiter for the public API routes.
 *
 * Caveat worth knowing: serverless instances don't share memory, so this is a
 * per-instance limit, not a global one. It's enough to stop a single client
 * hammering an endpoint, which is the realistic abuse case here. If this site
 * ever needs a hard global limit, that belongs at the edge (Vercel WAF / Upstash),
 * not in application code.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stops the map growing without bound on a long-lived instance. */
function evictExpired(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 } = {},
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  evictExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client identity. On Vercel, x-forwarded-for is set by the proxy;
 * it's spoofable in general, which is exactly why this is a speed bump rather
 * than a security control.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
