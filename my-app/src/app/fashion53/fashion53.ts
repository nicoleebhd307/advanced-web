import { Component } from '@angular/core';
import { FashionAPI } from '../fashion-api';

@Component({
  selector: 'app-fashion53',
  standalone: false,
  templateUrl: './fashion53.html',
  styleUrl: './fashion53.css',
})
export class Fashion53 {
  fashions: any;
  errMessage: string = ''
  constructor(public _service: FashionAPI) {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data },
      error: (err) => { this.errMessage = err }
    })
  }
}
