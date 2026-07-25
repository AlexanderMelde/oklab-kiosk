import { Injectable, signal, computed } from '@angular/core';

export interface DemoItem {
  id: string;
  title: string;
  url: string;
  category: 'trees' | 'sensors';
}

export interface DemoCategory {
  id: 'trees' | 'sensors';
  titleKey: 'tabTrees' | 'tabSensors';
  icon: string;
}

export const CATEGORIES: DemoCategory[] = [
  { id: 'trees', titleKey: 'tabTrees', icon: '🌳' },
  { id: 'sensors', titleKey: 'tabSensors', icon: '📡' }
];

export const DEMOS: DemoItem[] = [
  { id: 'baumkataster', title: '🌲 Baumkataster', url: 'https://codeforkarlsruhe.github.io/baumkataster/', category: 'trees' },
  { id: 'platane', title: '💬 Frag die Platane', url: 'https://llama.ok-lab-karlsruhe.de/ragdemo/', category: 'trees' },
  { id: 'papperlapp', title: '🍃 Papperlapp', url: 'https://llama.ok-lab-karlsruhe.de/platane/', category: 'trees' },
  { id: 'sensorcity', title: '⚡ SensorCity Explorer', url: 'https://maxliesegang.github.io/ka-sensorcity-explorer/', category: 'sensors' },
  { id: 'heatmap', title: '🌡️ Sensor Heatmap', url: 'https://neposoft2.de/oklab/sensor/heatmap', category: 'sensors' }
];

@Injectable({
  providedIn: 'root'
})
export class DemoStateService {
  readonly categories = CATEGORIES;
  readonly demos = DEMOS;

  readonly activeCategory = signal<'trees' | 'sensors'>('trees');
  readonly activeDemoId = signal<string>('baumkataster');
  readonly showQrPopup = signal<boolean>(false);

  readonly currentCategoryDemos = computed(() => 
    this.demos.filter(d => d.category === this.activeCategory())
  );

  readonly activeDemo = computed(() => 
    this.demos.find(d => d.id === this.activeDemoId()) || this.demos[0]
  );

  selectCategory(catId: 'trees' | 'sensors'): void {
    this.activeCategory.set(catId);
    if (this.activeDemo().category !== catId) {
      const firstInCat = this.demos.find(d => d.category === catId);
      if (firstInCat) {
        this.selectDemo(firstInCat.id);
      }
    }
  }

  selectDemo(demoId: string): void {
    const demo = this.demos.find(d => d.id === demoId);
    if (demo) {
      this.activeDemoId.set(demoId);
      this.activeCategory.set(demo.category);
    }
  }

  onDemoClick(demoId: string): void {
    if (this.activeDemoId() === demoId) {
      this.showQrPopup.set(true);
    } else {
      this.selectDemo(demoId);
    }
  }
}
