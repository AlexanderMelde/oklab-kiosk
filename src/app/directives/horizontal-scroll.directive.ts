import { Directive, ElementRef, OnInit, OnDestroy, inject, NgZone } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true
})
export class HorizontalScrollDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private ngZone = inject(NgZone);

  private isMouseDown = false;
  private startX = 0;
  private startY = 0;
  private startScrollLeft = 0;
  private totalDragDistance = 0;

  private onWheel = (e: WheelEvent) => {
    const container = this.el.nativeElement;
    if (container.scrollWidth > container.clientWidth) {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta !== 0) {
        container.scrollLeft += delta;
        e.preventDefault();
      }
    }
  };

  private onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;
    const container = this.el.nativeElement;
    if (container.scrollWidth <= container.clientWidth) return;

    this.isMouseDown = true;
    this.totalDragDistance = 0;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startScrollLeft = container.scrollLeft;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isMouseDown) return;
    const container = this.el.nativeElement;
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    this.totalDragDistance = Math.hypot(deltaX, deltaY);

    if (this.totalDragDistance > 15) {
      container.scrollLeft = this.startScrollLeft - deltaX;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    }
  };

  private onMouseUp = () => {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      const container = this.el.nativeElement;
      container.style.cursor = '';
    }
  };

  private onClickCapture = (e: MouseEvent) => {
    if (this.totalDragDistance > 15) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    this.totalDragDistance = 0;
  };

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const container = this.el.nativeElement;
      container.style.touchAction = 'pan-x';
      container.addEventListener('wheel', this.onWheel, { passive: false });
      container.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      container.addEventListener('click', this.onClickCapture, true);
    });
  }

  ngOnDestroy(): void {
    const container = this.el.nativeElement;
    container.removeEventListener('wheel', this.onWheel);
    container.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    container.removeEventListener('click', this.onClickCapture, true);
  }
}
