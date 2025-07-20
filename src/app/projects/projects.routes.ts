import { Routes } from '@angular/router';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';

export const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/projects-view/projects-view.component'),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/create-project/create-project.component'),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./pages/delete-project/delete-project.component'),
      },

      {
        path: ':id/update',
        loadComponent: () =>
          import('./pages/update-project/update-project.component'),
      },
      {
        path: ':projectId/activities',
        loadChildren: () => import('../activities/activities.routes'),
      },
    ],
  },
];

export default projectsRoutes;
