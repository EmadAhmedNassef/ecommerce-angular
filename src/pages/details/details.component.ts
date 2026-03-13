import { Component, inject, WritableSignal, signal, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private productsService = inject(ProductsService);
  product: WritableSignal<any> = signal<any>(null);
  private activatedRoute = inject(ActivatedRoute);
  productId!: string;
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
    });
    this.getProductDetails(this.productId);
  }

  getProductDetails(id: string) {
    this.isLoading.set(true);
    this.productsService.getProductDetails(id).subscribe({
      next: (res) => {
        console.log(res);
        this.product.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }
}
