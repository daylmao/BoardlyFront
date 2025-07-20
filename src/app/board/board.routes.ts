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
    ],
  },
];

export default boardRoutes;
