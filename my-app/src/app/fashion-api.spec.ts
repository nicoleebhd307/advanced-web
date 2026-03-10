import { TestBed } from '@angular/core/testing';

import { FashionAPI } from './fashion-api';

describe('FashionAPI', () => {
  let service: FashionAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
