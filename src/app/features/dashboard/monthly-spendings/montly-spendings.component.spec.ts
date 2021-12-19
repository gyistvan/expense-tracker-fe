import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontlySpendingsComponent } from './montly-spendings.component';

describe('MontlySpendingsComponent', () => {
  let component: MontlySpendingsComponent;
  let fixture: ComponentFixture<MontlySpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontlySpendingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontlySpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
