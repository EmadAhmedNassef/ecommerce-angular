import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-lang-two',
  imports: [],
  templateUrl: './btn-lang-two.component.html',
  styleUrl: './btn-lang-two.component.css',
})
export class BtnLangTwoComponent {
  /** متوافق مع angular.json: sourceLocale baseHref "" و ar baseHref "ar" */
  locallists = [
    { code: 'en-US', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    // { path: '/', name: 'English' },
    // { path: '/ar/', name: 'Arabic' },
  ];
}
