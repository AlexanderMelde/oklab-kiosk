import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';

export const VIDEOS = [
  {
    title: 'Hackdays 2026',
    url: 'https://www.youtube-nocookie.com/embed/jw0WmJZ2Jao?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=jw0WmJZ2Jao'
  },
  {
    title: 'DAS FEST 2025',
    url: 'https://www.youtube-nocookie.com/embed/nlldj7bKl5A?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=nlldj7bKl5A'
  },
  {
    title: 'Hackdays 2024',
    url: 'https://www.youtube-nocookie.com/embed/289RJwps2Sk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=289RJwps2Sk'
  },
];

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white flex flex-col select-none overflow-hidden">
      
      <!-- Top Video Selector Header -->
      <div class="bg-zinc-900 border-b-4 border-cyan-400 p-4 flex flex-col lg:flex-row items-center justify-between gap-4 z-10 shadow-xl">
        
        <!-- Video List Selector Buttons -->
        <div class="flex items-center space-x-3 overflow-x-auto w-full lg:w-auto py-1">
          <button 
            *ngFor="let video of videos; let i = index"
            (click)="selectVideo(i)"
            [class.bg-cyan-400]="activeVideoIndex() === i"
            [class.text-black]="activeVideoIndex() === i"
            [class.border-white]="activeVideoIndex() === i"
            [class.bg-zinc-800]="activeVideoIndex() !== i"
            [class.text-white]="activeVideoIndex() !== i"
            [class.border-zinc-600]="activeVideoIndex() !== i"
            class="px-4 py-3 rounded-2xl font-black text-base md:text-xl border-4 transition-all whitespace-normal leading-tight max-w-[210px] md:max-w-[280px] text-left flex items-center space-x-2 shrink-0 active:scale-95">
            <span class="text-2xl shrink-0">🎥</span>
            <span class="line-clamp-2">{{ video.title }}</span>
          </button>
        </div>

        <!-- Mobile QR Code Banner -->
        <div class="flex items-center bg-black border-4 border-yellow-400 rounded-2xl p-2 px-4 space-x-4 shadow-lg shrink-0">
          <div class="text-right">
            <div class="text-yellow-400 font-black text-sm md:text-base uppercase leading-tight">
              {{ lang.t().media.scanToWatch }}
            </div>
            <div class="text-gray-300 text-xs md:text-sm font-bold">
              {{ lang.t().media.watchPhone }}
            </div>
          </div>

          <div class="bg-white p-1 rounded-xl cursor-pointer hover:scale-105 transition-transform active:scale-95" (click)="showQrPopup.set(true)">
            <qrcode 
              [qrdata]="activeVideo().externalUrl" 
              [width]="70" 
              [errorCorrectionLevel]="'M'">
            </qrcode>
          </div>
        </div>

      </div>

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
      *ngIf="showQrPopup()"
      (click)="showQrPopup.set(false)"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center">
      <div (click)="$event.stopPropagation()" class="relative bg-zinc-900 border-4 border-yellow-400 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl max-w-sm w-full mx-4">
        <button 
          (click)="showQrPopup.set(false)"
          class="absolute top-3 right-3 text-white bg-zinc-700 hover:bg-zinc-600 rounded-full w-9 h-9 flex items-center justify-center font-black text-lg leading-none">
          ✕
        </button>
        <div class="text-yellow-400 font-black text-xl uppercase tracking-tight text-center">
          {{ activeVideo().title }}
        </div>
        <div class="text-gray-300 text-sm font-bold text-center">
          {{ lang.t().media.watchPhone }}
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-xl">
          <qrcode 
            [qrdata]="activeVideo().externalUrl" 
            [width]="280" 
            [errorCorrectionLevel]="'M'">
          </qrcode>
        </div>
        <div class="text-xs text-zinc-400 font-mono break-all text-center">
          {{ activeVideo().externalUrl }}
        </div>
      </div>
    </div>
  `
})
export class MediaComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);

  readonly videos = VIDEOS;
  readonly activeVideoIndex = signal<number>(0);
  readonly showQrPopup = signal<boolean>(false);

  safeUrl: SafeResourceUrl | null = null;
  private rotationInterval: any = null;

  ngOnInit(): void {
    // Select specific video if promoted via query parameter
    const item = this.configService.promotedItem()?.toLowerCase();
    if (item) {
      if (item === '1' || item.includes('2025') || item.includes('fest')) {
        this.activeVideoIndex.set(1);
      } else if (item === '2' || item.includes('2026')) {
        this.activeVideoIndex.set(2);
      } else if (item === '0' || item.includes('2024')) {
        this.activeVideoIndex.set(0);
      }
    }

    this.updateActiveVideo();

    // Auto-cycle in non-interactive mode
    if (this.configService.isNonInteractive()) {
      this.rotationInterval = setInterval(() => {
        const nextIndex = (this.activeVideoIndex() + 1) % this.videos.length;
        this.selectVideo(nextIndex);
      }, 30000);
    }
  }

  ngOnDestroy(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }

  activeVideo() {
    return this.videos[this.activeVideoIndex()];
  }

  selectVideo(index: number): void {
    this.activeVideoIndex.set(index);
    this.updateActiveVideo();
  }

  private updateActiveVideo(): void {
    const url = this.videos[this.activeVideoIndex()].url;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
