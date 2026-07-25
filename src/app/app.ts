import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from './services/config.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly configService = inject(ConfigService);
  private router = inject(Router);

  isSubpage = signal<boolean>(false);
  currentPath = signal<string>('/');

  ngOnInit(): void {
    // Dynamically calculate visible viewport height to fix mobile browser bar height issues
    this.updateAppHeight();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateAppHeight());
      window.addEventListener('orientationchange', () => this.updateAppHeight());
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => this.updateAppHeight());
      }

      // 0. Strict Kiosk Security Lock: Prevent window.open & external redirects
      window.open = function() {
        console.warn('Kiosk Lock: Prevented window.open popup attempt.');
        return null;
      };

      document.addEventListener('click', (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement)?.closest('a');
        if (anchor && anchor.href) {
          try {
            const url = new URL(anchor.href, window.location.href);
            // Intercept and block any navigation leading away from kiosk domain
            if (url.origin !== window.location.origin) {
              e.preventDefault();
              e.stopPropagation();
              console.warn('Kiosk Lock: Blocked external link navigation to', url.href);
            }
          } catch (_) {}
        }
      }, true);
    }

    // 1. Re-parse query params / init configuration on load
    this.configService.initConfiguration();

    // 2. Track route changes to control navbar visibility
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.split('?')[0];
        this.currentPath.set(path);
        // Show navbar on subpages (anything except home '/')
        this.isSubpage.set(path !== '/' && path !== '');
      });
  }

  private updateAppHeight(): void {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${vh}px`);
    }
  }

  onReloadRequested(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
