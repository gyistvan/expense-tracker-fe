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
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.profileForm = this.createProfileForm();
    this.name.patchValue(this.authStateFacade.userName.value);
    this.email.patchValue(this.authStateFacade.userEmail.value);
    this.groupId.patchValue(this.authStateFacade.userGroupId.value);
    this.authStateFacade.getUserName$.subscribe((userName) =>
      this.name.patchValue(userName)
    );
    this.authStateFacade.getUserEmail$.subscribe((email) =>
      this.email.patchValue(email)
    );
    this.authStateFacade.getUserGroupId$.subscribe((groupId) =>
      this.groupId.patchValue(groupId)
    );
  }

  private createProfileForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        { value: '', disabled: true },
        [Validators.required, new EmailValidator()],
      ],
      groupId: ['', [Validators.required]],
    });
  }

  get name(): AbstractControl {
    return this.profileForm.get('name') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.profileForm.get('email') as AbstractControl;
  }

  get groupId(): AbstractControl {
    return this.profileForm.get('groupId') as AbstractControl;
  }

  public onSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.profileForm.valid) {
      this.authStateFacade.updateProfile(this.profileForm.value);
    }
  }
}
