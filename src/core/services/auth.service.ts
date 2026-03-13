import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private base_url = environment.base_url;
  private router = inject(Router);
  private cookieService = inject(CookieService);
  isLoggedin = signal<boolean>(false);

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.base_url}/auth/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.base_url}/auth/signin`, data);
  }

  // this is for the profile data from endpoint

  // login(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.base_url}/users/signin`, data);
  // }

  // getMyData(): Observable<any> {
  //   return this.http.get<any>(`${this.base_url}/users/profile-data`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   });
  // }

  logout(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.cookieService.delete('token', '/'); // الـ path مهم عشان يمسح الكوكيز الصح
    this.cookieService.delete('user', '/');
    this.isLoggedin.set(false);
    this.router.navigate(['/login']);
  }
}
