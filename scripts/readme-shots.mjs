// Regenerates the README screenshots in docs/screenshots/.
// Usage: npm run build && npm run preview (in another terminal), then npm run shots
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const OUT = resolve('docs/screenshots');
mkdirSync(OUT, { recursive: true });
const FIXED = new Date('2026-03-12T09:41:00');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, locale: 'en-GB', colorScheme: 'dark' });
const page = await ctx.newPage();
await page.clock.install({ time: FIXED });
const shot = (name, p = page) => p.screenshot({ path: `${OUT}/${name}.png` });

// Lock screens
for (const os of ['xp', 'win7', 'win10', 'win11', 'macos']) {
  await page.goto(`${BASE}/${os}`);
  await page.locator('#start').click();
  await page.waitForTimeout(1800);
  await shot(os);
}
// Win11 sign-in with typed password, for the awareness story
await page.goto(`${BASE}/win11`);
await page.locator('#start').click();
await page.waitForTimeout(800);
await page.keyboard.press('a');
await page.waitForTimeout(1200);
await page.keyboard.type('hunter2');
await page.waitForTimeout(300);
await shot('win11-signin');

// Awareness configurator
await page.goto(`${BASE}/awareness`);
await page.fill('#f-company', 'Acme AG');
await page.fill('#f-message', 'Please lock your screen when you leave your desk.');
await page.fill('#f-policy', 'https://intranet.example/security');
await page.selectOption('#f-os', 'win11');
await page.waitForTimeout(600);
// show the production host in the screenshot instead of localhost
await page.evaluate(() => { const t = document.getElementById('aw-link'); t.value = t.value.replace(location.origin, 'https://fakelockscreen.app'); });
await shot('awareness-config');

// Awareness reveal on a real lock screen
const link = await page.inputValue('#aw-link');
await page.goto(link);
await page.locator('#start').click();
await page.keyboard.press('a');
await page.waitForTimeout(800);
for (let i = 0; i < 3; i++) {
  await page.keyboard.type('x');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  if (i < 2) await page.keyboard.press('Enter');
}
await page.locator('.reveal').waitFor({ timeout: 4000 });
await page.evaluate(() => document.activeElement && document.activeElement.blur());
await page.waitForTimeout(900);
await shot('awareness-reveal');

// Desk card (printable A4)
const cardPage = await ctx.newPage();
await cardPage.setViewportSize({ width: 1000, height: 1180 });
await cardPage.goto(`${BASE}/awareness/card#${new URL(link).hash.slice(1)}`);
await cardPage.waitForTimeout(600);
await shot('desk-card', cardPage);

// Hero collage: five lock screens fanned out on a dark backdrop
const shots = ['xp', 'win7', 'win11', 'macos', 'win10'];
const cards = shots.map((n, i) => {
  const pos = [
    { x: 0, y: 90, r: 10, z: 1, w: 560 },
    { x: 250, y: 65, r: 6, z: 2, w: 600 },
    { x: 480, y: 30, r: 0, z: 5, w: 640 },
    { x: 780, y: 65, r: -6, z: 2, w: 600 },
    { x: 1040, y: 90, r: -10, z: 1, w: 560 },
  ][i];
  return `<img src="${n}.png" style="left:${pos.x}px;top:${pos.y}px;width:${pos.w}px;z-index:${pos.z};transform:perspective(1800px) rotateY(${pos.r}deg)">`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;background:radial-gradient(ellipse at 50% 30%,#1b2a4a 0%,#0b1020 60%,#05070f 100%);width:1600px;height:430px;overflow:hidden;position:relative}
img{position:absolute;border-radius:14px;box-shadow:0 30px 70px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.12)}
</style>${cards}`;
const collage = `${OUT}/.collage.html`;
writeFileSync(collage, html);
const cp = await browser.newPage({ viewport: { width: 1600, height: 430 } });
await cp.goto(pathToFileURL(collage).href);
await cp.waitForTimeout(500);
await shot('hero', cp);
rmSync(collage);

await browser.close();
console.log('Screenshots written to', OUT);
