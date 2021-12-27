import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  HeaderComponent,
  PageComponent,
  ButtonComponent,
  SpinnerComponent,
  TransactionViewComponent,
  MonthSwitchComponent,
  DailyViewComponent,
  NewIncomeFormComponent,
  NewSpendingFormComponent,
  ShowHideComponent,
  LanguageSelectorComponent,
} from './components/index';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { timePipe } from './pipes/duration.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { datePipe } from './pipes/date.pipe';
import { stringJoinerPipe } from './pipes/stringJoiner.pipe';
import { EmailValidatorDirective } from './directives/email-validator/email-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator/password-validator.directive';
import { TogglePasswordDirective } from './directives/toggle-password/toggle-password.directive';
import { LatinCharsValidatorDirective } from './directives/latin-chars-validator/latin-chars-validator.directive';
import { HufPipe } from './pipes/huf.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NotificationService } from '../services/notification/notification.service';
import { TranslateModule } from '@ngx-translate/core';
import { FocusDirective } from './directives/focus-directive/focus-directive.directive';

const components = [
  HeaderComponent,
  PageComponent,
  ButtonComponent,
  SpinnerComponent,
  TransactionViewComponent,
  timePipe,
  datePipe,
  stringJoinerPipe,
  HufPipe,
  EmailValidatorDirective,
  PasswordValidatorDirective,
  TogglePasswordDirective,
  FocusDirective,
  MonthSwitchComponent,
  DailyViewComponent,
  NewIncomeFormComponent,
  NewSpendingFormComponent,
  ShowHideComponent,
  LanguageSelectorComponent,
];

@NgModule({
  imports: [
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    TranslateModule,
  ],
  providers: [
    EmailValidatorDirective,
    PasswordValidatorDirective,
    LatinCharsValidatorDirective,
    FocusDirective,
    NotificationService,
    TranslateModule,
  ],
  declarations: components,
  exports: [...components, TranslateModule],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
