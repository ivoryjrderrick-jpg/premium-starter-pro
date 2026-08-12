import type { APIRoute } from 'astro';
import { site } from '../config/site';

/**
 * Sitemap, generated from the pages that actually exist rather than a
 * hand-kept list — add or delete a page and this follows on the next build.
 *
 * Zero dependencies on purpose: the whole site ships from one package, and a
 * build-time integration is not worth adding for eight static URLs.
 */
const pageFiles = import.meta.glob('./**/*.astro');

/** Pages that should not be advertised to search engines. */
const EXCLUDE = new Set<string>(['404']);

/** Legal pages are real but rarely change and should not outrank the offer. */
const LOW_PRIORITY = new Set(['privacy', 'terms', 'sms-terms']);

export const GET: APIRoute = () => {
  const routes = Object.keys(pageFiles)
    .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, ''))
    .filter((route) => !EXCLUDE.has(route))
    .map((route) => (route === 'index' ? '' : route))
    .sort();

  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = new URL(`/${route}`, site.url).href;
    const priority = route === '' ? '1.0' : LOW_PRIORITY.has(route) ? '0.3' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
