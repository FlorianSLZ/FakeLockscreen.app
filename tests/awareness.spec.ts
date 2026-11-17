import { test, expect } from '@playwright/test';

test('configurator builds a link that opens a working, branded reveal', async ({ page, context }) => {
  await page.goto('/awareness');
  await page.fill('#f-company', 'Acme AG');
  await page.fill('#f-message', 'Please lock your screen when you leave.');
  await page.fill('#f-policy', 'https://intranet.example/policy');
  await page.selectOption('#f-os', 'win11');
  await page.fill('#f-attempts', '2');

  // live preview reflects the settings
  await expect(page.locator('#aw-preview .reveal h2')).toContainText('Acme AG');
  const link = await page.inputValue('#aw-link');
  expect(link).toMatch(/\/win11#c=/);

  await page.goto(link);
  await page.locator('#start').click();
  await page.keyboard.press('a');
  await page.waitForTimeout(700);
  for (let i = 0; i < 2; i++) {
    await page.keyboard.type('x');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    if (i < 1) await page.keyboard.press('Enter');
  }
  const reveal = page.locator('.reveal');
  await expect(reveal).toBeVisible({ timeout: 3000 });
  await expect(reveal.locator('h2')).toContainText('Acme AG');
  await expect(reveal).toContainText('Please lock your screen when you leave.');
  await expect(reveal.locator('a.reveal-link')).toHaveAttribute('href', 'https://intranet.example/policy');
  await expect(reveal).toContainText('Win');
  await expect(reveal.locator('details summary')).toBeVisible();
});

test('German configurator produces a German lock screen link', async ({ page }) => {
  await page.goto('/de/awareness');
  await page.fill('#f-company', 'Muster GmbH');
  const link = await page.inputValue('#aw-link');
  expect(link).toContain('/de/');
  await page.goto(link);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
});

test('auto reveal appears without typing', async ({ page }) => {
  const cfg = Buffer.from(JSON.stringify({ autoReveal: 2, company: 'Acme' })).toString('base64url');
  await page.goto(`/macos#c=${cfg}`);
  await page.locator('#start').click();
  await expect(page.locator('.reveal')).toBeVisible({ timeout: 4000 });
});

test('unsafe config is neutralised: no javascript: links, HTML stays text', async ({ page }) => {
  const cfg = Buffer.from(
    JSON.stringify({ attempts: 1, policy: 'javascript:alert(1)', message: '<img src=x onerror=alert(1)>', company: '<b>Bold</b>' }),
  ).toString('base64url');
  await page.goto(`/win7#c=${cfg}`);
  await page.locator('#start').click();
  await page.keyboard.type('x');
  await page.keyboard.press('Enter');
  await expect(page.locator('.reveal')).toBeVisible({ timeout: 3000 });
  expect(await page.locator('.reveal a.reveal-link').count()).toBe(0);
  expect(await page.locator('.reveal img, .reveal b').count()).toBe(0);
  await expect(page.locator('.reveal')).toContainText('<img src=x');
});

test('garbage config falls back to defaults', async ({ page }) => {
  await page.goto('/win7#c=%%%not-base64');
  await page.locator('#start').click();
  await expect(page.locator('#w7-name')).toHaveText('User');
});

test('desk card renders company wording and is A4 shaped', async ({ page }) => {
  const cfg = Buffer.from(JSON.stringify({ company: 'Acme AG', message: 'Hello team', policy: 'https://x.example/p' })).toString('base64url');
  await page.goto(`/awareness/card#c=${cfg}`);
  await expect(page.locator('#c-head')).toContainText('Acme AG');
  await expect(page.locator('#c-msg')).toHaveText('Hello team');
  await expect(page.locator('#c-policy-url')).toHaveText('https://x.example/p');
  const box = await page.locator('.sheet').boundingBox();
  expect(Math.abs(box!.width / box!.height - 210 / 297)).toBeLessThan(0.01);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.controls')).toBeHidden();
});

test('desk card content never overflows the A4 sheet, even with maximum length text', async ({ page }) => {
  const cfg = Buffer.from(
    JSON.stringify({ company: 'A'.repeat(60), message: 'Lorem ipsum dolor sit amet. '.repeat(14).slice(0, 400), policy: 'https://example.com/' + 'p'.repeat(270) }),
  ).toString('base64url');
  for (const route of ['/awareness/card', '/de/awareness/card']) {
    await page.goto(`${route}#c=${cfg}`);
    const over = await page.evaluate(() => {
      const sheet = document.querySelector('.sheet')!.getBoundingClientRect();
      const made = document.querySelector('.made')!.getBoundingClientRect();
      const tip = document.querySelector('.tip')!.getBoundingClientRect();
      return { footerInside: made.bottom <= sheet.bottom + 1, tipAboveFooter: tip.bottom <= made.top + 1 };
    });
    expect(over, route).toEqual({ footerInside: true, tipAboveFooter: true });
  }
});
