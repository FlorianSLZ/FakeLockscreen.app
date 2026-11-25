// Generates public/og/*.png (1200x630) from original SVG artwork. Run locally: npm run og
// The PNGs are committed, so the deploy build does not depend on system fonts.
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

mkdirSync('public/og', { recursive: true });
const W = 1200, H = 630;

// Official wallpapers (local webp) as cover-cropped backgrounds; resvg cannot read webp, so convert to jpeg data URIs.
const wp = async (file) => 'data:image/jpeg;base64,' + (await sharp('public/wallpapers/' + file).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 }).toBuffer()).toString('base64');
const bgImg = (uri) => `<image href="${uri}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>`;
const bg = { win10: await wp('w10-bg.webp'), win11: await wp('w11-bg.webp'), macos: await wp('mac-bg.webp') };

const blob = (cx, cy, r, color, op = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}" filter="url(#b)"/>`;
const defs = `<defs>
  <filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".62"/><stop offset=".62" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
</defs>`;

const face = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffc83d"/><circle cx="${cx - r * .32}" cy="${cy - r * .15}" r="${r * .1}" fill="#5a3a00"/><circle cx="${cx + r * .32}" cy="${cy - r * .15}" r="${r * .1}" fill="#5a3a00"/><path d="M${cx - r * .42} ${cy + r * .2} Q${cx} ${cy + r * .62} ${cx + r * .42} ${cy + r * .2}" fill="none" stroke="#5a3a00" stroke-width="${r * .1}" stroke-linecap="round"/>`;

const art = {
  home: `<rect width="${W}" height="${H}" fill="#0b0d14"/>
    ${[['2001', 'xp'], ['2007', 'winvista'], ['2009', 'win7'], ['2012', 'win8'], ['2013', 'win81'], ['2015', 'win10'], ['2021', 'win11'], ['2024', 'macos']].map(([y, k], i) => {
      const x = 722 + i * 59, top = 90 + (i % 2) * 36;
      const fill = k === 'xp' ? '<rect width="84" height="500" fill="#3f6bd8"/><rect width="84" height="60" fill="#00309c"/><rect y="450" width="84" height="60" fill="#003399"/>'
        : k === 'winvista' ? '<rect width="84" height="500" fill="#06382c"/><circle cx="20" cy="520" r="150" fill="#46e6a0" opacity=".7"/><circle cx="100" cy="500" r="140" fill="#28aac8" opacity=".6"/>'
        : k === 'win8' ? '<rect width="84" height="500" fill="#1d6fd1"/><circle cx="10" cy="540" r="170" fill="#5fd0ff" opacity=".8"/>'
        : k === 'win81' ? '<rect width="84" height="500" fill="#2b7fa8"/><ellipse cx="42" cy="560" rx="120" ry="160" fill="#5fd0ff" opacity=".5"/>'
        : k === 'win7' ? '<rect width="84" height="500" fill="#0b4a78"/><circle cx="20" cy="520" r="150" fill="#2bd9c0" opacity=".8"/><circle cx="100" cy="500" r="140" fill="#4a8dff" opacity=".7"/>'
        : `<image href="${bg[k]}" x="-300" y="-60" width="1000" height="630" preserveAspectRatio="xMidYMid slice"/>`;
      return `<g transform="translate(${x} ${top}) scale(.66)"><clipPath id="c${i}"><rect width="84" height="500" rx="18"/></clipPath><g clip-path="url(#c${i})">${fill}</g><rect y="445" width="84" height="38" rx="19" fill="#fff" opacity=".92"/><text x="42" y="469" font-size="20" font-weight="700" fill="#0b0d14" text-anchor="middle">${y}</text></g>`;
    }).join('')}`,
  xp: `<rect width="${W}" height="${H}" fill="#5a7edc"/><rect width="${W}" height="135" fill="#00309c"/><rect y="133" width="${W}" height="5" fill="#f99b3d"/><rect y="${H - 80}" width="${W}" height="80" fill="#003399"/><rect y="${H - 82}" width="${W}" height="5" fill="#f99b3d"/>
    <rect x="800" y="190" width="150" height="150" rx="14" fill="#f2b84c" stroke="#e8eefc" stroke-width="6"/>${face(875, 265, 52)}<text x="975" y="288" font-size="46" font-weight="700" fill="#fff">User</text>
    <rect x="760" y="150" width="3" height="250" fill="#fff" opacity=".6"/>`,
  winvista: `<rect width="${W}" height="${H}" fill="#06382c"/>${blob(150, 650, 330, '#46e6a0', .9)}${blob(1050, 640, 330, '#28aac8', .8)}${blob(600, 0, 260, '#cfffe8', .3)}
    <rect x="808" y="130" width="170" height="170" rx="14" fill="#c8f5e6" stroke="#fff" stroke-opacity=".7" stroke-width="8"/>${face(893, 215, 62)}
    <rect x="770" y="350" width="250" height="40" rx="4" fill="#fff"/><rect x="986" y="350" width="34" height="40" fill="#2fa844"/>`,
  win8: `<rect width="${W}" height="${H}" fill="#0b3a8c"/>${blob(150, 700, 380, '#5fd0ff', .9)}${blob(1100, 0, 300, '#fff', .25)}
    <text x="700" y="520" font-size="120" font-weight="200" fill="#fff">12:30</text>`,
  win81: `<rect width="${W}" height="${H}" fill="#16405f"/>${blob(200, 720, 420, '#5fd0ff', .7)}${blob(1100, 60, 260, '#fff', .2)}
    <text x="700" y="520" font-size="120" font-weight="300" fill="#fff">12:30</text>`,
  win7: `<rect width="${W}" height="${H}" fill="#0b4a78"/>${blob(150, 650, 330, '#2bd9c0', .95)}${blob(1050, 640, 330, '#4a8dff', .9)}${blob(600, 0, 260, '#bff', .35)}
    <rect x="808" y="130" width="170" height="170" rx="14" fill="#cfe8fb" stroke="#fff" stroke-opacity=".7" stroke-width="8"/>${face(893, 215, 62)}
    <rect x="770" y="350" width="250" height="40" rx="4" fill="#fff"/><rect x="986" y="350" width="34" height="40" fill="#2b8fd8"/>`,
  win10: `${bgImg(bg.win10)}
    <text x="700" y="520" font-size="110" font-weight="300" fill="#fff" opacity=".95">12:30</text>`,
  win11: `${bgImg(bg.win11)}
    <text x="900" y="200" font-size="150" font-weight="700" fill="#fff" text-anchor="middle" opacity=".95">12:30</text><text x="900" y="255" font-size="34" fill="#fff" text-anchor="middle" opacity=".85">Monday</text>`,
  macos: `${bgImg(bg.macos)}
    <text x="900" y="220" font-size="170" font-weight="700" fill="#fff" text-anchor="middle">9:41</text><circle cx="900" cy="400" r="52" fill="#fff" opacity=".28"/><rect x="800" y="480" width="200" height="38" rx="19" fill="#fff" opacity=".3"/>`,
  awareness: `<rect width="${W}" height="${H}" fill="#08201c"/>${blob(900, 250, 280, '#4be3a0', .55)}${blob(1050, 520, 200, '#38d6c5', .4)}
    <g transform="translate(790 150)"><rect width="120" height="110" rx="20" y="70" fill="#4be3a0"/><path d="M25 70V50a35 35 0 0 1 70 0v20" fill="none" stroke="#4be3a0" stroke-width="16" stroke-linecap="round"/></g>
    <g font-weight="700" font-size="44"><rect x="760" y="400" width="120" height="76" rx="14" fill="#fff"/><text x="820" y="452" text-anchor="middle" fill="#0b3b2a">Win</text><text x="905" y="452" fill="#fff" font-size="40">+</text><rect x="940" y="400" width="86" height="76" rx="14" fill="#fff"/><text x="983" y="452" text-anchor="middle" fill="#0b3b2a">L</text></g>`,
};

const copy = {
  home: ['Travel through', 'lock screen history', 'XP to 11 and macOS in your browser'],
  xp: ['Windows XP', 'lock screen', 'The blue welcome screen. Fake lock screen prank.'],
  winvista: ['Windows Vista', 'lock screen', 'Glassy Aero tile, green arrow, Aurora glow.'],
  win8: ['Windows 8', 'lock screen', 'Huge Metro clock and a slide-up sign-in.'],
  win81: ['Windows 8.1', 'lock screen', 'Metro refined: waves, clock and sign-in.'],
  win7: ['Windows 7', 'lock screen', 'Aurora glow and the little arrow button.'],
  win10: ['Windows 10', 'lock screen', 'Big clock, slide-up sign-in, harmless prank.'],
  win11: ['Windows 11', 'lock screen', 'Centred clock and blurred Fluent sign-in.'],
  macos: ['Mac lock screen', 'prank', 'A calm blurred wallpaper and a password pill.'],
  awareness: ['Lock your PC', 'awareness tool', 'Friendly fake lock screen links and an A4 desk card.'],
};

for (const [slug, [l1, l2, sub]] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Segoe UI, Arial, sans-serif">
  ${defs}${art[slug]}<rect width="${W}" height="${H}" fill="url(#shade)"/>
  <g transform="translate(70 70)" fill="#fff"><rect x="2" y="16" width="28" height="20" rx="5"/><path d="M8 16v-5a8 8 0 0 1 16 0v5" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><text x="46" y="34" font-size="30" font-weight="600">fakelockscreen<tspan fill="#8fb8ff">.app</tspan></text></g>
  <text x="70" y="330" font-size="${slug === 'home' ? 68 : 92}" font-weight="800" fill="#fff" letter-spacing="-2">${l1}</text>
  <text x="70" y="425" font-size="${slug === 'home' ? 68 : 92}" font-weight="800" fill="#fff" letter-spacing="-2">${l2}</text>
  <text x="70" y="500" font-size="34" fill="#fff" opacity=".88">${sub}</text>
  <text x="70" y="580" font-size="24" fill="#fff" opacity=".7">Not affiliated with Microsoft or Apple. Nothing is installed or captured.</text>
  </svg>`;
  const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' } }).render().asPng();
  writeFileSync(`public/og/${slug}.png`, png);
  console.log('og', slug, png.length);
}
