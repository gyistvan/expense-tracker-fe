import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NgModel,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { CustomValidatorService } from 'src/app/services/custom-validator/custom-validator.service';

@Directive({
  selector: '[latinCharsValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LatinCharsValidatorDirective,
      multi: true,
    },
  ],
})
export class LatinCharsValidatorDirective implements Validator {
  customValidators;
  @Input('latinCharsValidator') email?: NgModel;

  constructor() {
    this.customValidators = new CustomValidatorService();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let pattern = /^[A-z\u00C0-\u00ff]+$/;
    let result = this.customValidators.valideByPattern(pattern)(control);
    return result ? { hasNonLatinChars: true } : null;
  }
}
