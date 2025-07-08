import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { TokenRefreshInterceptor } from './auth/interceptors/tokenRefresh.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        AuthInterceptor,
        TokenRefreshInterceptor,
        ErrorInterceptor,
      ])
    ),
  ],
};
