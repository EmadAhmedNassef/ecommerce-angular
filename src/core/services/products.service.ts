import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private base_url = environment.base_url;

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.base_url}/products`);
  }

  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/products/${id}`);
  }
}
