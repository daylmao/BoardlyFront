import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/User.interface';
import { AuthResponse } from '../interfaces/AuthResponse.interface';
import { TokenService } from './TokenService.service';
import { UserRole } from '../../shared/enums/UserRole.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.BASE_URL;
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => this._user() !== null);

  hasRole = (role: UserRole): boolean => {
    return this._user()?.roles.includes(role) ?? false;
  };

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/account/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError(() => of(this.handleAuthError()))
      );
  }

  register(
    fullName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, {
        fullName,
        email,
        password,
      })
      .pipe(
        map((resp) => resp.isSuccess),
        catchError(() => of(false))
      );
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

  private handleAuthSuccess(resp: AuthResponse): boolean {
    if (!resp.isSuccess || !resp.data?.jwtToken) {
      return this.handleAuthError();
    }

    this.tokenService.set(resp.data.jwtToken);
    this.loadUserFromToken();
    return true;
  }

  private handleAuthError(): boolean {
    this.logout();
    return false;
  }

  loadUserFromToken(): boolean {
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
