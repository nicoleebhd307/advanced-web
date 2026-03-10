import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListCustomerService {
  private customers = [
    { id: '1', name: 'Customer 1', email: 'hoangdieu1362013@gmail.com' },
    { id: '2', name: 'Customer 2', email: 'customer2@example.com' },
  ];
  getAllCustomers() {
    return this.customers;
  }
}
