import { Injectable, inject } from '@angular/core';
import { CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { UserRole } from '../../shared/enums/UserRole.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleMatchGuard implements CanMatch {
  private authService = inject(AuthService);
  private router = inject(Router);

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const hasAccess =
      this.authService.hasRole(UserRole.Ceo) ||
      this.authService.hasRole(UserRole.Empleado);

    if (!hasAccess) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
