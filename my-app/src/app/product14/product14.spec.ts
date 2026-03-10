import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product14 } from './product14';

describe('Product14', () => {
  let component: Product14;
  let fixture: ComponentFixture<Product14>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Product14]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Product14);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
