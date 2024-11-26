import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { tokenInterceptor } from './services/interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              importProvidersFrom(ReactiveFormsModule),
              provideRouter(routes),
              provideHttpClient(),
              {
                provide: HTTP_INTERCEPTORS,
                useValue: tokenInterceptor,
                multi: true
              },
              provideAnimationsAsync()
  ]
};
