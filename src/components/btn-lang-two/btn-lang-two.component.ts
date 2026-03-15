import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-lang-two',
  imports: [],
  templateUrl: './btn-lang-two.component.html',
  styleUrl: './btn-lang-two.component.css',
})
export class BtnLangTwoComponent {
  locallists = [
    { code: 'en-US', name: 'English' },
    { code: 'ar', name: 'Arabic' },
  ];
}
