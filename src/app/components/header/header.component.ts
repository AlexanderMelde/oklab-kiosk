import { Component, inject, EventEmitter, Output, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LanguageToggleComponent],
  template: `
    <header 
      *ngIf="!configService.isNonInteractive()"
      class="bg-black border-b-4 border-yellow-400 px-4 py-3 flex items-center justify-between shadow-2xl select-none z-40 relative">
      
      <!-- Left Side: Brand Title (Home only) OR Subpage Navigation Buttons -->
      <div class="flex items-center space-x-4">
        <!-- Prominent Large Brand Title (Shown ONLY on Home '/') -->
        <a *ngIf="isHome()" routerLink="/" class="flex flex-col cursor-pointer group py-1">
          <h1 class="text-3xl md:text-5xl font-black tracking-tight text-yellow-400 uppercase leading-none group-hover:text-yellow-300">
            {{ lang.t().home.welcome }}
          </h1>
          <p class="text-base md:text-2xl font-extrabold text-cyan-400 mt-1 leading-tight">
            {{ lang.t().home.subtitle }}
          </p>
        </a>

        <!-- Subpage Navigation Buttons (Title hidden on subpages) -->
        <div *ngIf="!isHome()" class="flex items-center space-x-3">
          <!-- Home button -->
          <button 
            routerLink="/" 
            class="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black px-5 py-2.5 rounded-2xl font-black text-xl md:text-2xl flex items-center space-x-2 border-3 border-white shadow-md transition-transform active:scale-95">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span>{{ lang.t().nav.home }}</span>
          </button>

          <!-- Back button -->
          <button 
            (click)="goBack()" 
            class="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-cyan-400 px-4 py-2.5 rounded-2xl font-extrabold text-lg md:text-xl flex items-center space-x-2 border-3 border-cyan-400 transition-transform active:scale-95">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>{{ lang.t().nav.back }}</span>
          </button>
        </div>
      </div>

      <!-- Right Side: Reload, Language Toggle & Config -->
      <div class="flex items-center space-x-3">
        <!-- Reload Button (Conditional: shown on subpages) -->
        <button 
          *ngIf="!isHome() && !isConfig()"
          (click)="onReload()" 
          class="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-2xl font-extrabold text-base md:text-lg flex items-center space-x-2 border-3 border-gray-400 transition-transform active:scale-95"
          title="Reload page">
          <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span class="hidden md:inline">{{ lang.t().nav.reload }}</span>
        </button>

        <!-- Reusable Language Switcher Component (Always visible on all pages) -->
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

  isHome = signal<boolean>(true);
  isConfig = signal<boolean>(false);

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
    this.isHome.set(path === '/' || path === '');
    this.isConfig.set(path === '/config');
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  onReload(): void {
    this.reloadRequested.emit();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
