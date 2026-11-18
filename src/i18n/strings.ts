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
  { id: 'win7', year: '2009', name: 'Windows 7', ready: true },
  { id: 'win10', year: '2015', name: 'Windows 10', ready: true },
  { id: 'win11', year: '2021', name: 'Windows 11', ready: true },
  { id: 'macos', year: '2024', name: 'macOS', ready: true },
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
      'Fake lock screen prank in your browser: Windows XP, 7, 10, 11 and macOS. Harmless, nothing installed. Includes a lock-your-PC awareness mode for IT teams.',
    eyebrow: 'A tiny museum of lock screens',
    h1a: 'Fake lock screen:',
    h1b: 'travel through history.',
    lead: 'Five eras, rebuilt from scratch in your browser. Pick a year, press Launch, and watch your colleagues reach for the mouse.',
    start: 'Start the journey',
    forIt: 'For IT teams',
    scroll: 'Scroll to travel',
    quick: 'Quick launch',
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
      macos: 'Ctrl+Cmd+Q locks the screen of a Mac. It has worked since macOS High Sierra in 2017.',
    },
    factSrc: {
      xp: [{ label: 'Source: O\'Reilly, Windows XP Home Edition', url: 'https://www.oreilly.com/library/view/windows-xp-home/0596002602/ch16s04.html' }],
      win7: [{ label: 'Source: Microsoft Support', url: 'https://support.microsoft.com/en-us/windows/windows-7-support-ended-on-january-14-2020-b75d4580-2cc7-895a-2c9c-1466d9a53962' }],
      win10: [{ label: 'Source: Microsoft Learn', url: 'https://learn.microsoft.com/en-us/windows/configuration/lock-screen/windows-spotlight' }],
      win11: [{ label: 'Source: Microsoft Support', url: 'https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec' }],
      macos: [
        { label: 'Source: Apple Support', url: 'https://support.apple.com/en-us/102650' },
        { label: 'High Sierra lock feature (MacSales)', url: 'https://eshop.macsales.com/blog/45154-quick-tip-using-macos-10-13-high-sierras-lock-screen-feature' },
      ],
    },
    awareness: {
      h2: 'Leave a PC unlocked, and colleagues will find out in the friendliest way.',
      p: 'Our awareness mode turns the prank into a two-minute lesson: after a few wrong passwords the screen reveals the shortcut, in your company wording, with your policy link. No accounts, no tracking, one shareable link.',
      cta: 'Build an awareness link',
    },
    faq: {
      h2: 'Frequently asked questions',
      items: [
        { q: 'What is a fake lock screen?', a: 'A fake lock screen is a web page that imitates the lock screen of Windows XP, 7, 10, 11 or macOS. fakelockscreen.app runs it fullscreen in your browser as a harmless prank and as a security awareness tool. Nothing is installed, nothing you type is stored or sent, and holding ESC for 2 seconds always exits.' },
        { q: 'Is it safe? Does it store my password?', a: 'No. The lock screens contain no input field or form, typed characters are only counted to draw the dots, and the page makes no network requests after it has loaded. Details and a way to check it yourself are on the Safety page.' },
        { q: 'How do I exit the fake lock screen?', a: 'Hold the ESC key for 2 seconds, use the normal browser way out of fullscreen, or close the tab.' },
        { q: 'Which lock screens are available?', a: 'Windows XP (2001), Windows 7 (2009), Windows 10 (2015), Windows 11 (2021) and macOS (2024). All artwork is original and drawn in CSS and SVG, with no official logos or sounds. On Windows 7, 10, 11 and macOS you can use your own wallpaper, which never leaves your computer.' },
        { q: 'How do I lock a real computer?', a: 'Press Win + L on Windows or Ctrl + Cmd + Q on a Mac. A real lock screen is never a web page, so never type your password into one in a browser.' },
        { q: 'Can I use it for security awareness training?', a: 'Yes. Awareness mode lets IT teams build a shareable link with their own wording and policy link. After a few wrong passwords the screen teaches the shortcut. There are no accounts and no tracking, and a printable desk card is included.' },
        { q: 'Is it affiliated with Microsoft or Apple?', a: 'No. Windows and Microsoft are trademarks of the Microsoft group of companies, and macOS and Apple are trademarks of Apple Inc. This project is independent.' },
      ],
      more: 'Read the full safety page',
    },
    by: { from: 'From', site: 'scloud', by: 'by', name: 'Florian Salzmann', linkedin: 'LinkedIn' },
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
    wpButton: 'Use my own wallpaper',
    wpClear: 'Remove my wallpaper',
    wpNote: 'The image stays on your computer. It is never uploaded, stored or added to share links.',
    wpActive: 'Your wallpaper is active.',
    wpError: 'That file could not be used. Please choose a JPG, PNG, WebP or AVIF image up to 25 MB.',
    fakeText: 'This button is just for show. Hold ESC to leave.',
    powerText: 'Nothing is installed here, so there is nothing to turn off. Hold ESC to leave.',
    realLock: 'To lock a real computer, press Win + L on Windows or Ctrl + Cmd + Q on a Mac.',
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
    win7: { password: 'Password', wrong: 'The user name or password is incorrect.', ok: 'OK', ease: 'Ease of Access', shutdown: 'Shut down' },
    win10: { password: 'Password', wrong: 'The password is incorrect. Make sure you are using the password for your account.', ok: 'OK', options: 'Sign-in options', signIn: 'Sign in', network: 'Network', ease: 'Ease of access', power: 'Power', hint: 'Click or press any key' },
    win11: { password: 'Password', wrong: 'The password is incorrect. Try again.', ok: 'OK', forgot: 'I forgot my password', options: 'Sign-in options', signIn: 'Sign in', network: 'Network', ease: 'Accessibility', power: 'Power' },
    mac: { enterPassword: 'Enter Password', touch: 'Touch ID or Enter Password', sleep: 'Sleep', restart: 'Restart', shutdown: 'Shut Down' },
  },
  lockSeo: {
    win7: { title: 'Windows 7 Lock Screen in your Browser: Fake Lock Screen Prank', description: 'Aurora glow, glass user tile and the little arrow button: a Windows 7 style logon screen as a harmless prank in your browser. Fullscreen, nothing stored.' },
    win10: { title: 'Windows 10 Lock Screen Prank: Fake Lock Screen in your Browser', description: 'Big clock, slide-up sign-in and a fake password box. A Windows 10 style fake lock screen for your browser. Harmless, nothing stored or sent.' },
    win11: { title: 'Windows 11 Fake Lock Screen: Prank your Colleagues in the Browser', description: 'Centred clock, blurred Fluent style sign-in and a fake password field. A Windows 11 style fake lock screen prank. Nothing stored or sent.' },
    macos: { title: 'Mac Lock Screen Prank: macOS Fake Lock Screen in your Browser', description: 'Calm blurred wallpaper, big clock and an elegant password pill. A macOS style fake lock screen prank. Shake included, nothing stored.' },
  },
  lockGate: {
    xp: { h1: 'Windows XP lock screen in your browser', about: 'An original recreation of the blue Windows XP welcome screen: the user tile, the "To begin, click your user name" prompt and the classic password box. It runs fullscreen, so you can leave it on a colleague\'s screen as a harmless prank. Type anything and press Enter and it answers with the familiar "password is incorrect" balloon.' },
    win7: { h1: 'Windows 7 lock screen in your browser', about: 'An original recreation of the Windows 7 logon screen: aurora glow, glass user tile and the little arrow button. It runs fullscreen in your browser as a harmless prank. Type anything, press Enter and the "user name or password is incorrect" message appears. Nothing you type is stored.' },
    win10: { h1: 'Windows 10 lock screen in your browser', about: 'An original recreation of the Windows 10 lock screen: a big clock, a slide-up sign-in and a fake password box. Press any key to wake it, type something and press Enter. It runs fullscreen as a harmless prank, and nothing you type is stored or sent.' },
    win11: { h1: 'Windows 11 fake lock screen in your browser', about: 'An original recreation of the Windows 11 lock screen: a centred clock, a blurred Fluent style sign-in and a fake password field. Use the default look or your own wallpaper, which never leaves your computer. It runs fullscreen as a harmless prank, and nothing you type is stored or sent.' },
    macos: { h1: 'macOS fake lock screen in your browser', about: 'An original recreation of the Mac lock screen: a calm blurred wallpaper, a big clock and an elegant password pill that shakes on a wrong try. Use the default look or your own wallpaper, which never leaves your computer. It runs fullscreen as a harmless prank, and nothing you type is stored or sent.' },
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
      'Fake-Sperrbildschirm als Streich im Browser: Windows XP, 7, 10, 11 und macOS. Harmlos, nichts wird installiert. Mit Awareness-Modus für IT-Teams.',
    eyebrow: 'Ein kleines Museum der Sperrbildschirme',
    h1a: 'Fake Lock Screen:',
    h1b: 'Reise durch die Geschichte.',
    lead: 'Fünf Epochen, komplett neu im Browser gebaut. Jahr wählen, auf Starten drücken und zuschauen, wie Kolleginnen und Kollegen zur Maus greifen.',
    start: 'Reise starten',
    forIt: 'Für IT-Teams',
    scroll: 'Scrollen zum Reisen',
    quick: 'Schnellstart',
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
      macos: 'Mit Ctrl+Cmd+Q sperrt man den Bildschirm eines Macs. Das geht seit macOS High Sierra im Jahr 2017.',
    },
    factSrc: {
      xp: [{ label: 'Quelle: O\'Reilly, Windows XP Home Edition', url: 'https://www.oreilly.com/library/view/windows-xp-home/0596002602/ch16s04.html' }],
      win7: [{ label: 'Quelle: Microsoft Support', url: 'https://support.microsoft.com/en-us/windows/windows-7-support-ended-on-january-14-2020-b75d4580-2cc7-895a-2c9c-1466d9a53962' }],
      win10: [{ label: 'Quelle: Microsoft Learn', url: 'https://learn.microsoft.com/en-us/windows/configuration/lock-screen/windows-spotlight' }],
      win11: [{ label: 'Quelle: Microsoft Support', url: 'https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec' }],
      macos: [
        { label: 'Quelle: Apple Support', url: 'https://support.apple.com/en-us/102650' },
        { label: 'High-Sierra-Sperrfunktion (MacSales)', url: 'https://eshop.macsales.com/blog/45154-quick-tip-using-macos-10-13-high-sierras-lock-screen-feature' },
      ],
    },
    awareness: {
      h2: 'Wer den PC entsperrt lässt, erfährt es auf die freundlichste Art.',
      p: 'Unser Awareness-Modus macht aus dem Streich eine Lektion von zwei Minuten: Nach ein paar falschen Passwörtern zeigt der Bildschirm das Tastenkürzel, in den Worten Ihrer Firma und mit Link zur Richtlinie. Keine Konten, kein Tracking, ein teilbarer Link.',
      cta: 'Awareness-Link erstellen',
    },
    faq: {
      h2: 'Häufige Fragen',
      items: [
        { q: 'Was ist ein Fake-Sperrbildschirm?', a: 'Ein Fake-Sperrbildschirm ist eine Webseite, die den Sperrbildschirm von Windows XP, 7, 10, 11 oder macOS nachahmt. fakelockscreen.app zeigt ihn im Vollbild im Browser, als harmlosen Streich und als Awareness-Tool für Informationssicherheit. Es wird nichts installiert, nichts Getipptes wird gespeichert oder gesendet, und ESC 2 Sekunden gedrückt halten beendet alles jederzeit.' },
        { q: 'Ist das sicher? Wird mein Passwort gespeichert?', a: 'Nein. Die Sperrbildschirme enthalten kein Eingabefeld und kein Formular, getippte Zeichen werden nur gezählt, um die Punkte zu zeichnen, und nach dem Laden gibt es keine Netzwerkanfragen. Details und eine Anleitung zum Selbstprüfen finden Sie auf der Sicherheitsseite.' },
        { q: 'Wie verlasse ich den Fake-Sperrbildschirm?', a: 'Halten Sie die ESC-Taste 2 Sekunden gedrückt, verlassen Sie den Vollbildmodus auf dem üblichen Weg des Browsers oder schliessen Sie den Tab.' },
        { q: 'Welche Sperrbildschirme gibt es?', a: 'Windows XP (2001), Windows 7 (2009), Windows 10 (2015), Windows 11 (2021) und macOS (2024). Alle Grafiken sind original und in CSS und SVG gezeichnet, ohne offizielle Logos oder Klänge. Bei Windows 7, 10, 11 und macOS können Sie einen eigenen Hintergrund verwenden, der Ihren Computer nie verlässt.' },
        { q: 'Wie sperre ich einen echten Computer?', a: 'Drücken Sie Win + L unter Windows oder Ctrl + Cmd + Q auf dem Mac. Ein echter Sperrbildschirm ist nie eine Webseite. Geben Sie darum nie Ihr Passwort auf einem solchen Bildschirm im Browser ein.' },
        { q: 'Kann ich es für Security-Awareness-Schulungen nutzen?', a: 'Ja. Im Awareness-Modus erstellen IT-Teams einen teilbaren Link mit eigenem Text und Link zur Richtlinie. Nach ein paar falschen Passwörtern zeigt der Bildschirm das Tastenkürzel. Es gibt keine Konten und kein Tracking, eine druckbare Tischkarte ist dabei.' },
        { q: 'Ist es mit Microsoft oder Apple verbunden?', a: 'Nein. Windows und Microsoft sind Marken der Microsoft-Unternehmensgruppe, macOS und Apple sind Marken von Apple Inc. Dieses Projekt ist unabhängig.' },
      ],
      more: 'Die ganze Sicherheitsseite lesen',
    },
    by: { from: 'Von', site: 'scloud', by: 'von', name: 'Florian Salzmann', linkedin: 'LinkedIn' },
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
    wpButton: 'Eigenen Hintergrund verwenden',
    wpClear: 'Eigenen Hintergrund entfernen',
    wpNote: 'Das Bild bleibt auf Ihrem Computer. Es wird nie hochgeladen, gespeichert oder in Teilen-Links eingebaut.',
    wpActive: 'Ihr Hintergrund ist aktiv.',
    wpError: 'Diese Datei konnte nicht verwendet werden. Bitte wählen Sie ein Bild als JPG, PNG, WebP oder AVIF bis 25 MB.',
    fakeText: 'Dieser Button ist nur Dekoration. ESC gedrückt halten zum Beenden.',
    powerText: 'Hier ist nichts installiert, also gibt es nichts auszuschalten. ESC gedrückt halten zum Beenden.',
    realLock: 'Um einen echten Computer zu sperren, drücken Sie Win + L unter Windows oder Ctrl + Cmd + Q auf dem Mac.',
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
    win7: { password: 'Kennwort', wrong: 'Der Benutzername oder das Kennwort ist falsch.', ok: 'OK', ease: 'Erleichterte Bedienung', shutdown: 'Herunterfahren' },
    win10: { password: 'Kennwort', wrong: 'Das Kennwort ist falsch. Stellen Sie sicher, dass Sie das Kennwort für Ihr Konto verwenden.', ok: 'OK', options: 'Anmeldeoptionen', signIn: 'Anmelden', network: 'Netzwerk', ease: 'Erleichterte Bedienung', power: 'Ein/Aus', hint: 'Klicken oder beliebige Taste drücken' },
    win11: { password: 'Kennwort', wrong: 'Das Kennwort ist falsch. Versuchen Sie es erneut.', ok: 'OK', forgot: 'Ich habe mein Kennwort vergessen', options: 'Anmeldeoptionen', signIn: 'Anmelden', network: 'Netzwerk', ease: 'Barrierefreiheit', power: 'Ein/Aus' },
    mac: { enterPassword: 'Passwort eingeben', touch: 'Touch ID oder Passwort eingeben', sleep: 'Ruhezustand', restart: 'Neustart', shutdown: 'Ausschalten' },
  },
  lockSeo: {
    win7: { title: 'Windows-7-Sperrbildschirm im Browser: Fake Lock Screen Streich', description: 'Aurora-Leuchten, Glaskachel und der kleine Pfeil-Button: ein Windows-7-Anmeldebildschirm als harmloser Streich im Browser. Vollbild, nichts wird gespeichert.' },
    win10: { title: 'Windows-10-Sperrbildschirm Streich: Fake Lock Screen im Browser', description: 'Grosse Uhr, Anmeldung per Wischen und ein falsches Passwortfeld. Ein Fake-Sperrbildschirm im Windows-10-Stil für den Browser. Harmlos, nichts wird gespeichert.' },
    win11: { title: 'Windows-11-Fake-Sperrbildschirm: Kolleginnen und Kollegen necken', description: 'Zentrierte Uhr, unscharfe Fluent-Anmeldung und ein falsches Passwortfeld. Ein Windows-11-Fake-Sperrbildschirm als Streich. Nichts wird gespeichert oder gesendet.' },
    macos: { title: 'Mac-Sperrbildschirm Streich: macOS Fake Lock Screen im Browser', description: 'Ruhiger, unscharfer Hintergrund, grosse Uhr und eine elegante Passwort-Pille. Ein macOS-Fake-Sperrbildschirm als Streich. Wackeln inklusive, nichts wird gespeichert.' },
  },
  lockGate: {
    xp: { h1: 'Windows-XP-Sperrbildschirm im Browser', about: 'Eine eigene Nachbildung des blauen Windows-XP-Willkommensbildschirms: mit Benutzerkachel, der Aufforderung "Klicken Sie auf Ihren Benutzernamen" und dem klassischen Passwortfeld. Er läuft im Vollbild, damit Sie ihn als harmlosen Streich auf dem Bildschirm einer Kollegin oder eines Kollegen stehen lassen können. Tippen Sie etwas und drücken Sie Enter, dann erscheint die bekannte Meldung "Das Kennwort ist falsch".' },
    win7: { h1: 'Windows-7-Sperrbildschirm im Browser', about: 'Eine eigene Nachbildung des Windows-7-Anmeldebildschirms: Aurora-Leuchten, Glaskachel und der kleine Pfeil-Button. Er läuft im Vollbild als harmloser Streich. Tippen Sie etwas, drücken Sie Enter, und die Meldung "Der Benutzername oder das Kennwort ist falsch" erscheint. Nichts, was Sie tippen, wird gespeichert.' },
    win10: { h1: 'Windows-10-Sperrbildschirm im Browser', about: 'Eine eigene Nachbildung des Windows-10-Sperrbildschirms: grosse Uhr, Anmeldung per Wischen und ein falsches Passwortfeld. Eine beliebige Taste weckt ihn auf, dann tippen Sie etwas und drücken Enter. Er läuft im Vollbild als harmloser Streich, und nichts wird gespeichert oder gesendet.' },
    win11: { h1: 'Windows-11-Fake-Sperrbildschirm im Browser', about: 'Eine eigene Nachbildung des Windows-11-Sperrbildschirms: zentrierte Uhr, unscharfe Fluent-Anmeldung und ein falsches Passwortfeld. Verwenden Sie den Standardlook oder Ihr eigenes Hintergrundbild, das Ihren Computer nie verlässt. Er läuft im Vollbild als harmloser Streich, und nichts wird gespeichert oder gesendet.' },
    macos: { h1: 'macOS-Fake-Sperrbildschirm im Browser', about: 'Eine eigene Nachbildung des Mac-Sperrbildschirms: ruhiger, unscharfer Hintergrund, grosse Uhr und eine elegante Passwort-Pille, die bei falscher Eingabe wackelt. Verwenden Sie den Standardlook oder Ihr eigenes Hintergrundbild, das Ihren Computer nie verlässt. Er läuft im Vollbild als harmloser Streich, und nichts wird gespeichert oder gesendet.' },
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
