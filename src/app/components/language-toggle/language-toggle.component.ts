import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `],
  template: `
    <button 
      (click)="lang.toggleLanguage()"
      class="h-16 w-16 p-3 box-border bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-cyan-400 rounded-2xl border-4 border-white shadow-lg transition-transform active:scale-95 flex items-center justify-center shrink-0 cursor-pointer select-none"
      [title]="lang.currentLang() === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'">
      <span class="font-black text-xl sm:text-2xl leading-none uppercase tracking-tight">
        {{ lang.currentLang() === 'de' ? 'EN' : 'DE' }}
      </span>
    </button>
  `
})
export class LanguageToggleComponent {
  readonly lang = inject(LanguageService);
}
