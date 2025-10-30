
import React from 'react';
export default function SEO({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:image" content="/og.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
