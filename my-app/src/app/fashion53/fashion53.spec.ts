import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashion53 } from './fashion53';

describe('Fashion53', () => {
  let component: Fashion53;
  let fixture: ComponentFixture<Fashion53>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashion53]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashion53);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
