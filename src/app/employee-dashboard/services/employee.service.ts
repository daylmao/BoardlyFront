import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RespuestaEmpresasPaginadas } from '../interfaces/CompanyEmployeeResponse.interface';
import { EmployeeResponse } from '../interfaces/EmployeeResponse.interface';
import { PaginatedElement } from '../interfaces/EmployeeTaskInfo.interface';
import { EmployeeDashboardStats } from '../interfaces/EmployeeDashboardStats.interface';
import { EmployeeRolInfo } from '../interfaces/EmployeeRolInfo.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  getEmployeeByCompanyId(companyId: string): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(
      `${this.baseUrl}/employee/companies/${companyId}`
    );
  }

  getCompaniesByEmployeeId(
    employeeId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<RespuestaEmpresasPaginadas> {
    return this.http.get<RespuestaEmpresasPaginadas>(
      `${this.baseUrl}/companies/employee/${employeeId}/pagination`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }
  getEmployeesByProjectId(
    projectId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<PaginatedElement> {
    return this.http.get<PaginatedElement>(
      `${this.baseUrl}/employee/${projectId}/pagination`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }

  assignProjectByEmployeeId(
    employeeId: string,
    request: EmployeeRolInfo
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/employee/${employeeId}`,
      request
    );
  }

  removeEmployeeFromProject(
    employeeId: string,
    projectId: string
  ): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/employee/${employeeId}/projects/${projectId}`,
      {
        responseType: 'text',
      }
    );
  }

  getEmployeesByCompanyId(
    companyId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<PaginatedElement> {
    return this.http.get<PaginatedElement>(
      `${this.baseUrl}/employee/by-company/${companyId}`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }

  updateEmployeeRol(
    employeeId: string,
    request: EmployeeRolInfo
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/employee/${employeeId}/role`,
      request
    );
  }

  getEmployeeDashboardCounts(
    employeeId: string
  ): Observable<EmployeeDashboardStats> {
    return this.http.get<EmployeeDashboardStats>(
      `${this.baseUrl}/employee/${employeeId}/count`
    );
  }
}
