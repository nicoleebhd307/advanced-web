import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFashion58 } from './admin-fashion58';

describe('AdminFashion58', () => {
  let component: AdminFashion58;
  let fixture: ComponentFixture<AdminFashion58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFashion58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFashion58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
