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
import { TransactionPayload } from 'src/app/services/transaction/interfaces/transaction';
import { AppStateFacade } from 'src/app/store/appStates/facade';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-new-spending-form',
  templateUrl: './new-spending-form.component.html',
  styleUrls: ['./new-spending-form.component.css'],
})
export class NewSpendingFormComponent implements OnInit {
  @Output()
  public closeForm = new EventEmitter<boolean>();

  public spendingForm!: FormGroup;
  public dailyUsedForOptions: string[] = DAILY_USED_FOR_OPTIONS;
  public monthlyUsedForOptions: string[] = MONTHLY_USED_FOR_OPTIONS;
  public typeOptions: string[] = TYPE_OPTIONS;
  public showDate?: string;

  constructor(
    private formBuilder: FormBuilder,
    private transactionStateFacade: TransactionStateFacade,
    private appStateFacade: AppStateFacade
  ) {}

  ngOnInit(): void {
    this.spendingForm = this.createForm();
    this.showDate = this.appStateFacade.showDate;
    this.appStateFacade.showDate$.subscribe((showDate) => {
      this.spentAt.patchValue(moment(showDate).format('YYYY-MM-DD'));
    });
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      type: [this.typeOptions[0], [Validators.required]],
      usedFor: [this.dailyUsedForOptions[0], [Validators.required]],
      spentAt: [''],
      isSpentAnotherDay: [false],
      addComment: [false],
      comment: [],
    });
  }

  get amount(): AbstractControl {
    return this.spendingForm.get('amount') as AbstractControl;
  }

  get type(): AbstractControl {
    return this.spendingForm.get('type') as AbstractControl;
  }

  get usedFor(): AbstractControl {
    return this.spendingForm.get('usedFor') as AbstractControl;
  }

  get isSpentAnotherDay(): AbstractControl {
    return this.spendingForm.get('isSpentAnotherDay') as AbstractControl;
  }

  get spentAt(): AbstractControl {
    return this.spendingForm.get('spentAt') as AbstractControl;
  }

  get addComment(): AbstractControl {
    return this.spendingForm.get('addComment') as AbstractControl;
  }

  get comment(): AbstractControl {
    return this.spendingForm.get('comment') as AbstractControl;
  }

  public setDefault(): void {
    this.usedFor.patchValue(this.type.value === 'Monthly' ? 'Bill' : 'Food');
  }

  public getDate(date: string | null): string | void {
    if (date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

  public onSubmit(): void {
    if (this.spendingForm.valid) {
      let transactionPayload: TransactionPayload = {
        amount: parseInt(this.amount.value),
        type: this.type.value,
        usedFor: this.usedFor.value,
        spentAt: this.isSpentAnotherDay.value ? this.spentAt.value : Date.now(),
        isPaid: this.type.value === 'Daily',
        comment: this.comment.value,
      };
      this.transactionStateFacade.saveNewTransaction(transactionPayload);
      this.spendingForm = this.createForm();

      this.closeForm.emit(false);
    }
  }
}
