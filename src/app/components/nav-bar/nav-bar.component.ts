import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, LanguageToggleComponent],
  template: `
    <nav 
      *ngIf="!configService.isNonInteractive()" 
      class="bg-black border-b-4 border-yellow-400 px-4 py-3 flex items-center justify-between shadow-2xl select-none z-40 relative">
      
      <!-- Left side: Brand Logo / Home Button -->
      <div class="flex items-center space-x-3">
        <button 
          routerLink="/" 
          class="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black px-6 py-3 rounded-2xl font-black text-2xl md:text-3xl flex items-center space-x-3 border-4 border-white shadow-lg transition-transform active:scale-95">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>{{ lang.t().nav.home }}</span>
        </button>

        <button 
          (click)="goBack()" 
          class="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-cyan-400 px-5 py-3 rounded-2xl font-extrabold text-xl md:text-2xl flex items-center space-x-2 border-4 border-cyan-400 transition-transform active:scale-95">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>{{ lang.t().nav.back }}</span>
        </button>
      </div>

      <!-- Right side: Actions & Language Toggle -->
      <div class="flex items-center space-x-3">
        <!-- Reload button -->
        <button 
          (click)="onReload()" 
          class="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white px-5 py-3 rounded-2xl font-extrabold text-xl md:text-2xl flex items-center space-x-2 border-4 border-gray-400 transition-transform active:scale-95"
          title="Reload page">
          <svg class="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>{{ lang.t().nav.reload }}</span>
        </button>

        <!-- Language switcher component -->
        <app-language-toggle></app-language-toggle>

        <!-- Settings / Config button -->
        <button 
          routerLink="/config" 
          class="bg-zinc-900 hover:bg-zinc-800 text-gray-300 p-3 rounded-2xl border-4 border-zinc-700 transition-transform active:scale-95"
          title="Kiosk Configuration">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>
    </nav>
  `
})
export class NavBarComponent {
  private location = inject(Location);
  private router = inject(Router);
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);

  @Output() reloadRequested = new EventEmitter<void>();

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  onReload(): void {
    this.reloadRequested.emit();
    // Also trigger window location reload if no subpage handler caught it
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
