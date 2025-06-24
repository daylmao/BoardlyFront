import { Routes } from '@angular/router';
import { HomeComponent } from './landing/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
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
