import { Directive, input } from '@angular/core';

type ButtonVariant = 'primary' | 'ghost';

@Directive({
  selector: 'button[appButton]',
  host: {
    '[class]': "'btn btn--' + variant()"
  },
  standalone: true
})
export class ButtonDirective {
  public readonly variant = input<ButtonVariant>('primary');
}
