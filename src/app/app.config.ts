import {
  APP_INITIALIZER,
  ApplicationConfig,
  PLATFORM_ID,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideToastr } from 'ngx-toastr';
import { TranslateLoader, TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { TranslateTransferLoader } from '../core/translate-transfer.loader';

function languageInitializer() {
  const translate = inject(TranslateService);
  const cookieService = inject(CookieService);

  return () => {
    const lang = cookieService.get('lang') || 'en';

    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang(lang);

    return translate.use(lang).toPromise();
  };
}

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
    provideHttpClient(withFetch()),
    provideToastr({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true,
    }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateTransferLoader,
      },
      fallbackLang: 'en',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: languageInitializer,
      multi: true,
    },
  ],
};
