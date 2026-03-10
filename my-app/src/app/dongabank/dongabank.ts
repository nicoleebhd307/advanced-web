import { Component } from '@angular/core';
import { DongABankService } from '../dong-abank';

@Component({
  selector: 'app-dongabank',
  standalone: false,  
  templateUrl: './dongabank.html',
  styleUrls: ['./dongabank.css']
})
export class DongABankComponent {
  data: any;
  errMessage: string = '';

  constructor(_service: DongABankService) {
    _service.getDongABankData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
