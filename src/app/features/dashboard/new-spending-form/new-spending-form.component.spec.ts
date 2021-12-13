import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpendingFormComponent } from './new-spending-form.component';

describe('NewSpendingFormComponent', () => {
  let component: NewSpendingFormComponent;
  let fixture: ComponentFixture<NewSpendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpendingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
