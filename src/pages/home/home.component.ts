import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { CategoriesCompComponent } from '../../components/categories-comp/categories-comp.component';
import { ProductsCompComponent } from '../../components/products-comp/products-comp.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent, CategoriesCompComponent, ProductsCompComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
