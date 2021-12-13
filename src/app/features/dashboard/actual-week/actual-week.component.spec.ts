import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualWeekComponent } from './actual-week.component';

describe('ActualWeekComponent', () => {
  let component: ActualWeekComponent;
  let fixture: ComponentFixture<ActualWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
