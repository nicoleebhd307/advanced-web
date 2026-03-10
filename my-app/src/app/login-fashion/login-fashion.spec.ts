import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFashion } from './login-fashion';

describe('LoginFashion', () => {
  let component: LoginFashion;
  let fixture: ComponentFixture<LoginFashion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFashion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFashion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
