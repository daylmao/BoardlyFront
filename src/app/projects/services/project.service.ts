import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInfo } from '../interfaces/project-info.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {
  Project,
  ProjectResponse,
} from '../interfaces/project-response.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  getProjectsPagination(
    companyId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(
      `${this.baseUrl}/projects/${companyId}/pagination`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }

  createProject(request: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, request);
  }

  deleteActivity(projectId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/projects/${projectId}`);
  }

  updateProject(
    projectId: string,
    request: Partial<Project>
  ): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/projects/${projectId}`,
      request
    );
  }
}
