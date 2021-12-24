import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidatorDirective } from 'src/app/shared/directives/password-validator/password-validator.directive';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent implements OnInit {
  public passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.createPasswordForm();
  }

  private createPasswordForm(): FormGroup {
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

  get oldPassword(): AbstractControl {
    return this.passwordForm.get('oldPassword') as AbstractControl;
  }

  get newPassword(): AbstractControl {
    return this.passwordForm.get('newPassword') as AbstractControl;
  }

  get newPassword2(): AbstractControl {
    return this.passwordForm.get('newPassword2') as AbstractControl;
  }

  public arePasswordsTheSame(): boolean {
    return this.newPassword.value === this.newPassword2.value;
  }

  public onPasswordFormSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.passwordForm.valid && this.arePasswordsTheSame()) {
      this.authStateFacade.updatePassword(this.passwordForm.value);
    }
  }
}
