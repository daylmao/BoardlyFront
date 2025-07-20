import { Routes } from '@angular/router';
import { CompaniesLayoutComponent } from './layout/companies-layout/companies-layout.component';

export const CompaniesRoutes: Routes = [
  {
    path: '',
    component: CompaniesLayoutComponent,
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import('../companies/pages/create-company/create-company.component'),
      },
      {
        path: ':id/update',
        loadComponent: () =>
          import('../companies/pages/update-company/update-company.component'),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('../companies/pages/delete-company/delete-company.component'),
      },
      {
        path: ':companyId/projects',
        loadChildren: () => import('../projects/projects.routes'),
      },
    ],
  },
];

export default CompaniesRoutes;
