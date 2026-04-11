import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  public readonly appTooltip = input.required<string>();
  public readonly tooltipPosition = input<TooltipPosition>('top');

  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef<HTMLElement>);

  private tooltipElement: HTMLElement | null = null;

  @HostListener('mouseenter')
  protected show(): void {
    if(this.tooltipElement || !this.appTooltip()) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip--${this.tooltipPosition()}`);

    const text = this.renderer.createText(this.appTooltip());
    this.renderer.appendChild(this.tooltipElement, text);

    this.renderer.appendChild(document.body, this.tooltipElement);

    this.setPosition();
  }

  @HostListener('mouseleave')
  protected hide(): void {
    if(!this.tooltipElement) return;

    this.renderer.removeChild(document.body, this.tooltipElement);
    this.tooltipElement = null;
  }

  private setPosition(): void {
    if(!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    const gap = 8;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
        left = hostRect.right + gap;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}
