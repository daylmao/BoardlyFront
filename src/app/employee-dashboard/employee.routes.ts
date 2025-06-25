import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout.component';

export const employeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
    ],
  },
];

export default employeeRoutes;
