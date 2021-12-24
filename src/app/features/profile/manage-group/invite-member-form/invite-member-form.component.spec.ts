import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMemberFormComponent } from './invite-member-form.component';

describe('InviteMemberFormComponent', () => {
  let component: InviteMemberFormComponent;
  let fixture: ComponentFixture<InviteMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteMemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
