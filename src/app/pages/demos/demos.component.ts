import { Component, inject, OnInit, OnDestroy, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { DemoStateService } from '../../services/demo-state.service';
import { HorizontalScrollDirective } from '../../directives/horizontal-scroll.directive';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, HorizontalScrollDirective],
  template: `
    <div class="h-full w-full bg-black text-white flex flex-col select-none overflow-hidden">
      
      <!-- Top Demo Selector Bar for Active Category -->
      <div class="bg-zinc-900 border-b-4 border-yellow-400 p-3 px-4 flex items-center space-x-3 overflow-x-auto w-full z-10 shadow-xl py-2" appHorizontalScroll>
        <button 
          *ngFor="let demo of demoService.currentCategoryDemos()"
          (click)="demoService.onDemoClick(demo.id)"
          [class.bg-yellow-400]="demoService.activeDemoId() === demo.id"
          [class.text-black]="demoService.activeDemoId() === demo.id"
          [class.border-white]="demoService.activeDemoId() === demo.id"
          [class.bg-zinc-800]="demoService.activeDemoId() !== demo.id"
          [class.text-white]="demoService.activeDemoId() !== demo.id"
          [class.border-zinc-600]="demoService.activeDemoId() !== demo.id"
          [class.hover:bg-zinc-700]="demoService.activeDemoId() !== demo.id"
          class="px-4 py-2 rounded-2xl font-black text-base md:text-xl border-4 transition-all whitespace-normal leading-tight text-left flex items-center gap-3 shrink-0 active:scale-95 shadow-md">
          
          <span class="line-clamp-2 max-w-[180px] md:max-w-[260px]">{{ demo.title }}</span>

          <!-- Active state QR Code functionality -->
          <div 
            *ngIf="demoService.activeDemoId() === demo.id"
            class="flex items-center gap-2 pl-3 border-l-2 border-black/20 shrink-0">
            <div class="bg-white p-1 rounded-xl shadow shrink-0">
              <qrcode 
                [qrdata]="demo.url" 
                [width]="56" 
                [errorCorrectionLevel]="'M'">
              </qrcode>
            </div>
            <span class="text-xs font-bold uppercase leading-tight max-w-[65px] hidden sm:inline-block text-black/80">
              📱 {{ lang.t().demos.openPhone }}
            </span>
          </div>

        </button>
      </div>

      <!-- Main Iframe Display Container / Non-Embed fallback view -->
      <div class="flex-1 w-full h-full relative bg-zinc-950 flex items-center justify-center sm:p-8 overflow-y-auto">
        <iframe 
          *ngIf="renderIframe() && !demoService.activeDemo().noEmbed && safeUrl()"
          [src]="safeUrl()" 
          class="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="fullscreen; geolocation; camera; microphone">
        </iframe>

        <!-- QR Code Content inside Embed Area when noEmbed is true -->
        <div 
          *ngIf="demoService.activeDemo().noEmbed"
          class="sm:p-8 flex flex-col items-center gap-4 shadow-2xl w-full my-auto text-center">
          <div class="text-cyan-400 font-black text-xl sm:text-2xl uppercase tracking-tight text-center">
            {{ demoService.activeDemo().title }}
          </div>
          <p *ngIf="demoService.activeDemo().description" class="text-zinc-200 text-sm sm:text-base font-medium text-center leading-relaxed bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-800">
            {{ demoService.activeDemo().description }}
          </p>
          <div class="text-gray-400 text-xs font-bold text-center uppercase tracking-wide">
            📱 {{ lang.t().demos.openPhone }}
          </div>
          <div class="bg-white p-3 rounded-2xl shadow-xl">
            <qrcode 
              [qrdata]="demoService.activeDemo().url" 
              [width]="240" 
              [errorCorrectionLevel]="'M'">
            </qrcode>
          </div>
          <div class="text-xs text-zinc-400 font-mono break-all text-center">
            {{ demoService.activeDemo().url }}
          </div>
        </div>
      </div>

    </div>

    <!-- QR Popup Overlay -->
    <div 
      *ngIf="demoService.showQrPopup()"
      (click)="demoService.showQrPopup.set(false)"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div class="relative bg-zinc-900 border-4 border-cyan-400 rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 shadow-2xl max-w-md w-full mx-auto">
        <button 
          (click)="demoService.showQrPopup.set(false)"
          class="absolute top-3 right-3 text-white bg-zinc-700 hover:bg-zinc-600 rounded-full w-9 h-9 flex items-center justify-center font-black text-lg leading-none">
          ✕
        </button>
        <div class="text-cyan-400 font-black text-xl sm:text-2xl uppercase tracking-tight text-center">
          {{ demoService.activeDemo().title }}
        </div>
        <p *ngIf="demoService.activeDemo().description" class="text-zinc-200 text-sm sm:text-base font-medium text-center leading-relaxed bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800">
          {{ demoService.activeDemo().description }}
        </p>
        <div class="text-gray-400 text-xs font-bold text-center uppercase tracking-wide">
          📱 {{ lang.t().demos.openPhone }}
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-xl">
          <qrcode 
            [qrdata]="demoService.activeDemo().url" 
            [width]="240" 
            [errorCorrectionLevel]="'M'">
          </qrcode>
        </div>
        <div class="text-xs text-zinc-400 font-mono break-all text-center">
          {{ demoService.activeDemo().url }}
        </div>
      </div>
    </div>
  `
})
export class DemosComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
  readonly demoService = inject(DemoStateService);

  safeUrl = signal<SafeResourceUrl | null>(null);
  renderIframe = signal<boolean>(true);
  private rotationInterval: any = null;

  constructor() {
    effect(() => {
      const url = this.demoService.activeDemo().url;
      this.renderIframe.set(false);
      setTimeout(() => {
        this.safeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
        this.renderIframe.set(true);
      }, 50);
    });
  }

  ngOnInit(): void {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '').toLowerCase() : '';
    const item = hash || this.configService.promotedItem();
    const targetDemo = item ? this.demoService.findDemo(item) : null;

    if (targetDemo) {
      this.demoService.selectDemo(targetDemo.id);
    } else {
      this.demoService.selectDemo(this.demoService.activeDemoId());
    }

    // Auto-cycle in non-interactive mode
    if (this.configService.isNonInteractive()) {
      this.rotationInterval = setInterval(() => {
        const currentIndex = this.demoService.demos.findIndex(d => d.id === this.demoService.activeDemoId());
        const nextIndex = (currentIndex + 1) % this.demoService.demos.length;
        this.demoService.selectDemo(this.demoService.demos[nextIndex].id);
      }, 30000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
}
