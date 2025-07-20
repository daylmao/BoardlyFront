import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../interfaces/EmployeeResponse.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  getEmployeeByCompanyId(companyId: string): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(
      `${this.baseUrl}/employee/companies/${companyId}`
    );
  }
}
