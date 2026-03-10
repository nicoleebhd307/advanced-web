import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 49.99 },
    { id: 3, name: 'Product 3', price: 19.99 },
  ];
  
  productsImage = [
    {"ProductId":"p1", "ProductName":"Coca","Price":100,"Image":"assets/img/h1.png"},
    {"ProductId":"p2", "ProductName":"Pepsi","Price":300,"Image":"assets/img/h2.png"},
    {"ProductId":"p3", "ProductName":"Sting","Price":200,"Image":"assets/img/h3.png"},
  ]
  constructor() { }
  
  getAllProducts() {
    return this.products;
  }
  
  getProductsWithImages() {
    return this.productsImage
  }
  getProductDetail(id:any) {
    return this.productsImage.find(x=>x.ProductId==id)
  }
}
