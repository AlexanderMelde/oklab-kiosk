import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ConfigService } from '../../services/config.service';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LanguageToggleComponent],
  template: `
    <div class="h-full w-full bg-black text-white p-6 flex flex-col justify-between select-none">
      
      <!-- Top Branding Header -->
      <header class="flex items-center justify-between border-b-4 border-yellow-400 pb-4">
        <div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight text-yellow-400 uppercase">
            {{ lang.t().home.welcome }}
          </h1>
          <p class="text-xl md:text-3xl font-extrabold text-cyan-400 mt-1">
            {{ lang.t().home.subtitle }}
          </p>
        </div>

        <!-- Language Switcher Header Button -->
        <app-language-toggle></app-language-toggle>
      </header>

      <!-- Prominent Touch Prompt Banner -->
      <div class="my-4 bg-gradient-to-r from-yellow-400 via-cyan-400 to-yellow-400 p-1 rounded-3xl animate-pulse shadow-2xl">
        <div class="bg-black py-3 px-6 rounded-[22px] flex items-center justify-center space-x-4 text-center">
          <span class="text-3xl md:text-4xl">👆</span>
          <span class="text-2xl md:text-4xl font-black tracking-widest text-yellow-300 uppercase">
            {{ lang.t().attract.touchToStart }}
          </span>
          <span class="text-3xl md:text-4xl">👈</span>
        </div>
      </div>

      <!-- Main Navigation 2x2 Grid of Massive Touch Targets -->
      <main class="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto max-w-7xl mx-auto w-full py-4">
        
        <!-- Tile 1: Demos -->
        <a 
          routerLink="/demos" 
          class="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] text-black p-8 rounded-3xl border-8 border-white shadow-2xl flex flex-col justify-between cursor-pointer transition-all min-h-[220px]">
          <div class="flex items-center justify-between">
            <span class="text-5xl">🚀</span>
            <span class="bg-black text-yellow-400 px-4 py-2 rounded-2xl font-black text-xl border-2 border-white">
              LIVE PROTOTYPEN
            </span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
              {{ lang.t().home.demosTitle }}
            </h2>
            <p class="text-lg md:text-2xl font-bold text-zinc-900 leading-snug">
              {{ lang.t().home.demosDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 2: Videos -->
        <a 
          routerLink="/media" 
          class="bg-gradient-to-br from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 active:scale-[0.98] text-black p-8 rounded-3xl border-8 border-white shadow-2xl flex flex-col justify-between cursor-pointer transition-all min-h-[220px]">
          <div class="flex items-center justify-between">
            <span class="text-5xl">🎥</span>
            <span class="bg-black text-cyan-400 px-4 py-2 rounded-2xl font-black text-xl border-2 border-white">
              YOUTUBE CLIPS
            </span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
              {{ lang.t().home.videosTitle }}
            </h2>
            <p class="text-lg md:text-2xl font-bold text-zinc-900 leading-snug">
              {{ lang.t().home.videosDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 3: Raffle -->
        <a 
          routerLink="/raffle" 
          class="bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 active:scale-[0.98] text-white p-8 rounded-3xl border-8 border-yellow-400 shadow-2xl flex flex-col justify-between cursor-pointer transition-all min-h-[220px]">
          <div class="flex items-center justify-between">
            <span class="text-5xl">🎁</span>
            <span class="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-black text-xl border-2 border-white">
              DAS FEST SPECIAL
            </span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2 text-yellow-300">
              {{ lang.t().home.raffleTitle }}
            </h2>
            <p class="text-lg md:text-2xl font-extrabold text-white leading-snug">
              {{ lang.t().home.raffleDesc }}
            </p>
          </div>
        </a>

        <!-- Tile 4: About -->
        <a 
          routerLink="/about" 
          class="bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 active:scale-[0.98] text-white p-8 rounded-3xl border-8 border-cyan-400 shadow-2xl flex flex-col justify-between cursor-pointer transition-all min-h-[220px]">
          <div class="flex items-center justify-between">
            <span class="text-5xl">ℹ️</span>
            <span class="bg-cyan-400 text-black px-4 py-2 rounded-2xl font-black text-xl border-2 border-white">
              CIVIC TECH COMMUNITY
            </span>
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2 text-cyan-300">
              {{ lang.t().home.aboutTitle }}
            </h2>
            <p class="text-lg md:text-2xl font-extrabold text-gray-200 leading-snug">
              {{ lang.t().home.aboutDesc }}
            </p>
          </div>
        </a>

      </main>

      <!-- Footer Info Bar -->
      <footer class="border-t-4 border-zinc-800 pt-4 flex items-center justify-between text-gray-400 font-bold text-lg md:text-xl">
        <div>
          Code for Karlsruhe • Open Knowledge Foundation Deutschland
        </div>
        <div class="flex items-center space-x-6">
          <a routerLink="/config" class="text-yellow-400 text-2xl hover:text-yellow-300 transition-transform active:scale-90" title="Settings">⚙️</a>
        </div>
      </footer>
    </div>
  `
})
export class HomeComponent {
  readonly lang = inject(LanguageService);
  readonly configService = inject(ConfigService);
}
