import { Component } from '@angular/core';
import { ListCustomerService } from '../list-customer';

@Component({
  selector: 'app-list-customer',
  standalone: false,
  templateUrl: './list-customer.html',
  styleUrl: './list-customer.css',
})
export class ListCustomer {
  customers : any[]
    constructor(private ListCustomerService: ListCustomerService) { 
      this.customers = this.ListCustomerService.getAllCustomers();
    }
  get_customer_detail(id:string){
    let c=this.customers.find(cust=>cust.id===id);
    return c;
  }
}
