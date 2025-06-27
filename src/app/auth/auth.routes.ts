import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
      },

      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component'),
      },

      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component'),
      },

      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component'),
      },

      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/verify-email/verify-email.component'),
      },

      {
        path: 'new-password',
        loadComponent: () =>
          import('./pages/new-password/new-password.component'),
      },

      {
        path: 'success-register',
        loadComponent: () =>
          import('./pages/success-register/success-register.component'),
      },

      {
        path: 'success-password',
        loadComponent: () =>
          import('./pages/success-password/success-password.component'),
      },

      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default authRoutes;
