import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  DAILY_USED_FOR_OPTIONS,
  MONTHLY_USED_FOR_OPTIONS,
  TYPE_OPTIONS,
} from 'src/app/constants';
import { TransactionPayload } from 'src/app/services/transaction/interfaces/transaction';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  private transactionId?: string;
  public transactionForm!: FormGroup;
  public isIncomesLoading = this.transactionStateFacade.isTransactionsLoading$;
  public recievedAtDate?: string;

  public dailyUsedForOptions: string[] = DAILY_USED_FOR_OPTIONS;
  public monthlyUsedForOptions: string[] = MONTHLY_USED_FOR_OPTIONS;
  public typeOptions: string[] = TYPE_OPTIONS;
  public showDate?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionStateFacade: TransactionStateFacade,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.createForm();
    this.transactionId = this.getTransactionId();
    if (this.transactionId) {
      this.transactionStateFacade.getTransactionById(this.transactionId);
    }
    this.transactionStateFacade.transaction$.subscribe((transaction) => {
      if (transaction) {
        this.amount.patchValue(transaction.amount);
        this.type.patchValue(transaction.type);
        this.usedFor.patchValue(transaction.usedFor);
        this.spentAt.patchValue(
          this.datePipe.transform(transaction.spentAt, 'yyyy-MM-dd')
        );
        this.comment.patchValue(transaction.comment);
        this.isPaid.patchValue(transaction.isPaid);
      }
    });
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
      usedFor: ['', [Validators.required]],
      spentAt: [''],
      comment: [],
      isPaid: [false],
    });
  }

  public setDefault(): void {
    this.usedFor.patchValue(this.type.value === 'Monthly' ? 'Bill' : 'Food');
  }

  private getTransactionId(): string {
    let snapShot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    return snapShot.params.transactionId;
  }

  get amount(): AbstractControl {
    return this.transactionForm.get('amount') as AbstractControl;
  }

  get spentAt(): AbstractControl {
    return this.transactionForm.get('spentAt') as AbstractControl;
  }

  get comment(): AbstractControl {
    return this.transactionForm.get('comment') as AbstractControl;
  }

  get isPaid(): AbstractControl {
    return this.transactionForm.get('isPaid') as AbstractControl;
  }

  get type(): AbstractControl {
    return this.transactionForm.get('type') as AbstractControl;
  }

  get usedFor(): AbstractControl {
    return this.transactionForm.get('usedFor') as AbstractControl;
  }

  public onSubmit() {
    if (this.transactionForm.valid && this.transactionId) {
      let transactionPayload: TransactionPayload = {
        amount: parseInt(this.amount.value),
        spentAt: this.spentAt.value ? this.spentAt.value : Date.now(),
        comment: this.comment.value,
        type: this.type.value,
        usedFor: this.usedFor.value,
        isPaid: this.isPaid.value,
      };
      this.transactionStateFacade.updateTransaction(
        this.transactionId,
        transactionPayload
      );
    }
  }
}
