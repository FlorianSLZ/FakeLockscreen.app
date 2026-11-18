import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

// lastmod = date of the last real content change (git), not the build time, so it stays stable between deploys.
let lastmod = new Date();
try {
  const d = execSync('git log -1 --format=%cI -- src public', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  if (d) lastmod = new Date(d);
} catch {}

export default defineConfig({
  site: 'https://fakelockscreen.app',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  // Every script is an external same-origin file, so the CSP can say script-src 'self' without exceptions.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({ lastmod, filter: (page) => !page.includes('/awareness/card'), i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } } }),
  ],
});
