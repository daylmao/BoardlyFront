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
import { TokenService } from '../services/TokenService.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

export function TokenValidationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const payload = tokenService.getPayload();

  if (payload && payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      authService.logout();
      toast.error('Sesion expirada, por favor vuelve a iniciar sesion');
      router.navigate(['auth/login']);
      return throwError(() => new Error('Token expired'));
    }
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body as { jwtToken?: string };
        if (body?.jwtToken) authService.updateToken(body.jwtToken);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        toast.error('No autorizado, inicia sesion');
        router.navigate(['auth/login']);
      }
      return throwError(() => error);
    })
  );
}
