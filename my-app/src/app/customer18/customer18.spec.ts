import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customer18 } from './customer18';

describe('Customer18', () => {
  let component: Customer18;
  let fixture: ComponentFixture<Customer18>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Customer18]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Customer18);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
