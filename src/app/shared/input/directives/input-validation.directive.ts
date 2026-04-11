import { Directive, HostListener, inject, input, signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationStatus } from '@shared/input/models/input.models';

@Directive({
  selector: '[appInputValidation]',
  standalone: true,
  exportAs: 'inputValidation',
})
export class InputValidationDirective {
  public readonly errors = input.required<Record<string, string>>({ alias: 'appInputValidation' });

  private readonly ngControl = inject(NgControl);

  public readonly errorText = signal<string>('');
  public readonly status = signal<ValidationStatus>('IDLE');

  @HostListener('blur')
  protected onBlur(): void {
    if(!this.errors()) return;

    this.updateErrors();
  }

  private updateErrors(): void {
    const control = this.ngControl.control;
    if (!control) return;

    if (control.status === 'INVALID') {
      const firstKey = Object.keys(control.errors ?? {})[0];
      this.status.set('ERROR');
      this.errorText.set(this.errors()[firstKey]);
    }
    if (control.status === 'VALID') {
      this.status.set('SUCCESS');
      this.errorText.set('');
    }
  }
}
