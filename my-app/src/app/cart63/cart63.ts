import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService63 } from '../product-service63';

@Component({
  selector: 'app-cart63',
  standalone: false,
  templateUrl: './cart63.html',
  styleUrl: './cart63.css',
})
export class Cart63 implements OnInit {
  cartItems: any[] = [];
  updateMessage: string = '';

  constructor(private service: ProductService63, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.service.getCart().subscribe({
      next: (data) => {
        this.cartItems = data.cart.map((item: any) => ({ ...item, _remove: false }));
      },
      error: (err) => console.error(err),
    });
  }

  get total(): number {
    return this.cartItems
      .filter((item) => !item._remove)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  updateCart() {
    const updatedItems = this.cartItems
      .filter((item) => !item._remove && item.qty > 0)
      .map(({ _id, name, price, image, qty }) => ({ _id, name, price, image, qty: Number(qty) }));

    this.service.updateCart(updatedItems).subscribe({
      next: (data) => {
        this.cartItems = data.cart.map((item: any) => ({ ...item, _remove: false }));
        this.updateMessage = 'Giỏ hàng đã được cập nhật!';
        setTimeout(() => (this.updateMessage = ''), 2500);
      },
      error: (err) => console.error(err),
    });
  }

  clearCart() {
    this.service.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.updateMessage = 'Đã xóa toàn bộ giỏ hàng.';
        setTimeout(() => (this.updateMessage = ''), 2500);
      },
      error: (err) => console.error(err),
    });
  }

  continueShopping() {
    this.router.navigate(['/ex-63']);
  }
}
