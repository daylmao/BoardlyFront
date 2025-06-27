import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { UserRole } from '../../shared/enums/UserRole.enum';

export const NotAuthenticatedGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    if (authService.hasRole(UserRole.Student)) {
      router.navigateByUrl('/ceo-dashboard');
    } else if (authService.hasRole(UserRole.Student)) {
      router.navigateByUrl('/employee-dashboard');
    }

    return false;
  }

  return true;
};
