import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fakelockscreen.app',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  // Every script is an external same-origin file, so the CSP can say script-src 'self' without exceptions.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({ lastmod: new Date(), i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } } }),
  ],
});
