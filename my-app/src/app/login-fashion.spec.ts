import { TestBed } from '@angular/core/testing';

import { LoginFashion } from './login-fashion';

describe('LoginFashion', () => {
  let service: LoginFashion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFashion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
