import { TestBed } from '@angular/core/testing';
import { Exercise10 } from './exercise10';

describe('Exercise10', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise10]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Exercise10);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
