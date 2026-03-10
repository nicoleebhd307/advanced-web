import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceCustomerType } from './pages/customer18';

@Injectable({
  providedIn: 'root',
})
export class Customer18Service {
  customersUrl = "assets/datasets/customers.json";

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<InterfaceCustomerType[]> {
    return this.http.get<InterfaceCustomerType[]>(this.customersUrl);
  }
}
