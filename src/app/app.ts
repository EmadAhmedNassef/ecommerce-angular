import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TopnavbarComponent } from '../components/tonavbar/topnavbar.component';
import { MyTranslateService } from '../core/services/my-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopnavbarComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private myTranslateService = inject(MyTranslateService);
  private translateService = inject(TranslateService);
  private cookieService = inject(CookieService);

  constructor() {
    this.translateService.addLangs(['en', 'ar']);
    if (this.cookieService.get('lang')) {
      this.translateService.use(this.cookieService.get('lang'));
    } else {
      this.translateService.use('en');
    }
    this.myTranslateService.changeDir();
  }
}
