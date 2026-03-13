import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private cookieService = inject(CookieService);
  private translateService = inject(TranslateService);
  private platform = inject(PLATFORM_ID);

  changeDir(): void {
    if (isPlatformBrowser(this.platform)) {
      if (this.cookieService.get('lang') === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
      }
    }
  }

  changeLang(lang: string): void {
    this.cookieService.set('lang', lang);
    this.translateService.use(lang);
    this.changeDir();
  }
}
