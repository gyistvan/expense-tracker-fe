import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment';
import { IncomePayload } from 'src/app/services/incomes/interfaces/income';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css'],
})
export class EditIncomeComponent implements OnInit {
  private incomeId?: string;
  public incomesForm!: FormGroup;
  public isIncomesLoading = this.incomeStateFacade.isIncomesLoading$;
  public recievedAtDate?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private incomeStateFacade: IncomeStateFacade,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.incomesForm = this.createForm();
    this.incomeId = this.getIncomeId();
    if (this.incomeId) {
      this.incomeStateFacade.getIncomeById(this.incomeId);
    }
    this.incomeStateFacade.income$.subscribe((income) => {
      if (income) {
        this.amount.patchValue(income.amount);
        this.whose.patchValue(income.whose);
        this.recievedAt.patchValue(
          this.datePipe.transform(income.recievedAt, 'yyyy-MM-dd')
        );
        this.addComment.patchValue(income.comment);
        this.comment.patchValue(income.comment);
      }
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      whose: ['', [Validators.required]],
      recievedAt: [''],
      addComment: [false],
      comment: [],
    });
  }

  private getIncomeId(): string {
    let snapShot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    return snapShot.params.incomeId;
  }

  get amount(): AbstractControl {
    return this.incomesForm.get('amount') as AbstractControl;
  }

  get whose(): AbstractControl {
    return this.incomesForm.get('whose') as AbstractControl;
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

  public onSubmit() {
    if (this.incomesForm.valid && this.incomeId) {
      let incomePayload: IncomePayload = {
        amount: parseInt(this.amount.value),
        whose: this.whose.value,
        recievedAt: this.recievedAt.value ? this.recievedAt.value : Date.now(),
        comment: this.comment.value,
      };
      this.incomeStateFacade.updateIncomeById(this.incomeId, incomePayload);
    }
  }
}
