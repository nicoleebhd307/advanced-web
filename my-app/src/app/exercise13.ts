import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService13 {
  productsImage = [
    { ProductId: "p1", ProductName: "Coca", Price: 100, Image: "assets/img/h1.png" },
    { ProductId: "p2", ProductName: "Pepsi", Price: 300, Image: "assets/img/h2.png" },
    { ProductId: "p3", ProductName: "Sting", Price: 200, Image: "assets/img/h3.png" },
  ];

  constructor() { }

  getProductsWithImages() {
    return this.productsImage;
  }

  getProductDetail(id: any) {
    return this.productsImage.find(x => x.ProductId == id);
  }
}
