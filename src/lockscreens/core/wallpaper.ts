import { t, type Lang } from '../../i18n/strings';

const MAX_BYTES = 25 * 1024 * 1024;
const MAX_SIDE = 2560;
const TYPES = /^image\/(jpeg|png|webp|avif)$/;

/**
 * "Use my own wallpaper": the file never leaves the browser.
 * The picker is created on click and is not part of the page, so the lock screens keep having zero form elements.
 * The image is downscaled on a canvas (this also drops metadata) and shown through a temporary blob URL.
 */
export function initWallpaper() {
  const btn = document.getElementById('wp-btn') as HTMLButtonElement | null;
  if (!btn) return;
  const clear = document.getElementById('wp-clear') as HTMLButtonElement;
  const status = document.getElementById('wp-status') as HTMLElement;
  const root = document.documentElement;
  const s = t((root.lang === 'de' ? 'de' : 'en') as Lang).lock;
  let current: string | null = null;

  const say = (text: string, error = false) => {
    status.textContent = text;
    status.classList.toggle('err', error);
  };

  function setWallpaper(url: string | null) {
    if (current) URL.revokeObjectURL(current);
    current = url;
    if (url) {
      root.style.setProperty('--custom-wp', `url("${url}")`);
      root.classList.add('has-custom-wp');
      clear.hidden = false;
      say(s.wpActive);
    } else {
      root.style.removeProperty('--custom-wp');
      root.classList.remove('has-custom-wp');
      clear.hidden = true;
      say('');
    }
  }

  async function apply(file: File) {
    if (!TYPES.test(file.type) || file.size > MAX_BYTES) return say(s.wpError, true);
    try {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bmp.width * scale));
      canvas.height = Math.max(1, Math.round(bmp.height * scale));
      canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      bmp.close();
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
      if (!blob) return say(s.wpError, true);
      setWallpaper(URL.createObjectURL(blob));
    } catch {
      say(s.wpError, true);
    }
  }

  btn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp,image/avif';
    input.addEventListener('change', () => {
      const f = input.files?.[0];
      if (f) void apply(f);
    });
    input.click();
  });
  clear.addEventListener('click', () => setWallpaper(null));
}
