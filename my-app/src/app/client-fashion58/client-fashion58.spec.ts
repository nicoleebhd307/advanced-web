import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFashion58 } from './client-fashion58';

describe('ClientFashion58', () => {
  let component: ClientFashion58;
  let fixture: ComponentFixture<ClientFashion58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFashion58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFashion58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
