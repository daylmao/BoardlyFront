import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/User.interface';
import { AuthResponse } from '../interfaces/AuthResponse.interface';
import { TokenService } from './TokenService.service';
import { UserRole } from '../../shared/enums/UserRole.enum';
import { UserRequest } from '../interfaces/UserRequest.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.BASE_URL;
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user());

  hasRole(role: UserRole): boolean {
    return this._user()?.roles.includes(role) ?? false;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/account/authenticate`, {
        email,
        password,
      })
      .pipe(map((resp) => this.handleAuthResponse(resp)));
  }

  register(request: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, {
      request,
    });
  }

  logout(): void {
    this._user.set(null);
    this.tokenService.clear();
  }

  updateToken(token: string): void {
    this.tokenService.set(token);
    this.loadUserFromToken();
  }

  initializeFromToken(): boolean {
    return this.loadUserFromToken();
  }

  private handleAuthResponse(resp: AuthResponse): boolean {
    if (!resp.isSuccess || !resp.data?.jwtToken) return this.clearAuth();

    this.tokenService.set(resp.data.jwtToken);
    this.loadUserFromToken();
    return true;
  }

  private clearAuth(): boolean {
    this.logout();
    return false;
  }

  private loadUserFromToken(): boolean {
    const payload = this.tokenService.payload();
    if (!payload) return false;

    this._user.set({
      uid: payload.id,
      email: payload.email,
      roles: payload.roles,
    });
    return true;
  }
}
