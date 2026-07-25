import { Component, inject, EventEmitter, Output, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { DemoStateService } from '../../services/demo-state.service';
import { MediaStateService } from '../../services/media-state.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { HorizontalScrollDirective } from '../../directives/horizontal-scroll.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LanguageToggleComponent, QRCodeComponent, HorizontalScrollDirective],
  template: `
    <header 
      *ngIf="!configService.isNonInteractive()"
      class="bg-black border-b-4 border-yellow-400 px-4 py-3 flex items-center justify-between shadow-2xl select-none z-40 relative">
      
      <!-- Left Side: Brand Title (Home only) OR Single Icon Button & Category/Media Tabs -->
      <div class="flex items-center space-x-3 md:space-x-4 overflow-x-auto py-0.5" appHorizontalScroll>
        <!-- Prominent Large Brand Title (Shown ONLY on Home '/') -->
        <a *ngIf="isHome()" routerLink="/" class="flex flex-col justify-center cursor-pointer group py-1">
          <h1 class="text-3xl md:text-5xl font-black tracking-tight text-yellow-400 uppercase leading-none group-hover:text-yellow-300">
            {{ lang.t().home.welcome }}
          </h1>
          <p class="text-base md:text-2xl font-extrabold text-cyan-400 mt-1 leading-tight">
            {{ lang.t().home.subtitle }}
          </p>
        </a>

        <!-- Subpage Navigation & Category Tabs -->
        <div *ngIf="!isHome()" class="flex items-center space-x-3 shrink-0">
          <!-- 1-Level Deep: White SVG Home Icon Button -->
          <button 
            *ngIf="navigationDepth() < 2"
            routerLink="/" 
            class="h-16 w-16 p-3 box-border bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white rounded-2xl border-4 border-white shadow-lg transition-transform active:scale-95 flex items-center justify-center shrink-0"
            title="Home">
            <svg class="w-8 h-8 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </button>

          <!-- 2-Levels Deep: White SVG Left Arrow Back Icon Button -->
          <button 
            *ngIf="navigationDepth() >= 2"
            (click)="goBack()" 
            class="h-16 w-16 p-3 box-border bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white rounded-2xl border-4 border-white shadow-lg transition-transform active:scale-95 flex items-center justify-center shrink-0"
            title="Back">
            <svg class="w-8 h-8 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </button>

          <!-- Demo Category Tabs in Header Title Bar -->
          <div *ngIf="isDemos()" class="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button 
              *ngFor="let cat of demoService.categories"
              (click)="demoService.selectCategory(cat.id)"
              [class.bg-yellow-400]="demoService.activeCategory() === cat.id"
              [class.text-black]="demoService.activeCategory() === cat.id"
              [class.border-white]="demoService.activeCategory() === cat.id"
              [class.bg-zinc-800]="demoService.activeCategory() !== cat.id"
              [class.text-white]="demoService.activeCategory() !== cat.id"
              [class.border-zinc-600]="demoService.activeCategory() !== cat.id"
              [class.hover:bg-zinc-700]="demoService.activeCategory() !== cat.id"
              class="h-16 py-3 px-5 sm:px-6 box-border rounded-2xl font-black text-lg sm:text-xl md:text-2xl leading-none border-4 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-lg">
              <span class="text-xl sm:text-2xl leading-none shrink-0">{{ cat.icon }}</span>
              <span class="leading-none">{{ lang.t().demos[cat.titleKey] }}</span>
            </button>
          </div>

          <!-- Video Selection Buttons in Header Title Bar -->
          <div *ngIf="isMedia()" class="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button 
              *ngFor="let video of mediaService.videos"
              (click)="mediaService.onButtonClick(video.id)"
              [class.bg-cyan-400]="mediaService.activeVideoId() === video.id"
              [class.text-black]="mediaService.activeVideoId() === video.id"
              [class.border-white]="mediaService.activeVideoId() === video.id"
              [class.bg-zinc-800]="mediaService.activeVideoId() !== video.id"
              [class.text-white]="mediaService.activeVideoId() !== video.id"
              [class.border-zinc-600]="mediaService.activeVideoId() !== video.id"
              [class.hover:bg-zinc-700]="mediaService.activeVideoId() !== video.id"
              class="h-16 py-2 px-4 sm:px-5 box-border rounded-2xl font-black text-lg sm:text-xl md:text-2xl leading-none border-4 transition-all flex items-center justify-center gap-3 shrink-0 active:scale-95 shadow-lg">
              
              <div class="flex items-center gap-2">
                <span class="text-xl sm:text-2xl leading-none shrink-0">🎥</span>
                <span class="leading-none whitespace-nowrap">{{ video.title }}</span>
              </div>

              <!-- Active state QR Code functionality -->
              <div 
                *ngIf="mediaService.activeVideoId() === video.id"
                class="flex items-center gap-2 pl-3 border-l-2 border-black/20 shrink-0">
                <div class="bg-white p-1 rounded-xl shadow shrink-0 flex items-center justify-center">
                  <qrcode 
                    [qrdata]="video.externalUrl" 
                    [width]="44" 
                    [errorCorrectionLevel]="'M'">
                  </qrcode>
                </div>
                <span class="text-xs font-bold uppercase leading-tight max-w-[65px] hidden sm:inline-block text-black/80">
                  📱 {{ lang.t().media.watchPhone }}
                </span>
              </div>

            </button>
          </div>
        </div>
      </div>

      <!-- Right Side: Reload & Language Toggle -->
      <div class="flex items-center space-x-3 shrink-0">
        <!-- Reload Button (Identical in size and border to Home button: h-16 w-16, border-4 border-white) -->
        <button 
          *ngIf="!isHome() && !isConfig()"
          (click)="onReload()" 
          class="h-16 w-16 p-3 box-border bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white rounded-2xl border-4 border-white shadow-lg transition-transform active:scale-95 flex items-center justify-center shrink-0"
          title="Reload page">
          <svg class="w-8 h-8 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>

        <!-- Reusable Language Switcher Component -->
        <app-language-toggle></app-language-toggle>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
  readonly demoService = inject(DemoStateService);
  readonly mediaService = inject(MediaStateService);

  isHome = signal<boolean>(true);
  isConfig = signal<boolean>(false);
  isDemos = signal<boolean>(false);
  isMedia = signal<boolean>(false);
  navigationDepth = signal<number>(0);

  @Output() reloadRequested = new EventEmitter<void>();

  ngOnInit(): void {
    this.updateRouteFlags(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateRouteFlags(event.urlAfterRedirects);
      });
  }

  private updateRouteFlags(url: string): void {
    const path = url.split('?')[0];
    const home = path === '/' || path === '';
    this.isHome.set(home);
    this.isConfig.set(path === '/config');
    this.isDemos.set(path.includes('/demos'));
    this.isMedia.set(path.includes('/media'));

    if (home) {
      this.navigationDepth.set(0);
    } else {
      this.navigationDepth.update(d => d + 1);
    }
  }

  goBack(): void {
    this.navigationDepth.update(d => Math.max(0, d - 2));
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  onReload(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
