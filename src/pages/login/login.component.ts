import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  private translate = inject(TranslateService);
  formLogin!: FormGroup;

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      this.formLogin.markAllAsDirty();
      return;
    }
    const toastrInfo = this.toastr.info(
      this.translate.instant('login.loggingInMessage'),
      this.translate.instant('login.loggingInTitle'),
      {
      disableTimeOut: true,
      closeButton: false,
      tapToDismiss: false,
      },
    );

    this.authService.login(this.formLogin.value).subscribe({
      next: (res) => {
        console.log(res);

        this.toastr.clear(toastrInfo.toastId);
        this.toastr.success(
          this.translate.instant('login.loginSuccessMessage'),
          this.translate.instant('login.loginSuccessTitle'),
        );
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('user', JSON.stringify(res.user));
        this.cookieService.set('token', res.token, { path: '/', sameSite: 'Lax' });
        this.cookieService.set('user', JSON.stringify(res.user), { path: '/', sameSite: 'Lax' });
        this.authService.isLoggedin.set(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.clear(toastrInfo.toastId);
        this.toastr.error(err.error.message, this.translate.instant('login.loginErrorTitle'));
      },
    });
  }
}
