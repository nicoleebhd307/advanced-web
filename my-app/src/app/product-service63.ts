import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService63 {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('/ex63/products', { withCredentials: true });
  }

  addToCart(productId: string, qty: number = 1): Observable<any> {
    return this.http.post('/ex63/cart/add', { productId, qty }, { withCredentials: true });
  }

  getCart(): Observable<any> {
    return this.http.get<any>('/ex63/cart', { withCredentials: true });
  }

  updateCart(items: any[]): Observable<any> {
    return this.http.put('/ex63/cart/update', { items }, { withCredentials: true });
  }

  clearCart(): Observable<any> {
    return this.http.delete('/ex63/cart/clear', { withCredentials: true });
  }
}
