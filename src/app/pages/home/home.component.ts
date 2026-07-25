import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { DemosComponent } from '../demos/demos.component';
import { MediaComponent } from '../media/media.component';
import { RaffleComponent } from '../raffle/raffle.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DemosComponent,
    MediaComponent,
    RaffleComponent,
    AboutComponent
  ],
  template: `
    <!-- CASE 1: Standard Non-Promoted Kiosk Homepage -->
    <div *ngIf="!configService.promotedPage()" class="h-full w-full bg-black text-white p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Icon-Only Hovering & Pulsating Finger Prompt -->
      <div class="my-1 flex justify-center items-center pointer-events-none z-20 shrink-0">
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-14 w-14 rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
          <div class="relative bg-black/90 border-4 border-yellow-400 p-2.5 rounded-full shadow-2xl animate-bounce text-3xl md:text-4xl">
            👇
          </div>
        </div>
      </div>

      <!-- Main Navigation 2x2 Grid of Massive Touch Targets -->
      <main class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-2 py-2 overflow-hidden">
        
        <!-- Tile 1: Demos -->
        <a 
          routerLink="/demos" 
          class="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] text-black p-6 md:p-8 rounded-3xl border-6 md:border-8 border-white shadow-2xl flex flex-col justify-between cursor-pointer transition-all h-full w-full overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-4xl md:text-6xl">🚀</span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
              {{ lang.t().home.demosTitle }}
            </h2>
            <p class="text-base md:text-2xl font-bold text-zinc-900 leading-snug">
              {{ lang.t().home.demosDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 2: Videos -->
        <a 
          routerLink="/media" 
          class="bg-gradient-to-br from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 active:scale-[0.98] text-black p-6 md:p-8 rounded-3xl border-6 md:border-8 border-white shadow-2xl flex flex-col justify-between cursor-pointer transition-all h-full w-full overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-4xl md:text-6xl">🎥</span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
              {{ lang.t().home.videosTitle }}
            </h2>
            <p class="text-base md:text-2xl font-bold text-zinc-900 leading-snug">
              {{ lang.t().home.videosDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 3: Raffle -->
        <a 
          routerLink="/raffle" 
          class="bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 active:scale-[0.98] text-white p-6 md:p-8 rounded-3xl border-6 md:border-8 border-yellow-400 shadow-2xl flex flex-col justify-between cursor-pointer transition-all h-full w-full overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-4xl md:text-6xl">🎁</span>
            <span class="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-black text-lg md:text-xl border-2 border-white">
              DAS FEST SPECIAL
            </span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2 text-yellow-300">
              {{ lang.t().home.raffleTitle }}
            </h2>
            <p class="text-base md:text-2xl font-extrabold text-white leading-snug">
              {{ lang.t().home.raffleDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 4: About -->
        <a 
          routerLink="/about" 
          class="bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 active:scale-[0.98] text-white p-6 md:p-8 rounded-3xl border-6 md:border-8 border-cyan-400 shadow-2xl flex flex-col justify-between cursor-pointer transition-all h-full w-full overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-4xl md:text-6xl">ℹ️</span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2 text-cyan-300">
              {{ lang.t().home.aboutTitle }}
            </h2>
            <p class="text-base md:text-2xl font-extrabold text-gray-200 leading-snug">
              {{ lang.t().home.aboutDesc }}
            </p>
          </div>
        </a>

      </main>

      <footer class="w-full pt-3 shrink-0 text-right flex justify-end items-center" style="display: flex; justify-content: flex-end; width: 100%; text-align: right;">
        <a routerLink="/config" class="inline-block text-yellow-400 text-3xl hover:text-yellow-300 transition-transform active:scale-90 p-1" title="Settings">⚙️</a>
      </footer>
    </div>

    <!-- CASE 2: Promoted Homepage Setup (Split View or Non-Interactive Full Screen) -->
    <div *ngIf="configService.promotedPage()" class="h-full w-full bg-black text-white flex select-none overflow-hidden relative">

      <!-- Sub-case 2A: Non-Interactive Mode (Full Screen Showcase) -->
      <div *ngIf="configService.isNonInteractive()" class="h-full w-full relative overflow-hidden">
        <app-demos *ngIf="configService.promotedPage() === 'demos'" class="h-full w-full block"></app-demos>
        <app-media *ngIf="configService.promotedPage() === 'media'" class="h-full w-full block"></app-media>
        <app-raffle *ngIf="configService.promotedPage() === 'raffle'" class="h-full w-full block"></app-raffle>
        <app-about *ngIf="configService.promotedPage() === 'about'" class="h-full w-full block"></app-about>
      </div>

      <!-- Sub-case 2B: Interactive Mode (Left: Promoted Content, Right: 4 Menu Items Sidebar) -->
      <div *ngIf="!configService.isNonInteractive()" class="h-full w-full flex flex-row overflow-hidden">
        
        <!-- Left Main Container: Embedded Promoted Content -->
        <div class="flex-1 h-full w-full overflow-hidden relative bg-black">
          <app-demos *ngIf="configService.promotedPage() === 'demos'" class="h-full w-full block"></app-demos>
          <app-media *ngIf="configService.promotedPage() === 'media'" class="h-full w-full block"></app-media>
          <app-raffle *ngIf="configService.promotedPage() === 'raffle'" class="h-full w-full block"></app-raffle>
          <app-about *ngIf="configService.promotedPage() === 'about'" class="h-full w-full block"></app-about>
        </div>

        <!-- Right Sidebar Menu Column (4 Menu Buttons + Config gear) -->
        <aside class="w-72 md:w-80 shrink-0 h-full p-4 flex flex-col justify-between space-y-3 bg-zinc-950 border-l-4 border-cyan-400 overflow-hidden shadow-2xl">

          <div class="flex-1 flex flex-col justify-evenly space-y-3 overflow-hidden">
            <!-- Button 1: Demos -->
            <a 
              routerLink="/demos"
              class="p-4 rounded-2xl border-4 border-white shadow-lg flex items-center space-x-3 transition-transform active:scale-95 cursor-pointer font-black text-xl md:text-2xl text-white">
              <span class="text-3xl">🚀</span>
              <span>{{ lang.t().home.demosTitle }}</span>
            </a>

          
            <!-- Button 2: Videos -->
            <a 
              *ngIf="configService.promotedPage() !== 'media'"
              routerLink="/media"
              class="p-4 rounded-2xl border-4 border-white shadow-lg flex items-center space-x-3 transition-transform active:scale-95 cursor-pointer font-black text-xl md:text-2xl text-white">
              <span class="text-3xl">🎥</span>
              <span>{{ lang.t().home.videosTitle }}</span>
            </a>

            <!-- Button 3: Raffle -->
            <a 
              *ngIf="configService.promotedPage() !== 'raffle'"
              routerLink="/raffle"
              class="p-4 rounded-2xl border-4 border-white shadow-lg flex items-center space-x-3 transition-transform active:scale-95 cursor-pointer font-black text-xl md:text-2xl text-white">
              <span class="text-3xl">🎁</span>
              <span>{{ lang.t().home.raffleTitle }}</span>
            </a>

            <!-- Button 4: About -->
            <a 
              *ngIf="configService.promotedPage() !== 'about'"
              routerLink="/about"
              class="p-4 rounded-2xl border-4 border-white shadow-lg flex items-center space-x-3 transition-transform active:scale-95 cursor-pointer font-black text-xl md:text-2xl text-white">
              <span class="text-3xl">ℹ️</span>
              <span>{{ lang.t().home.aboutTitle }}</span>
            </a>
          </div>

          <footer class="pt-2 shrink-0 flex justify-end items-center border-t-2 border-zinc-800" style="display: flex; justify-content: flex-end; width: 100%; text-align: right;">
            <a routerLink="/config" class="inline-block text-yellow-400 text-3xl hover:text-yellow-300 transition-transform active:scale-90 p-1" title="Settings">⚙️</a>
          </footer>
        </aside>

      </div>

    </div>
  `
})
export class HomeComponent {
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
}
