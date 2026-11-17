import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [n, u] of [['safety', '/safety'], ['about-de', '/de/about'], ['404', '/nope']]) { await p.goto('http://localhost:4321' + u); await p.waitForTimeout(300); await p.screenshot({ path: `screenshots/m5-${n}.png`, fullPage: n === 'safety' }); }
await b.close();
