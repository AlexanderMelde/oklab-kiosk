import { Injectable, signal } from '@angular/core';

export type Language = 'de' | 'en';

export interface Translations {
  nav: {
    home: string;
    back: string;
    reload: string;
    config: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    videosTitle: string;
    videosDesc: string;
    demosTitle: string;
    demosDesc: string;
    raffleTitle: string;
    raffleDesc: string;
    aboutTitle: string;
    aboutDesc: string;
  };
  attract: {
    promptTitle: string;
    promptSubtitle: string;
    touchToStart: string;
  };
  demos: {
    title: string;
    subtitle: string;
    scanToOpen: string;
    openPhone: string;
    selectDemo: string;
  };
  media: {
    title: string;
    subtitle: string;
    scanToWatch: string;
    watchPhone: string;
  };
  raffle: {
    title: string;
    headline: string;
    description: string;
    callToAction: string;
    scanPrompt: string;
  };
  about: {
    title: string;
    tagline: string;
    whoWeAreTitle: string;
    whoWeAreText: string;
    pillarsTitle: string;
    openDataTitle: string;
    openDataDesc: string;
    openGovTitle: string;
    openGovDesc: string;
    civicTechTitle: string;
    civicTechDesc: string;
    joinTitle: string;
    joinText: string;
    meetingInfo: string;
    scanWebsite: string;
    visitWebsite: string;
  };
}

const DE: Translations = {
  nav: {
    home: 'Startseite',
    back: 'Zurück',
    reload: 'Neu laden',
    config: 'Einstellungen'
  },
  home: {
    welcome: 'OK Lab Karlsruhe',
    subtitle: 'Civic Tech & Open Data Kiosk',
    videosTitle: 'Videos',
    videosDesc: 'Impressionen von unseren Veranstaltungen',
    demosTitle: 'Prototypen',
    demosDesc: 'Live-Demos unserer Projekte',
    raffleTitle: 'Gewinnspiel',
    raffleDesc: 'Mikrocontroller, Sensoren & USB-Ventilatoren gewinnen!',
    aboutTitle: 'Über uns',
    aboutDesc: 'Wer wir sind & wie du mitmachen kannst'
  },
  attract: {
    promptTitle: 'Willkommen beim OK Lab Karlsruhe!',
    promptSubtitle: 'Entdecke Open Data & Civic Tech Projekte für unsere Stadt',
    touchToStart: 'BERÜHREN ZUM STARTEN'
  },
  demos: {
    title: 'Prototypen',
    subtitle: 'Live-Demos unserer Projekte',
    scanToOpen: 'Auf dem Smartphone öffnen:',
    openPhone: 'Scannen & selbst ausprobieren',
    selectDemo: 'Demo auswählen:'
  },
  media: {
    title: 'Videos',
    subtitle: 'Impressionen von den Open Data Hack Days & DAS FEST',
    scanToWatch: 'Auf YouTube ansehen:',
    watchPhone: 'Scannen & unterwegs anschauen',
  },
  raffle: {
    title: 'GROSSES GEWINNSPIEL',
    headline: 'Gewinne Mikrocontroller, Sensoren & USB-Ventilatoren!',
    description: 'Teste dein Glück und erfahre mehr über Open Data & Civic Tech in Karlsruhe. Scanne einfach den QR-Code mit deinem Smartphone, um direkt am Gewinnspiel teilzunehmen!',
    callToAction: 'JETZT MITMACHEN!',
    scanPrompt: 'Scannen & gewinnen'
  },
  about: {
    title: 'Über das OK Lab Karlsruhe',
    tagline: 'Offene Daten & Civic Tech für ein besseres Karlsruhe',
    whoWeAreTitle: 'Wer wir sind',
    whoWeAreText: 'Wir sind eine ehrenamtliche Gemeinschaft von Bürger:innen, Entwickler:innen und Gestalter:innen. Als Teil von "Code for Germany" & "Open Knowledge Foundation Deutschland" nutzen wir Technologie für das Gemeinwohl.',
    pillarsTitle: 'Unsere 3 Säulen',
    openDataTitle: '📂 Open Data',
    openDataDesc: 'Frei zugängliche, maschinenlesbare Daten für Transparenz & Innovation.',
    openGovTitle: '🏛️ Offene Verwaltung',
    openGovDesc: 'Bürgernahe Digitalisierung, Partizipation & Vertrauen.',
    civicTechTitle: '💻 Civic Tech',
    civicTechDesc: 'Open-Source-Tools & Hardwaresensoren für die Zivilgesellschaft.',
    joinTitle: 'Jede:r kann mitmachen!',
    joinText: 'Ob Programmieren, Designen, Daten analysieren oder Ideen einbringen – bei uns ist jede:r willkommen.',
    meetingInfo: 'Treffen jeden 2. Dienstag • Code for Karlsruhe',
    scanWebsite: 'Website scannen & mitmachen:',
    visitWebsite: 'https://ok-lab-karlsruhe.de'
  }
};

const EN: Translations = {
  nav: {
    home: 'Home',
    back: 'Back',
    reload: 'Reload',
    config: 'Settings'
  },
  home: {
    welcome: 'OK Lab Karlsruhe',
    subtitle: 'Civic Tech & Open Data Kiosk',
    videosTitle: 'Videos',
    videosDesc: 'Impressions from our events',
    demosTitle: 'Prototypes',
    demosDesc: 'Live-Demos of our projects',
    raffleTitle: 'Raffle',
    raffleDesc: 'Win microcontrollers, sensors & USB fans!',
    aboutTitle: 'About Us',
    aboutDesc: 'Who we are & how you can join'
  },
  attract: {
    promptTitle: 'Welcome to OK Lab Karlsruhe!',
    promptSubtitle: 'Discover Open Data & Civic Tech projects for our city',
    touchToStart: 'TOUCH HERE TO EXPLORE'
  },
  demos: {
    title: 'Prototypes',
    subtitle: 'Explore live demos created by OK Lab Karlsruhe',
    scanToOpen: 'Open on your smartphone:',
    openPhone: 'Scan to try it on your device',
    selectDemo: 'Select demo:'
  },
  media: {
    title: 'Videos',
    subtitle: 'Impressions from Open Data Hack Days & DAS FEST',
    scanToWatch: 'Watch on YouTube:',
    watchPhone: 'Scan to watch on your phone',
  },
  raffle: {
    title: 'BIG RAFFLE',
    headline: 'Win Microcontrollers, Sensors & USB Fans!',
    description: 'Test your luck and learn about Open Data & Civic Tech in Karlsruhe. Simply scan the QR code with your smartphone to join the giveaway!',
    callToAction: 'ENTER RAFFLE NOW!',
    scanPrompt: 'Scan to participate'
  },
  about: {
    title: 'About OK Lab Karlsruhe',
    tagline: 'Open Data & Civic Tech for a Better Karlsruhe',
    whoWeAreTitle: 'Who We Are',
    whoWeAreText: 'We are a volunteer community of citizens, developers, and designers. Part of "Code for Germany" & "Open Knowledge Foundation Germany", leveraging technology for the public good.',
    pillarsTitle: 'Our 3 Pillars',
    openDataTitle: '📂 Open Data',
    openDataDesc: 'Freely accessible, machine-readable data for transparency & innovation.',
    openGovTitle: '🏛️ Open Governance',
    openGovDesc: 'Citizen-centric digitization, participation & trust.',
    civicTechTitle: '💻 Civic Tech',
    civicTechDesc: 'Open-source tools & hardware sensors for civil society.',
    joinTitle: 'Everyone Can Join!',
    joinText: 'Whether coding, designing, analyzing data or contributing ideas – everyone is welcome.',
    meetingInfo: 'Meetups every 2nd Tuesday • Code for Karlsruhe',
    scanWebsite: 'Scan QR to join us:',
    visitWebsite: 'https://ok-lab-karlsruhe.de'
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly currentLang = signal<Language>('de');

  constructor() {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang')?.toLowerCase();
      if (langParam === 'en' || langParam === 'de') {
        this.currentLang.set(langParam as Language);
      }
    }
  }

  toggleLanguage(): void {
    this.currentLang.set(this.currentLang() === 'de' ? 'en' : 'de');
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  t(): Translations {
    return this.currentLang() === 'de' ? DE : EN;
  }
}
