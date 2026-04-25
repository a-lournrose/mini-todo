import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if(!req.url.startsWith('/')) {
    return next(req);
  }

  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();

  const apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    ...(accessToken && {
      setHeaders: {Authorization: `Bearer ${accessToken}`},
    })
  });

  return next(apiReq);
};
