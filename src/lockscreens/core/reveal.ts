import { t } from '../../i18n/strings';
import type { LockConfig } from '../../lib/config-codec';

export function detectOS(): 'mac' | 'win' {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const p = (nav.userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  return /mac|iphone|ipad/.test(p) ? 'mac' : 'win';
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text; // textContent only: config text is never parsed as HTML
  return n;
};

/** Builds the friendly awareness reveal. Returns the overlay element. */
export function buildReveal(cfg: LockConfig, onClose: () => void, opts: { preview?: boolean } = {}): HTMLElement {
  const s = t(cfg.lang).reveal;
  const os = detectOS();

  const root = el('div', 'reveal');
  root.setAttribute('role', 'dialog');
  if (!opts.preview) root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', 'reveal-h');

  const card = el('div', 'reveal-card');
  const icon = el('div', 'reveal-icon', '🔒');
  icon.setAttribute('aria-hidden', 'true');
  const h = el('h2', undefined, cfg.company ? s.headlineCompany(cfg.company) : s.headline);
  h.id = 'reveal-h';
  card.append(icon, h);

  card.append(el('p', 'reveal-lead', s.next));

  const keys = el('div', 'reveal-keys');
  const primary = os === 'mac' ? [s.macLabel, s.macKeys] : [s.winLabel, s.winKeys];
  const other = os === 'mac' ? [s.winLabel, s.winKeys] : [s.macLabel, s.macKeys];
  for (const [i, [label, combo]] of [primary, other].entries()) {
    const row = el('div', i === 0 ? 'key-row primary' : 'key-row');
    row.append(el('span', 'key-os', label));
    const kbd = el('span', 'key-combo');
    combo.split(' + ').forEach((k, j) => {
      if (j) kbd.append(el('span', 'plus', '+'));
      kbd.append(el('kbd', undefined, k));
    });
    row.append(kbd);
    keys.append(row);
  }
  card.append(keys);

  if (cfg.message) card.append(el('p', 'reveal-msg', cfg.message));
  card.append(el('p', undefined, s.why));
  card.append(el('p', 'reveal-soft', s.nobody));

  if (cfg.policy) {
    const a = el('a', 'reveal-link', s.policy);
    a.href = cfg.policy;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    card.append(a);
  }

  const details = el('details', 'reveal-tip');
  details.append(el('summary', undefined, s.tip), el('p', undefined, s.tipWin), el('p', undefined, s.tipMac));
  card.append(details);

  const close = el('button', 'reveal-close', s.close);
  close.type = 'button';
  close.addEventListener('click', onClose);
  card.append(close);

  root.append(card);
  if (!opts.preview) queueMicrotask(() => close.focus());
  return root;
}
