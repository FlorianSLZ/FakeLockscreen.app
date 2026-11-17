import type { Lang } from '../lib/config-codec';

export interface Section { h: string; p?: string[]; ul?: string[]; steps?: string[] }
export interface Page {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: Section[];
  faq?: { q: string; a: string }[];
}

export const repoUrl = 'https://github.com/FlorianSLZ/FakeLockscreen.app';

const aboutEn: Page = {
  title: 'About Fake Lock Screen: A Museum of Lock Screens and a Lock Your PC Tool',
  description:
    'fakelockscreen.app rebuilds Windows XP, 7, 10, 11 and macOS lock screens in your browser, as a harmless prank and as an awareness tool that teaches colleagues to lock their PC.',
  h1: 'About fakelockscreen.app',
  lead: 'A small interactive museum of lock screens, from Windows XP to today, that doubles as a friendly way to teach people to lock their PC.',
  sections: [
    {
      h: 'Two ways to use it',
      ul: [
        'Prank mode: pick an era, press Launch, and leave the screen for a colleague to find. Type anything, press Enter and enjoy the authentic "wrong password" feedback.',
        'Awareness mode: IT and security teams build a link with their own wording. After a few wrong passwords, or after a set time, a friendly screen explains the shortcut (Win+L or Ctrl+Cmd+Q) and why locking matters. A printable A4 desk card is included.',
      ],
    },
    {
      h: 'Why retro lock screens?',
      p: [
        'Windows XP and Windows 7 logon screens are hard to find as a good web experience, so we rebuilt them with care. Every era is original artwork in the spirit of its time, made from CSS and SVG: no official logos, wallpapers, sounds or fonts.',
      ],
    },
    {
      h: 'How it is built',
      p: [
        'A static site made with Astro and TypeScript, served from Cloudflare. There is no backend, no database, no accounts and no analytics. Settings for awareness links live in the part of the URL after the # sign, which browsers never send to any server.',
      ],
    },
    {
      h: 'Open source',
      p: [`The code is public so you can read exactly what runs in your browser: ${repoUrl}`],
    },
    {
      h: 'Trademarks',
      p: [
        'Windows and Microsoft are trademarks of the Microsoft group of companies. macOS and Apple are trademarks of Apple Inc. This project is independent and not affiliated with, endorsed by or sponsored by either company.',
      ],
    },
  ],
};

const safetyEn: Page = {
  title: 'Safety: What the Fake Lock Screen Does and Does Not Do',
  description:
    'Exactly what fakelockscreen.app does and does not do: nothing typed is stored or sent, no network requests on lock screens, no tracking, always an exit. Plus how to verify it yourself.',
  h1: 'Safety: what this site does and does not do',
  lead: 'A fake lock screen can look a lot like a phishing page. So this site is built so that it cannot behave like one, and so that you can check that yourself.',
  sections: [
    {
      h: 'What it does',
      ul: [
        'Draws a picture of a lock screen in your browser tab.',
        'Counts how many keys you pressed, only to draw the dots in the password box. The characters themselves are never read into a variable.',
        'Goes fullscreen when you click the start button, so it feels real.',
        'Shows a friendly reveal after a few wrong passwords or a set time.',
      ],
    },
    {
      h: 'What it never does',
      ul: [
        'Store, log or send anything you type.',
        'Use a real password field. There is no input element or form on the lock screens, so password managers and browsers do not treat it as a login.',
        'Make network requests after a lock screen has loaded. No analytics, no fetch, nothing. The page also carries a Content Security Policy that tells your browser to refuse any connection.',
        'Use cookies, trackers or fingerprinting.',
        'Install anything or ask for permissions such as camera, microphone or location.',
        'Block your keyboard or trap you. It never uses the Keyboard Lock API.',
      ],
    },
    {
      h: 'You are always in control',
      ul: [
        'Hold ESC for 2 seconds and the lock screen always exits.',
        'The normal browser way out of fullscreen works too.',
        'You can close the tab or window at any time.',
        'Nothing starts until you press the start button on the page before the lock screen.',
      ],
    },
    {
      h: 'Check it yourself',
      steps: [
        'Open your browser developer tools (F12) and switch to the Network tab.',
        'Open any lock screen, press start, type something and press Enter.',
        'Watch the Network tab: no new requests appear.',
        'Inspect the page (Elements tab) and search for "input" or "form": there are none.',
        `Read the full source code on GitHub: ${repoUrl}`,
      ],
    },
    {
      h: 'Use it responsibly',
      ul: [
        'Only use it on computers you own or where the owner agrees.',
        'Never use it to collect passwords. This site cannot, and no other site should.',
        'Keep pranks friendly. Do not use it to scare or embarrass people.',
      ],
    },
    {
      h: 'The real lesson: be suspicious of lock screens in a browser',
      p: [
        'If an unexpected website ever shows you a lock screen or login box and asks for your password, do not type it. A real lock screen is never a web page. Pranks like this one work because a browser can draw anything, which is exactly why phishing works too.',
      ],
    },
    {
      h: 'For IT and security teams',
      p: [
        'Awareness links carry no personal data and nothing is recorded about who clicked. If you need to allow the domain in a web filter, it only serves static files. Questions or findings can be sent through the contact in our security.txt file.',
      ],
    },
  ],
  faq: [
    { q: 'Does the fake lock screen store my password?', a: 'No. Typed characters are never stored, logged or sent. The page only counts keystrokes to draw dots, and it makes no network requests after it has loaded.' },
    { q: 'How do I leave the fake lock screen?', a: 'Hold the ESC key for 2 seconds, use the normal browser fullscreen exit, or close the tab.' },
    { q: 'Can I use it for security awareness training?', a: 'Yes. The awareness mode lets IT teams build a shareable link with their own company wording and a printable desk card, without accounts or tracking.' },
  ],
};

const aboutDe: Page = {
  title: 'Über Fake Lock Screen: Ein Museum der Sperrbildschirme und ein Lock-your-PC-Tool',
  description:
    'fakelockscreen.app baut die Sperrbildschirme von Windows XP, 7, 10, 11 und macOS im Browser nach, als harmloser Streich und als Awareness-Tool, das zeigt, wie man den PC sperrt.',
  h1: 'Über fakelockscreen.app',
  lead: 'Ein kleines interaktives Museum der Sperrbildschirme von Windows XP bis heute, das nebenbei auf freundliche Art zeigt, wie man den PC sperrt.',
  sections: [
    {
      h: 'Zwei Arten der Nutzung',
      ul: [
        'Streich-Modus: Epoche wählen, auf Starten drücken und den Bildschirm für Kollegen stehen lassen. Irgendetwas tippen, Enter drücken und die authentische «falsches Passwort»-Meldung geniessen.',
        'Awareness-Modus: IT- und Security-Teams erstellen einen Link mit eigenen Worten. Nach ein paar falschen Passwörtern oder nach einer eingestellten Zeit erklärt ein freundlicher Bildschirm das Tastenkürzel (Win+L oder Ctrl+Cmd+Q) und warum Sperren wichtig ist. Eine druckbare A4-Pultkarte ist dabei.',
      ],
    },
    {
      h: 'Warum Retro-Sperrbildschirme?',
      p: [
        'Die Anmeldebildschirme von Windows XP und Windows 7 gibt es kaum als gutes Web-Erlebnis, darum haben wir sie sorgfältig nachgebaut. Jede Epoche ist originale Grafik im Geist ihrer Zeit, gebaut aus CSS und SVG: keine offiziellen Logos, Hintergründe, Klänge oder Schriften.',
      ],
    },
    {
      h: 'So ist es gebaut',
      p: [
        'Eine statische Website mit Astro und TypeScript, ausgeliefert über Cloudflare. Es gibt kein Backend, keine Datenbank, keine Konten und keine Analyse. Die Einstellungen der Awareness-Links stehen im Teil der URL nach dem #-Zeichen, den Browser nie an einen Server senden.',
      ],
    },
    {
      h: 'Open Source',
      p: [`Der Code ist öffentlich, damit Sie genau nachlesen können, was in Ihrem Browser läuft: ${repoUrl}`],
    },
    {
      h: 'Marken',
      p: [
        'Windows und Microsoft sind Marken der Microsoft-Unternehmensgruppe. macOS und Apple sind Marken von Apple Inc. Dieses Projekt ist unabhängig und weder mit diesen Unternehmen verbunden noch von ihnen unterstützt oder gesponsert.',
      ],
    },
  ],
};

const safetyDe: Page = {
  title: 'Sicherheit: Was der Fake-Sperrbildschirm tut und was nicht',
  description:
    'Genau erklärt, was fakelockscreen.app tut und nicht tut: nichts Getipptes wird gespeichert oder gesendet, keine Netzwerkanfragen auf den Sperrbildschirmen, kein Tracking, immer ein Ausgang. Mit Anleitung zum Selbstprüfen.',
  h1: 'Sicherheit: Was diese Website tut und was nicht',
  lead: 'Ein Fake-Sperrbildschirm sieht einer Phishing-Seite ähnlich. Darum ist diese Website so gebaut, dass sie sich nicht wie eine verhalten kann, und Sie können das selbst nachprüfen.',
  sections: [
    {
      h: 'Was sie tut',
      ul: [
        'Zeichnet das Bild eines Sperrbildschirms in Ihrem Browser-Tab.',
        'Zählt nur, wie viele Tasten Sie gedrückt haben, um die Punkte im Passwortfeld zu zeichnen. Die Zeichen selbst werden nie in einer Variable gelesen.',
        'Wechselt beim Klick auf Starten in den Vollbildmodus, damit es echt wirkt.',
        'Zeigt nach ein paar falschen Passwörtern oder nach einer eingestellten Zeit einen freundlichen Hinweis.',
      ],
    },
    {
      h: 'Was sie nie tut',
      ul: [
        'Etwas speichern, protokollieren oder senden, das Sie tippen.',
        'Ein echtes Passwortfeld verwenden. Auf den Sperrbildschirmen gibt es kein Eingabefeld und kein Formular, darum behandeln Passwortmanager und Browser die Seite nicht als Anmeldung.',
        'Netzwerkanfragen stellen, nachdem ein Sperrbildschirm geladen ist. Keine Analyse, kein fetch, nichts. Die Seite enthält zudem eine Content Security Policy, die den Browser anweist, jede Verbindung zu verweigern.',
        'Cookies, Tracker oder Fingerprinting einsetzen.',
        'Etwas installieren oder Berechtigungen wie Kamera, Mikrofon oder Standort verlangen.',
        'Ihre Tastatur blockieren oder Sie festhalten. Die Keyboard-Lock-API wird nie verwendet.',
      ],
    },
    {
      h: 'Sie behalten immer die Kontrolle',
      ul: [
        'ESC 2 Sekunden gedrückt halten beendet den Sperrbildschirm immer.',
        'Der normale Weg des Browsers aus dem Vollbild funktioniert ebenfalls.',
        'Sie können den Tab oder das Fenster jederzeit schliessen.',
        'Nichts startet, bevor Sie auf der Seite vor dem Sperrbildschirm auf Starten drücken.',
      ],
    },
    {
      h: 'Selbst prüfen',
      steps: [
        'Öffnen Sie die Entwicklertools Ihres Browsers (F12) und wechseln Sie zum Tab Netzwerk.',
        'Öffnen Sie einen Sperrbildschirm, drücken Sie Starten, tippen Sie etwas und drücken Sie Enter.',
        'Beobachten Sie den Tab Netzwerk: Es erscheinen keine neuen Anfragen.',
        'Untersuchen Sie die Seite (Tab Elemente) und suchen Sie nach «input» oder «form»: Es gibt keine.',
        `Lesen Sie den ganzen Quellcode auf GitHub: ${repoUrl}`,
      ],
    },
    {
      h: 'Verantwortungsvoll nutzen',
      ul: [
        'Nur auf Computern einsetzen, die Ihnen gehören oder deren Besitzer einverstanden sind.',
        'Nie zum Sammeln von Passwörtern verwenden. Diese Website kann das nicht, und keine andere sollte es.',
        'Streiche freundlich halten. Nicht zum Erschrecken oder Blossstellen nutzen.',
      ],
    },
    {
      h: 'Die eigentliche Lektion: Sperrbildschirmen im Browser misstrauen',
      p: [
        'Wenn eine unerwartete Website Ihnen einen Sperrbildschirm oder ein Anmeldefenster zeigt und nach Ihrem Passwort fragt, geben Sie es nicht ein. Ein echter Sperrbildschirm ist nie eine Webseite. Streiche wie dieser funktionieren, weil ein Browser alles zeichnen kann, und genau darum funktioniert auch Phishing.',
      ],
    },
    {
      h: 'Für IT- und Security-Teams',
      p: [
        'Awareness-Links enthalten keine persönlichen Daten, und es wird nicht aufgezeichnet, wer geklickt hat. Wenn Sie die Domain im Webfilter freigeben müssen: Sie liefert nur statische Dateien aus. Fragen oder Hinweise erreichen uns über den Kontakt in unserer security.txt.',
      ],
    },
  ],
  faq: [
    { q: 'Speichert der Fake-Sperrbildschirm mein Passwort?', a: 'Nein. Getippte Zeichen werden nie gespeichert, protokolliert oder gesendet. Die Seite zählt nur Tastenanschläge, um Punkte zu zeichnen, und stellt nach dem Laden keine Netzwerkanfragen.' },
    { q: 'Wie verlasse ich den Fake-Sperrbildschirm?', a: 'ESC 2 Sekunden gedrückt halten, den normalen Vollbild-Ausgang des Browsers nutzen oder den Tab schliessen.' },
    { q: 'Kann ich ihn für Security-Awareness-Schulungen nutzen?', a: 'Ja. Im Awareness-Modus erstellen IT-Teams einen teilbaren Link mit eigenem Firmentext und eine druckbare Pultkarte, ohne Konten und ohne Tracking.' },
  ],
};

export const pages: Record<'about' | 'safety', Record<Lang, Page>> = {
  about: { en: aboutEn, de: aboutDe },
  safety: { en: safetyEn, de: safetyDe },
};
