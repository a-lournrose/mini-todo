import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputWrapperComponent } from '@shared/input/components/input-wrapper/input-wrapper';
import { InputControlDirective } from '@shared/input/directives/input-control.directive';
import { InputValidationDirective } from '@shared/input/directives/input-validation.directive';
import { PasswordToggleDirective } from '@shared/input/directives/password-toggle.directive';
import { InputValidationIconComponent } from '@shared/input/components/input-validation-icon/input-validation-icon';
import { LucideDynamicIcon } from '@lucide/angular';

type InputType = 'text' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    InputWrapperComponent,
    InputControlDirective,
    ReactiveFormsModule,
    InputValidationDirective,
    PasswordToggleDirective,
    InputValidationIconComponent,
    LucideDynamicIcon,
  ],
})
export class InputComponent {
  public readonly type = input<InputType>('text');
  public readonly label = input<string>('');
  public readonly placeholder = input<string>('');
  public readonly control = input.required<FormControl<string>>();
  public readonly errors = input<Record<string, string>>({});

  protected readonly hasErrors = computed(() =>
    Object.keys(this.errors()).length > 0
  );
}
