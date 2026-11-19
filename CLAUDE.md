# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

fakelockscreen.app: a static Astro + TypeScript site (no UI framework, vanilla TS engine) that recreates the lock screens of Windows XP, 7, 10, 11 and macOS in the browser. It is both a harmless prank and an "awareness mode" for IT teams (teaches Win+L / Ctrl+Cmd+Q). Deployed on Cloudflare Workers (static assets, git-connected, auto-deploys on push to `main`).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server on localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm test` | Build, preview (port 4321, reuses a running server) and run all Playwright tests |
| `npx playwright test tests/wallpaper.spec.ts` | One spec file |
| `npx playwright test -g "no network"` | Tests by title |
| `npm run og` | Regenerate `public/og/*.png` (needs a local font such as Segoe UI; PNGs are committed) |

Tests run against the built `dist/`, so a stale preview server serves stale output. There is no linter and no `astro check` (it conflicts with TS 7 peer deps). `screenshots/` is gitignored; `scripts/shots*.mjs` are ad-hoc screenshot helpers.

## Hard rules (enforced by tests; do not break)

- Lock screens contain no `input`, `form` or `textarea`. The password field is visual only; typed characters are only counted (`e.key.length === 1`), never stored, logged or sent.
- Lock screen routes make zero network requests after load. `public/_headers` gives those 10 routes `connect-src 'none'`, and `Lock.astro` repeats it in a meta CSP.
- All scripts are external same-origin files (`vite.build.assetsInlineLimit: 0`) so the CSP can be `script-src 'self'`. Do not add inline scripts or `set:html` scripts (JSON-LD with `type="application/ld+json"` is fine).
- Prefer original CSS/SVG artwork with system font stacks. The owner allows official-looking images if the owner supplies them (e.g. `public/wallpapers/w11-bg.webp`, Win11 default); do not hotlink. The owner has allowed downloading official wallpapers from the web (Win10 `w10-bg.webp`, macOS `mac-bg.webp`); keep them as small local webp files. The user's own images go through the local upload feature.
- Holding ESC for 2 s always exits. Never use the Keyboard Lock API. The Fullscreen API is only called from a user click.
- Every non-fullscreen page has the exact footer text ("Not affiliated with Microsoft or Apple. Harmless browser prank and awareness tool. Nothing is installed, nothing is captured." / German equivalent). Lock screens show it on the start gate (`.gate-footer`).
- `/about`, `/safety`, `/.well-known/security.txt` must exist (renew `Expires` yearly).
- German uses Swiss spelling and never the sharp s (a test greps source and build for it).
- Config text from share links is rendered with `textContent` only; policy links must be http(s).

## Architecture

**Routing and i18n.** `src/pages/` (EN) and `src/pages/de/` (DE) are thin routes that render a view from `src/views/` with a `lang` prop. All copy lives in `src/i18n/` (`strings.ts` main, `lockUi`, `lockSeo`; `awareness.ts`; `pages.ts` for About/Safety). Use `localePath()` / `stripLang()` for links. Adding a page means adding both EN and DE routes, strings, an OG image (`public/og/<slug>.png`) and, for lock screens, a `_headers` block.

**Layouts.** `Base.astro` is the normal page shell (header, footer, hreflang/OG, `era` prop sets `data-era` for the colour tint). `Lock.astro` wraps every OS screen: a start gate (safety info, footer, optional wallpaper picker) that leads to the fullscreen stage.

**Lock screen engine** (`src/lockscreens/core/`). `engine.ts` `createLock(hooks)` owns the state machine: gate to stage, ESC-hold timer, cursor idle hide, `fullscreenchange` exit, wrong-attempt counting, and reveal after N attempts or an auto-reveal timer. It also exports `startClock`, `toast` and `createMessage`. Win10/11 "wake" works by the screen's own keydown listener running after the engine's, so the waking key is not counted. `reveal.ts` builds the awareness reveal overlay (company/message/policy aware, OS-specific shortcut). Per-OS markup is in `src/views/*View.astro` and its CSS in `src/lockscreens/<os>/`; shared gate/ESC/toast styles are in `src/styles/lock-base.css`.

**Awareness mode.** Config is a base64url JSON blob in the URL hash (`#c=...`), never sent to a server. `src/lib/config-codec.ts` (`encode`/`decode`/`sanitize`) clamps lengths and validates everything; always go through it. `AwarenessView` is the configurator with live link and reveal preview; `CardView` is the printable A4 desk card (`cqw` sizing, `@page A4`, `.tight` class for long text).

**Custom wallpaper** (`wallpaper.ts`, Win7/10/11/macOS, not XP). A detached file input is created on click (so the DOM stays form-free), the image is downscaled on a canvas (strips metadata) and applied via the `--custom-wp` CSS var plus `has-custom-wp` on `<html>` from a `blob:` URL. Never uploaded or stored, and not part of share links. CSP `img-src` includes `blob:` for this.

**Landing page.** `Home.astro` uses scroll-driven era tints and `Mini.astro` (CSS mini lock screens sized with container query units). Hero has quick-launch buttons for Win11 and macOS.

**Deploy config.** `wrangler.jsonc` (`html_handling: auto-trailing-slash`, `not_found_handling: 404-page`), Astro `build.format: 'file'` with `trailingSlash: 'never'`. Headers/CSP are in `public/_headers`: the global `/*` rule merges with per-route rules, so the most restrictive wins. Live header behaviour is only verifiable after deploy: `curl -I https://fakelockscreen.app/xp` must show `connect-src 'none'`.

## Tests

Playwright with `@axe-core/playwright`, in `tests/`: `xp`, `lockscreens` (cross-OS), `awareness`, `site` (routes, SEO, footer, headers, no-inline-scripts, no-network on 10 routes, no sharp s), `a11y` (axe on 12 routes), `wallpaper`. Run the full suite before committing; a failing no-network or no-form test means a safety rule was broken.

## Workflow notes

Commit and push only when asked. After a milestone, show screenshots and say what to review.
