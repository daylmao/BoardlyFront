import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toast } from 'ngx-sonner';

export function ErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error && Array.isArray(error.error.errors)) {
        error.error.errors.forEach((msg: string) => toast.error(msg));
      } else if (typeof error.error === 'string') {
        try {
          const parsed = JSON.parse(error.error);
          toast.error(parsed.descripcion || error.error);
        } catch {
          toast.error(error.error);
        }
      } else if (error.error && typeof error.error === 'object') {
        const mensaje =
          error.error.descripcion ||
          error.error.message ||
          error.error.titulo ||
          'Un error inesperado ha ocurrido.';
        toast.error(mensaje);
      } else {
        toast.error('Un error inesperado ha ocurrido.');
      }

      return throwError(() => error);
    })
  );
}
