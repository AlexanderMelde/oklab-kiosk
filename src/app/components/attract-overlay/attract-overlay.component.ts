import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleService } from '../../services/idle.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-attract-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      (click)="dismiss()"
      (touchstart)="dismiss()"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-6 select-none cursor-pointer border-8 border-yellow-400">
      
      <!-- Top Branding -->
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-5xl font-black text-cyan-400 tracking-wider uppercase mb-3">
          OK LAB KARLSRUHE
        </h2>
        <p class="text-2xl md:text-3xl font-extrabold text-white max-w-3xl leading-snug">
          {{ lang.t().attract.promptSubtitle }}
        </p>
      </div>

      <!-- Pulsing Touch Prompt Box -->
      <div class="animate-touch-pulse bg-yellow-400 text-black px-12 py-10 rounded-3xl border-4 border-white flex flex-col items-center justify-center shadow-2xl space-y-6 transform transition-all active:scale-95">
        <!-- Giant Touch Hand Icon -->
        <svg class="w-24 h-24 text-black animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5a1.5 1.5 0 113 0m-3 0V11m3-5.5a1.5 1.5 0 113 0"/>
        </svg>

        <span class="text-4xl md:text-6xl font-black tracking-widest uppercase text-center">
          {{ lang.t().attract.touchToStart }}
        </span>
      </div>

      <!-- Bottom Hint -->
      <div class="mt-12 text-gray-300 text-xl font-bold tracking-wide">
        DAS FEST & Civic Tech Karlsruhe • Kiosk Mode
      </div>
    </div>
  `
})
export class AttractOverlayComponent {
  readonly idleService = inject(IdleService);
  readonly lang = inject(LanguageService);

  dismiss(): void {
    this.idleService.dismissIdle();
  }
}
