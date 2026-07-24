import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-raffle',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white p-6 flex flex-col items-center justify-between select-none overflow-y-auto">
      
      <!-- Top Title Badge -->
      <div class="text-center mt-2">
        <span class="bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-xl md:text-2xl uppercase tracking-widest border-4 border-white inline-block mb-3">
          🎁 DAS FEST SPECIAL
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-yellow-300 uppercase tracking-tight">
          {{ lang.t().raffle.title }}
        </h1>
      </div>

      <!-- Center Box: Headline, Description & Giant QR Code -->
      <div class="bg-zinc-900 border-8 border-yellow-400 rounded-3xl p-8 md:p-12 w-full text-center shadow-2xl space-y-8 my-auto">
        
        <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">
          {{ lang.t().raffle.headline }}
        </h2>

        <p class="text-xl md:text-3xl font-extrabold text-cyan-300 mx-auto leading-relaxed">
          {{ lang.t().raffle.description }}
        </p>

        <!-- Giant Central QR Code -->
        <div class="flex flex-col items-center justify-center space-y-4 pt-4">
          <div class="bg-white p-4 rounded-3xl border-8 border-cyan-400 shadow-2xl transform hover:scale-105 transition-transform">
            <qrcode 
              [qrdata]="raffleParticipationUrl" 
              [width]="260" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <div class="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-2xl md:text-4xl font-black tracking-wide border-4 border-white shadow-xl animate-bounce">
            📲 {{ lang.t().raffle.scanPrompt }}
          </div>
        </div>

      </div>

      <!-- Bottom Hint -->
      <footer class="text-gray-400 font-bold text-lg md:text-xl text-center pb-2">
        OK Lab Karlsruhe • Civic Tech & Open Data • ok-lab-karlsruhe.de
      </footer>

    </div>
  `
})
export class RaffleComponent {
  readonly lang = inject(LanguageService);

  // URL for participants to scan on their smartphones
  readonly raffleParticipationUrl = 'https://ok-lab-karlsruhe.de/gewinnspiel';
}
