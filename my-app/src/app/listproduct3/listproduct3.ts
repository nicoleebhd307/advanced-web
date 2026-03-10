import { Component } from '@angular/core';
import { ProductHTTPService } from '../product-httpservice';

@Component({
  selector: 'app-listproduct3',
  standalone: false,
  templateUrl: './listproduct3.html',
  styleUrl: './listproduct3.css',
})
export class Listproduct3 {
  products: any;
  
  constructor(private productHTTPService: ProductHTTPService) {
    console.log('Listproduct3 component initialized');
    this.productHTTPService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.products = data;
        console.log('Products array:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
