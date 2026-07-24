import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private ngZone = inject(NgZone);
  
  readonly isIdle = signal<boolean>(false);
  readonly idleTimeoutSeconds = 60; // 60 seconds idle time
  
  private timerId: any = null;
  private readonly events = ['touchstart', 'touchmove', 'mousedown', 'mousemove', 'click', 'keydown', 'scroll'];

  constructor() {
    this.startTracking();
  }

  private startTracking(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.events.forEach(eventName => {
        window.addEventListener(eventName, this.onUserActivity, { passive: true });
      });
    });

    this.resetTimer();
  }

  private onUserActivity = (): void => {
    if (this.isIdle()) {
      this.ngZone.run(() => {
        this.isIdle.set(false);
      });
    }
    this.resetTimer();
  };

  public resetTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public dismissIdle(): void {
    this.isIdle.set(false);
    this.resetTimer();
  }

  public destroy(): void {
    if (typeof window === 'undefined') return;
    this.events.forEach(eventName => {
      window.removeEventListener(eventName, this.onUserActivity);
    });
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
