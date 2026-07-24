import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';

export const DEMOS = [
  { title: '🌲 Baumkataster', url: 'https://codeforkarlsruhe.github.io/baumkataster/' },
  { title: '⚡ SensorCity Explorer', url: 'https://maxliesegang.github.io/ka-sensorcity-explorer/' },
  { title: '🌡️ Sensor Heatmap', url: 'https://neposoft2.de/oklab/sensor/heatmap' }
];

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white flex flex-col select-none overflow-hidden">
      
      <!-- Top Demo Selector Bar & QR Banner -->
      <div class="bg-zinc-900 border-b-4 border-yellow-400 p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-10 shadow-xl">
        
        <!-- Left: Demo Selector Buttons -->
        <div class="flex items-center space-x-3 overflow-x-auto w-full md:w-auto py-1">
          <button 
            *ngFor="let demo of demos; let i = index"
            (click)="selectDemo(i)"
            [class.bg-yellow-400]="activeDemoIndex() === i"
            [class.text-black]="activeDemoIndex() === i"
            [class.border-white]="activeDemoIndex() === i"
            [class.bg-zinc-800]="activeDemoIndex() !== i"
            [class.text-white]="activeDemoIndex() !== i"
            [class.border-zinc-600]="activeDemoIndex() !== i"
            class="px-4 py-3 rounded-2xl font-black text-lg md:text-2xl border-4 transition-all whitespace-normal leading-tight max-w-[200px] md:max-w-[260px] text-left flex items-center space-x-2 shrink-0 active:scale-95">
            <span class="line-clamp-2">{{ demo.title }}</span>
          </button>
        </div>

        <!-- Right: Mobile QR Code Popup Banner -->
        <div class="flex items-center bg-black border-4 border-cyan-400 rounded-2xl p-2 px-4 space-x-4 shadow-lg shrink-0">
          <div class="text-right">
            <div class="text-cyan-400 font-black text-lg md:text-xl uppercase leading-tight">
              {{ activeDemo().title }}
            </div>
            <div class="text-gray-300 text-xs md:text-sm font-bold">
              {{ lang.t().demos.openPhone }}
            </div>
          </div>

          <div class="bg-white p-1 rounded-xl cursor-pointer hover:scale-105 transition-transform active:scale-95" (click)="showQrPopup.set(true)">
            <qrcode 
              [qrdata]="activeDemo().url" 
              [width]="70" 
              [errorCorrectionLevel]="'M'">
            </qrcode>
          </div>
        </div>

      </div>

      <!-- Main Iframe Display Container (Sandboxed to block popups & top-level escapes) -->
      <div class="flex-1 w-full h-full relative bg-zinc-950">
        <iframe 
          *ngIf="safeUrl"
          [src]="safeUrl" 
          class="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="fullscreen; geolocation; camera; microphone">
        </iframe>
      </div>

    </div>

    <!-- QR Popup Overlay -->
    <div 
      *ngIf="showQrPopup()"
      (click)="showQrPopup.set(false)"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center">
      <div (click)="$event.stopPropagation()" class="relative bg-zinc-900 border-4 border-cyan-400 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl max-w-sm w-full mx-4">
        <button 
          (click)="showQrPopup.set(false)"
          class="absolute top-3 right-3 text-white bg-zinc-700 hover:bg-zinc-600 rounded-full w-9 h-9 flex items-center justify-center font-black text-lg leading-none">
          ✕
        </button>
        <div class="text-cyan-400 font-black text-xl uppercase tracking-tight text-center">
          {{ activeDemo().title }}
        </div>
        <div class="text-gray-300 text-sm font-bold text-center">
          {{ lang.t().demos.openPhone }}
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-xl">
          <qrcode 
            [qrdata]="activeDemo().url" 
            [width]="280" 
            [errorCorrectionLevel]="'M'">
          </qrcode>
        </div>
        <div class="text-xs text-zinc-400 font-mono break-all text-center">
          {{ activeDemo().url }}
        </div>
      </div>
    </div>
  `
})
export class DemosComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);

  readonly demos = DEMOS;
  readonly activeDemoIndex = signal<number>(0);
  readonly showQrPopup = signal<boolean>(false);

  safeUrl: SafeResourceUrl | null = null;
  private rotationInterval: any = null;

  ngOnInit(): void {
    // Select specific demo if promoted via query parameter
    const item = this.configService.promotedItem()?.toLowerCase();
    if (item) {
      if (item === '1' || item === 'sensorcity' || item.includes('sensor')) {
        this.activeDemoIndex.set(1);
      } else if (item === '2' || item === 'heatmap' || item.includes('heat')) {
        this.activeDemoIndex.set(2);
      } else if (item === '0' || item === 'baumkataster' || item.includes('baum')) {
        this.activeDemoIndex.set(0);
      }
    }

    this.updateActiveUrl();

    // If non-interactive mode is active, auto-cycle through demos every 30 seconds
    if (this.configService.isNonInteractive()) {
      this.rotationInterval = setInterval(() => {
        const nextIndex = (this.activeDemoIndex() + 1) % this.demos.length;
        this.selectDemo(nextIndex);
      }, 30000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }

  activeDemo() {
    return this.demos[this.activeDemoIndex()];
  }

  selectDemo(index: number): void {
    this.activeDemoIndex.set(index);
    this.updateActiveUrl();
  }

  private updateActiveUrl(): void {
    const url = this.demos[this.activeDemoIndex()].url;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
