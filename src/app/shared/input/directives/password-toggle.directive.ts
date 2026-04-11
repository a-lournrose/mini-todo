import { computed, Directive, ElementRef, inject, signal } from '@angular/core';
import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Directive({
  selector: 'input[appPasswordToggle]',
  standalone: true,
  exportAs: 'passwordToggle',
})
export class PasswordToggleDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly isVisible = signal(false);

  public readonly icon = computed(() => this.isVisible() ? LucideEyeOff : LucideEye);

  public toggle(): void {
    this.isVisible.update(v => !v);
    this.el.nativeElement.type = this.isVisible() ? 'text' : 'password';
  }
}
