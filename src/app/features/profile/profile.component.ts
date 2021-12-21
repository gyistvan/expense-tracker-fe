import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidatorDirective } from 'src/app/shared/directives/password-validator/password-validator.directive';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public displayPasswordForm = false;

  constructor(
    private authStateFacade: AuthStateFacade,
    private formBuilder: FormBuilder
  ) {}

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = this.createProfileForm();
    this.passwordForm = this.createPasswordForm();
    this.name.patchValue(this.authStateFacade.userName.value);
    this.email.patchValue(this.authStateFacade.userEmail.value);
    this.groupId.patchValue(this.authStateFacade.userGroupId.value);
  }

  createProfileForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, new EmailValidator()]],
      groupId: ['', [Validators.required]],
    });
  }

  createPasswordForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: [
        '',
        [Validators.required, new PasswordValidatorDirective()],
      ],
      newPassword: [
        '',
        [Validators.required, new PasswordValidatorDirective()],
      ],
      newPassword2: [
        '',
        [Validators.required, new PasswordValidatorDirective()],
      ],
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

  get oldPassword(): AbstractControl {
    return this.passwordForm.get('oldPassword') as AbstractControl;
  }

  get newPassword(): AbstractControl {
    return this.passwordForm.get('newPassword') as AbstractControl;
  }

  get newPassword2(): AbstractControl {
    return this.passwordForm.get('newPassword2') as AbstractControl;
  }

  public onSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.profileForm.valid) {
      this.authStateFacade.updateProfile(this.profileForm.value);
    }
  }

  public onPasswordFormSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.passwordForm.valid && this.arePasswordsTheSame()) {
      this.authStateFacade.updatePassword(this.passwordForm.value);
    }
  }

  public changeDisplayPasswordForm(event: MouseEvent): void {
    event.preventDefault();
    this.displayPasswordForm = !this.displayPasswordForm;
  }

  public arePasswordsTheSame(): boolean {
    return this.newPassword.value === this.newPassword2.value;
  }
}
