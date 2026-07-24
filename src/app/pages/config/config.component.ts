import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule, LanguageToggleComponent],
  template: `
    <div class="h-full w-full bg-black text-white p-6 md:p-10 flex flex-col justify-between select-none overflow-y-auto">
      
      <!-- Top Title & Language Switcher -->
      <header class="border-b-4 border-yellow-400 pb-4 mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-4xl md:text-5xl font-black text-yellow-400 uppercase tracking-tight">
            ⚙️ Kiosk Configurator
          </h1>
          <p class="text-xl md:text-2xl font-bold text-gray-300">
            Generate custom kiosk URLs for physical displays
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <app-language-toggle></app-language-toggle>

          <button 
            (click)="goHome()"
            class="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-2xl border-4 border-zinc-600 font-extrabold text-xl">
            ← Exit
          </button>
        </div>
      </header>

      <!-- Password Lock Screen -->
      <div *ngIf="!isAuthenticated()" class="my-auto max-w-md w-full mx-auto bg-zinc-900 border-8 border-yellow-400 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
        <div class="text-5xl">🔒</div>
        <h2 class="text-3xl font-black text-white uppercase">Protected Kiosk Settings</h2>
        <p class="text-lg font-bold text-gray-300">Enter administrator password to continue:</p>

        <form (ngSubmit)="unlock()" class="space-y-4">
          <input 
            type="password" 
            [(ngModel)]="passwordInput" 
            name="password"
            placeholder="Password"
            class="w-full bg-black border-4 border-cyan-400 rounded-2xl p-4 text-2xl text-center font-bold text-yellow-300 focus:outline-none focus:border-yellow-400"
            required />

          <button 
            type="submit" 
            class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-black text-2xl border-4 border-white shadow-xl transition-transform active:scale-95">
            UNLOCK CONFIGURATOR
          </button>
        </form>

        <p *ngIf="errorMessage()" class="text-red-500 font-black text-xl bg-red-950 p-3 rounded-xl border-2 border-red-500">
          {{ errorMessage() }}
        </p>
      </div>

      <!-- Authenticated Generator Panel -->
      <main *ngIf="isAuthenticated()" class="my-auto max-w-4xl w-full mx-auto bg-zinc-900 border-8 border-cyan-400 p-8 rounded-3xl space-y-8 shadow-2xl">
        
        <!-- Parameter 1: Promote Subpage -->
        <div class="space-y-3">
          <label class="text-2xl font-black text-yellow-400 block uppercase">
            1. Promoted Subpage (?promote=...)
          </label>
          <p class="text-gray-300 text-lg font-extrabold">
            Automatically bypasses home screen and opens the selected page directly.
          </p>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            <button 
              *ngFor="let opt of promoteOptions"
              (click)="onPromoteSelect(opt.value)"
              [class.bg-yellow-400]="selectedPromote() === opt.value"
              [class.text-black]="selectedPromote() === opt.value"
              [class.border-white]="selectedPromote() === opt.value"
              [class.bg-zinc-800]="selectedPromote() !== opt.value"
              [class.text-white]="selectedPromote() !== opt.value"
              class="p-4 rounded-2xl font-black text-xl border-4 transition-all text-center">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Parameter 1b: Subpage Content Level Item Selection -->
        <div *ngIf="selectedPromote() === 'demos'" class="space-y-3 bg-black/60 p-5 rounded-2xl border-4 border-yellow-400">
          <label class="text-xl font-black text-yellow-300 block uppercase">
            👉 Specific Demo Item (?item=...)
          </label>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button 
              *ngFor="let itemOpt of demoItemOptions"
              (click)="selectedItem.set(itemOpt.value)"
              [class.bg-yellow-400]="selectedItem() === itemOpt.value"
              [class.text-black]="selectedItem() === itemOpt.value"
              [class.bg-zinc-800]="selectedItem() !== itemOpt.value"
              [class.text-white]="selectedItem() !== itemOpt.value"
              class="p-3 rounded-xl font-bold text-lg border-2 border-white text-center">
              {{ itemOpt.label }}
            </button>
          </div>
        </div>

        <div *ngIf="selectedPromote() === 'media'" class="space-y-3 bg-black/60 p-5 rounded-2xl border-4 border-cyan-400">
          <label class="text-xl font-black text-cyan-300 block uppercase">
            👉 Specific Video Item (?item=...)
          </label>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button 
              *ngFor="let itemOpt of mediaItemOptions"
              (click)="selectedItem.set(itemOpt.value)"
              [class.bg-cyan-400]="selectedItem() === itemOpt.value"
              [class.text-black]="selectedItem() === itemOpt.value"
              [class.bg-zinc-800]="selectedItem() !== itemOpt.value"
              [class.text-white]="selectedItem() !== itemOpt.value"
              class="p-3 rounded-xl font-bold text-lg border-2 border-white text-center">
              {{ itemOpt.label }}
            </button>
          </div>
        </div>

        <!-- Parameter 2: Default Display Language -->
        <div class="space-y-3 border-t-4 border-zinc-800 pt-6">
          <label class="text-2xl font-black text-yellow-300 block uppercase">
            2. Default Language (?lang=...)
          </label>

          <div class="grid grid-cols-3 gap-3">
            <button 
              (click)="selectedLang.set(null)"
              [class.bg-yellow-400]="selectedLang() === null"
              [class.text-black]="selectedLang() === null"
              [class.bg-zinc-800]="selectedLang() !== null"
              [class.text-white]="selectedLang() !== null"
              class="p-3 rounded-xl font-bold text-lg border-2 border-white text-center">
              Default (DE)
            </button>
            <button 
              (click)="selectedLang.set('de')"
              [class.bg-yellow-400]="selectedLang() === 'de'"
              [class.text-black]="selectedLang() === 'de'"
              [class.bg-zinc-800]="selectedLang() !== 'de'"
              [class.text-white]="selectedLang() !== 'de'"
              class="p-3 rounded-xl font-bold text-lg border-2 border-white text-center">
              🇩🇪 German (?lang=de)
            </button>
            <button 
              (click)="selectedLang.set('en')"
              [class.bg-yellow-400]="selectedLang() === 'en'"
              [class.text-black]="selectedLang() === 'en'"
              [class.bg-zinc-800]="selectedLang() !== 'en'"
              [class.text-white]="selectedLang() !== 'en'"
              class="p-3 rounded-xl font-bold text-lg border-2 border-white text-center">
              🇬🇧 English (?lang=en)
            </button>
          </div>
        </div>

        <!-- Parameter 3: Non-Interactive Mode -->
        <div class="space-y-3 border-t-4 border-zinc-800 pt-6">
          <label class="text-2xl font-black text-cyan-400 block uppercase">
            3. Display Mode (?nonInteractive=true)
          </label>
          
          <div (click)="isNonInteractive.set(!isNonInteractive())" class="bg-black border-4 border-cyan-400 p-6 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
            <div>
              <div class="text-2xl font-black text-white">
                Non-Interactive Mode (For passive screens without touch overlay)
              </div>
              <div class="text-gray-400 font-bold text-lg mt-1">
                Hides navigation bar, hides idle touch prompt, and auto-rotates content every 30 seconds.
              </div>
            </div>

            <div 
              [class.bg-cyan-400]="isNonInteractive()"
              [class.text-black]="isNonInteractive()"
              [class.bg-zinc-800]="!isNonInteractive()"
              [class.text-gray-400]="!isNonInteractive()"
              class="px-6 py-3 rounded-xl font-black text-2xl border-2 border-white">
              {{ isNonInteractive() ? 'ENABLED' : 'DISABLED' }}
            </div>
          </div>
        </div>

        <!-- Resulting Generated URL Box -->
        <div class="space-y-4 border-t-4 border-zinc-800 pt-6">
          <label class="text-2xl font-black text-yellow-300 block uppercase">
            4. Generated Kiosk Target URL
          </label>

          <div class="bg-black border-4 border-yellow-400 rounded-2xl p-6 font-mono text-xl md:text-2xl text-yellow-300 break-all select-all">
            {{ generatedUrl() }}
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <button 
              (click)="copyToClipboard()"
              class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-black text-2xl border-4 border-white shadow-xl transition-transform active:scale-95">
              {{ copySuccess() ? '✓ COPIED TO CLIPBOARD!' : '📋 COPY URL' }}
            </button>

            <button 
              (click)="launchUrl()"
              class="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-2xl font-black text-2xl border-4 border-white shadow-xl transition-transform active:scale-95">
              🚀 LAUNCH PREVIEW
            </button>
          </div>
        </div>

      </main>

      <footer class="text-gray-400 font-bold text-center text-lg mt-6">
      </footer>

    </div>
  `
})
export class ConfigComponent {
  private router = inject(Router);

  isAuthenticated = signal<boolean>(false);
  passwordInput = '';
  errorMessage = signal<string>('');

  selectedPromote = signal<string | null>(null);
  selectedItem = signal<string | null>(null);
  selectedLang = signal<string | null>(null);
  isNonInteractive = signal<boolean>(false);
  copySuccess = signal<boolean>(false);

  readonly promoteOptions = [
    { label: 'None (Home)', value: null },
    { label: '🎥 Media', value: 'media' },
    { label: '🚀 Demos', value: 'demos' },
    { label: '🎁 Raffle', value: 'raffle' },
    { label: 'ℹ️ About', value: 'about' }
  ];

  readonly demoItemOptions = [
    { label: 'All / First', value: null },
    { label: 'Baumkataster', value: 'baumkataster' },
    { label: 'SensorCity', value: 'sensorcity' },
    { label: 'Heatmap', value: 'heatmap' }
  ];

  readonly mediaItemOptions = [
    { label: 'All / First', value: null },
    { label: 'Hack Days 2024', value: '0' },
    { label: 'DAS FEST 2025', value: '1' },
    { label: 'Hack Days 2026', value: '2' }
  ];

  onPromoteSelect(value: string | null): void {
    this.selectedPromote.set(value);
    this.selectedItem.set(null);
  }

  unlock(): void {
    if (this.passwordInput === 'oklab') {
      this.isAuthenticated.set(true);
      this.errorMessage.set('');
    } else {
      this.errorMessage.set('Incorrect password!');
    }
  }

  generatedUrl(): string {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://oklabkiosk.melde.net';
    const params: string[] = [];

    if (this.selectedPromote()) {
      params.push(`promote=${this.selectedPromote()}`);
    }

    if (this.selectedItem()) {
      params.push(`item=${this.selectedItem()}`);
    }

    if (this.selectedLang()) {
      params.push(`lang=${this.selectedLang()}`);
    }

    if (this.isNonInteractive()) {
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

  launchUrl(): void {
    const params: any = {};
    if (this.selectedPromote()) {
      params.promote = this.selectedPromote();
    }
    if (this.selectedItem()) {
      params.item = this.selectedItem();
    }
    if (this.selectedLang()) {
      params.lang = this.selectedLang();
    }
    if (this.isNonInteractive()) {
      params.nonInteractive = 'true';
    }

    this.router.navigate(['/'], { queryParams: params });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
