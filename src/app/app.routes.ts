import { Routes } from '@angular/router';
import { HomeComponent } from './landing/pages/home/home.component';
import { RoleMatchGuard } from './auth/guards/role.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [NotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },

  {
    path: 'ceo-dashboard',
    loadChildren: () => import('./ceo-dashboard/ceo.routes'),
    canMatch: [RoleMatchGuard],
  },

  {
    path: 'employee-dashboard',
    loadChildren: () => import('./employee-dashboard/employee.routes'),
  },

  {
    path: '',
    component: HomeComponent,
    canMatch: [NotAuthenticatedGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
