import { Injectable, signal } from '@angular/core';

export type PromotedPage = 'demos' | 'media' | 'raffle' | 'about' | null;

const STORAGE_KEYS = {
  PROMOTED_PAGE: 'oklab_kiosk_promoted_page',
  PROMOTED_ITEM: 'oklab_kiosk_promoted_item',
  NON_INTERACTIVE: 'oklab_kiosk_non_interactive'
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly isNonInteractive = signal<boolean>(false);
  readonly promotedPage = signal<PromotedPage>(null);
  readonly promotedItem = signal<string | null>(null);

  constructor() {
    this.initConfiguration();
  }

  public initConfiguration(): void {
    if (typeof window === 'undefined') return;

    // 1. Load from localStorage first
    try {
      const savedPage = localStorage.getItem(STORAGE_KEYS.PROMOTED_PAGE);
      if (savedPage && ['demos', 'media', 'raffle', 'about'].includes(savedPage)) {
        this.promotedPage.set(savedPage as PromotedPage);
      } else {
        this.promotedPage.set(null);
      }

      const savedItem = localStorage.getItem(STORAGE_KEYS.PROMOTED_ITEM);
      this.promotedItem.set(savedItem || null);

      const savedNonInteractive = localStorage.getItem(STORAGE_KEYS.NON_INTERACTIVE);
      this.isNonInteractive.set(savedNonInteractive === 'true');
    } catch (_) {}

    // 2. Parse query parameters (URL params take precedence and persist to localStorage)
    this.parseQueryParams();
  }

  public parseQueryParams(): void {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    let hasQueryParams = false;

    // Check nonInteractive parameter
    const nonInteractiveParam = urlParams.get('nonInteractive');
    if (nonInteractiveParam !== null) {
      hasQueryParams = true;
      const isVal = nonInteractiveParam === 'true' || nonInteractiveParam === '1';
      this.setNonInteractive(isVal);
    }

    // Check item/demo/video parameter
    const itemParam = urlParams.get('item') || urlParams.get('demo') || urlParams.get('video');
    if (itemParam !== null) {
      hasQueryParams = true;
      this.setPromotedItem(itemParam.toLowerCase());
    }

    // Check promote parameter
    const promoteParam = urlParams.get('promote')?.toLowerCase();
    if (promoteParam !== undefined && promoteParam !== null) {
      hasQueryParams = true;
      if (promoteParam === 'none' || promoteParam === 'null' || promoteParam === '') {
        this.setPromotedPage(null);
      } else if (promoteParam === 'gewinnspiel' || promoteParam === 'raffle') {
        this.setPromotedPage('raffle');
      } else if (['demos', 'media', 'about'].includes(promoteParam)) {
        this.setPromotedPage(promoteParam as PromotedPage);
      } else if (['baumkataster', 'sensorcity', 'heatmap'].includes(promoteParam)) {
        this.setPromotedPage('demos');
        this.setPromotedItem(promoteParam);
      } else if (['aftermovie2024', 'aftermovie2025', 'aftermovie2026', 'hackdays2024', 'dasfest2025', 'hackdays2026'].includes(promoteParam)) {
        this.setPromotedPage('media');
        this.setPromotedItem(promoteParam);
      }
    }
  }

  public setPromotedPage(page: PromotedPage): void {
    this.promotedPage.set(page);
    if (typeof window !== 'undefined') {
      try {
        if (page) {
          localStorage.setItem(STORAGE_KEYS.PROMOTED_PAGE, page);
        } else {
          localStorage.removeItem(STORAGE_KEYS.PROMOTED_PAGE);
        }
      } catch (_) {}
    }
  }

  public setPromotedItem(item: string | null): void {
    this.promotedItem.set(item);
    if (typeof window !== 'undefined') {
      try {
        if (item) {
          localStorage.setItem(STORAGE_KEYS.PROMOTED_ITEM, item);
        } else {
          localStorage.removeItem(STORAGE_KEYS.PROMOTED_ITEM);
        }
      } catch (_) {}
    }
  }

  public setNonInteractive(val: boolean): void {
    this.isNonInteractive.set(val);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.NON_INTERACTIVE, String(val));
      } catch (_) {}
    }
  }

  public resetConfiguration(): void {
    this.promotedPage.set(null);
    this.promotedItem.set(null);
    this.isNonInteractive.set(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEYS.PROMOTED_PAGE);
        localStorage.removeItem(STORAGE_KEYS.PROMOTED_ITEM);
        localStorage.removeItem(STORAGE_KEYS.NON_INTERACTIVE);
      } catch (_) {}
    }
  }
}
