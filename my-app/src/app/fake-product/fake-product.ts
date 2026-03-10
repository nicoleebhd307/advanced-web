import { Component, OnInit } from '@angular/core';
import { FakeProductService } from '../fake-product';
@Component({
  selector: 'app-fake-product',
  templateUrl: './fake-product.html',
  styleUrls: ['./fake-product.css'],
  standalone: false
})
export class FakeProductComponent {
  data: any
  errMessage: string = ''
  constructor(_service: FakeProductService) {
    _service.getFakeProductData().subscribe({
      next: (data) => { this.data = data },
      error: (err) => {
        this.errMessage = err
      }
    })
  }
}