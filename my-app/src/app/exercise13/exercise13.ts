import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService13 } from '../exercise13';


@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './exercise13.html',
  styleUrls: ['./exercise13.css']
})
export class ServiceProductImageEventComponent {
  public products: any;

  constructor(pservice: ProductService13, private router: Router) {
    this.products = pservice.getProductsWithImages();
  }

  viewDetail(f: any) {
    this.router.navigate(['ex-13', f.ProductId]);
  }
}
