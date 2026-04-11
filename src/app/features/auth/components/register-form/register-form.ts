import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterFormValues } from '@features/auth/models/auth.models';
import { ButtonDirective } from '@shared/button/directives/button.directive';
import { APP_ROUTES } from '@core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { InputComponent } from '@shared/input/components/input/input';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonDirective, RouterLink, ReactiveFormsModule, InputComponent],
})
export class RegisterFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  public readonly submitted = output<RegisterFormValues>();

  protected readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected readonly formErrors = {
    username: {
      required: 'Обязательное поле',
      minlength: 'Минимум 3 символа',
    },
    email: {
      required: 'Обязательное поле',
      email: 'Некорректная почта',
    },
    password: {
      required: 'Обязательное поле',
      minlength: 'Минимум 6 символов',
    },
  };

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }

  protected readonly APP_ROUTES = APP_ROUTES;
}
