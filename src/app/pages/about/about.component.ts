import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white p-4 md:p-6 lg:p-8 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Top Title Header -->
      <header class="border-b-4 border-cyan-400 pb-3 mb-3 md:mb-4 shrink-0">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-cyan-400 uppercase tracking-tight leading-none">
          {{ lang.t().about.title }}
        </h1>
        <p class="text-lg md:text-2xl font-extrabold text-yellow-400 mt-1">
          Civic Tech & Open Data Volunteer Community
        </p>
      </header>

      <!-- Main Responsive Content Grid (Fills 100% available vertical space, zero scrolling) -->
      <main class="flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 my-auto py-1 overflow-hidden">
        
        <!-- Left: High-Impact Text Paragraph Cards -->
        <div class="lg:col-span-2 flex flex-col gap-4 justify-between h-full overflow-hidden">
          
          <!-- Card 1: Main Mission -->
          <div class="bg-zinc-900 border-4 border-yellow-400 p-5 md:p-8 rounded-3xl shadow-2xl flex-1 flex flex-col justify-center overflow-hidden">
            <h2 class="text-2xl md:text-4xl lg:text-5xl font-black text-yellow-300 mb-2 leading-tight">
              {{ lang.t().about.p1 }}
            </h2>
            <p class="text-base md:text-xl lg:text-2xl font-extrabold text-white leading-relaxed">
              {{ lang.t().about.p2 }}
            </p>
          </div>

          <!-- Card 2: Community Participation -->
          <div class="bg-zinc-900 border-4 border-cyan-400 p-5 md:p-8 rounded-3xl shadow-2xl flex-1 flex flex-col justify-center overflow-hidden">
            <p class="text-base md:text-xl lg:text-2xl font-extrabold text-gray-200 leading-relaxed">
              {{ lang.t().about.p3 }}
            </p>
          </div>

        </div>

        <!-- Right: Official Website QR Code Card -->
        <div class="flex flex-col items-center justify-center bg-white p-6 rounded-3xl text-center shadow-2xl h-full border-6 md:border-8 border-cyan-400 overflow-hidden shrink-0">
          <div class="bg-white p-2 rounded-2xl">
            <qrcode 
              [qrdata]="'https://ok-lab-karlsruhe.de'" 
              [width]="240" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <div class="text-black font-black text-2xl md:text-3xl tracking-tight mt-2">
            ok-lab-karlsruhe.de
          </div>
          <div class="text-zinc-700 font-extrabold text-base md:text-lg mt-1">
            Website scannen & mitmachen
          </div>
        </div>

      </main>
    </div>
  `
})
export class AboutComponent {
  readonly lang = inject(LanguageService);
}
