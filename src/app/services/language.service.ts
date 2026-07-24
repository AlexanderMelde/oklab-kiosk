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
    p1: string;
    p2: string;
    p3: string;
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
    videosTitle: 'Videos & Clips',
    videosDesc: 'Aftermovies & Einblicke in unsere Projekte',
    demosTitle: 'Interaktive Demos',
    demosDesc: 'Teste unsere Civic Tech Prototypen direkt aus',
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
    title: 'Interaktive Prototypen',
    subtitle: 'Erkunde Live-Demos des OK Lab Karlsruhe',
    scanToOpen: 'Auf dem Smartphone öffnen:',
    openPhone: 'Scannen & selbst ausprobieren',
    selectDemo: 'Demo auswählen:'
  },
  media: {
    title: 'Videos & Aftermovies',
    subtitle: 'Impressionen von den Open Data Hack Days & DAS FEST',
    scanToWatch: 'Auf YouTube ansehen:',
    watchPhone: 'Scannen & unterwegs anschauen',
  },
  raffle: {
    title: 'GROSSES GEWINNSPIEL',
    headline: 'Gewinne Mikrocontroller, Sensoren & USB-Ventilatoren!',
    description: 'Teste dein Glück und erfahre mehr über Open Data & Civic Tech in Karlsruhe. Scanne einfach den QR-Code mit deinem Smartphone, um direkt am Gewinnspiel teilzunehmen!',
    callToAction: 'JETZT MITMACHEN!',
    scanPrompt: 'Mit Smartphone scannen & gewinnen'
  },
  about: {
    title: 'Über das OK Lab Karlsruhe',
    p1: 'Wir sind das OK Lab Karlsruhe – eine Gemeinschaft von ehrenamtlichen Civic Tech Begeisterten.',
    p2: 'Wir nutzen offene Daten und digitale Technologien, um unsere Stadt transparenter, nachhaltiger und lebenswerter zu gestalten.',
    p3: 'Unsere Projekte reichen von Umweltanalysen (Datensafari & SensorCity) über Bürgerbeteiligung (Consul) bis hin zu Hardware-Prototypen (CycleSense & Plappernde Kastanie). Mach mit!',
    scanWebsite: 'Website besuchen:',
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
    videosTitle: 'Videos & Clips',
    videosDesc: 'Aftermovies & insights into our projects',
    demosTitle: 'Interactive Demos',
    demosDesc: 'Try out our Civic Tech prototypes live',
    raffleTitle: 'Raffle / Giveaway',
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
    title: 'Interactive Prototypes',
    subtitle: 'Explore live demos created by OK Lab Karlsruhe',
    scanToOpen: 'Open on your smartphone:',
    openPhone: 'Scan to try it on your device',
    selectDemo: 'Select demo:'
  },
  media: {
    title: 'Videos & Aftermovies',
    subtitle: 'Impressions from Open Data Hack Days & DAS FEST',
    scanToWatch: 'Watch on YouTube:',
    watchPhone: 'Scan to watch on your phone',
  },
  raffle: {
    title: 'BIG RAFFLE',
    headline: 'Win Microcontrollers, Sensors & USB Fans!',
    description: 'Test your luck and learn about Open Data & Civic Tech in Karlsruhe. Simply scan the QR code with your smartphone to join the giveaway!',
    callToAction: 'ENTER RAFFLE NOW!',
    scanPrompt: 'Scan with your phone to participate'
  },
  about: {
    title: 'About OK Lab Karlsruhe',
    p1: 'We are OK Lab Karlsruhe – a community of civic tech volunteers.',
    p2: 'We use open data and open-source technology to make our city more transparent, sustainable, and liveable.',
    p3: 'Our projects range from environmental data analysis (Datensafari & SensorCity) to digital participation platforms (Consul) and hardware prototypes (CycleSense & Plappernde Kastanie). Join us!',
    scanWebsite: 'Visit our website:',
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
