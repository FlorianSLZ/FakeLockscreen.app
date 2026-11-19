import { chromium } from '@playwright/test';
const b = await chromium.launch(); let pg = await b.newPage({ viewport: { width: 1600, height: 900 } });
for (const os of ["win11","macos"]) for (const w of [1,2]) { await pg.close(); pg = await b.newPage({ viewport: { width: 1600, height: 900 } });
  await pg.goto(`http://localhost:4321/${os}#c=${Buffer.from(JSON.stringify({wallpaper:w})).toString('base64url')}`);
  await pg.click('#start'); await pg.waitForTimeout(1200); await pg.keyboard.press('a'); await pg.waitForTimeout(1000);
  await pg.screenshot({ path: `screenshots/v-${os}-${w}.png` });
}
await b.close();
