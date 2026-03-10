import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService63 } from '../product-service63';

@Component({
  selector: 'app-exercise63',
  standalone: false,
  templateUrl: './exercise63.html',
  styleUrl: './exercise63.css',
})
export class Exercise63 implements OnInit {
  products: any[] = [];
  message: string = '';
  cartCount: number = 0;

  constructor(private service: ProductService63, private router: Router) {}

  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error(err),
    });
    this.refreshCartCount();
  }

  refreshCartCount() {
    this.service.getCart().subscribe({
      next: (data) => (this.cartCount = data.cart.length),
      error: () => {},
    });
  }

  addToCart(product: any) {
    this.service.addToCart(product._id, 1).subscribe({
      next: (res) => {
        this.cartCount = res.cart.length;
        this.message = `"${product.name}" đã được thêm vào giỏ hàng!`;
        setTimeout(() => (this.message = ''), 2500);
      },
      error: (err) => console.error(err),
    });
  }

  goToCart() {
    this.router.navigate(['/cart-63']);
  }
}
