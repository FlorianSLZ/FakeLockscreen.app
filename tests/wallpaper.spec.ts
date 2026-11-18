import { test, expect, type Page } from '@playwright/test';

import { deflateSync, crc32 } from 'node:zlib';

function chunk(type: string, data: Buffer) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}
/** Builds a valid solid grey PNG, so the test does not depend on a hand-typed blob. */
function makePng(w: number, h: number) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  const row = Buffer.concat([Buffer.from([0]), Buffer.alloc(w * 3, 0x80)]);
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
const PNG = makePng(64, 40);

const screens = [
  { slug: 'win7', el: '.w7-bg', wake: false },
  { slug: 'win10', el: '.w10-wp', wake: true },
  { slug: 'win11', el: '.w11-wp', wake: true },
  { slug: 'macos', el: '.mac-wp', wake: false },
];

async function pick(page: Page, file: { name: string; mimeType: string; buffer: Buffer }) {
  const chooser = page.waitForEvent('filechooser');
  await page.locator('#wp-btn').click();
  await (await chooser).setFiles(file);
}

for (const s of screens) {
  test(`${s.slug}: custom wallpaper stays local and is applied`, async ({ page }) => {
    await page.goto(`/${s.slug}`);
    await page.waitForLoadState('networkidle');
    const external: string[] = [];
    page.on('request', (r) => {
      if (!/^(blob|data):/.test(r.url())) external.push(r.url());
    });

    await pick(page, { name: 'my.png', mimeType: 'image/png', buffer: PNG });
    await expect(page.locator('html')).toHaveClass(/has-custom-wp/);
    await expect(page.locator('#wp-status')).toContainText('active');
    await expect(page.locator('#wp-clear')).toBeVisible();

    await page.locator('#start').click();
    await page.waitForTimeout(600);
    const bg = await page.locator(s.el).first().evaluate((e) => getComputedStyle(e).backgroundImage);
    expect(bg).toContain('blob:');
    // the picker never stays in the page, so lock screens still have no form elements
    expect(await page.locator('input, form, textarea').count()).toBe(0);
    expect(external).toEqual([]);
  });
}

test('non-image and oversized files are refused, remove restores the default', async ({ page }) => {
  await page.goto('/win11');
  await pick(page, { name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
  await expect(page.locator('#wp-status')).toHaveClass(/err/);
  await expect(page.locator('html')).not.toHaveClass(/has-custom-wp/);

  await pick(page, { name: 'ok.png', mimeType: 'image/png', buffer: PNG });
  await expect(page.locator('html')).toHaveClass(/has-custom-wp/);
  await page.locator('#wp-clear').click();
  await expect(page.locator('html')).not.toHaveClass(/has-custom-wp/);
  await expect(page.locator('#wp-clear')).toBeHidden();
});

test('XP has no wallpaper option, German labels work', async ({ page }) => {
  await page.goto('/xp');
  expect(await page.locator('#wp-btn').count()).toBe(0);
  await page.goto('/de/win10');
  await expect(page.locator('#wp-btn')).toHaveText('Eigenen Hintergrund verwenden');
});
