import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService, PromotedPage } from '../../services/config.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
            <span class="text-xs sm:text-sm font-bold text-yellow-400 bg-zinc-800 px-3 py-1 rounded-full border border-yellow-400">
              Saved to LocalStorage
            </span>
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
                [class.text-black]="configService.promotedPage() === opt.value"
                [class.border-white]="configService.promotedPage() === opt.value"
                [class.bg-zinc-800]="configService.promotedPage() !== opt.value"
                [class.text-white]="configService.promotedPage() !== opt.value"
                class="flex-1 py-2 px-1 rounded-xl font-black text-xs sm:text-sm border-2 transition-all text-center">
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Promoted Demo Item — horizontal row, shown only for demos -->
          <div *ngIf="configService.promotedPage() === 'demos'" class="flex items-center gap-3 bg-black/60 px-3 py-2 rounded-xl border-2 border-yellow-400 shrink-0">
            <label class="text-xs sm:text-sm font-black text-yellow-300 uppercase whitespace-nowrap w-36 sm:w-44 shrink-0">
              👉 Demo Item
            </label>
            <div class="flex flex-1 gap-2">
              <button 
                *ngFor="let itemOpt of demoItemOptions"
                (click)="onItemSelect(itemOpt.value)"
                [class.bg-yellow-400]="configService.promotedItem() === itemOpt.value"
                [class.text-black]="configService.promotedItem() === itemOpt.value"
                [class.bg-zinc-800]="configService.promotedItem() !== itemOpt.value"
                [class.text-white]="configService.promotedItem() !== itemOpt.value"
                class="flex-1 py-2 px-1 rounded-lg font-bold text-xs sm:text-sm border border-white text-center">
                {{ itemOpt.label }}
              </button>
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
                [class.text-black]="configService.promotedItem() === itemOpt.value"
                [class.bg-zinc-800]="configService.promotedItem() !== itemOpt.value"
                [class.text-white]="configService.promotedItem() !== itemOpt.value"
                class="flex-1 py-2 px-1 rounded-lg font-bold text-xs sm:text-sm border border-white text-center">
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

            <!-- Action Buttons: Copy URL + Reset Configuration -->
            <div class="grid grid-cols-2 gap-3 shrink-0">
              <button 
                (click)="copyToClipboard()"
                class="bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl border-2 sm:border-4 border-white shadow-xl transition-transform active:scale-95">
                {{ copySuccess() ? '✓ COPIED!' : '📋 COPY URL' }}
              </button>

              <button 
                (click)="resetConfig()"
                class="bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl border-2 sm:border-4 border-white shadow-xl transition-transform active:scale-95">
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

  isAuthenticated = signal<boolean>(false);
  passwordInput = '';
  errorMessage = signal<string>('');
  copySuccess = signal<boolean>(false);
  resetSuccess = signal<boolean>(false);

  readonly promoteOptions: { label: string; value: PromotedPage }[] = [
    { label: 'None', value: null },
    { label: '🚀 Demos', value: 'demos' },
    { label: '🎥 Videos', value: 'media' },
    { label: '🎁 Raffle', value: 'raffle' },
    { label: 'ℹ️ About', value: 'about' }
  ];

  readonly demoItemOptions = [
    { label: 'Default', value: null },
    { label: 'Baumkataster', value: 'baumkataster' },
    { label: 'SensorCity', value: 'sensorcity' },
    { label: 'Heatmap', value: 'heatmap' }
  ];

  readonly mediaItemOptions = [
    { label: 'Default', value: null },
    { label: 'Hack Days 2024', value: '0' },
    { label: 'DAS FEST 2025', value: '1' },
    { label: 'Hack Days 2026', value: '2' }
  ];

  ngOnInit(): void {
    this.configService.initConfiguration();
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
    this.configService.setPromotedItem(null);
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
