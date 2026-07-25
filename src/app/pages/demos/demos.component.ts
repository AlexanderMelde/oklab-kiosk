import { Component, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { DemoStateService } from '../../services/demo-state.service';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white flex flex-col select-none overflow-hidden">
      
      <!-- Top Demo Selector Bar for Active Category -->
      <div class="bg-zinc-900 border-b-4 border-yellow-400 p-3 px-4 flex items-center space-x-3 overflow-x-auto w-full z-10 shadow-xl py-2">
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

      <!-- Main Iframe Display Container -->
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
      *ngIf="demoService.showQrPopup()"
      (click)="demoService.showQrPopup.set(false)"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center">
      <div (click)="$event.stopPropagation()" class="relative bg-zinc-900 border-4 border-cyan-400 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl max-w-sm w-full mx-4">
        <button 
          (click)="demoService.showQrPopup.set(false)"
          class="absolute top-3 right-3 text-white bg-zinc-700 hover:bg-zinc-600 rounded-full w-9 h-9 flex items-center justify-center font-black text-lg leading-none">
          ✕
        </button>
        <div class="text-cyan-400 font-black text-xl uppercase tracking-tight text-center">
          {{ demoService.activeDemo().title }}
        </div>
        <div class="text-gray-300 text-sm font-bold text-center">
          {{ lang.t().demos.openPhone }}
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-xl">
          <qrcode 
            [qrdata]="demoService.activeDemo().url" 
            [width]="280" 
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

  safeUrl: SafeResourceUrl | null = null;
  private rotationInterval: any = null;

  constructor() {
    effect(() => {
      const url = this.demoService.activeDemo().url;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  ngOnInit(): void {
    // Select specific demo if promoted via query parameter
    const item = this.configService.promotedItem()?.toLowerCase();
    if (item) {
      if (item.includes('sensorcity') || item.includes('explorer')) {
        this.demoService.selectDemo('sensorcity');
      } else if (item.includes('heatmap') || item.includes('heat')) {
        this.demoService.selectDemo('heatmap');
      } else if (item.includes('platane') || item.includes('frag') || item.includes('ragdemo')) {
        this.demoService.selectDemo('platane');
      } else if (item.includes('papperlapp')) {
        this.demoService.selectDemo('papperlapp');
      } else if (item.includes('baum') || item.includes('kataster')) {
        this.demoService.selectDemo('baumkataster');
      }
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
