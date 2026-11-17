import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/de', '/about', '/safety', '/awareness', '/de/awareness', '/awareness/card', '/xp', '/win7', '/win10', '/win11', '/macos'];

for (const route of routes) {
  test(`a11y ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('keyboard: tab order on the landing page reaches interactive elements', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(focused).toBeTruthy();
});
