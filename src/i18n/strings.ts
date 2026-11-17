import type { Lang } from '../lib/config-codec';

export type { Lang };
export const langs: Lang[] = ['en', 'de'];

export interface Era {
  id: 'xp' | 'win7' | 'win10' | 'win11' | 'macos';
  year: string;
  name: string;
  ready: boolean;
}

export const eras: Era[] = [
  { id: 'xp', year: '2001', name: 'Windows XP', ready: true },
  { id: 'win7', year: '2009', name: 'Windows 7', ready: false },
  { id: 'win10', year: '2015', name: 'Windows 10', ready: false },
  { id: 'win11', year: '2021', name: 'Windows 11', ready: false },
  { id: 'macos', year: '2024', name: 'macOS', ready: false },
];

const en = {
  htmlLang: 'en',
  siteName: 'fakelockscreen.app',
  nav: { awareness: 'For IT teams', about: 'About', safety: 'Safety', switchTo: 'Deutsch', switchLabel: 'Switch to German' },
  skip: 'Skip to content',
  footer:
    'Not affiliated with Microsoft or Apple. Harmless browser prank and awareness tool. Nothing is installed, nothing is captured.',
  home: {
    title: 'Fake Lock Screen: Windows XP, 7, 10, 11 and macOS in your browser',
    description:
      'Fake lock screen prank in your browser. Travel from the Windows XP lock screen to Windows 7, 10, 11 and macOS. Harmless, nothing installed, plus a lock your PC awareness mode for IT teams.',
    eyebrow: 'A tiny museum of lock screens',
    h1a: 'Travel through',
    h1b: 'lock screen history.',
    lead: 'Five eras, rebuilt from scratch in your browser. Pick a year, press Launch, and watch your colleagues reach for the mouse.',
    start: 'Start the journey',
    forIt: 'For IT teams',
    scroll: 'Scroll to travel',
    launch: 'Launch',
    soon: 'Coming soon',
    funFact: 'Fun fact',
    timeline: 'Timeline',
    previewLabel: 'Live preview of the lock screen',
    user: 'User',
    tagline: {
      xp: 'Blue skies, big user tiles and one friendly instruction.',
      win7: 'Aurora glow, a glass-framed tile and a tiny arrow button.',
      win10: 'A huge clock, a pretty photo, then a swipe up to sign in.',
      win11: 'Centred, rounded, blurry. Fluent design takes the stage.',
      macos: 'A calm blurred wallpaper and one elegant password pill.',
    },
    fact: {
      xp: 'On many home PCs a user without a password could simply click their name to log in. No typing at all.',
      win7: 'Windows 7 received its last free security updates in January 2020, more than ten years after launch.',
      win10: 'The lock screen can rotate photos from a built-in image service and show little tips.',
      win11: 'The clock moved to the centre and every corner got rounded. It is still the same Win+L shortcut underneath.',
      macos: 'Ctrl+Cmd+Q locks a Mac instantly. It has worked since macOS High Sierra in 2017.',
    },
    awareness: {
      h2: 'Leave a PC unlocked, and colleagues will find out in the friendliest way.',
      p: 'Our awareness mode turns the prank into a two-minute lesson: after a few wrong passwords the screen reveals the shortcut, in your company wording, with your policy link. No accounts, no tracking, one shareable link.',
      cta: 'Build an awareness link',
    },
  },
  lock: {
    gateTitle: 'Ready when you are',
    gateText: 'Click start and the lock screen goes fullscreen. Type anything, press Enter, and enjoy.',
    start: 'Start in fullscreen',
    back: 'Back to the timeline',
    safe1: 'Typed characters are never stored or sent.',
    safe2: 'No network requests after this page has loaded.',
    safe3: 'Hold ESC for 2 seconds to leave at any time.',
    mobile: 'This screen works best on a desktop computer with a keyboard. Please open it on a bigger screen.',
    escHint: 'Hold ESC to exit',
  },
  reveal: {
    headline: 'This PC was left unlocked.',
    headlineCompany: (c: string) => `This PC at ${c} was left unlocked.`,
    next: 'Next time, lock it in one second:',
    winKeys: 'Win + L',
    macKeys: 'Ctrl + Cmd + Q',
    winLabel: 'Windows',
    macLabel: 'Mac',
    why: 'An unlocked screen lets anyone read your mail, send messages as you or open files you can access. Locking takes a second and keeps everyone safe.',
    nobody: 'Nothing was captured and nobody is in trouble. This was a friendly reminder.',
    policy: 'Read our screen lock policy',
    tip: 'How to set an automatic screen lock',
    tipWin: 'Windows: Settings, Accounts, Sign-in options. Choose when Windows should ask you to sign in again, and set a screen timeout under System, Power.',
    tipMac: 'Mac: System Settings, Lock Screen. Set "Require password after screen saver begins or display is turned off" to immediately.',
    close: 'Back to the start',
  },
  lockUi: {
    xp: {
      begin: 'To begin, click your user name',
      typePassword: 'Type your password',
      wrongTitle: 'Log On',
      wrongText: 'The password is incorrect. Please try again.',
      ok: 'OK',
      footerRight: 'After you log on, you can change your account settings in the control panel.',
      turnOff: 'Turn off computer',
      powerText: 'Nothing is installed here, so there is nothing to turn off. Hold ESC to leave.',
      go: 'Log on',
    },
  },
};

type Dict = typeof en;

const de: Dict = {
  htmlLang: 'de',
  siteName: 'fakelockscreen.app',
  nav: { awareness: 'Für IT-Teams', about: 'Über', safety: 'Sicherheit', switchTo: 'English', switchLabel: 'Auf Englisch wechseln' },
  skip: 'Zum Inhalt springen',
  footer:
    'Nicht mit Microsoft oder Apple verbunden. Harmloser Browser-Streich und Awareness-Tool. Es wird nichts installiert und nichts aufgezeichnet.',
  home: {
    title: 'Fake Lock Screen: Windows XP, 7, 10, 11 und macOS im Browser',
    description:
      'Fake-Sperrbildschirm als Streich im Browser. Reise vom Windows-XP-Sperrbildschirm zu Windows 7, 10, 11 und macOS. Harmlos, nichts wird installiert, mit Awareness-Modus für IT-Teams.',
    eyebrow: 'Ein kleines Museum der Sperrbildschirme',
    h1a: 'Reise durch die',
    h1b: 'Geschichte der Sperrbildschirme.',
    lead: 'Fünf Epochen, komplett neu im Browser gebaut. Jahr wählen, auf Starten drücken und zuschauen, wie Kolleginnen und Kollegen zur Maus greifen.',
    start: 'Reise starten',
    forIt: 'Für IT-Teams',
    scroll: 'Scrollen zum Reisen',
    launch: 'Starten',
    soon: 'Bald verfügbar',
    funFact: 'Wussten Sie schon',
    timeline: 'Zeitleiste',
    previewLabel: 'Live-Vorschau des Sperrbildschirms',
    user: 'Benutzer',
    tagline: {
      xp: 'Blauer Himmel, grosse Benutzerkacheln und eine freundliche Anweisung.',
      win7: 'Aurora-Leuchten, eine Kachel mit Glasrahmen und ein winziger Pfeil-Button.',
      win10: 'Eine riesige Uhr, ein schönes Foto und dann nach oben wischen zum Anmelden.',
      win11: 'Zentriert, abgerundet, unscharf. Fluent Design übernimmt die Bühne.',
      macos: 'Ein ruhiger, unscharfer Hintergrund und eine elegante Passwort-Pille.',
    },
    fact: {
      xp: 'Auf vielen Heim-PCs genügte bei einem Benutzer ohne Passwort ein Klick auf den Namen. Ganz ohne Tippen.',
      win7: 'Windows 7 erhielt die letzten kostenlosen Sicherheitsupdates im Januar 2020, mehr als zehn Jahre nach dem Start.',
      win10: 'Der Sperrbildschirm kann Fotos aus einem integrierten Bilderdienst wechseln und kleine Tipps zeigen.',
      win11: 'Die Uhr wanderte in die Mitte und alle Ecken wurden rund. Darunter gilt weiterhin Win+L.',
      macos: 'Mit Ctrl+Cmd+Q sperrt man einen Mac sofort. Das geht seit macOS High Sierra im Jahr 2017.',
    },
    awareness: {
      h2: 'Wer den PC entsperrt lässt, erfährt es auf die freundlichste Art.',
      p: 'Unser Awareness-Modus macht aus dem Streich eine Lektion von zwei Minuten: Nach ein paar falschen Passwörtern zeigt der Bildschirm das Tastenkürzel, in den Worten Ihrer Firma und mit Link zur Richtlinie. Keine Konten, kein Tracking, ein teilbarer Link.',
      cta: 'Awareness-Link erstellen',
    },
  },
  lock: {
    gateTitle: 'Bereit, wenn Sie es sind',
    gateText: 'Mit Klick auf Starten geht der Sperrbildschirm in den Vollbildmodus. Tippen Sie etwas, drücken Sie Enter und geniessen Sie.',
    start: 'Im Vollbild starten',
    back: 'Zurück zur Zeitleiste',
    safe1: 'Getippte Zeichen werden nie gespeichert oder gesendet.',
    safe2: 'Nach dem Laden dieser Seite gibt es keine Netzwerkanfragen.',
    safe3: 'ESC 2 Sekunden gedrückt halten beendet alles jederzeit.',
    mobile: 'Dieser Bildschirm funktioniert am besten auf einem Desktop-Computer mit Tastatur. Bitte öffnen Sie ihn auf einem grösseren Bildschirm.',
    escHint: 'ESC gedrückt halten zum Beenden',
  },
  reveal: {
    headline: 'Dieser PC wurde nicht gesperrt.',
    headlineCompany: (c: string) => `Dieser PC bei ${c} wurde nicht gesperrt.`,
    next: 'Beim nächsten Mal sperren Sie ihn in einer Sekunde:',
    winKeys: 'Win + L',
    macKeys: 'Ctrl + Cmd + Q',
    winLabel: 'Windows',
    macLabel: 'Mac',
    why: 'Ein entsperrter Bildschirm erlaubt es jeder Person, Ihre E-Mails zu lesen, Nachrichten in Ihrem Namen zu senden oder Dateien zu öffnen. Sperren dauert eine Sekunde und schützt alle.',
    nobody: 'Es wurde nichts aufgezeichnet und niemand hat Ärger. Das war eine freundliche Erinnerung.',
    policy: 'Unsere Richtlinie zur Bildschirmsperre lesen',
    tip: 'So richten Sie eine automatische Bildschirmsperre ein',
    tipWin: 'Windows: Einstellungen, Konten, Anmeldeoptionen. Wählen Sie, wann Windows eine erneute Anmeldung verlangt, und stellen Sie unter System, Netzbetrieb ein Bildschirm-Timeout ein.',
    tipMac: 'Mac: Systemeinstellungen, Sperrbildschirm. Stellen Sie «Passwort erforderlich nach Beginn des Bildschirmschoners» auf sofort.',
    close: 'Zurück zum Start',
  },
  lockUi: {
    xp: {
      begin: 'Klicken Sie zum Starten auf Ihren Benutzernamen',
      typePassword: 'Passwort eingeben',
      wrongTitle: 'Anmelden',
      wrongText: 'Das Kennwort ist falsch. Bitte versuchen Sie es erneut.',
      ok: 'OK',
      footerRight: 'Nach der Anmeldung können Sie Ihre Kontoeinstellungen in der Systemsteuerung ändern.',
      turnOff: 'Computer ausschalten',
      powerText: 'Hier ist nichts installiert, also gibt es nichts auszuschalten. ESC gedrückt halten zum Beenden.',
      go: 'Anmelden',
    },
  },
};

export const strings: Record<Lang, Dict> = { en, de };
export const t = (lang: Lang): Dict => strings[lang];

/** Path without language prefix: '/de/xp' -> '/xp', '/de' -> '/'. */
export function stripLang(path: string): string {
  const p = path.replace(/^\/de(?=\/|$)/, '') || '/';
  return p;
}
export function localePath(path: string, lang: Lang): string {
  const base = stripLang(path);
  if (lang === 'en') return base;
  return base === '/' ? '/de' : `/de${base}`;
}
