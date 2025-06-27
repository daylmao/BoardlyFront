import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private _token = signal<string | null>(localStorage.getItem('token'));

  private _payload = signal<any | null>(
    this.decodeToken(localStorage.getItem('token'))
  );
  payload = computed(() => this._payload());

  token = computed(() => this._token());

  set(token: string) {
    this._token.set(token);
    this._payload.set(this.decodeToken(token));
    localStorage.setItem('token', token);
  }

  get(): string | null {
    const t = this._token();
    return t;
  }

  clear() {
    this._token.set(null);
    this._payload.set(null);
  }

  private decodeToken(token: string | null): any | null {
    if (!token) return null;

    try {
      const base64 = token.split('.')[1];
      const json = atob(base64);
      const payload = JSON.parse(json);
      return payload;
    } catch (err) {
      return null;
    }
  }
}
