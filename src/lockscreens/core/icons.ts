// Small original line icons (inline SVG strings). Static, trusted content only.
const svg = (inner: string, s = 20) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const icons = {
  power: svg('<path d="M12 3v8"/><path d="M6.5 6.8a8 8 0 1 0 11 0"/>'),
  ease: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="1.3"/><path d="M7.5 10.5h9M12 10.5v4.5M9.5 19l2.5-4 2.5 4"/>'),
  network: svg('<path d="M3 9.5a13 13 0 0 1 18 0"/><path d="M6 13a8.5 8.5 0 0 1 12 0"/><path d="M9 16.4a4 4 0 0 1 6 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/>'),
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  eye: svg('<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', 40),
  lock: svg('<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', 18),
};
