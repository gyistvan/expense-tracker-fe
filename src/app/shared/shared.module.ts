import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  HeaderComponent,
  PageComponent,
  ButtonComponent,
  InfoComponent,
  SpinnerComponent,
  TransactionViewComponent,
  MonthSwitchComponent,
  DailyViewComponent,
} from './components/index';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { timePipe } from './pipes/duration.pipe';
import { FormsModule } from '@angular/forms';
import { datePipe } from './pipes/date.pipe';
import { stringJoinerPipe } from './pipes/stringJoiner.pipe';
import { EmailValidatorDirective } from './directives/email-validator/email-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator/password-validator.directive';
import { TogglePasswordDirective } from './directives/toggle-password/toggle-password.directive';
import { LatinCharsValidatorDirective } from './directives/latin-chars-validator/latin-chars-validator.directive';
import { HufPipe } from './pipes/huf.pipe';

const components = [
  HeaderComponent,
  PageComponent,
  ButtonComponent,
  InfoComponent,
  SpinnerComponent,
  TransactionViewComponent,
  timePipe,
  datePipe,
  stringJoinerPipe,
  HufPipe,
  EmailValidatorDirective,
  PasswordValidatorDirective,
  TogglePasswordDirective,
  MonthSwitchComponent,
  DailyViewComponent,
];

@NgModule({
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  providers: [
    EmailValidatorDirective,
    PasswordValidatorDirective,
    LatinCharsValidatorDirective,
  ],
  declarations: components,
  exports: [...components],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}