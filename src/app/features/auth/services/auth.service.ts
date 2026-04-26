import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthTokensResponse,
  LoginFormValues,
  RegisterFormValues,
} from '@features/auth/models/auth.models';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthTokens } from '@core/models/auth-tokens.model';
import { TokenService } from '@core/services/token.service';
import { UserService } from '@core/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);

  public register(values: RegisterFormValues): Observable<AuthTokens> {
    return this.http.post<AuthTokensResponse>('/auth/register', values).pipe(map(this.mapTokens));
  }

  public login(values: LoginFormValues): Observable<void> {
    const { username, password } = values;

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<AuthTokensResponse>('/auth/login', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        map(this.mapTokens),
        tap((tokens) => this.tokenService.setTokens(tokens)),
        switchMap(() => this.userService.loadCurrentUser().pipe(
          catchError(() => {
            this.tokenService.clear();
            return throwError(() => new Error('LOAD_USER_FAILED'));
          })
        )),
        map(() => void 0)
      );
  }

  public refresh(refreshToken: string): Observable<AuthTokens> {
    return this.http
      .post<AuthTokensResponse>('/refresh', { refresh_token: refreshToken })
      .pipe(map(this.mapTokens));
  }

  private mapTokens(response: AuthTokensResponse): AuthTokens {
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }
}
