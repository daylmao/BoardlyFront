import { Routes } from '@angular/router';
import { ActivitiesLayoutComponent } from './layout/activities-layout/activities-layout.component';

export const ActivitiesRoutes: Routes = [
  {
    path: '',
    component: ActivitiesLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../activities/pages/activities-view/activities-view.component'
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/create-activities/create-activities.component'),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./pages/delete-activities/delete-activities.component'),
      },

      {
        path: ':id/update',
        loadComponent: () =>
          import('./pages/update-activities/update-activities.component'),
      },
      {
        path: ':activityId/board',
        loadChildren: () => import('../board/board.routes'),
      },
    ],
  },
];

export default ActivitiesRoutes;
