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
      if (Array.isArray(error.error.errors)) {
        error.error.forEach((msg: string) => toast.error(msg));
      } else {
        const mensaje =
          error.error?.descripcion ||
          error.error?.message ||
          'Un error inesperado ha ocurrido.';
        toast.error(mensaje);
      }

      return throwError(() => error);
    })
  );
}
