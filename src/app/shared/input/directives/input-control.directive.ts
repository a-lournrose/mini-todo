import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appInputControl]',
  standalone: true,
  host: {
    class: 'app-input-control',
  }
})
export class InputControlDirective {}
