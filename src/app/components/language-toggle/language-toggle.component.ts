import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="lang.toggleLanguage()"
      class="bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black px-5 py-3 rounded-2xl font-black text-xl md:text-2xl border-4 border-white flex items-center space-x-3 shadow-lg transition-transform active:scale-95 shrink-0"
      [title]="lang.currentLang() === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'">
      
      <!-- Globe Icon -->
      <svg class="w-7 h-7 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.865M12 21a9 9 0 100-18 9 9 0 000 18z"/>
      </svg>

      <!-- Badge showing both languages with active highlighted -->
      <div class="flex items-center space-x-1.5 font-black text-xl md:text-2xl tracking-wider">
        <span [class.bg-black]="lang.currentLang() === 'de'" [class.text-cyan-400]="lang.currentLang() === 'de'" class="px-2 py-0.5 rounded-lg transition-colors">DE</span>
        <span class="text-black/50">|</span>
        <span [class.bg-black]="lang.currentLang() === 'en'" [class.text-cyan-400]="lang.currentLang() === 'en'" class="px-2 py-0.5 rounded-lg transition-colors">EN</span>
      </div>
    </button>
  `
})
export class LanguageToggleComponent {
  readonly lang = inject(LanguageService);
}
