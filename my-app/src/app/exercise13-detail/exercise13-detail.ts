import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService13 } from '../exercise13';

@Component({
  selector: 'app-exercise13-detail',
  standalone: false,
  templateUrl: './exercise13-detail.html',
  styleUrls: ['./exercise13-detail.css']
})
export class Exercise13Detail {
  selectedProduct: any
  constructor(private activateRoute: ActivatedRoute, private _fs: ProductService13,
    private router: Router) {
    activateRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('id')
        if (id != null) {
          this.selectedProduct = _fs.getProductDetail(id)
        }
      }
    )
  }
  goBack() {
    this.router.navigate(['ex-13'])
  }


}
