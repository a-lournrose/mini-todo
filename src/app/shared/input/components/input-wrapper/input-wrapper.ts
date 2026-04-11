import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.html',
  styleUrl: './input-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputWrapperComponent {
  public readonly label = input<string>('');
}
