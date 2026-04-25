import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RegisterFormComponent } from '@features/auth/components/register-form/register-form';
import { RegisterFormValues } from '@features/auth/models/auth.models';
import { AuthService } from '@features/auth/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/routes.constants';
import { handleHttpError } from '@core/utils/handle-http-error.util';
import { ToastService } from '@shared/primitives/toast/services/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RegisterFormComponent],
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  private readonly toastService = inject(ToastService);

  protected readonly isLoading = signal<boolean>(false);

  protected onRegister(values: RegisterFormValues): void {
    this.isLoading.set(true);

    this.authService
      .register(values)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tokens) => {
          this.tokenService.setTokens(tokens);
          void this.router.navigate([APP_ROUTES.app.root]);
        },
        error: (err) => {
          const errors = {
            default: 'При выполнении регистрации возникла непредвиденная ошибка.',
          };

          handleHttpError(this.toastService, err, 'Регистрация', errors);
        },
      });
  }
}
