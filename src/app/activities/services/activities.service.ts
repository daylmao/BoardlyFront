import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PaginatedActivitiesResponse } from '../interfaces/activities-response.interface';
import { CreateActivity } from '../interfaces/create-activity.interface';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  private http = inject(HttpClient);
  private baseUrl = environment.BASE_URL;

  getActivitiesPaginated(
    projectId: string,
    numeroPagina: number,
    tamanoPagina: number
  ): Observable<PaginatedActivitiesResponse> {
    return this.http.get<PaginatedActivitiesResponse>(
      `${this.baseUrl}/activities/${projectId}/pagination`,
      {
        params: {
          numeroPagina: numeroPagina.toString(),
          tamanoPagina: tamanoPagina.toString(),
        },
      }
    );
  }

  createActivity(request: CreateActivity): Observable<CreateActivity> {
    return this.http.post<CreateActivity>(
      `${this.baseUrl}/activities`,
      request
    );
  }
  getActivities(id: string): Observable<CreateActivity> {
    return this.http.get<CreateActivity>(`${this.baseUrl}/activities/${id}`);
  }

  deleteActivity(activityId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/activities/${activityId}`);
  }

  updateActivity(
    activityId: string,
    request: Partial<CreateActivity>
  ): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/activities/${activityId}`,
      request
    );
  }
}
