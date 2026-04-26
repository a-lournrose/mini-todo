import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form';
import { LoginFormValues } from '@features/auth/models/auth.models';
import { AuthService } from '@features/auth/services/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/routes.constants';
import { ToastService } from '@shared/primitives/toast/services/toast.service';
import { handleHttpError } from '@core/utils/handle-http-error.util';
import { catchError, EMPTY, finalize } from 'rxjs';

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
  private readonly router = inject(Router);

  private readonly toastService = inject(ToastService);

  protected readonly isLoading = signal<boolean>(false);

  protected onLogin(values: LoginFormValues): void {
    this.isLoading.set(true);

    this.authService
      .login(values)
      .pipe(
        catchError((err) => {
          if (err.message === 'LOAD_USER_FAILED') {
            this.toastService.error({
              title: 'Авторизация',
              description: 'При получении данных об аккаунте возникла непредвиденная ошибка.',
            });

            return EMPTY;
          }

          handleHttpError(this.toastService, err, 'Авторизация', {
            401: 'Неверные учетные данные.',
            default: 'При выполнении авторизации возникла непредвиденная ошибка.',
          });
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe(() => {
        void this.router.navigate([APP_ROUTES.app.root]);
      });
  }
}
