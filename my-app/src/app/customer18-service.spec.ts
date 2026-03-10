import { TestBed } from '@angular/core/testing';

import { Customer18Service } from './customer18-service';

describe('Customer18Service', () => {
  let service: Customer18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Customer18Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
