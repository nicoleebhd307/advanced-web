import { Component } from '@angular/core';
import { ProductService } from '../product';

@Component({
  selector: 'app-listproduct1',
  standalone: false,
  templateUrl: './listproduct1.html',
  styleUrl: './listproduct1.css',
})
export class Listproduct1 {
  products: any[];

  constructor(private productService: ProductService) { 
    this.products = this.productService.getAllProducts();
  }
}
 