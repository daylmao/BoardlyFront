import { Routes } from '@angular/router';
import { CeoLayoutComponent } from './layout/ceo-layout/ceo-layout.component';

export const ceoRoutes: Routes = [
  {
    path: '',
    component: CeoLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
    ],
  },
];

export default ceoRoutes;
