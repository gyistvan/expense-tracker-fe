import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {
  DAILY_USED_FOR_OPTIONS,
  MONTHLY_USED_FOR_OPTIONS,
  TYPE_OPTIONS,
} from 'src/app/constants';
import { IncomePayload } from 'src/app/services/incomes/interfaces/income';
import { AppStateFacade } from 'src/app/store/appStates/facade';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';

@Component({
  selector: 'app-new-income-form',
  templateUrl: './new-income-form.component.html',
  styleUrls: ['./new-income-form.component.css'],
})
export class NewIncomeFormComponent implements OnInit {
  @Output()
  public closeForm = new EventEmitter<boolean>();

  public incomesForm!: FormGroup;
  public dailyUsedForOptions: string[] = DAILY_USED_FOR_OPTIONS;
  public monthlyUsedForOptions: string[] = MONTHLY_USED_FOR_OPTIONS;
  public typeOptions: string[] = TYPE_OPTIONS;
  public showDate?: string;

  constructor(
    private formBuilder: FormBuilder,
    private incomeStateFacade: IncomeStateFacade,
    private appStateFacade: AppStateFacade
  ) {}

  ngOnInit(): void {
    this.incomesForm = this.createForm();
    this.showDate = this.appStateFacade.showDate;
    this.appStateFacade.showDate$.subscribe((showDate) => {
      this.recievedAt.patchValue(moment(showDate).format('YYYY-MM-DD'));
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      whose: ['', [Validators.required]],
      recievedAt: [''],
      isRecievedAnotherDay: [false],
      addComment: [false],
      comment: [],
    });
  }

  get amount(): AbstractControl {
    return this.incomesForm.get('amount') as AbstractControl;
  }

  get whose(): AbstractControl {
    return this.incomesForm.get('whose') as AbstractControl;
  }

  get isRecievedAnotherDay(): AbstractControl {
    return this.incomesForm.get('isRecievedAnotherDay') as AbstractControl;
  }

  get recievedAt(): AbstractControl {
    return this.incomesForm.get('recievedAt') as AbstractControl;
  }

  get addComment(): AbstractControl {
    return this.incomesForm.get('addComment') as AbstractControl;
  }

  get comment(): AbstractControl {
    return this.incomesForm.get('comment') as AbstractControl;
  }

  onSubmit(): void {
    if (this.incomesForm.valid) {
      let incomePayload: IncomePayload = {
        amount: parseInt(this.amount.value),
        whose: this.whose.value,
        recievedAt: this.isRecievedAnotherDay.value
          ? this.recievedAt.value
          : Date.now(),
        comment: this.comment.value,
      };
      this.incomeStateFacade.saveNewIncome(incomePayload);
      this.closeForm.emit(false);
    }
  }
}
