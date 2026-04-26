import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '@features/auth/services/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/routes.constants';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if(!req.url.startsWith('/')) {
    return next(req);
  }

  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const accessToken = tokenService.getAccessToken();

  const apiReq = cloneWithToken(req, accessToken);

  return next(apiReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const refreshToken = tokenService.getRefreshToken();

      if(err.status !== 401 || !refreshToken) {
        return throwError(() => err);
      }

      if(isRefreshing) {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => next(cloneWithToken(req, token))),
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refresh(refreshToken).pipe(
        switchMap((tokens) => {
          isRefreshing = false;
          refreshTokenSubject.next(tokens.accessToken);
          tokenService.setTokens(tokens);

          return next(cloneWithToken(req, tokens.accessToken));
        }),
        catchError(err => {
          isRefreshing = false;
          tokenService.clear();
          void router.navigate([APP_ROUTES.auth.login]);

          return throwError(() => err);
        })
      )
    })
  );
};

const cloneWithToken = (req: HttpRequest<unknown>, accessToken: string | null): HttpRequest<unknown> => {
  return req.clone({
    url: `${environment.apiUrl}${req.url}`,
    ...(accessToken && {
      setHeaders: {Authorization: `Bearer ${accessToken}`},
    })
  });
}
