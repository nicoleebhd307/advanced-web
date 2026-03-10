import { TestBed } from '@angular/core/testing';

import { DongAbank } from './dong-abank';

describe('DongAbank', () => {
  let service: DongAbank;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DongAbank);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
