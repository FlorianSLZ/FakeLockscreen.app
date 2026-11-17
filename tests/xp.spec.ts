import { test, expect } from '@playwright/test';

const gotoXp = async (page, hash = '') => {
  await page.goto('/xp' + hash);
  await page.locator('#start').click();
  await expect(page.locator('#xp')).toBeVisible();
};

test('XP route renders the gate with safety info', async ({ page }) => {
  await page.goto('/xp');
  await expect(page.locator('#gate h1')).toBeVisible();
  await expect(page.locator('.gate-footer')).toContainText('Not affiliated with Microsoft or Apple');
});

test('wrong password flow shows the dialog and counts dots', async ({ page }) => {
  await gotoXp(page);
  await page.locator('#xp-user').click();
  await page.keyboard.type('abc');
  await expect(page.locator('#xp-dots')).toHaveText('●●●');
  await page.keyboard.press('Backspace');
  await expect(page.locator('#xp-dots')).toHaveText('●●');
  await page.keyboard.press('Enter');
  await expect(page.locator('#xp-dialog')).toBeVisible();
  await expect(page.locator('#xp-dialog-text')).toContainText('password is incorrect');
  await page.keyboard.press('Enter');
  await expect(page.locator('#xp-dialog')).toBeHidden();
  await expect(page.locator('#xp-dots')).toHaveText('');
});

test('reveal appears after N wrong attempts', async ({ page }) => {
  await gotoXp(page);
  await page.locator('#xp-user').click();
  for (let i = 0; i < 3; i++) {
    await page.keyboard.type('x');
    await page.keyboard.press('Enter');
    await expect(page.locator('#xp-dialog')).toBeVisible();
    if (i < 2) await page.keyboard.press('Enter');
  }
  await expect(page.locator('.reveal')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('.reveal h2')).toContainText('left unlocked');
});

test('holding ESC for 2 seconds exits to the gate', async ({ page }) => {
  await gotoXp(page);
  await page.keyboard.down('Escape');
  await page.waitForTimeout(2300);
  await page.keyboard.up('Escape');
  await expect(page.locator('#gate')).toBeVisible();
  await expect(page.locator('#stage')).toBeHidden();
});

test('a short ESC press does not exit', async ({ page }) => {
  await gotoXp(page);
  await page.keyboard.down('Escape');
  await page.waitForTimeout(300);
  await page.keyboard.up('Escape');
  await page.waitForTimeout(1900);
  await expect(page.locator('#stage')).toBeVisible();
});

test('no network requests after load, even while using the screen', async ({ page }) => {
  await page.goto('/xp');
  await page.waitForLoadState('networkidle');
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  page.on('websocket', (w) => requests.push('ws:' + w.url()));
  await page.locator('#start').click();
  await page.locator('#xp-user').click();
  await page.keyboard.type('secret');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1200);
  expect(requests).toEqual([]);
});

test('no password input or form exists', async ({ page }) => {
  await gotoXp(page);
  expect(await page.locator('input, form, textarea').count()).toBe(0);
});
