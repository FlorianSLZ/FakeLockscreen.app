import { test, expect, type Page } from '@playwright/test';

type Os = { slug: string; root: string; dots: string; wake: boolean; wrong: string };
const screens: Os[] = [
  { slug: 'win7', root: '#w7', dots: '#w7-dots', wake: false, wrong: '#w7-msg' },
  { slug: 'win10', root: '#w10', dots: '#w10-dots', wake: true, wrong: '#w10-msg' },
  { slug: 'win11', root: '#w11', dots: '#w11-dots', wake: true, wrong: '#w11-msg' },
  { slug: 'macos', root: '#mac', dots: '#mac-dots', wake: false, wrong: '.mac-pill.shake' },
];

async function launch(page: Page, os: Os, hash = '') {
  await page.goto(`/${os.slug}${hash}`);
  await page.locator('#start').click();
  await expect(page.locator(os.root)).toBeVisible();
  if (os.wake) {
    await page.keyboard.press('a'); // wakes the lock screen, must not count as a typed character
    await page.waitForTimeout(700);
  }
}

for (const os of screens) {
  test.describe(os.slug, () => {
    test('renders gate then screen, German route exists', async ({ page }) => {
      await page.goto(`/${os.slug}`);
      await expect(page.locator('#gate')).toBeVisible();
      await page.goto(`/de/${os.slug}`);
      await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    });

    test('dots count only, wake key is not counted', async ({ page }) => {
      await launch(page, os);
      await page.keyboard.type('abc');
      await expect(page.locator(os.dots)).toHaveText('●●●');
      await page.keyboard.press('Backspace');
      await expect(page.locator(os.dots)).toHaveText('●●');
    });

    test('wrong password feedback', async ({ page }) => {
      await launch(page, os);
      await page.keyboard.type('nope');
      await page.keyboard.press('Enter');
      await expect(page.locator(os.wrong)).toBeVisible();
      await expect(page.locator(os.dots)).toHaveText('');
    });

    test('reveal after configured attempts, custom name from config', async ({ page }) => {
      const cfg = Buffer.from(JSON.stringify({ attempts: 2, name: 'Alex', company: 'Acme' })).toString('base64url');
      await launch(page, os, `#c=${cfg}`);
      for (let i = 0; i < 2; i++) {
        await page.keyboard.type('x');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);
        if (i < 1 && os.slug !== 'macos') await page.keyboard.press('Enter'); // dismiss OK message
      }
      await expect(page.locator('.reveal')).toBeVisible({ timeout: 3000 });
      await expect(page.locator('.reveal h2')).toContainText('Acme');
    });

    test('hold ESC exits, no network, no form elements', async ({ page }) => {
      await page.goto(`/${os.slug}`);
      await page.waitForLoadState('networkidle');
      const requests: string[] = [];
      page.on('request', (r) => requests.push(r.url()));
      await page.locator('#start').click();
      if (os.wake) await page.keyboard.press('a');
      await page.keyboard.type('secret');
      await page.keyboard.press('Enter');
      expect(await page.locator('input, form, textarea').count()).toBe(0);
      await page.keyboard.down('Escape');
      await page.waitForTimeout(2300);
      await page.keyboard.up('Escape');
      await expect(page.locator('#gate')).toBeVisible();
      expect(requests).toEqual([]);
    });
  });
}
