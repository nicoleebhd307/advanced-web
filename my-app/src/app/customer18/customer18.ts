import { Component, OnInit } from '@angular/core';
import { Customer18Service } from '../customer18-service';
import { InterfaceCustomerType } from '../pages/customer18';

@Component({
  selector: 'app-customer18',
  standalone: false,
  templateUrl: './customer18.html',
  styleUrl: './customer18.css',
})
export class Customer18 implements OnInit {
  customerTypes: InterfaceCustomerType[] = [];
  
  constructor(private customer18Service: Customer18Service) {}

  ngOnInit(): void {
    console.log('Customer18 component initialized');
    this.customer18Service.getAllCustomers().subscribe({
      next: (data) => {
        console.log('Customer data received:', data);
        this.customerTypes = data;
        console.log('Customer types array:', this.customerTypes);
        console.log('Array length:', this.customerTypes.length);
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      }
    });
  }
}
