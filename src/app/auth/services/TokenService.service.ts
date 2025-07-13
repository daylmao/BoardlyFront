import { Injectable, signal, computed } from '@angular/core';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _payload = signal<JwtPayload | null>(this.decodeToken(this._token()));

  readonly token = computed(() => this._token());
  readonly payload = computed(() => this._payload());

  set(token: string) {
    this._token.set(token);
    this._payload.set(this.decodeToken(token));
    localStorage.setItem('token', token);
  }

  get(): string | null {
    return this._token();
  }

  getPayload(): JwtPayload | null {
    return this._payload();
  }

  clear() {
    this._token.set(null);
    this._payload.set(null);
    localStorage.removeItem('token');
  }

  private decodeToken(token: string | null): any | null {
    if (!token) return null;
    try {
      const base64 = token.split('.')[1];
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }
}
