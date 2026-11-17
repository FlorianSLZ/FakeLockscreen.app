// Share-link config. Lives in the URL hash, so it is never sent to any server.
export type Lang = 'en' | 'de';

export interface LockConfig {
  name: string;
  avatar: string; // emoji or up to 2 initials
  attempts: number; // wrong passwords before the reveal
  autoReveal: number; // seconds, 0 = off
  lang: Lang;
  company: string;
  message: string;
  policy: string; // http(s) URL or ''
  reveal: boolean; // show the friendly reveal (default on)
}

export const defaults: LockConfig = {
  name: 'User',
  avatar: '🙂',
  attempts: 3,
  autoReveal: 0,
  lang: 'en',
  company: '',
  message: '',
  policy: '',
  reveal: true,
};

const clampStr = (v: unknown, max: number, fallback: string) =>
  typeof v === 'string' ? v.slice(0, max) : fallback;
const clampNum = (v: unknown, min: number, max: number, fallback: number) =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;

export function sanitize(raw: Partial<Record<keyof LockConfig, unknown>>, fallbackLang: Lang): LockConfig {
  const policy = clampStr(raw.policy, 300, '');
  return {
    name: clampStr(raw.name, 32, defaults.name) || defaults.name,
    avatar: clampStr(raw.avatar, 8, defaults.avatar) || defaults.avatar,
    attempts: clampNum(raw.attempts, 1, 10, defaults.attempts),
    autoReveal: clampNum(raw.autoReveal, 0, 3600, 0),
    lang: raw.lang === 'de' || raw.lang === 'en' ? raw.lang : fallbackLang,
    company: clampStr(raw.company, 60, ''),
    message: clampStr(raw.message, 400, ''),
    policy: /^https?:\/\//i.test(policy) ? policy : '',
    reveal: raw.reveal !== false,
  };
}

export function encode(cfg: Partial<LockConfig>): string {
  const bytes = new TextEncoder().encode(JSON.stringify(cfg));
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decode(hash: string, fallbackLang: Lang = 'en'): LockConfig {
  const m = /(?:^#|&)c=([A-Za-z0-9_-]+)/.exec(hash);
  if (!m) return sanitize({}, fallbackLang);
  try {
    const b64 = m[1].replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const json = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
    return sanitize(JSON.parse(json), fallbackLang);
  } catch {
    return sanitize({}, fallbackLang);
  }
}
