import { TestBed } from '@angular/core/testing';

import { ProductHTTPService } from './product-httpservice';

describe('ProductHTTPService', () => {
  let service: ProductHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
