import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  Empresa,
  RespuestaEmpresas,
} from '../interfaces/RespuestaEmpresas.interface';
import { CreateCompanyRequest } from '../interfaces/CreateCompanyRequest.interface';
import { UpdateCompany } from '../interfaces/UpdateCompany.interface';
import { RespuestaEmpresasPaginadas } from '../../employee-dashboard/interfaces/CompanyEmployeeResponse.interface';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  createCompany(request: CreateCompanyRequest): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.baseUrl}/companies`, request);
  }

  updateCompany(companyId: string, request: UpdateCompany): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/companies/${companyId}`,
      request
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
  deleteCompany(companyId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/companies/${companyId}`);
  }

  getCompanyById(companyId: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/companies/${companyId}`);
  }

  getEmpresasPaginadas(
    ceoId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<RespuestaEmpresas> {
    return this.http.get<RespuestaEmpresas>(
      `${this.baseUrl}/companies/${ceoId}/pagination`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }
}
