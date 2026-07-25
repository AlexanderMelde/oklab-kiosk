import { Component, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { MediaStateService } from '../../services/media-state.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white flex flex-col select-none overflow-hidden">
      
      <!-- Main Video Player Container with Click Lock Protection -->
      <div class="flex-1 w-full h-full relative bg-black flex items-center justify-center p-2">
        <div class="relative w-full h-full overflow-hidden">
          <iframe 
            *ngIf="safeUrl"
            [src]="safeUrl" 
            class="w-full h-full border-none pointer-events-none"
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>

          <!-- Protection Layer preventing external YouTube navigation -->
          <div class="absolute inset-0 z-30 cursor-default bg-transparent"></div>
        </div>
      </div>

    </div>

    <!-- QR Popup Overlay -->
    <div 
      *ngIf="mediaService.showQrPopup()"
      (click)="mediaService.showQrPopup.set(false)"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center">
      <div (click)="$event.stopPropagation()" class="relative bg-zinc-900 border-4 border-yellow-400 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl max-w-sm w-full mx-4">
        <button 
          (click)="mediaService.showQrPopup.set(false)"
          class="absolute top-3 right-3 text-white bg-zinc-700 hover:bg-zinc-600 rounded-full w-9 h-9 flex items-center justify-center font-black text-lg leading-none">
          ✕
        </button>
        <div class="text-yellow-400 font-black text-xl uppercase tracking-tight text-center">
          {{ mediaService.activeVideo().title }}
        </div>
        <div class="text-gray-300 text-sm font-bold text-center">
          {{ lang.t().media.watchPhone }}
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-xl">
          <qrcode 
            [qrdata]="mediaService.activeVideo().externalUrl" 
            [width]="280" 
            [errorCorrectionLevel]="'M'">
          </qrcode>
        </div>
        <div class="text-xs text-zinc-400 font-mono break-all text-center">
          {{ mediaService.activeVideo().externalUrl }}
        </div>
      </div>
    </div>
  `
})
export class MediaComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
  readonly mediaService = inject(MediaStateService);

  safeUrl: SafeResourceUrl | null = null;
  private rotationInterval: any = null;

  constructor() {
    effect(() => {
      const url = this.mediaService.activeVideo().url;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  ngOnInit(): void {
    // Select specific video if promoted via query parameter
    const item = this.configService.promotedItem()?.toLowerCase();
    if (item) {
      if (item.includes('2025') || item.includes('fest')) {
        this.mediaService.selectVideo(1);
      } else if (item.includes('2026')) {
        this.mediaService.selectVideo(0);
      } else if (item.includes('2024')) {
        this.mediaService.selectVideo(2);
      } else if (item === '0' || item === '1' || item === '2') {
        this.mediaService.selectVideo(Number(item));
      }
    }

    // Auto-cycle in non-interactive mode
    if (this.configService.isNonInteractive()) {
      this.rotationInterval = setInterval(() => {
        const nextIndex = (this.mediaService.activeVideoIndex() + 1) % this.mediaService.videos.length;
        this.mediaService.selectVideo(nextIndex);
      }, 30000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
}
