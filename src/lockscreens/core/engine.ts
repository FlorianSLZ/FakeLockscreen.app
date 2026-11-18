import { decode, type LockConfig, type Lang } from '../../lib/config-codec';
import { buildReveal } from './reveal';

export interface Hooks {
  /** Called with the number of typed characters. Never the characters themselves. */
  onDots(count: number): void;
  /** Called after Enter. attempt = wrong attempts so far. */
  onWrong(attempt: number): void;
  onStart(): void;
  onStop(): void;
}

export interface Lock {
  cfg: LockConfig;
  /** The OS screen calls this when its password field is visible. */
  setInputActive(active: boolean): void;
  reset(): void;
}

const ESC_HOLD_MS = 2000;
const IDLE_MS = 3000;

export function createLock(hooks: Hooks): Lock {
  const root = document.documentElement;
  const gate = document.getElementById('gate') as HTMLElement;
  const stage = document.getElementById('stage') as HTMLElement;
  const startBtn = document.getElementById('start') as HTMLButtonElement;
  const escRing = document.getElementById('esc-ring') as HTMLElement;
  const cfg = decode(location.hash, (root.lang as Lang) || 'en');

  // Only a count is kept. Typed characters are never read into a variable.
  let len = 0;
  let attempts = 0;
  let running = false;
  let inputActive = false;
  let revealEl: HTMLElement | null = null;
  let escTimer = 0;
  let idleTimer = 0;
  let autoTimer = 0;
  let wrongTimer = 0;

  // Keep the display awake while the fake lock screen runs (Screen Wake Lock API, no network).
  let wakeLock: WakeLockSentinel | null = null;
  const acquireWake = () => {
    if (!running || wakeLock || document.visibilityState !== 'visible') return;
    navigator.wakeLock?.request('screen').then(
      (s) => {
        if (!running) { s.release().catch(() => {}); return; }
        wakeLock = s;
        s.addEventListener('release', () => { if (wakeLock === s) wakeLock = null; });
      },
      () => {},
    );
  };
  const releaseWake = () => {
    wakeLock?.release().catch(() => {});
    wakeLock = null;
  };
  // The browser drops the lock when the tab is hidden; take it again on return.
  document.addEventListener('visibilitychange', acquireWake);

  const setDots = (n: number) => {
    len = Math.max(0, n);
    hooks.onDots(len);
  };

  function showReveal() {
    if (!cfg.reveal || revealEl) return;
    inputActive = false;
    revealEl = buildReveal(cfg, stop);
    document.body.append(revealEl);
    root.classList.remove('idle');
  }

  function start() {
    running = true;
    attempts = 0;
    gate.hidden = true;
    stage.hidden = false;
    document.body.classList.add('running');
    setDots(0);
    hooks.onStart();
    if (!document.fullscreenElement) root.requestFullscreen?.().catch(() => {});
    acquireWake();
    if (cfg.autoReveal > 0) autoTimer = window.setTimeout(showReveal, cfg.autoReveal * 1000);
    bumpIdle();
  }

  function stop() {
    if (!running) return;
    running = false;
    clearTimeout(autoTimer);
    clearTimeout(idleTimer);
    clearTimeout(wrongTimer);
    clearTimeout(escTimer);
    escTimer = 0;
    releaseWake();
    escRing.classList.remove('on');
    revealEl?.remove();
    revealEl = null;
    inputActive = false;
    setDots(0);
    hooks.onStop();
    root.classList.remove('idle');
    document.body.classList.remove('running');
    stage.hidden = true;
    gate.hidden = false;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    startBtn.focus();
  }

  function bumpIdle() {
    root.classList.remove('idle');
    clearTimeout(idleTimer);
    if (running && !revealEl) idleTimer = window.setTimeout(() => root.classList.add('idle'), IDLE_MS);
  }

  startBtn.addEventListener('click', start);
  window.addEventListener('mousemove', () => running && bumpIdle());
  window.addEventListener('mousedown', () => running && bumpIdle());

  // Leaving fullscreen through the browser always ends the session.
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && running) stop();
  });

  window.addEventListener('keydown', (e) => {
    if (!running) return;
    bumpIdle();

    // Hold ESC for 2 seconds: always exit.
    if (e.key === 'Escape') {
      if (!escTimer) {
        escRing.classList.add('on');
        escTimer = window.setTimeout(() => {
          escTimer = 0;
          stop();
        }, ESC_HOLD_MS);
      }
      return;
    }

    if (!inputActive || revealEl) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      attempts++;
      setDots(0);
      hooks.onWrong(attempts);
      if (attempts >= cfg.attempts) wrongTimer = window.setTimeout(showReveal, 900);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      setDots(len - 1);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setDots(len + 1);
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && escTimer) {
      clearTimeout(escTimer);
      escTimer = 0;
      escRing.classList.remove('on');
    }
  });

  window.addEventListener('blur', () => {
    clearTimeout(escTimer);
    escTimer = 0;
    escRing.classList.remove('on');
  });

  return {
    cfg,
    setInputActive: (a) => (inputActive = a),
    reset: () => setDots(0),
  };
}

export interface ClockParts {
  time: string;
  date: string; // weekday, day, month
  longDate: string;
  weekday: string;
  dayMonth: string;
}

/** Live clock helper. Locale-aware, no network. */
export function startClock(cfg: LockConfig, onTick: (p: ClockParts) => void) {
  const loc = cfg.lang === 'de' ? 'de-CH' : navigator.language || 'en';
  const timeFmt = new Intl.DateTimeFormat(loc, { hour: 'numeric', minute: '2-digit' });
  // Big clocks never show AM/PM, like the real thing.
  const time = { format: (d: Date) => timeFmt.formatToParts(d).filter((p) => p.type !== 'dayPeriod').map((p) => p.value).join('').trim() };
  const date = new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  const weekday = new Intl.DateTimeFormat(loc, { weekday: 'long' });
  const dayMonth = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long' });
  const longDate = new Intl.DateTimeFormat(loc, { dateStyle: 'full' });
  const tick = () => {
    const d = new Date();
    onTick({
      time: time.format(d),
      date: date.format(d),
      longDate: longDate.format(d),
      weekday: weekday.format(d),
      dayMonth: dayMonth.format(d),
    });
  };
  tick();
  return window.setInterval(tick, 1000);
}

/** Small friendly toast for decorative buttons. */
let toastTimer = 0;
export function toast(text: string) {
  document.querySelector('.lock-toast')?.remove();
  const n = document.createElement('div');
  n.className = 'lock-toast';
  n.setAttribute('role', 'status');
  n.textContent = text;
  document.body.append(n);
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => n.remove(), 3200);
}

/**
 * "Wrong password" message that must be dismissed with OK, Enter or Space.
 * While it is open, typing is paused (input inactive).
 */
export function createMessage(lock: Lock, box: HTMLElement, ok: HTMLElement, after?: () => void) {
  let open = false;
  const hide = () => {
    if (!open) return;
    open = false;
    box.hidden = true;
    lock.setInputActive(true);
    after?.();
  };
  const show = () => {
    open = true;
    lock.setInputActive(false);
    box.hidden = false;
    ok.focus({ preventScroll: true });
  };
  ok.addEventListener('click', hide);
  window.addEventListener('keydown', (e) => {
    if (open && !e.defaultPrevented && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      hide();
    }
  });
  return { show, hide, reset: () => { open = false; box.hidden = true; }, isOpen: () => open };
}
