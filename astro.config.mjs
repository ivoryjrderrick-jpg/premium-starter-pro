import { defineConfig } from 'astro/config';

// Static output. This is a marketing site: no server rendering, no data
// fetching at runtime, so every page ships as prebuilt HTML.
export default defineConfig({
  site: 'https://rockymountainbooking.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
