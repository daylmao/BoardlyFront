import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserDetails } from '../../auth/interfaces/UserDetails.interface';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/User.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseUrl}/users/${userId}`);
  }

  updateUserName(
    userId: string,
    request: { propiedad: string }
  ): Observable<Partial<UserDetails>> {
    return this.http.patch<Partial<UserDetails>>(
      `${this.baseUrl}/users/${userId}/name`,
      request
    );
  }

  updateLastName(
    userId: string,
    request: { propiedad: string }
  ): Observable<Partial<UserDetails>> {
    return this.http.patch<Partial<UserDetails>>(
      `${this.baseUrl}/users/${userId}/last-name`,
      request
    );
  }
}
