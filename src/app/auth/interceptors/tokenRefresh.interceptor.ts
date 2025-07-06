import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/AuthService.service';
import { AuthResponse } from '../interfaces/AuthResponse.interface';

export function TokenRefreshInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body as AuthResponse;
        if (body?.jwtToken) authService.updateToken(body.jwtToken);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) authService.logout();
      return throwError(() => error);
    })
  );
}
