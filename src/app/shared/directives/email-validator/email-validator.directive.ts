import { Directive, Input } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidatorService } from 'src/app/services/custom-validator/custom-validator.service';

@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  customValidators;
  @Input('emailValidator') email?: NgModel;

  constructor() {
    this.customValidators = new CustomValidatorService();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let result = this.customValidators.valideByPattern(pattern)(control);
    return result ? { invalidEmail: true } : null;
  }
}
