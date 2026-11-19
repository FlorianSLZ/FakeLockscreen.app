import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
const p = { kill(){} };

const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1600, height: 900 } });
for (const os of ['xp','win7','win10','win11','macos']) {
  await pg.goto('http://localhost:4321/' + os); await pg.click('#start').catch(()=>{});
  await pg.waitForTimeout(1200);
  await pg.screenshot({ path: `screenshots/o-${os}.png` });
  await pg.keyboard.press('a'); await pg.waitForTimeout(1200);
  await pg.screenshot({ path: `screenshots/o-${os}-in.png` });
}
await b.close(); p.kill(); process.exit(0);
