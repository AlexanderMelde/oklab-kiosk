import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-raffle',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    <div class="h-full w-full bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white p-4 md:p-6 flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Main 3-Column Layout: Left (Info), Middle (QR Code), Right (Live Web App Embed) -->
      <main class="flex-1 w-full min-h-0 flex flex-row items-center gap-5 my-auto overflow-hidden">

        <!-- Column 1: All details, badges, headline, prizes, description -->
        <div class="flex-1 flex flex-col justify-around h-full py-1 space-y-2 lg:space-y-4 overflow-hidden" style="flex: 1.1;">
          
          <!-- Special Event Badge -->
          <div>
            <span class="bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-xs md:text-sm lg:text-base uppercase tracking-widest border-2 border-white inline-block shadow-md">
              🎁 DAS FEST SPECIAL
            </span>
          </div>

          <!-- Main Title & Subheadline -->
          <div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-300 uppercase tracking-tight leading-none drop-shadow-md">
              {{ lang.t().raffle.title }}
            </h1>
            <h2 class="text-lg md:text-xl lg:text-2xl font-extrabold text-white leading-snug mt-1 lg:mt-2">
              {{ lang.t().raffle.headline }}
            </h2>
          </div>

          <!-- Prize Cards 3-Column Grid -->
          <div class="my-2 py-1" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">
            <div class="bg-zinc-900 border-2 border-yellow-400/80 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-2xl lg:text-3xl mb-1">⚡</span>
              <span class="text-[11px] lg:text-xs font-black text-yellow-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesMicrocontrollers }}
              </span>
            </div>
            <div class="bg-zinc-900 border-2 border-cyan-400/80 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-2xl lg:text-3xl mb-1">🛰️</span>
              <span class="text-[11px] lg:text-xs font-black text-cyan-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesSensors }}
              </span>
            </div>
            <div class="bg-zinc-900 border-2 border-amber-400/80 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-lg">
              <span class="text-2xl lg:text-3xl mb-1">🌀</span>
              <span class="text-[11px] lg:text-xs font-black text-amber-300 uppercase tracking-wider leading-tight">
                {{ lang.t().raffle.prizesFans }}
              </span>
            </div>
          </div>

          <!-- Description Box -->
          <div class="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-700/60 shadow-lg">
            <p class="text-xs md:text-sm lg:text-base font-bold text-gray-200 leading-relaxed">
              {{ lang.t().raffle.description }}
            </p>
          </div>

        </div>

        <!-- Column 2: Giant QR Code & Action Callouts -->
        <div class="flex-1 flex flex-col items-center justify-center h-full py-1 space-y-3 lg:space-y-4" style="flex: 0.8;">
          
          <!-- Glowing QR Code Card -->
          <div class="bg-white p-3 lg:p-4 rounded-3xl border-4 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.35)] flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
            <qrcode 
              [qrdata]="raffleParticipationUrl" 
              [width]="210" 
              [errorCorrectionLevel]="'H'">
            </qrcode>
          </div>

          <!-- Animated Scan CTA Banner -->
          <div class="bg-yellow-400 text-black px-4 py-2 rounded-2xl text-lg md:text-xl lg:text-2xl font-black tracking-wide border-2 border-white shadow-xl animate-bounce text-center">
            📲 {{ lang.t().raffle.scanPrompt }}
          </div>

          <!-- Direct URL Pill -->
          <div class="text-cyan-300 font-mono text-xs lg:text-sm font-black bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/50 text-center tracking-wide shadow-md">
            ok-lab-gewinnspiel.lovable.app
          </div>

        </div>

        <!-- Column 3: Live Embedded Web App View -->
        <div class="flex-1 flex flex-col h-full bg-zinc-900/90 rounded-3xl border-2 border-cyan-500/50 shadow-2xl p-2.5 overflow-hidden" style="flex: 1.1;">
          <div class="flex items-center justify-between px-3 py-1.5 mb-1 bg-zinc-950/80 rounded-xl border border-zinc-800">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
            </div>
          </div>
          
          <div class="flex-1 w-full h-full relative rounded-2xl overflow-hidden bg-black border border-zinc-800">
            <iframe 
              [src]="safeRaffleUrl" 
              class="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="fullscreen; geolocation; camera; microphone">
            </iframe>
          </div>
        </div>

      </main>

      <!-- Bottom Footer -->
      <footer class="shrink-0 text-gray-400 font-bold text-xs lg:text-sm text-center pt-2 border-t border-zinc-800">
        OK Lab Karlsruhe • Civic Tech & Open Data • ok-lab-karlsruhe.de
      </footer>

    </div>
  `
})
export class RaffleComponent {
  readonly lang = inject(LanguageService);
  private readonly sanitizer = inject(DomSanitizer);

  // Dynamic URL for participants and embed with language parameter ('de' or 'en')
  get raffleParticipationUrl(): string {
    return `https://ok-lab-gewinnspiel.lovable.app?lang=${this.lang.currentLang()}`;
  }

  get safeRaffleUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.raffleParticipationUrl);
  }
}
