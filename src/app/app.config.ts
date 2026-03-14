import {
  APP_INITIALIZER,
  ApplicationConfig,
  PLATFORM_ID,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideToastr } from 'ngx-toastr';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { progressInterceptor } from 'ngx-progressbar/http';
import { provideNgProgressRouter } from 'ngx-progressbar/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay()),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchInterval: 1000 * 60,
            refetchIntervalInBackground: true,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
    ),
    provideHttpClient(withFetch(), withInterceptors([progressInterceptor])),
    provideNgProgressRouter({
      startEvents: [NavigationStart],
      completeEvents: [NavigationEnd],
    }),
    provideToastr({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true,
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
    }),
  ],
};
