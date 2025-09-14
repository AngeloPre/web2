import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(
    withInterceptors([

    ])
  ),
  provideStore(),
  provideEnvironmentNgxMask(),
  provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
};
