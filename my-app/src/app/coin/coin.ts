import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin';
import { ICoinItem } from '../pages/CoinDataItem';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.html',
  styleUrls: ['./coin.css'],
  standalone: false
})
export class CoinComponent implements OnInit {
  data: ICoinItem[] = []
  errMessage: string = ''
  
  constructor(private _service: CoinService) {}

  ngOnInit(): void {
    console.log('Fetching coin data...');
    this._service.getBitcoinPrice().subscribe({
      next: (data) => { 
        console.log('Coin data received:', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching coin data:', err);
        this.errMessage = err.message || 'Failed to load data';
      }
    });
  }
}
// import { Component } from '@angular/core';
// import { CoinService } from '../coin';

// @Component({
//   selector: 'app-coin',
//   standalone: false,
//   templateUrl: './coin.html',
//   styleUrl: './coin.css',
// })
// export class CoinComponent {

//   coin: any;

//   constructor(private coinService: CoinService) {}

//   ngOnInit(): void {
//     this.coinService.getBitcoinPrice().subscribe(res => {
//       this.coin = res;
//     });
//   }
// }
