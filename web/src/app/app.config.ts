import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './services/login.service';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideStore(),
    provideEnvironmentNgxMask(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['java-web2.tail041186.ts.net', 'localhost:8080'],
          disallowedRoutes: [
            'https://java-web2.tail041186.ts.net/auth',
            'http://localhost:8080/auth',
          ],
        },
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
