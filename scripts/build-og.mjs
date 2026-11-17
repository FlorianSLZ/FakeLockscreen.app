// Generates public/og/*.png (1200x630) from original SVG artwork. Run locally: npm run og
// The PNGs are committed, so the deploy build does not depend on system fonts.
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('public/og', { recursive: true });
const W = 1200, H = 630;

const blob = (cx, cy, r, color, op = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}" filter="url(#b)"/>`;
const defs = `<defs>
  <filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".62"/><stop offset=".62" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
</defs>`;

const face = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffc83d"/><circle cx="${cx - r * .32}" cy="${cy - r * .15}" r="${r * .1}" fill="#5a3a00"/><circle cx="${cx + r * .32}" cy="${cy - r * .15}" r="${r * .1}" fill="#5a3a00"/><path d="M${cx - r * .42} ${cy + r * .2} Q${cx} ${cy + r * .62} ${cx + r * .42} ${cy + r * .2}" fill="none" stroke="#5a3a00" stroke-width="${r * .1}" stroke-linecap="round"/>`;

const art = {
  home: `<rect width="${W}" height="${H}" fill="#0b0d14"/>${blob(900, 200, 260, '#3b6fff', .55)}${blob(1000, 480, 240, '#a78bfa', .45)}${blob(700, 560, 200, '#ff7a90', .35)}
    ${[['2001', '#4d8bff'], ['2009', '#38d6c5'], ['2015', '#2ea0ff'], ['2021', '#a78bfa'], ['2024', '#ff7a90']].map(([y, c], i) => `<g transform="translate(${900 + (i % 2) * 40}, ${70 + i * 105})"><rect width="${170 + (i % 2) * 20}" height="72" rx="36" fill="${c}" opacity=".9"/><text x="${(170 + (i % 2) * 20) / 2}" y="49" font-size="34" font-weight="700" fill="#06101f" text-anchor="middle">${y}</text></g>`).join('')}`,
  xp: `<rect width="${W}" height="${H}" fill="#5a7edc"/><rect width="${W}" height="135" fill="#00309c"/><rect y="133" width="${W}" height="5" fill="#f99b3d"/><rect y="${H - 80}" width="${W}" height="80" fill="#003399"/><rect y="${H - 82}" width="${W}" height="5" fill="#f99b3d"/>
    <rect x="800" y="190" width="150" height="150" rx="14" fill="#f2b84c" stroke="#e8eefc" stroke-width="6"/>${face(875, 265, 52)}<text x="975" y="288" font-size="46" font-weight="700" fill="#fff">User</text>
    <rect x="760" y="150" width="3" height="250" fill="#fff" opacity=".6"/>`,
  win7: `<rect width="${W}" height="${H}" fill="#0b4a78"/>${blob(150, 650, 330, '#2bd9c0', .95)}${blob(1050, 640, 330, '#4a8dff', .9)}${blob(600, 0, 260, '#bff', .35)}
    <rect x="808" y="130" width="170" height="170" rx="14" fill="#cfe8fb" stroke="#fff" stroke-opacity=".7" stroke-width="8"/>${face(893, 215, 62)}
    <rect x="770" y="350" width="250" height="40" rx="4" fill="#fff"/><rect x="986" y="350" width="34" height="40" fill="#2b8fd8"/>`,
  win10: `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16264a"/><stop offset=".6" stop-color="#4a6f9c"/><stop offset=".85" stop-color="#e0956c"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sky)"/>
    <polygon points="450,630 800,230 880,330 980,250 1200,630" fill="#1f3550"/><polygon points="700,630 1000,330 1090,420 1200,360 1200,630" fill="#172a40"/><rect y="560" width="${W}" height="70" fill="#0e1927"/>
    <text x="700" y="520" font-size="110" font-weight="300" fill="#fff" opacity=".95">12:30</text>`,
  win11: `<rect width="${W}" height="${H}" fill="#0a0f2e"/>${blob(780, 520, 250, '#3f7dff', .9)}${blob(980, 470, 210, '#be50ff', .75)}${blob(620, 560, 200, '#28dce6', .6)}
    <text x="900" y="200" font-size="150" font-weight="700" fill="#fff" text-anchor="middle" opacity=".95">12:30</text><text x="900" y="255" font-size="34" fill="#fff" text-anchor="middle" opacity=".85">Monday</text>`,
  macos: `<rect width="${W}" height="${H}" fill="#3b2a7a"/>${blob(250, 320, 330, '#ff9a6b', .9)}${blob(1000, 100, 320, '#c24b8f', .9)}${blob(700, 700, 260, '#ffcf7a', .6)}
    <text x="900" y="220" font-size="170" font-weight="700" fill="#fff" text-anchor="middle">9:41</text><circle cx="900" cy="400" r="52" fill="#fff" opacity=".28"/><rect x="800" y="480" width="200" height="38" rx="19" fill="#fff" opacity=".3"/>`,
  awareness: `<rect width="${W}" height="${H}" fill="#08201c"/>${blob(900, 250, 280, '#4be3a0', .55)}${blob(1050, 520, 200, '#38d6c5', .4)}
    <g transform="translate(790 150)"><rect width="120" height="110" rx="20" y="70" fill="#4be3a0"/><path d="M25 70V50a35 35 0 0 1 70 0v20" fill="none" stroke="#4be3a0" stroke-width="16" stroke-linecap="round"/></g>
    <g font-weight="700" font-size="44"><rect x="760" y="400" width="120" height="76" rx="14" fill="#fff"/><text x="820" y="452" text-anchor="middle" fill="#0b3b2a">Win</text><text x="905" y="452" fill="#fff" font-size="40">+</text><rect x="940" y="400" width="86" height="76" rx="14" fill="#fff"/><text x="983" y="452" text-anchor="middle" fill="#0b3b2a">L</text></g>`,
};

const copy = {
  home: ['Travel through', 'lock screen history', 'XP, 7, 10, 11 and macOS in your browser'],
  xp: ['Windows XP', 'lock screen', 'The blue welcome screen. Fake lock screen prank.'],
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
  <text x="70" y="330" font-size="${slug === 'home' ? 80 : 92}" font-weight="800" fill="#fff" letter-spacing="-2">${l1}</text>
  <text x="70" y="425" font-size="${slug === 'home' ? 80 : 92}" font-weight="800" fill="#fff" letter-spacing="-2">${l2}</text>
  <text x="70" y="500" font-size="34" fill="#fff" opacity=".88">${sub}</text>
  <text x="70" y="580" font-size="24" fill="#fff" opacity=".7">Not affiliated with Microsoft or Apple. Nothing is installed or captured.</text>
  </svg>`;
  const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' } }).render().asPng();
  writeFileSync(`public/og/${slug}.png`, png);
  console.log('og', slug, png.length);
}
