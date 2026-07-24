import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-black text-white p-6 md:p-10 flex flex-col justify-between select-none overflow-y-auto">
      
      <!-- Top Title -->
      <header class="border-b-4 border-cyan-400 pb-4 mb-6">
        <h1 class="text-4xl md:text-6xl font-black text-cyan-400 uppercase tracking-tight">
          {{ lang.t().about.title }}
        </h1>
        <p class="text-xl md:text-3xl font-extrabold text-yellow-400">
          Civic Tech & Open Data Volunteer Community
        </p>
      </header>

      <!-- Main High-Impact Typography Content & QR Box -->
      <main class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-auto items-center max-w-7xl mx-auto w-full">
        
        <!-- Left: Text Paragraphs -->
        <div class="lg:col-span-2 space-y-6 text-left">
          
          <div class="bg-zinc-900 border-4 border-yellow-400 p-6 md:p-8 rounded-3xl shadow-xl">
            <h2 class="text-3xl md:text-5xl font-black text-yellow-300 mb-3">
              {{ lang.t().about.p1 }}
            </h2>
            <p class="text-xl md:text-3xl font-extrabold text-white leading-relaxed">
              {{ lang.t().about.p2 }}
            </p>
          </div>

          <div class="bg-zinc-900 border-4 border-cyan-400 p-6 md:p-8 rounded-3xl shadow-xl">
            <p class="text-xl md:text-3xl font-extrabold text-gray-200 leading-relaxed">
              {{ lang.t().about.p3 }}
            </p>
          </div>

        </div>

        <!-- Right: Website QR Code -->
        <div class="flex flex-col items-center justify-center bg-zinc-900 border-8 border-white p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div class="text-yellow-400 font-black text-2xl md:text-3xl uppercase">
            {{ lang.t().about.scanWebsite }}
          </div>

          <div class="bg-white p-4 rounded-3xl border-4 border-cyan-400 shadow-xl">
            <qrcode 
              [qrdata]="'https://ok-lab-karlsruhe.de'" 
              [width]="200" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <div class="text-cyan-300 font-extrabold text-xl md:text-2xl underline">
            ok-lab-karlsruhe.de
          </div>
        </div>

      </main>
    </div>
  `
})
export class AboutComponent {
  readonly lang = inject(LanguageService);
}
