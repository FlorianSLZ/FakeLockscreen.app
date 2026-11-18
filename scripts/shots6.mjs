import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
// make an original test image (gradient) in the page, hand it to the chooser
const dataUrl = await p.evaluate(() => { const c = document.createElement('canvas'); c.width = 1600; c.height = 1000; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 1600, 1000); gr.addColorStop(0, '#0f2027'); gr.addColorStop(.5, '#2c5364'); gr.addColorStop(1, '#f7971e'); g.fillStyle = gr; g.fillRect(0, 0, 1600, 1000); return c.toDataURL('image/png'); });
const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
await p.goto('http://localhost:4321/win11');
await p.screenshot({ path: 'screenshots/m6-gate.png' });
const ch = p.waitForEvent('filechooser'); await p.locator('#wp-btn').click(); await (await ch).setFiles({ name: 'mine.png', mimeType: 'image/png', buffer });
await p.waitForTimeout(500); await p.screenshot({ path: 'screenshots/m6-gate-active.png' });
await p.locator('#start').click(); await p.waitForTimeout(900); await p.screenshot({ path: 'screenshots/m6-win11-custom-lock.png' });
await p.keyboard.press('a'); await p.waitForTimeout(1200); await p.keyboard.type('abc'); await p.screenshot({ path: 'screenshots/m6-win11-custom-signin.png' });
await b.close();
