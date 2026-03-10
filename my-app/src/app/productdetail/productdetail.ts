import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  standalone: false,
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail {
  products = [
    { id: 1, name: 'Spinach', price: 100, img:'https://obmnutrition.com/wp-content/uploads/2024/05/spinach-facts.webp' },
    { id: 2, name: 'Kale', price: 150, img: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1608702964/attached_image/inilah-5-manfaat-daun-kale-yang-penting-untuk-diketahui.jpg'},
    { id: 3, name: 'Broccoli', price: 200, img:'https://s1.abcstatics.com/media/bienestar/2019/07/22/brocoli-beneficios-3-kk7H--1248x698@abc.jpg' }
  ];
  product_selected: any
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    // dùng router để điều hướng 
    // avtive router để nhận điều hướng
    activeRouter.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product_selected = this.products.find(p => p.id === id);
    });
  }
  goBack() {
    this.router.navigate(['/san-pham-2',{id:this.product_selected.id}]);
  }
}

