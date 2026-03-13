import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  platformId = inject(PLATFORM_ID);
  @ViewChild('swiper') swiper!: ElementRef;

  constructor() {
    afterNextRender(() => {
      this.swiper.nativeElement.initialize();
    });
  }
}
