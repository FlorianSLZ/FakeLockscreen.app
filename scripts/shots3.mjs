import { chromium } from '@playwright/test';
const b = await chromium.launch();
const base = 'http://localhost:4321';
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const go = async (slug, hash = '') => { await p.goto(`${base}/${slug}${hash}`); await p.locator('#start').click(); await p.waitForTimeout(1200); };
// win7
await go('win7'); await p.screenshot({ path: 'screenshots/m3-win7.png' });
await p.keyboard.type('hunter2'); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
await p.screenshot({ path: 'screenshots/m3-win7-wrong.png' });
// win10
await go('win10'); await p.screenshot({ path: 'screenshots/m3-win10-lock.png' });
await p.keyboard.press('a'); await p.waitForTimeout(900); await p.keyboard.type('hunter2');
await p.screenshot({ path: 'screenshots/m3-win10-signin.png' });
await p.keyboard.press('Enter'); await p.waitForTimeout(400);
await p.screenshot({ path: 'screenshots/m3-win10-wrong.png' });
// win11
await go('win11', '#c=' + Buffer.from(JSON.stringify({ name: 'Alex', avatar: 'AS', wallpaper: 2 })).toString('base64url')); await p.screenshot({ path: 'screenshots/m3-win11-lock.png' });
await p.keyboard.press('a'); await p.waitForTimeout(1100); await p.keyboard.type('abcd');
await p.screenshot({ path: 'screenshots/m3-win11-signin.png' });
// mac
await go('macos'); await p.keyboard.type('hunter2');
await p.screenshot({ path: 'screenshots/m3-macos.png' });
await go('de/macos', '#c=' + Buffer.from(JSON.stringify({ name: 'Florian', wallpaper: 1 })).toString('base64url'));
await p.screenshot({ path: 'screenshots/m3-macos-de-blue.png' });
await b.close();
