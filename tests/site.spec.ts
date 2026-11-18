import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const lockSlugs = ['xp', 'win7', 'win10', 'win11', 'macos'];
const pages = ['/', '/about', '/safety', '/awareness', '/awareness/card', ...lockSlugs.map((s) => '/' + s)];
const allRoutes = pages.flatMap((p) => [p, p === '/' ? '/de' : '/de' + p]);
const FOOTER_EN = 'Not affiliated with Microsoft or Apple. Harmless browser prank and awareness tool. Nothing is installed, nothing is captured.';
const FOOTER_DE = 'Nicht mit Microsoft oder Apple verbunden. Harmloser Browser-Streich und Awareness-Tool. Es wird nichts installiert und nichts aufgezeichnet.';
const SHARP_S = String.fromCharCode(0xdf);

test.describe('every route', () => {
  for (const route of allRoutes) {
    test(`${route}: renders with SEO basics and footer`, async ({ page, request }) => {
      const res = await page.goto(route);
      expect(res!.status()).toBe(200);
      const de = route.startsWith('/de');
      await expect(page.locator('html')).toHaveAttribute('lang', de ? 'de' : 'en');
      const title = await page.title();
      expect(title.length).toBeGreaterThan(15);
      expect(title.length).toBeLessThan(100);
      const desc = await page.locator('meta[name=description]').getAttribute('content');
      expect(desc!.length).toBeGreaterThan(60);
      expect(desc!.length).toBeLessThan(260);
      await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', /^https:\/\/fakelockscreen\.app\//);
      expect(await page.locator('link[rel=alternate][hreflang]').count()).toBe(3);
      await expect(page.locator('.site-footer, .gate-footer').last()).toContainText(de ? FOOTER_DE : FOOTER_EN);

      const og = await page.locator('meta[property="og:image"]').getAttribute('content');
      const img = await request.get(new URL(og!).pathname);
      expect(img.status(), og!).toBe(200);
      expect(img.headers()['content-type']).toContain('image/png');

      for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(raw);
    });
  }
});

test('footer text is exact on German and English landing', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-footer')).toHaveText(FOOTER_EN);
  await page.goto('/de');
  await expect(page.locator('.site-footer')).toHaveText(FOOTER_DE);
});

test('/.well-known/security.txt and robots.txt', async ({ request }) => {
  const sec = await (await request.get('/.well-known/security.txt')).text();
  expect(sec).toMatch(/^Contact: https:\/\//m);
  const exp = /^Expires: (.+)$/m.exec(sec)![1];
  expect(new Date(exp).getTime()).toBeGreaterThan(Date.now());
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://fakelockscreen.app/sitemap-index.xml');
});

test('sitemap lists every route, in both languages', async ({ request }) => {
  const xml = await (await request.get('/sitemap-0.xml')).text();
  for (const r of allRoutes) {
    const url = 'https://fakelockscreen.app' + (r === '/' ? '' : r);
    expect(xml, r).toMatch(new RegExp(`<loc>${url.replace(/[/.]/g, '\\$&')}/?</loc>`));
  }
});

test('security: scripts are external only, no sharp s in the source, headers lock down lock screens', async () => {
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    const scripts = [...html.matchAll(/<script([^>]*)>/g)].map((m) => m[1]);
    for (const attrs of scripts) expect(/src=|application\/ld\+json/.test(attrs), `${f}: inline script`).toBe(true);
    expect(html.includes(SHARP_S), `${f} contains the sharp s`).toBe(false);
  }
  for (const f of walk('src').filter((f) => /\.(astro|ts|css)$/.test(f))) {
    expect(readFileSync(f, 'utf8').includes(SHARP_S), f).toBe(false);
  }

  const headers = readFileSync('public/_headers', 'utf8');
  for (const slug of lockSlugs) {
    for (const prefix of ['', '/de']) {
      const block = new RegExp(`^${prefix}/${slug}\\r?\\n((?:  .+\\r?\\n?)+)`, 'm').exec(headers);
      expect(block, `${prefix}/${slug} block`).not.toBeNull();
      expect(block![1]).toContain("connect-src 'none'");
      expect(block![1]).toContain("form-action 'none'");
      expect(block![1]).toContain("script-src 'self'");
    }
  }
});

test.describe('no network after load on every lock screen route, both languages', () => {
  for (const slug of lockSlugs) {
    for (const prefix of ['', '/de']) {
      test(`${prefix}/${slug}`, async ({ page }) => {
        await page.goto(`${prefix}/${slug}`);
        await page.waitForLoadState('networkidle');
        const seen: string[] = [];
        page.on('request', (r) => seen.push(r.url()));
        page.on('websocket', (w) => seen.push('ws:' + w.url()));
        await page.locator('#start').click();
        await page.keyboard.press('a');
        await page.keyboard.type('hunter2');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        expect(seen).toEqual([]);
      });
    }
  }
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test('landing page works without horizontal scroll', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
  test('lock screens show a best on desktop note instead of a start button', async ({ page }) => {
    for (const s of lockSlugs) {
      await page.goto('/' + s);
      await expect(page.locator('.gate-mobile')).toBeVisible();
      await expect(page.locator('#start')).toBeHidden();
    }
  });
});

test('reduced motion switches animations off on the landing page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const name = await page.locator('.tunnel i').first().evaluate((e) => getComputedStyle(e).animationName);
  expect(name).toBe('none');
});

test('language switch links to the matching page', async ({ page }) => {
  await page.goto('/safety');
  await page.locator('a.lang').click();
  await expect(page).toHaveURL(/\/de\/safety$/);
  await page.locator('a.lang').click();
  await expect(page).toHaveURL(/\/safety$/);
});

test('hero has quick launch buttons for the latest Windows and macOS screens', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-quick=win11]')).toHaveAttribute('href', '/win11');
  await expect(page.locator('[data-quick=macos]')).toHaveAttribute('href', '/macos');
  await page.goto('/de');
  await expect(page.locator('[data-quick=win11]')).toHaveAttribute('href', '/de/win11');
  await expect(page.locator('[data-quick=macos]')).toHaveAttribute('href', '/de/macos');
});

test.describe('SEO: crawlable gate text and 404 hygiene', () => {
  const names: Record<string, RegExp> = { xp: /XP/, win7: /Windows(-| )7/, win10: /Windows(-| )10/, win11: /Windows(-| )11/, macos: /macOS/ };
  for (const slug of lockSlugs) {
    for (const prefix of ['', '/de']) {
      test(`${prefix}/${slug}: H1 names the OS and the gate has real text`, async ({ page }) => {
        await page.goto(`${prefix}/${slug}`);
        await expect(page.locator('h1')).toHaveText(names[slug]);
        const words = (await page.locator('#gate').innerText()).split(/\s+/).length;
        expect(words).toBeGreaterThan(100);
      });
    }
  }
  test('404 has no canonical or hreflang and is noindex', async ({ request }) => {
    const res = await request.get('/definitely-not-a-page');
    expect(res.status()).toBe(404);
    const html = await res.text();
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('rel="alternate"');
    expect(html).toContain('noindex');
  });
  test('sitemap has lastmod and llms.txt exists', async ({ request }) => {
    expect(await (await request.get('/sitemap-0.xml')).text()).toContain('<lastmod>');
    expect((await request.get('/llms.txt')).status()).toBe(200);
  });
});
