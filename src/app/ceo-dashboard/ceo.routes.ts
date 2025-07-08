import { Routes } from '@angular/router';
import { CeoLayoutComponent } from './layout/ceo-layout/ceo-layout.component';

export const ceoRoutes: Routes = [
  {
    path: '',
    component: CeoLayoutComponent,
    children: [
      {
        path: 'company',
        loadComponent: () =>
          import('./pages/create-company/create-company.component'),
      },

      {
        path: 'company/:id/update',
        loadComponent: () =>
          import('./pages/update-company/update-company.component'),
      },

      {
        path: 'company/:id/delete',
        loadComponent: () =>
          import('./pages/delete-company/delete-company.component'),
      },

      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./pages/ceo-profile/ceo-profile.component'),
      },

      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
    ],
  },
];

export default ceoRoutes;
