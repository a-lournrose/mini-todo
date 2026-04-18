import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({
      url: `${environment.apiUrl}${req.url}`,
    });

    return next(apiReq);
  }

  return next(req);
};
