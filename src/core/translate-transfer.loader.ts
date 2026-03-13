import { TransferState, inject, Injectable, PLATFORM_ID, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { isPlatformServer } from '@angular/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class TranslateTransferLoader implements TranslateLoader {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  getTranslation(lang: string): Observable<any> {
    const key = makeStateKey<any>('translations-' + lang);
    const data = this.transferState.get(key, null);

    if (data) {
      this.transferState.remove(key);
      return of(data);
    }

    return this.http.get(`/assets/i18n/${lang}.json`).pipe(
      tap((res) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(key, res);
        }
      }),
    );
  }
}
