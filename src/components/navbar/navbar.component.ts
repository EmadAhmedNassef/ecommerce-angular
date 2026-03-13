import { Component, computed, inject, linkedSignal, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { BtnLang } from '../btn-lang/btn-lang';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, BtnLang],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private flowbiteService = inject(FlowbiteService);
  private authService = inject(AuthService);
  private platform = inject(PLATFORM_ID);
  private cookieService = inject(CookieService);

  isLoggedin = computed(() => this.authService.isLoggedin());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      if (this.cookieService.get('token')) {
        this.authService.isLoggedin.set(true);
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
