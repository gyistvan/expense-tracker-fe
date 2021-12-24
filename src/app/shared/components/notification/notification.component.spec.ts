import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
