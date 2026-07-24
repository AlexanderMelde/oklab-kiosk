import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from './services/config.service';
import { IdleService } from './services/idle.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AttractOverlayComponent } from './components/attract-overlay/attract-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, AttractOverlayComponent],
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
    // 1. Handle ?promote=... initial navigation redirection
    const promotedRoute = this.configService.getPromotedRoute();
    if (promotedRoute) {
      this.router.navigateByUrl(promotedRoute, { replaceUrl: true });
    }

    // 2. Track route changes to control navbar visibility
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.split('?')[0];
        this.currentPath.set(path);
        // Show navbar on subpages (anything except home '/')
        this.isSubpage.set(path !== '/' && path !== '');
      });

    // 3. Reset to home (or promoted route) on idle timeout
    let previousIdle = false;
    setInterval(() => {
      const currentlyIdle = this.idleService.isIdle();
      if (currentlyIdle && !previousIdle) {
        // Returned to idle state
        const targetRoute = this.configService.getPromotedRoute() || '/';
        if (this.currentPath() !== targetRoute && this.currentPath() !== '/config') {
          this.router.navigateByUrl(targetRoute);
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
