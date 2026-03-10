import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DongABankComponent } from './dongabank';



describe('Dongabank', () => {
  let component: DongABankComponent;
  let fixture: ComponentFixture<DongABankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DongABankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DongABankComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
