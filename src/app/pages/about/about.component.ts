import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Top Title Header -->
      <header class="border-b-4 border-cyan-400 pb-3 mb-3 shrink-0">
        <h1 class="text-3xl md:text-5xl font-black text-cyan-400 uppercase tracking-tight leading-none">
          {{ lang.t().about.title }}
        </h1>
        <p class="text-lg md:text-2xl font-extrabold text-yellow-400 mt-1">
          {{ lang.t().about.tagline }}
        </p>
      </header>

      <!-- Main Symmetrical 2x2 Grid (Fills 100% available space, zero scrolling) -->
      <main class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-auto py-1 overflow-hidden">
        
        <!-- Tile 1: Wer wir sind -->
        <div class="bg-zinc-900 border-4 border-yellow-400 p-6 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden h-full">
          <div>
            <div class="flex items-center space-x-3 mb-3">
              <span class="text-4xl">🚀</span>
              <h2 class="text-2xl md:text-4xl font-black text-yellow-400 uppercase leading-tight">
                {{ lang.t().about.whoWeAreTitle }}
              </h2>
            </div>
            <p class="text-base md:text-xl font-extrabold text-white leading-relaxed">
              {{ lang.t().about.whoWeAreText }}
            </p>
          </div>
        </div>

        <!-- Tile 2: Unsere 3 Säulen -->
        <div class="bg-zinc-900 border-4 border-cyan-400 p-6 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden h-full">
          <div class="h-full flex flex-col justify-between">
            <div class="flex items-center space-x-3 mb-3">
              <span class="text-4xl">💡</span>
              <h2 class="text-2xl md:text-3xl font-black text-cyan-400 uppercase leading-tight">
                {{ lang.t().about.pillarsTitle }}
              </h2>
            </div>
            
            <!-- 3 Columns Side-by-Side -->
            <div class="gap-3 flex-1 items-stretch" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-800 flex flex-col justify-between items-center text-center h-full">
                <span class="text-3xl mb-1">📂</span>
                <div>
                  <div class="font-black text-sm md:text-base text-yellow-300 mb-1">Open Data</div>
                  <p class="text-xs font-bold text-gray-300 leading-tight">{{ lang.t().about.openDataDesc }}</p>
                </div>
              </div>
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-800 flex flex-col justify-between items-center text-center h-full">
                <span class="text-3xl mb-1">🏛️</span>
                <div>
                  <div class="font-black text-sm md:text-base text-cyan-300 mb-1">Offene Verwaltung</div>
                  <p class="text-xs font-bold text-gray-300 leading-tight">{{ lang.t().about.openGovDesc }}</p>
                </div>
              </div>
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-800 flex flex-col justify-between items-center text-center h-full">
                <span class="text-3xl mb-1">💻</span>
                <div>
                  <div class="font-black text-sm md:text-base text-rose-300 mb-1">Civic Tech</div>
                  <p class="text-xs font-bold text-gray-300 leading-tight">{{ lang.t().about.civicTechDesc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tile 3: Mitmachen! -->
        <div class="bg-zinc-900 border-4 border-rose-500 p-6 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden h-full">
          <div>
            <div class="flex items-center space-x-3 mb-3">
              <span class="text-4xl">👥</span>
              <h2 class="text-2xl md:text-4xl font-black text-rose-400 uppercase leading-tight">
                {{ lang.t().about.joinTitle }}
              </h2>
            </div>
            <p class="text-base md:text-xl font-extrabold text-white leading-relaxed">
              {{ lang.t().about.joinText }}
            </p>
          </div>
        </div>

        <!-- Tile 4: Official Website & QR Code -->
        <div class="bg-white p-6 rounded-3xl text-center shadow-2xl flex flex-col items-center justify-center h-full border-6 md:border-8 border-cyan-400 overflow-hidden shrink-0">
          <div class="bg-white p-2 rounded-2xl">
            <qrcode 
              [qrdata]="'https://ok-lab-karlsruhe.de'" 
              [width]="200" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <div class="text-black font-black text-2xl md:text-3xl tracking-tight mt-2">
            ok-lab-karlsruhe.de
          </div>
          <div class="text-zinc-700 font-extrabold text-base md:text-lg mt-1">
            {{ lang.t().about.scanWebsite }}
          </div>
        </div>

      </main>
    </div>
  `
})
export class AboutComponent {
  readonly lang = inject(LanguageService);
}
