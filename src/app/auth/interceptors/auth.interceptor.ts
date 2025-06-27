import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { TokenService } from '../services/TokenService.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = inject(TokenService).token();
  if (!token) return next(req);

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
