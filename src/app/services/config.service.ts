import { Injectable, signal } from '@angular/core';

export type PromotedPage = 'demos' | 'media' | 'raffle' | 'about' | null;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly isNonInteractive = signal<boolean>(false);
  readonly promotedPage = signal<PromotedPage>(null);
  readonly promotedItem = signal<string | null>(null);

  constructor() {
    this.parseQueryParams();
  }

  public parseQueryParams(): void {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    
    // Check nonInteractive parameter
    const nonInteractiveParam = urlParams.get('nonInteractive');
    if (nonInteractiveParam === 'true' || nonInteractiveParam === '1') {
      this.isNonInteractive.set(true);
    } else {
      this.isNonInteractive.set(false);
    }

    // Check item/demo/video parameter
    const itemParam = urlParams.get('item') || urlParams.get('demo') || urlParams.get('video');
    if (itemParam) {
      this.promotedItem.set(itemParam.toLowerCase());
    }

    // Check promote parameter
    const promoteParam = urlParams.get('promote')?.toLowerCase();
    if (promoteParam) {
      // Direct subpage shortcuts
      if (promoteParam === 'gewinnspiel' || promoteParam === 'raffle') {
        this.promotedPage.set('raffle');
      } else if (['demos', 'media', 'about'].includes(promoteParam)) {
        this.promotedPage.set(promoteParam as PromotedPage);
      } 
      // Direct subpage content item shortcuts
      else if (['baumkataster', 'sensorcity', 'heatmap'].includes(promoteParam)) {
        this.promotedPage.set('demos');
        this.promotedItem.set(promoteParam);
      } else if (['aftermovie2024', 'aftermovie2025', 'aftermovie2026', 'hackdays2024', 'dasfest2025', 'hackdays2026'].includes(promoteParam)) {
        this.promotedPage.set('media');
        this.promotedItem.set(promoteParam);
      }
    }
  }

  getPromotedRoute(): string | null {
    const promoted = this.promotedPage();
    if (!promoted) return null;
    return `/${promoted}`;
  }
}
