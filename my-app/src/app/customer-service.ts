import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
   private receipt = {
    customerId: 1,
    customerName: 'Hoang Dieu',
    contactNumber: '123-456-7890'
   };
   
   items = [ 
    { id: 1, name: 'BimBim Osi', quantity: 10, price: 29.99 },
    { id: 2, name: 'Milo', quantity: 5, price: 49.99 },
    { id: 3, name: 'Instant Noodle Hao Hao', quantity: 8, price: 19.99 },
  ];

  getAllItems() {
    return this.items;
  }
  getReceipt() {
    return this.receipt;
  }
}
