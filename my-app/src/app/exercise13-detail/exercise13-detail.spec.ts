import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise13Detail } from './exercise13-detail';

describe('Exercise13Detail', () => {
  let component: Exercise13Detail;
  let fixture: ComponentFixture<Exercise13Detail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise13Detail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise13Detail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
