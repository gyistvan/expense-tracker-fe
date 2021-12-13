import { Directive, Input } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidatorService } from 'src/app/services/custom-validator/custom-validator.service';

@Directive({
  selector: '[passwordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  customValidators;
  @Input('passwordValidator') password?: NgModel;

  constructor() {
    this.customValidators = new CustomValidatorService();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let result = this.customValidators.valideByPattern(pattern)(control);
    return result ? { invalidPassword: true } : null;
  }
}
