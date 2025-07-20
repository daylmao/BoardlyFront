import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/User.interface';
import { AuthResponse } from '../interfaces/AuthResponse.interface';
import { TokenService } from './TokenService.service';
import { UserRole } from '../../shared/enums/UserRole.enum';
import { RolResponse } from '../interfaces/RolResponse.interface';
import { RegisterEmployeeRequest } from '../interfaces/RegisterEmployeeRequest.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.BASE_URL;
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user());

  // hasRole(role: UserRole): boolean {
  //   return this._user()?.roles.includes(role) ?? false;
  // }

  hasRole(role: UserRole): boolean {
    const user = this._user();
    if (!user || !user.roles) return false;

    return user.roles === role;
  }

  login(Correo: string, Contrasena: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth`, {
        Correo,
        Contrasena,
      })
      .pipe(map((resp) => this.handleAuthResponse(resp)));
  }

  register(data: FormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/users`, data);
  }

  confirmAccount(userId: string, codigo: string): Observable<string> {
    const options = {
      params: { userId },
      responseType: 'text' as const,
    };

    return this.http.post(
      `${this.baseUrl}/users/confirm-account`,
      { codigo },
      options
    );
  }

  giveCeoRol(userId: string): Observable<RolResponse> {
    return this.http.post<RolResponse>(`${this.baseUrl}/ceos/${userId}`, {});
  }

  giveEmployeeRol(request: RegisterEmployeeRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/employee`, request);
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
    if (!resp.jwtToken) return this.clearAuth();

    this.tokenService.set(resp.jwtToken);
    console.log(resp.jwtToken);
    this.loadUserFromToken();
    return true;
  }

  private clearAuth(): boolean {
    this.logout();
    return false;
  }

  private loadUserFromToken(): boolean {
    const payload = this.tokenService.getPayload();
    if (!payload) return false;

    this._user.set({
      uid: payload.sub,
      email: payload.email,
      roles: payload.roles,
      ceoId: payload.ceoId,
    });

    return true;
  }
}
