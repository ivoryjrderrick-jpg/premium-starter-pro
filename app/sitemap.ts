
export default async function sitemap() {
  const base = process.env.SITE_URL || 'http://localhost:3000';
  const routes = ['', '/pricing', '/about', '/blog', '/contact', '/privacy', '/terms'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date().toISOString(),
  }));
  return routes;
}
