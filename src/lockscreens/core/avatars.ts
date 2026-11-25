// Default account pictures, drawn from scratch as SVG (no official artwork).
// They only show while the awareness config keeps the default avatar; a custom avatar is plain text.
const person = (bg1: string, bg2: string, fg: string) =>
  `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" focusable="false">` +
  `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>` +
  `<rect width="100" height="100" fill="url(#g)"/>` +
  `<circle cx="50" cy="38" r="17" fill="${fg}"/>` +
  `<path d="M16 100c0-22 15-36 34-36s34 14 34 36z" fill="${fg}"/></svg>`;

export const avatars = {
  // Windows 10 and 11: grey circle with a white silhouette.
  win10: person('#9aa3b1', '#6d7686', '#ffffff'),
  win11: person('#9aa3b1', '#6d7686', '#ffffff'),
  // macOS: soft grey with a lighter silhouette.
  macos: person('#d3d6dc', '#a9adb7', '#ffffff'),
  // Windows 7: glassy blue user tile.
  win7: person('#9fd0f5', '#3f86c6', '#ffffff'),
  // Windows Vista: glassy green-blue tile.
  winvista: person('#a9e0d0', '#2f8f86', '#ffffff'),
  // Windows 8 and 8.1: flat Metro tile.
  win8: person('#3a7bd5', '#2a62b0', '#ffffff'),
  win81: person('#8a8f98', '#6a6f78', '#ffffff'),
  // Windows XP: the era's photo tiles were pictures (flower, duck, chess...). Here: a flower.
  xp:
    `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" focusable="false">` +
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc3ff"/><stop offset="1" stop-color="#d7f0ff"/></linearGradient></defs>` +
    `<rect width="100" height="100" fill="url(#sky)"/><rect y="78" width="100" height="22" fill="#6bb04a"/>` +
    `<path d="M50 82V52" stroke="#3b8a2e" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M50 72c-10-2-16-8-17-14 8 0 15 4 17 14zM50 68c9-3 14-9 14-15-8 1-13 6-14 15z" fill="#4fa23b"/>` +
    `<g fill="#ff8a2a"><circle cx="50" cy="26" r="11"/><circle cx="64" cy="36" r="11"/><circle cx="58" cy="52" r="11"/><circle cx="42" cy="52" r="11"/><circle cx="36" cy="36" r="11"/></g>` +
    `<circle cx="50" cy="40" r="9" fill="#ffd23f"/></svg>`,
};

/** Keep the drawn default picture, or show the configured avatar as plain text. */
export function applyAvatar(el: HTMLElement, value: string, defaultValue: string) {
  if (value !== defaultValue) el.textContent = value;
}
