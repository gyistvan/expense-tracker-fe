import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationPayload } from 'src/app/services/auth/interfaces/payloads';
import { EmailValidatorDirective } from 'src/app/shared/directives/email-validator/email-validator.directive';
import { PasswordValidatorDirective } from 'src/app/shared/directives/password-validator/password-validator.directive';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

const NAME_MIN_LENGTH = 6;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authStateFacade: AuthStateFacade
  ) {}

  public ngOnInit(): void {
    this.registrationForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(NAME_MIN_LENGTH)]],
      email: ['', [Validators.required, new EmailValidatorDirective()]],
      password: ['', [Validators.required, new PasswordValidatorDirective()]],
    });
  }

  get name(): AbstractControl {
    return this.registrationForm.get('name') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email') as AbstractControl;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.authStateFacade.register(form.value);
    }
  }
}
