import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-raffle',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Main 2-Side Layout: Left side content (60%), Right side QR code (40%) -->
      <main class="flex-1 w-full min-h-0 flex flex-row items-center gap-6 my-auto overflow-hidden">

        <!-- Left Side: All details, badges, headline, prizes, description -->
        <div class="flex-1 flex flex-col justify-around h-full py-1 space-y-2 lg:space-y-4 overflow-hidden" style="flex: 1.35;">
          
          <!-- Special Event Badge -->
          <div>
            <span class="bg-yellow-400 text-black px-5 py-1.5 rounded-full font-black text-sm md:text-base lg:text-lg uppercase tracking-widest border-2 border-white inline-block shadow-md">
              🎁 DAS FEST SPECIAL
            </span>
          </div>

          <!-- Main Title & Subheadline -->
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-yellow-300 uppercase tracking-tight leading-none drop-shadow-md">
              {{ lang.t().raffle.title }}
            </h1>
            <h2 class="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-snug mt-1 lg:mt-2">
              {{ lang.t().raffle.headline }}
            </h2>
          </div>

          <!-- Prize Cards 3-Column Grid -->
          <div class="my-2 py-1" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;">
            <div class="bg-zinc-900 border-2 border-yellow-400/80 rounded-2xl p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-3xl lg:text-4xl mb-2">⚡</span>
              <span class="text-xs lg:text-sm font-black text-yellow-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesMicrocontrollers }}
              </span>
            </div>
            <div class="bg-zinc-900 border-2 border-cyan-400/80 rounded-2xl p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-3xl lg:text-4xl mb-2">🛰️</span>
              <span class="text-xs lg:text-sm font-black text-cyan-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesSensors }}
              </span>
            </div>
            <div class="bg-zinc-900 border-2 border-amber-400/80 rounded-2xl p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-3xl lg:text-4xl mb-2">🌀</span>
              <span class="text-xs lg:text-sm font-black text-amber-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesFans }}
              </span>
            </div>
          </div>

          <!-- Description Box -->
          <div class="bg-zinc-900/80 p-3 lg:p-4 rounded-2xl border border-zinc-700/60 shadow-lg">
            <p class="text-sm md:text-base lg:text-lg font-bold text-gray-200 leading-relaxed">
              {{ lang.t().raffle.description }}
            </p>
          </div>

        </div>

        <!-- Right Side: Giant QR Code & Action Callouts -->
        <div class="flex-1 flex flex-col items-center justify-center h-full py-1 space-y-3 lg:space-y-5" style="flex: 0.85;">
          
          <!-- Glowing QR Code Card -->
          <div class="bg-white p-3 lg:p-5 rounded-3xl border-6 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)] flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <qrcode 
              [qrdata]="raffleParticipationUrl" 
              [width]="250" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <!-- Animated Scan CTA Banner -->
          <div class="bg-yellow-400 text-black px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-2xl text-xl md:text-2xl lg:text-3xl font-black tracking-wide border-4 border-white shadow-xl animate-bounce text-center">
            📲 {{ lang.t().raffle.scanPrompt }}
          </div>

          <!-- Direct URL Pill -->
          <div class="text-cyan-300 font-mono text-sm lg:text-base font-black bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-500/50 text-center tracking-wide shadow-md">
            ok-lab-karlsruhe.de/gewinnspiel
          </div>

        </div>

      </main>

      <!-- Bottom Footer -->
      <footer class="shrink-0 text-gray-400 font-bold text-sm lg:text-base text-center pt-2 border-t border-zinc-800">
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
