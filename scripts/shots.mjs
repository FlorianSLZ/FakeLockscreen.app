import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
mkdirSync('screenshots', { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const base = 'http://localhost:4321';
await p.goto(base + '/'); await p.waitForTimeout(2600);
await p.screenshot({ path: 'screenshots/m2-home-hero.png' });
for (const id of ['xp', 'win7', 'win11']) {
  await p.evaluate((i) => document.getElementById(i).scrollIntoView({ behavior: 'instant' }), id);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `screenshots/m2-home-${id}.png` });
}
await p.goto(base + '/xp'); await p.screenshot({ path: 'screenshots/m2-xp-gate.png' });
await p.locator('#start').click(); await p.waitForTimeout(900);
await p.screenshot({ path: 'screenshots/m2-xp-welcome.png' });
await p.locator('#xp-user').click(); await p.keyboard.type('hunter2'); await p.waitForTimeout(300);
await p.screenshot({ path: 'screenshots/m2-xp-password.png' });
await p.keyboard.press('Enter'); await p.waitForTimeout(400);
await p.screenshot({ path: 'screenshots/m2-xp-wrong.png' });
await p.keyboard.press('Enter');
for (let i = 0; i < 2; i++) { await p.keyboard.type('x'); await p.keyboard.press('Enter'); await p.waitForTimeout(200); if (i < 1) await p.keyboard.press('Enter'); }
await p.waitForTimeout(1500);
await p.screenshot({ path: 'screenshots/m2-xp-reveal.png' });
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + '/'); await m.waitForTimeout(800); await m.screenshot({ path: 'screenshots/m2-mobile-home.png' });
await m.goto(base + '/xp'); await m.screenshot({ path: 'screenshots/m2-mobile-xp.png' });
await b.close();
