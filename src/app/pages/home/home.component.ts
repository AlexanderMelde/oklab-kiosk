import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="h-full w-full bg-black text-white p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Icon-Only Hovering & Pulsating Finger Prompt -->
      <div class="my-1 flex justify-center items-center pointer-events-none z-20 shrink-0">
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-14 w-14 rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
          <div class="relative bg-black/90 border-4 border-yellow-400 p-2.5 rounded-full shadow-2xl animate-bounce text-3xl md:text-4xl">
            👇
          </div>
        </div>
      </div>

      <!-- Main Navigation 2x2 Grid of Massive Touch Targets (Fills available viewport height) -->
      <main class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-2 py-2 overflow-hidden">
        
        <!-- Tile 1: Demos -->
        <a 
          routerLink="/demos" 
          class="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] text-black p-6 md:p-8 rounded-3xl border-6 md:border-8 border-white shadow-2xl flex flex-col justify-between cursor-pointer transition-all h-full w-full overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-4xl md:text-5xl">🚀</span>
            <span class="bg-black text-yellow-400 px-4 py-2 rounded-2xl font-black text-lg md:text-xl border-2 border-white">
              LIVE PROTOTYPEN
            </span>
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
            <span class="text-4xl md:text-5xl">🎥</span>
            <span class="bg-black text-cyan-400 px-4 py-2 rounded-2xl font-black text-lg md:text-xl border-2 border-white">
              YOUTUBE CLIPS
            </span>
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
            <span class="text-4xl md:text-5xl">🎁</span>
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
            <span class="text-4xl md:text-5xl">ℹ️</span>
            <span class="bg-cyan-400 text-black px-4 py-2 rounded-2xl font-black text-lg md:text-xl border-2 border-white">
              CIVIC TECH COMMUNITY
            </span>
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

      <footer class="pt-3 shrink-0 flex justify-end items-end">
          <a routerLink="/config" class="text-yellow-400 text-2xl hover:text-yellow-300 transition-transform active:scale-90" title="Settings">⚙️</a>
      </footer>
    </div>
  `
})
export class HomeComponent {
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
}
