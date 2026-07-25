import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService, PromotedPage } from '../../services/config.service';
import { LanguageService } from '../../services/language.service';
import { DemoStateService, DemoCategoryId } from '../../services/demo-state.service';
import { MediaStateService } from '../../services/media-state.service';
import { HorizontalScrollDirective } from '../../directives/horizontal-scroll.directive';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule, HorizontalScrollDirective],
  template: `
    <div class="h-full w-full bg-black text-white p-3 sm:p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      

      <!-- Password Lock Screen -->
      <div *ngIf="!isAuthenticated()" class="my-auto max-w-md w-full mx-auto bg-zinc-900 border-4 sm:border-8 border-yellow-400 p-6 sm:p-8 rounded-3xl text-center space-y-4 sm:space-y-6 shadow-2xl">
        <div class="text-4xl sm:text-5xl">🔒</div>
        <h2 class="text-2xl sm:text-3xl font-black text-white uppercase">Protected Kiosk Settings</h2>
        <p class="text-sm sm:text-lg font-bold text-gray-300">Enter administrator password to continue:</p>

        <form (ngSubmit)="unlock()" class="space-y-4">
          <input 
            type="password" 
            [(ngModel)]="passwordInput" 
            name="password"
            placeholder="Password"
            class="w-full bg-black border-4 border-cyan-400 rounded-2xl p-3 sm:p-4 text-xl sm:text-2xl text-center font-bold text-yellow-300 focus:outline-none focus:border-yellow-400"
            required />

          <button 
            type="submit" 
            class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 sm:py-4 rounded-2xl font-black text-xl sm:text-2xl border-4 border-white shadow-xl transition-transform active:scale-95">
            UNLOCK CONFIGURATOR
          </button>
        </form>

        <p *ngIf="errorMessage()" class="text-red-500 font-black text-base sm:text-xl bg-red-950 p-2 sm:p-3 rounded-xl border-2 border-red-500">
          {{ errorMessage() }}
        </p>
      </div>

      <!-- Authenticated Generator Panel (Fills available space, zero scrolling) -->
      <main *ngIf="isAuthenticated()" class="my-auto w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-3 overflow-hidden shadow-2xl">

          <!-- Header Title -->
          <div class="flex items-center justify-between border-b-2 sm:border-b-4 border-cyan-400 pb-2 shrink-0">
            <h2 class="text-xl sm:text-3xl font-black text-cyan-400 uppercase tracking-tight">
              ⚙️ Kiosk Configuration
            </h2>
            <div class="flex items-center gap-2">
              <button 
                (click)="toggleFullscreen()"
                class="text-xs sm:text-sm font-bold text-cyan-300 bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full border border-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer">
                {{ isFullscreen() ? '⤓ EXIT FULLSCREEN' : '⤢ ENTER FULLSCREEN' }}
              </button>
              <span class="text-xs sm:text-sm font-bold text-yellow-400 bg-zinc-800 px-3 py-1 rounded-full border border-yellow-400">
                Saved to LocalStorage
              </span>
            </div>
          </div>

          <!-- Parameter 1: Promote Subpage — horizontal label + buttons row -->
          <div class="flex items-center gap-3 shrink-0">
            <label class="text-sm sm:text-base font-black text-yellow-400 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
              1. Promoted Page
            </label>
            <div class="flex flex-1 gap-2">
              <button 
                *ngFor="let opt of promoteOptions"
                (click)="onPromoteSelect(opt.value)"
                [class.bg-yellow-400]="configService.promotedPage() === opt.value"
                [class.bg-zinc-800]="configService.promotedPage() !== opt.value"
                [class.border-white]="configService.promotedPage() === opt.value"
                [class.border-zinc-600]="configService.promotedPage() !== opt.value"
                [style.color]="configService.promotedPage() === opt.value ? '#000' : '#fff'"
                class="flex-1 py-2 px-1 rounded-xl font-black text-xs sm:text-sm border-2 transition-all text-center">
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Promoted Demo Selection — Intermediary Category Layer + Demo Items -->
          <div *ngIf="configService.promotedPage() === 'demos'" class="flex flex-col gap-3 bg-black/60 p-3 rounded-xl border-2 border-yellow-400 shrink-0">
            
            <!-- Category Intermediary Layer -->
            <div class="flex items-center gap-3">
              <label class="text-xs sm:text-sm font-black text-yellow-300 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
                👉 Category
              </label>
              <div class="flex flex-1 gap-2 overflow-x-auto py-0.5 items-center" appHorizontalScroll>
                <button 
                  (click)="setCategory('all')"
                  [class.bg-yellow-400]="selectedCategory() === 'all'"
                  [class.text-black]="selectedCategory() === 'all'"
                  [class.border-white]="selectedCategory() === 'all'"
                  [class.bg-zinc-800]="selectedCategory() !== 'all'"
                  [class.text-white]="selectedCategory() !== 'all'"
                  [class.border-zinc-600]="selectedCategory() !== 'all'"
                  class="py-1.5 px-3 rounded-lg font-bold text-xs sm:text-sm border transition-all text-center whitespace-nowrap shrink-0 mr-2">
                  🌐 {{ lang.currentLang() === 'de' ? 'Alle Kategorien' : 'All Categories' }}
                </button>
                <button 
                  *ngFor="let cat of demoService.categories"
                  (click)="setCategory(cat.id)"
                  [class.bg-yellow-400]="selectedCategory() === cat.id"
                  [class.text-black]="selectedCategory() === cat.id"
                  [class.border-white]="selectedCategory() === cat.id"
                  [class.bg-zinc-800]="selectedCategory() !== cat.id"
                  [class.text-white]="selectedCategory() !== cat.id"
                  [class.border-zinc-600]="selectedCategory() !== cat.id"
                  class="py-1.5 px-3 rounded-lg font-bold text-xs sm:text-sm border transition-all text-center whitespace-nowrap shrink-0">
                  {{ cat.icon }} {{ getCategoryTitle(cat.titleKey) }}
                </button>
              </div>
            </div>

            <!-- Demo Item Layer -->
            <div class="flex items-center gap-3 border-t border-zinc-800/80 pt-2.5">
              <label class="text-xs sm:text-sm font-black text-yellow-300 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
                👉 Demo Item
              </label>
              <div class="flex flex-1 gap-2.5 overflow-x-auto py-0.5 max-h-24 sm:max-h-28 overflow-y-auto" appHorizontalScroll>
                <button 
                  *ngFor="let demo of filteredDemos()"
                  (click)="onItemSelect(demo.id)"
                  [class.bg-yellow-400]="configService.promotedItem() === demo.id"
                  [class.text-black]="configService.promotedItem() === demo.id"
                  [class.border-white]="configService.promotedItem() === demo.id"
                  [class.bg-zinc-800]="configService.promotedItem() !== demo.id"
                  [class.text-white]="configService.promotedItem() !== demo.id"
                  [class.border-zinc-600]="configService.promotedItem() !== demo.id"
                  class="py-1.5 px-3 rounded-lg font-bold text-xs sm:text-sm border transition-all text-center whitespace-nowrap shrink-0">
                  {{ demo.title }}
                </button>
              </div>
            </div>

          </div>

          <!-- Promoted Video Item — horizontal row, shown only for media -->
          <div *ngIf="configService.promotedPage() === 'media'" class="flex items-center gap-3 bg-black/60 px-3 py-2 rounded-xl border-2 border-cyan-400 shrink-0">
            <label class="text-xs sm:text-sm font-black text-cyan-300 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
              👉 Video Item
            </label>
            <div class="flex flex-1 gap-2">
              <button 
                *ngFor="let itemOpt of mediaItemOptions"
                (click)="onItemSelect(itemOpt.value)"
                [class.bg-cyan-400]="configService.promotedItem() === itemOpt.value"
                [class.bg-zinc-800]="configService.promotedItem() !== itemOpt.value"
                [style.color]="configService.promotedItem() === itemOpt.value ? '#000' : '#fff'"
                class="flex-1 py-2 px-1 rounded-lg font-bold text-xs sm:text-sm border border-zinc-600 text-center">
                {{ itemOpt.label }}
              </button>
            </div>
          </div>

          <!-- Parameter 2: Language — horizontal label + buttons row -->
          <div class="flex items-center gap-3 border-t-2 border-zinc-800 pt-3 shrink-0">
            <label class="text-sm sm:text-base font-black text-yellow-300 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
              2. Language
            </label>
            <div class="flex flex-1 gap-2">
              <button 
                (click)="lang.setLanguage('de')"
                [class.bg-yellow-400]="lang.currentLang() === 'de'"
                [class.text-black]="lang.currentLang() === 'de'"
                [class.bg-zinc-800]="lang.currentLang() !== 'de'"
                [class.text-white]="lang.currentLang() !== 'de'"
                class="flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm border border-white text-center">
                🇩🇪 German (DE)
              </button>
              <button 
                (click)="lang.setLanguage('en')"
                [class.bg-yellow-400]="lang.currentLang() === 'en'"
                [class.text-black]="lang.currentLang() === 'en'"
                [class.bg-zinc-800]="lang.currentLang() !== 'en'"
                [class.text-white]="lang.currentLang() !== 'en'"
                class="flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm border border-white text-center">
                🇬🇧 English (EN)
              </button>
            </div>
          </div>

          <!-- Parameter 3: Non-Interactive Mode -->
          <div class="border-t-2 border-zinc-800 pt-3 shrink-0">
            <div (click)="toggleNonInteractive()" class="bg-black border-2 sm:border-4 border-cyan-400 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
              <div>
                <div class="text-sm sm:text-base font-black text-cyan-400 uppercase">3. Display Mode</div>
                <div class="text-sm sm:text-lg font-black text-white mt-0.5">Non-Interactive Mode (Full Screen Showcase)</div>
                <div class="text-gray-400 font-bold text-xs sm:text-sm mt-0.5">
                  Launches promoted item full screen without navigation bar or buttons.
                </div>
              </div>
              <div 
                [class.bg-cyan-400]="configService.isNonInteractive()"
                [class.text-black]="configService.isNonInteractive()"
                [class.bg-zinc-800]="!configService.isNonInteractive()"
                [class.text-gray-400]="!configService.isNonInteractive()"
                class="px-4 py-2 rounded-xl font-black text-sm sm:text-lg border border-white shrink-0 ml-3">
                {{ configService.isNonInteractive() ? 'ENABLED' : 'DISABLED' }}
              </div>
            </div>
          </div>

          <!-- Generated Kiosk URL & Action Buttons -->
          <div class="flex-1 flex flex-col gap-3 border-t-2 border-zinc-800 pt-3 min-h-0">
            <label class="text-sm sm:text-base font-black text-yellow-300 uppercase shrink-0">
              4. Generated Target URL
            </label>

            <div class="flex-1 bg-black border-2 sm:border-4 border-yellow-400 rounded-xl p-3 font-mono text-xs sm:text-base text-yellow-300 break-all select-all overflow-auto">
              {{ generatedUrl() }}
            </div>

            <!-- Action Buttons: Fullscreen + Copy URL + Reset Configuration -->
            <div class="grid grid-cols-3 gap-3 shrink-0">
              <button 
                (click)="toggleFullscreen()"
                class="bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg border-2 sm:border-4 border-white shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-1">
                {{ isFullscreen() ? '⤓ EXIT FULLSCREEN' : '⤢ FULLSCREEN' }}
              </button>

              <button 
                (click)="copyToClipboard()"
                class="bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg border-2 sm:border-4 border-white shadow-xl transition-transform active:scale-95">
                {{ copySuccess() ? '✓ COPIED!' : '📋 COPY URL' }}
              </button>

              <button 
                (click)="resetConfig()"
                class="bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg border-2 sm:border-4 border-white shadow-xl transition-transform active:scale-95">
                {{ resetSuccess() ? '✓ RESET DONE!' : '🔄 RESET CONFIG' }}
              </button>
            </div>
          </div>

      </main>

    </div>
  `
})
export class ConfigComponent implements OnInit {
  readonly configService = inject(ConfigService);
  readonly lang = inject(LanguageService);
  readonly demoService = inject(DemoStateService);
  readonly mediaService = inject(MediaStateService);

  isAuthenticated = signal<boolean>(false);
  passwordInput = '';
  errorMessage = signal<string>('');
  copySuccess = signal<boolean>(false);
  resetSuccess = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);

  selectedCategory = signal<DemoCategoryId | 'all'>('all');

  readonly promoteOptions: { label: string; value: PromotedPage }[] = [
    { label: 'None', value: null },
    { label: '🚀 Demos', value: 'demos' },
    { label: '🎥 Videos', value: 'media' },
    { label: '🎁 Raffle', value: 'raffle' },
    { label: 'ℹ️ About', value: 'about' }
  ];

  get mediaItemOptions() {
    return [
      { label: 'Default', value: null },
      ...this.mediaService.videos.map(v => ({ label: v.title, value: v.id }))
    ];
  }

  getCategoryTitle(titleKey: string): string {
    const t = this.lang.t().demos as Record<string, any>;
    return t[titleKey] || titleKey;
  }

  readonly filteredDemos = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') {
      return this.demoService.demos;
    }
    return this.demoService.demos.filter(d => d.category === cat);
  });

  ngOnInit(): void {
    this.configService.initConfiguration();
    const currentItem = this.configService.promotedItem();
    if (currentItem) {
      const demo = this.demoService.demos.find(d => d.id === currentItem);
      if (demo) {
        this.selectedCategory.set(demo.category);
      }
    } else if (this.configService.promotedPage() === 'demos') {
      const firstDemo = this.demoService.demos[0]?.id || null;
      if (firstDemo) {
        this.configService.setPromotedItem(firstDemo);
      }
    }

    this.checkFullscreen();
    if (typeof document !== 'undefined') {
      document.addEventListener('fullscreenchange', () => this.checkFullscreen());
      document.addEventListener('webkitfullscreenchange', () => this.checkFullscreen());
      document.addEventListener('mozfullscreenchange', () => this.checkFullscreen());
      document.addEventListener('MSFullscreenChange', () => this.checkFullscreen());
    }
  }

  private checkFullscreen(): void {
    if (typeof document !== 'undefined') {
      const doc = document as any;
      const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
      this.isFullscreen.set(isFs);
    }
  }

  toggleFullscreen(): void {
    if (typeof document === 'undefined') return;
    const doc = document as any;
    const docEl = document.documentElement as any;

    if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  }

  unlock(): void {
    if (this.passwordInput === 'oklab') {
      this.isAuthenticated.set(true);
      this.errorMessage.set('');
    } else {
      this.errorMessage.set('Incorrect password!');
    }
  }

  onPromoteSelect(value: PromotedPage): void {
    this.configService.setPromotedPage(value);
    if (value === 'demos') {
      this.selectedCategory.set('all');
      const firstDemo = this.demoService.demos[0]?.id || null;
      this.configService.setPromotedItem(firstDemo);
    } else {
      this.configService.setPromotedItem(null);
    }
  }

  setCategory(cat: DemoCategoryId | 'all'): void {
    this.selectedCategory.set(cat);
    const demos = cat === 'all' 
      ? this.demoService.demos 
      : this.demoService.demos.filter(d => d.category === cat);
    
    const currentItem = this.configService.promotedItem();
    const exists = demos.some(d => d.id === currentItem);
    if (!exists && demos.length > 0) {
      this.configService.setPromotedItem(demos[0].id);
    }
  }

  onItemSelect(value: string | null): void {
    this.configService.setPromotedItem(value);
  }

  toggleNonInteractive(): void {
    this.configService.setNonInteractive(!this.configService.isNonInteractive());
  }

  resetConfig(): void {
    this.configService.resetConfiguration();
    this.resetSuccess.set(true);
    setTimeout(() => this.resetSuccess.set(false), 2500);
  }

  generatedUrl(): string {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://oklabkiosk.melde.net';
    const params: string[] = [];

    const promoted = this.configService.promotedPage();
    if (promoted) {
      params.push(`promote=${promoted}`);
    }

    const item = this.configService.promotedItem();
    if (item) {
      params.push(`item=${item}`);
    }

    const currentLang = this.lang.currentLang();
    if (currentLang) {
      params.push(`lang=${currentLang}`);
    }

    if (this.configService.isNonInteractive()) {
      params.push(`nonInteractive=true`);
    }

    if (params.length === 0) {
      return `${base}/`;
    }

    return `${base}/?${params.join('&')}`;
  }

  copyToClipboard(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.generatedUrl());
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2500);
    }
  }
}
