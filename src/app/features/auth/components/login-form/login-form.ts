import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { ButtonDirective } from '@shared/button/directives/button.directive';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFormValues } from '@features/auth/models/auth.models';
import { APP_ROUTES } from '@core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { InputComponent } from '@shared/input/components/input/input';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [ButtonDirective, ReactiveFormsModule, RouterLink, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  public readonly submitted = output<LoginFormValues>();

  protected readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected onSubmit(): void {
    if(!this.form.valid) return;

    this.submitted.emit(this.form.getRawValue());
  }

  protected readonly APP_ROUTES = APP_ROUTES;
}
