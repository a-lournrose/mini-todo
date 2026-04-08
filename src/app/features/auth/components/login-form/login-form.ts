import { Component, inject, output } from '@angular/core';
import { InputComponent } from '@shared/components/input/input';
import { ButtonDirective } from '@shared/directives/button/button.directive';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFormValues } from '@features/auth/models/auth.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [InputComponent, ButtonDirective, ReactiveFormsModule],
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  };
}
