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

      <!-- Main 4-Box Optimized Grid (Fills available space, zero scrolling) -->
      <main class="flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 my-auto py-1 overflow-hidden">
        
        <!-- Left 2 Columns: 3 Information Cards Grid -->
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-hidden">
          
          <!-- Box 1: Wer wir sind -->
          <div class="bg-zinc-900 border-4 border-yellow-400 p-5 rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-3xl">🚀</span>
                <h2 class="text-2xl md:text-3xl font-black text-yellow-400 uppercase">
                  {{ lang.t().about.whoWeAreTitle }}
                </h2>
              </div>
              <p class="text-base md:text-xl font-bold text-white leading-snug">
                {{ lang.t().about.whoWeAreText }}
              </p>
            </div>
          </div>

          <!-- Box 2: Mitmachen -->
          <div class="bg-zinc-900 border-4 border-rose-500 p-5 rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-3xl">👥</span>
                <h2 class="text-2xl md:text-3xl font-black text-rose-400 uppercase">
                  {{ lang.t().about.joinTitle }}
                </h2>
              </div>
              <p class="text-base md:text-xl font-bold text-white leading-snug">
                {{ lang.t().about.joinText }}
              </p>
            </div>
            <div class="mt-3 bg-rose-950/80 border-2 border-rose-400 p-2 px-3 rounded-2xl text-yellow-300 font-extrabold text-sm md:text-base text-center">
              🗓️ {{ lang.t().about.meetingInfo }}
            </div>
          </div>

          <!-- Box 3: Unsere 3 Säulen -->
          <div class="md:col-span-2 bg-zinc-900 border-4 border-cyan-400 p-5 rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden">
            <h2 class="text-xl md:text-2xl font-black text-cyan-400 uppercase mb-2">
              {{ lang.t().about.pillarsTitle }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-700">
                <div class="font-black text-lg text-yellow-300 mb-1">{{ lang.t().about.openDataTitle }}</div>
                <p class="text-xs md:text-sm font-bold text-gray-200 leading-tight">{{ lang.t().about.openDataDesc }}</p>
              </div>
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-700">
                <div class="font-black text-lg text-cyan-300 mb-1">{{ lang.t().about.openGovTitle }}</div>
                <p class="text-xs md:text-sm font-bold text-gray-200 leading-tight">{{ lang.t().about.openGovDesc }}</p>
              </div>
              <div class="bg-black/60 p-3 rounded-2xl border-2 border-zinc-700">
                <div class="font-black text-lg text-rose-300 mb-1">{{ lang.t().about.civicTechTitle }}</div>
                <p class="text-xs md:text-sm font-bold text-gray-200 leading-tight">{{ lang.t().about.civicTechDesc }}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Box 4 (Right Column): Official Website QR Code Card -->
        <div class="bg-white p-6 rounded-3xl text-center shadow-2xl flex flex-col items-center justify-center h-full border-6 border-cyan-400 overflow-hidden shrink-0">
          <div class="bg-white p-2 rounded-2xl">
            <qrcode 
              [qrdata]="'https://ok-lab-karlsruhe.de'" 
              [width]="230" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <div class="text-black font-black text-2xl md:text-3xl tracking-tight mt-2">
            ok-lab-karlsruhe.de
          </div>
          <div class="text-zinc-700 font-extrabold text-sm md:text-base mt-1">
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
