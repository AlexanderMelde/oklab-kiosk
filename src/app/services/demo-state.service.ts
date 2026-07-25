import { Injectable, signal, computed } from '@angular/core';

export type DemoCategoryId = 'environment' | 'sensors' | 'supply' | 'mobility' | 'politics';

export interface DemoItem {
  id: string;
  title: string;
  url: string;
  category: DemoCategoryId;
  description: string;
  noEmbed?: boolean;
}

export interface DemoCategory {
  id: DemoCategoryId;
  titleKey: 'tabEnvironment' | 'tabSensors' | 'tabSupply' | 'tabMobility' | 'tabPolitics';
  icon: string;
}

export const CATEGORIES: DemoCategory[] = [
  { id: 'environment', titleKey: 'tabEnvironment', icon: '🌱' },
  { id: 'sensors', titleKey: 'tabSensors', icon: '📡' },
  { id: 'supply', titleKey: 'tabSupply', icon: '🛒' },
  { id: 'mobility', titleKey: 'tabMobility', icon: '🚲' },
  { id: 'politics', titleKey: 'tabPolitics', icon: '🏛️' }
];

export const DEMOS: DemoItem[] = [
  // Kategorie Umwelt
  {
    id: 'baumkataster',
    title: '🌲 Baumkataster',
    url: 'https://codeforkarlsruhe.github.io/baumkataster/',
    category: 'environment',
    description: 'Interaktive Baumkarte für Karlsruhe mit Informationen zu Baumarten, Alter und Standort.'
  },
  {
    id: 'platane',
    title: '💬 Frag die Platane',
    url: 'https://llama.ok-lab-karlsruhe.de/ragdemo/',
    category: 'environment',
    description: 'RAG-basiertes Sprach-Interface für Fragen rund um Bäume und Umwelt in Karlsruhe.'
  },
  {
    id: 'papperlapp',
    title: '🍃 Plaudernde Platane',
    url: 'https://llama.ok-lab-karlsruhe.de/platane/',
    category: 'environment',
    description: "Die plaudernde Platane 'Papperlapp' ist ein experimenteller Chatbot des OK-Lab Karlsruhe. Über Spracheingabe können Nutzer direkt mit dem virtuellen Baum über Umwelt- und Klimaschutzthemen diskutieren."
  },
  {
    id: 'auenlaend',
    title: '🐸 Auenländ ChatBot',
    url: 'https://auenlaend.ok-lab-karlsruhe.de/',
    category: 'environment',
    description: 'Ein zivilgesellschaftliches Frontend-Projekt für den KI-Umwelt-Chatbot KarlA. Es visualisiert komplexe ökologische Daten der Karlsruher Rheinauen und fördert interaktives Naturverständnis.'
  },
  {
    id: 'klimawatch',
    title: '🌍 Klimawatch',
    url: 'https://klimawatch.de/',
    category: 'environment',
    description: 'Wie siehts aus mit Klimaschutz in meiner Kommune?'
  },
  {
    id: 'co2runter',
    title: '📉 CO₂ runter',
    url: 'https://co2runter.ok-lab-karlsruhe.de/',
    category: 'environment',
    description: 'Rechner: Wie viel CO2 könnte ich einsparen?'
  },

  // Kategorie Sensoren
  {
    id: 'sensor-community',
    title: '🌐 Sensor.community',
    url: 'https://maps.sensor.community/',
    category: 'sensors',
    description: 'Sensor.community ist ein von vielen Mitwirkenden betriebenes, globales Sensornetzwerk, das open data Umweltdaten generiert.'
  },
  {
    id: 'sensorcity',
    title: '⚡ SensorCity Explorer',
    url: 'https://maxliesegang.github.io/ka-sensorcity-explorer/',
    category: 'sensors',
    description: 'Erkundungstool für Umwelt- und Feinstaub-Sensoren im Stadtgebiet Karlsruhe.'
  },
  {
    id: 'sensorcity-dashboard',
    title: '⚡ SensorCity',
    url: 'https://geoportal.karlsruhe.de/sensorcity/Dashboard/',
    category: 'sensors',
    description: 'Offizielles Dashboard für städtische Umwelt- und Feinstaub-Sensoren im Stadtgebiet Karlsruhe.'
  },
  {
    id: 'heatmap',
    title: '🌡️ Sensor Heatmap',
    url: 'https://neposoft2.de/oklab/sensor/heatmap',
    category: 'sensors',
    description: 'Heatmap-Visualisierung von Temperatur und Feinstaubwerten in Echtzeit.'
  },
  {
    id: 'nachbarschafts-sensor',
    title: '🏡 Nachbarschafts-Sensor',
    url: 'https://ok-lab-demo.lovable.app/',
    category: 'sensors',
    description: 'Infoseite eines auf dem DAS FEST 2026 vorgestellten Hardware-Prototyps: Misst Luftqualität (CO₂, Feinstaub) und Lärmpegel (Edge-AI) direkt in der Straße – mit Arduino Uno Q, offenen Daten und ohne Tracking.'
  },

  // Kategorie Lokale Versorgung
  {
    id: 'wo-ist-markt',
    title: '🛒 Wo ist Markt?',
    url: 'https://www.wo-ist-markt.de/#karlsruhe',
    category: 'supply',
    description: 'Eine dynamische Geodaten-Anwendung zur Visualisierung von Wochenmärkten im Raum Karlsruhe. Durch die tagesaktuelle Filterung wird die städtische Nahversorgung für Bürger transparent und leicht zugänglich.'
  },
  {
    id: 'farmshops',
    title: '🌾 Farmshops DACH',
    url: 'https://farmshops.eu',
    category: 'supply',
    description: 'Europaweite Übersichtskarte für lokale Direktvermarkter wie Hofläden und Automaten. Die Plattform aggregiert OpenStreetMap-Daten, deckt Erfassungslücken auf und stärkt aktiv regionale Wirtschaftskreisläufe.'
  },

  // Kategorie Verkehr & Mobilität
  {
    id: 'bike-accident-map',
    title: '🚴 Bike Accident Map',
    url: 'https://maxliesegang.github.io/ppka-bike-accident-map/',
    category: 'mobility',
    description: 'Spezialisierte Mapping-Anwendung zur punktgenauen Visualisierung von Fahrradunfällen in Karlsruhe. Das Werkzeug dient der Identifikation urbaner Gefahrenzonen und unterstützt datengetriebene Verkehrspolitik.'
  },
  {
    id: 'bike-parking',
    title: '🅿️ Bike Parking Karlsruhe',
    url: 'https://maxliesegang.github.io/bike-parking-karlsruhe/',
    category: 'mobility',
    description: 'Interaktive Kartierung der Karlsruher Fahrradstellplätze basierend auf offenen Geodaten. Die Plattform hilft bei der Routenplanung und visualisiert gleichzeitig infrastrukturelle Ausbaubedarfe in der Stadt.'
  },
  {
    id: 'ka-laufweite',
    title: '🚶 KA Laufweite',
    url: 'https://maxliesegang.github.io/ka-laufweite/',
    category: 'mobility',
    description: 'Analysetool zur Berechnung der fußläufigen Erreichbarkeit von ÖPNV-Haltestellen. Durch anpassbare Radien liefert die Karte essenzielle Metriken zur Evaluation der städtischen Verkehrsgerechtigkeit.'
  },
  {
    id: 'travic',
    title: '🚊 TRAVIC Transit',
    url: 'https://travic.app',
    category: 'mobility',
    description: 'Ein technologisches Meisterwerk der Universität Freiburg zur weltweiten Live-Visualisierung des öffentlichen Nahverkehrs. Das System fusioniert statische GTFS-Fahrpläne nahtlos mit dynamischen Echtzeitdaten.',
    noEmbed: true
  },
  {
    id: 'access-map',
    title: '♿ Access Map',
    url: 'https://accessmap.karlsruhe.codefor.de/',
    category: 'mobility',
    description: 'Wie sieht Karlsruhe für Rollstuhlfahrer aus? Visualisierung der Barrierefreiheit von Karlsruher ÖPNV Haltestellen.'
  },
  {
    id: 'osm-live-edit',
    title: '🌐 OSM Live Edit',
    url: 'https://osmlab.github.io/show-me-the-way/',
    category: 'mobility',
    description: 'See OpenStreetMap edits happen in real time.'
  },

  // Kategorie Kommunalpolitik
  {
    id: 'karlsruhe-haushalt',
    title: '📊 KA Haushalt',
    url: 'https://maxliesegang.github.io/karlsruhe-haushalt',
    category: 'politics',
    description: 'Webbasierte Visualisierung des Karlsruher Kommunalhaushalts. Die Applikation übersetzt abstrakte fiskalische Datenströme in interaktive Grafiken und erleichtert die bürgerschaftliche Teilhabe an Finanzen.'
  },
  {
    id: 'verwaltungstracker',
    title: '🏛️ VerwaltungsTracker',
    url: 'https://verwaltungstracker.de/',
    category: 'politics',
    description: 'Ein zivilgesellschaftliches Kontrollinstrument, das über 60 kommunale Vorhaben in Karlsruhe überwacht. Es dokumentiert Planungsfortschritte und fördert eine gerechte sozial-ökologische Stadtentwicklung.'
  },
  {
    id: 'oparl-viewer',
    title: '📜 KA OParl Viewer',
    url: 'https://maxliesegang.github.io/karlsruhe-oparl-viewer/',
    category: 'politics',
    description: 'Ein hochperformantes Suchwerkzeug, das über die OParl-Schnittstelle kommunale Dokumente ausliest. Mittels astro-pagefind ermöglicht es eine schnelle Volltextsuche und stärkt die politische Transparenz.'
  },
  {
    id: 'fragify',
    title: '🔍 Fragify',
    url: 'https://fragify.project-insanity.org/',
    category: 'politics',
    description: 'Ein intelligenter Link-Generator für das Portal FragDenStaat.de. Durch vorausgefüllte Formulare senkt das Tool die administrativen Hürden für IFG-Anfragen und demokratisiert den Zugang zu Behördendaten.'
  },
  {
    id: 'meinantrag',
    title: '📝 MeinAntrag',
    url: 'https://meinantrag.project-insanity.org/',
    category: 'politics',
    description: 'Digitale Hilfsplattform zur Entbürokratisierung studentischer Verwaltungsprozesse. Sie unterstützt zielgerichtet bei komplexen Antragsverfahren, wie der Beantragung eines BAföG-Flexibilitätssemesters.'
  },
  {
    id: 'ifg-petition',
    title: '📢 Rettet das IFG!',
    url: 'https://weact.campact.de/petitions/spd-stoppt-den-frontalangriff-auf-die-informationsfreiheit',
    category: 'politics',
    description: 'Wir alle haben das Recht auf staatliche Informationen. Seit 2006 müssen Behörden auf Antrag nach dem IFG Dokumente herausgeben – Verträge, Weisungen oder E-Mails. Das IFG ist eine zentrale Säule der Demokratie in Deutschland.',
    noEmbed: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class DemoStateService {
  readonly categories = CATEGORIES;
  readonly demos = DEMOS;

  readonly activeCategory = signal<DemoCategoryId>('environment');
  readonly activeDemoId = signal<string>('baumkataster');
  readonly showQrPopup = signal<boolean>(false);

  readonly currentCategoryDemos = computed(() =>
    this.demos.filter(d => d.category === this.activeCategory())
  );

  readonly activeDemo = computed(() =>
    this.demos.find(d => d.id === this.activeDemoId()) || this.demos[0]
  );

  constructor() {
    this.initHashListener();
  }

  private initHashListener(): void {
    if (typeof window !== 'undefined') {
      this.checkUrlHash();
      window.addEventListener('hashchange', () => {
        this.checkUrlHash();
      });
    }
  }

  private checkUrlHash(): void {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#/, '').toLowerCase();
    if (hash) {
      const demo = this.findDemo(hash);
      if (demo) {
        this.selectDemo(demo.id, false);
      }
    }
  }

  findDemo(query: string | null | undefined): DemoItem | undefined {
    if (!query) return undefined;
    const q = query.toLowerCase().trim();
    if (!q) return undefined;

    // 1. Exact ID match
    const exact = this.demos.find(d => d.id.toLowerCase() === q);
    if (exact) return exact;

    // 2. Substring match on ID or query
    return this.demos.find(d => {
      const id = d.id.toLowerCase();
      return id.includes(q) || q.includes(id);
    });
  }

  selectCategory(catId: DemoCategoryId): void {
    this.activeCategory.set(catId);
    if (this.activeDemo().category !== catId) {
      const firstInCat = this.demos.find(d => d.category === catId);
      if (firstInCat) {
        this.selectDemo(firstInCat.id);
      }
    }
  }

  selectDemo(demoIdOrQuery: string, updateHash: boolean = true): void {
    const demo = this.findDemo(demoIdOrQuery);
    if (demo) {
      this.activeDemoId.set(demo.id);
      this.activeCategory.set(demo.category);

      if (updateHash && typeof window !== 'undefined') {
        const newUrl = window.location.pathname + window.location.search + '#' + demo.id;
        window.history.replaceState(null, '', newUrl);
      }
    }
  }

  onDemoClick(demoId: string): void {
    const demo = this.findDemo(demoId);
    if (!demo) return;

    if (this.activeDemoId() === demo.id) {
      this.showQrPopup.set(true);
    } else {
      this.selectDemo(demo.id);
    }
  }
}
