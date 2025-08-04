import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout.component';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      {
        path: 'profile/:id',
        loadComponent: () =>
          import(
            '../employee-dashboard/pages/employee-profile/employee-profile.component'
          ),
      },
      {
        path: ':projectId/activities',
        loadChildren: () => import('../activities/activities.routes'),
      },

      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export default employeeRoutes;
