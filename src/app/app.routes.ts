import { Routes } from '@angular/router';
import { HomeComponent } from './landing/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },

  {
    path: 'ceo-dashboard',
    loadChildren: () => import('./ceo-dashboard/ceo.routes'),
  },

  {
    path: 'employee-dashboard',
    loadChildren: () => import('./employee-dashboard/employee.routes'),
  },

  {
    path: '',
    component: HomeComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
