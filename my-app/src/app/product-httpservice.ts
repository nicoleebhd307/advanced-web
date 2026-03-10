import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterfaceProduct } from './pages/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// define service to get product data from external source (json file)
export class ProductHTTPService {
  productsUrl = "assets/datasets/products.json"; // URL to web api (here we use local json file)
  constructor(private _http: HttpClient) {

  }

  getAllProducts(): Observable<InterfaceProduct[]> {
    return this._http.get<InterfaceProduct[]>(this.productsUrl);
  } 
}
