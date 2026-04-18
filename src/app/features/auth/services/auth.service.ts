import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthTokensResponse,
  LoginFormValues,
  RegisterFormValues,
} from '@features/auth/models/auth.models';
import { map, Observable } from 'rxjs';
import { AuthTokens } from '@core/models/auth-tokens.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  public register(values: RegisterFormValues): Observable<AuthTokens> {
    return this.http.post<AuthTokensResponse>('/auth/register', values).pipe(map(this.mapTokens));
  }

  public login(values: LoginFormValues): Observable<AuthTokens> {
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
      .pipe(map(this.mapTokens));
  }

  private mapTokens(response: AuthTokensResponse): AuthTokens {
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }
}
