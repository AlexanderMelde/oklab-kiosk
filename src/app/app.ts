import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from './services/config.service';
import { IdleService } from './services/idle.service';
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
  readonly idleService = inject(IdleService);
  private router = inject(Router);

  isSubpage = signal<boolean>(false);
  currentPath = signal<string>('/');

  ngOnInit(): void {
    // 0. Strict Kiosk Security Lock: Prevent window.open & external redirects
    if (typeof window !== 'undefined') {
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

    // 1. Re-parse query params on load
    this.configService.parseQueryParams();

    // 2. Handle ?promote=... initial navigation redirection while preserving query params
    const promotedRoute = this.configService.getPromotedRoute();
    if (promotedRoute) {
      const currentUrlParams = typeof window !== 'undefined' ? window.location.search : '';
      this.router.navigateByUrl(`${promotedRoute}${currentUrlParams}`, { replaceUrl: true });
    }

    // 3. Track route changes to control navbar visibility
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.split('?')[0];
        this.currentPath.set(path);
        // Show navbar on subpages (anything except home '/')
        this.isSubpage.set(path !== '/' && path !== '');
      });

    // 4. Reset to home (or promoted route) on idle timeout
    let previousIdle = false;
    setInterval(() => {
      const currentlyIdle = this.idleService.isIdle();
      if (currentlyIdle && !previousIdle) {
        // Returned to idle state
        const targetRoute = this.configService.getPromotedRoute() || '/';
        if (this.currentPath() !== targetRoute && this.currentPath() !== '/config') {
          const currentUrlParams = typeof window !== 'undefined' ? window.location.search : '';
          this.router.navigateByUrl(`${targetRoute}${currentUrlParams}`);
        }
      }
      previousIdle = currentlyIdle;
    }, 1000);
  }

  onReloadRequested(): void {
    // Reload active route
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
}
