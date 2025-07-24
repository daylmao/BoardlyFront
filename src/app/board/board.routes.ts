import { Routes } from '@angular/router';
import BoardLayoutComponent from './layout/board-layout/board-layout.component';

export const boardRoutes: Routes = [
  {
    path: '',
    component: BoardLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/board-view/board-view.component'),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/create-task/create-task.component'),
      },
    ],
  },
];

export default boardRoutes;
