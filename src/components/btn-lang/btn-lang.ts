import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-btn-lang',
  imports: [],
  templateUrl: './btn-lang.html',
  styleUrl: './btn-lang.css',
})
export class BtnLang {
  private myTranslate = inject(MyTranslateService);
  translate = inject(TranslateService);

  changeLang(lang: string): void {
    this.myTranslate.changeLang(lang);
  }
}
