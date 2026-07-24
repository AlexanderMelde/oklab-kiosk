import { Injectable, signal } from '@angular/core';

export type PromotedPage = 'demos' | 'media' | 'raffle' | 'about' | 'gewinnspiel' | null;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly isNonInteractive = signal<boolean>(false);
  readonly promotedPage = signal<PromotedPage>(null);

  constructor() {
    this.parseQueryParams();
  }

  private parseQueryParams(): void {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    
    // Check nonInteractive parameter
    const nonInteractiveParam = urlParams.get('nonInteractive');
    if (nonInteractiveParam === 'true' || nonInteractiveParam === '1') {
      this.isNonInteractive.set(true);
    }

    // Check promote parameter
    const promoteParam = urlParams.get('promote')?.toLowerCase();
    if (promoteParam) {
      if (promoteParam === 'gewinnspiel' || promoteParam === 'raffle') {
        this.promotedPage.set('raffle');
      } else if (['demos', 'media', 'about'].includes(promoteParam)) {
        this.promotedPage.set(promoteParam as PromotedPage);
      }
    }
  }

  getPromotedRoute(): string | null {
    const promoted = this.promotedPage();
    if (!promoted) return null;
    return `/${promoted}`;
  }
}
