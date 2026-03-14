// import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
// import { ProductsService } from '../../core/services/products.service';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-products-comp',
//   imports: [RouterLink],
//   templateUrl: './products-comp.component.html',
//   styleUrl: './products-comp.component.css',
// })
// export class ProductsCompComponent implements OnInit {
//   private productsService = inject(ProductsService);

//   products: WritableSignal<any[]> = signal<any[]>([]);
//   isLoading: WritableSignal<boolean> = signal<boolean>(true);

//   ngOnInit(): void {
//     this.getAllProducts();
//   }

//   getAllProducts() {
//     this.isLoading.set(true);

//     this.productsService.getAllProducts().subscribe({
//       next: (res) => {
//         this.products.set(res.data);
//         this.isLoading.set(false);
//       },
//       error: (err) => {
//         console.log(err);
//         this.isLoading.set(false);
//       },
//     });
//   }
// }
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-products-comp',
  imports: [RouterLink, BarRatingModule],
  templateUrl: './products-comp.component.html',
  styleUrl: './products-comp.component.css',
})
export class ProductsCompComponent {
  private productsService = inject(ProductsService);

  onRateChange(event: number) {
    console.log(event);
  }

  productsQuery = injectQuery(() => ({
    queryKey: ['products'],
    queryFn: () => lastValueFrom(this.productsService.getAllProducts()),
    select: (res: any) => res.data,
    staleTime: 1000 * 60 * 5, // الكاش صالح 5 دقايق
    gcTime: 1000 * 60 * 60, // يتم حذف الكاش بعد ساعة
    refetchInterval: 1000 * 60 * 5, // يتم إعادة الاستدعاء كل 5 دقايق
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  }));
}
