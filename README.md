# fakelockscreen.app

Retro and modern OS lock screens in the browser (Windows XP, 7, 10, 11, macOS) as a harmless prank and as a security awareness tool ("lock your PC"). Static site, no backend, no tracking.

Not affiliated with Microsoft or Apple. All artwork is original (CSS and SVG). No official logos, wallpapers, sounds or fonts.

## Stack

- [Astro](https://astro.build) + TypeScript, static output, no UI framework
- Vanilla TS for the lock screen engine
- Playwright (+ axe) for tests
- Cloudflare Workers with static assets, deployed by Workers Builds on every push to `main`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm test` | Build, preview and run all Playwright tests |
| `npm run og` | Regenerate `public/og/*.png` (needs a local font such as Segoe UI; the PNGs are committed) |

## Structure

```
src/pages/            thin routes (EN at /, DE under /de)
src/views/            one view per page, takes a `lang` prop
src/layouts/          Base (normal pages) and Lock (fullscreen lock screens with start gate)
src/lockscreens/      core engine + one folder of CSS per OS
src/i18n/             strings (EN, DE with Swiss spelling, never the sharp s)
src/lib/config-codec  share link config, stored in the URL hash only
public/_headers       CSP and security headers (lock screens: connect-src 'none')
public/.well-known/   security.txt (renew the Expires date once a year)
```

## Safety rules that the tests enforce

- Lock screens have no `input`, `form` or `textarea`. Typed characters are only counted, never stored.
- Zero network requests after a lock screen has loaded (EN and DE, all five OS screens).
- All scripts are external same-origin files, so the CSP can use `script-src 'self'`.
- Holding ESC for 2 seconds always exits. The Keyboard Lock API is never used.
- Config from share links is sanitised: text is rendered with `textContent`, only `http(s)` policy links are accepted.
- The sharp s never appears in the source or the built pages.

## Deploy (Cloudflare Workers Builds)

1. Workers & Pages, Create, Import a repository, pick this repo.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. Production branch: `main`.
3. Worker name must match `name` in `wrangler.jsonc` (`fakelockscreen-app`).
4. Add the custom domain under Settings, Domains & Routes.

After the first deploy, check `https://fakelockscreen.app/xp` with `curl -I`: the `content-security-policy` header must contain `connect-src 'none'`.

## Awareness links

Settings (company, message, policy URL, attempts, language, OS) are base64url JSON in the URL hash (`#c=...`). Browsers never send the hash to a server. Build links at `/awareness`; the printable A4 desk card is at `/awareness/card`.
