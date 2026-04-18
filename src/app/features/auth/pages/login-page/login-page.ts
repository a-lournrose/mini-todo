import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form';
import { LoginFormValues } from '@features/auth/models/auth.models';
import { AuthService } from '@features/auth/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/routes.constants';
import { ToastService } from '@shared/toast/services/toast.service';
import { handleHttpError } from '@core/utils/handle-http-error.util';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
  imports: [LoginFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  private readonly toastService = inject(ToastService);

  protected readonly isLoading = signal<boolean>(false);

  protected onLogin(values: LoginFormValues): void {
    this.isLoading.set(true);

    this.authService
      .login(values)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tokens) => {
          this.tokenService.setTokens(tokens);
          void this.router.navigate([APP_ROUTES.app.root]);
        },
        error: (err) => {
          const errors = {
            401: 'Неверные учетные данные.',
            default: 'При выполнении авторизации возникла непредвиденная ошибка.',
          };

          handleHttpError(this.toastService, err, 'Авторизация', errors);
        },
      });
  }
}
