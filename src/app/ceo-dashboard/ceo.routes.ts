import { Routes } from '@angular/router';
import { CeoLayoutComponent } from './layout/ceo-layout/ceo-layout.component';

export const ceoRoutes: Routes = [
  {
    path: '',
    component: CeoLayoutComponent,
    children: [
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./pages/ceo-profile/ceo-profile.component'),
      },

      {
        path: 'companies',
        loadChildren: () => import('../companies/companies.routes'),
      },

      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
    ],
  },
];

export default ceoRoutes;
