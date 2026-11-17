import { chromium } from '@playwright/test';
const b = await chromium.launch();
const base = 'http://localhost:4321';
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto(base + '/awareness');
await p.fill('#f-company', 'Acme AG'); await p.fill('#f-message', 'Please lock your screen whenever you leave your desk.');
await p.fill('#f-policy', 'https://intranet.example/it-policy'); await p.selectOption('#f-os', 'win10');
await p.waitForTimeout(300);
await p.screenshot({ path: 'screenshots/m4-configurator.png', fullPage: true });
const cfg = Buffer.from(JSON.stringify({ company: 'Muster GmbH', message: 'Bitte sperren Sie Ihren Bildschirm, wenn Sie Ihren Platz verlassen.', policy: 'https://intranet.example/it-richtlinie', lang: 'de' })).toString('base64url');
await p.goto(`${base}/de/awareness/card#c=${cfg}`); await p.waitForTimeout(300);
await p.screenshot({ path: 'screenshots/m4-card-screen.png', fullPage: true });
await p.pdf({ path: 'screenshots/m4-card.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await p.goto(`${base}/de/macos#c=${cfg}`); await p.locator('#start').click(); await p.waitForTimeout(500);
for (let i = 0; i < 3; i++) { await p.keyboard.type('x'); await p.keyboard.press('Enter'); await p.waitForTimeout(250); }
await p.waitForTimeout(1500); await p.screenshot({ path: 'screenshots/m4-reveal-de.png' });
await b.close();
