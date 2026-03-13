import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-topnavbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.css',
})
export class TopnavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private platform = inject(PLATFORM_ID);
  private cookieService = inject(CookieService);
  user = signal<any>(null);

  isLoggedin = computed(() => this.authService.isLoggedin());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      if (this.cookieService.get('token')) {
        this.authService.isLoggedin.set(true);
        this.user.set(JSON.parse(this.cookieService.get('user') || '{}'));
      }
    }
  }

  // private authService = inject(AuthService);
  // private platform = inject(PLATFORM_ID);
  // user = signal<any>(null);

  // isLoggedin = computed(() => this.authService.isLoggedin());

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platform)) {
  //     if (localStorage.getItem('token')) {
  //       this.authService.isLoggedin.set(true);
  //     }
  //   }
  //   if (isPlatformBrowser(this.platform)) {
  //     if (localStorage.getItem('token')) {
  //       this.authService.getMyData().subscribe((res) => {
  //         this.user.set(res.data.user);
  //       });
  //     }
  //   }
  // }
}
