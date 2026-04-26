import { Injectable, signal } from '@angular/core';
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  AuthTokens,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from '@core/models/auth-tokens.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public readonly isAuthenticated = signal<boolean>(this.hasToken());

  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
  }

  public setTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, tokens.refreshToken);

    this.isAuthenticated.set(true);
  }

  public clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);

    this.isAuthenticated.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  }
}
