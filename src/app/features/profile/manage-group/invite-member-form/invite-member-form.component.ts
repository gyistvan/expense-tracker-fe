import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';
import { GroupStateFacade } from 'src/app/store/group/group.facade';

@Component({
  selector: 'app-invite-member-form',
  templateUrl: './invite-member-form.component.html',
  styleUrls: ['./invite-member-form.component.css'],
})
export class InviteMemberFormComponent implements OnInit {
  public inviteMemberForm!: FormGroup;
  public userGroupId: string | null = this.authStateFacade.userGroupId.value;

  constructor(
    private formBuilder: FormBuilder,
    private groupStateFacade: GroupStateFacade,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.inviteMemberForm = this.createInviteForm();
  }

  createInviteForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, new EmailValidator()]],
    });
  }

  get email(): AbstractControl {
    return this.inviteMemberForm.get('email') as AbstractControl;
  }

  public onSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.inviteMemberForm.valid && this.userGroupId) {
      this.groupStateFacade.inviteMember(
        this.inviteMemberForm.value,
        this.userGroupId
      );
    }
  }
}
