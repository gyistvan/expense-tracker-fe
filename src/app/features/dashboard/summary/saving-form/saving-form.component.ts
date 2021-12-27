import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { SavingPayload } from 'src/app/services/app-state-service/interfaces/saving';
import { AppStateFacade } from 'src/app/store/appStates/facade';

@Component({
  selector: 'app-saving-form',
  templateUrl: './saving-form.component.html',
  styleUrls: ['./saving-form.component.css'],
})
export class SavingFormComponent implements OnInit {
  public monthlySaving: number | null = null;
  public showDate: string | null = null;
  public showSavingForm: boolean = false;
  public savingForm!: FormGroup;
  public isMonthlySavingLoading = this.appStateFacade.isMonthlySavingLoading$;

  constructor(
    private formBuilder: FormBuilder,
    private appStateFacade: AppStateFacade
  ) {}

  ngOnInit(): void {
    this.savingForm = this.createForm();
    this.appStateFacade.showDate$.subscribe((showDate) => {
      this.showDate = showDate;
      this.savingForm.markAsUntouched();
    });
    this.appStateFacade.monthlySaving$.subscribe((monthlySaving) => {
      this.amount.patchValue(monthlySaving);
      this.savingForm.markAsPristine();
      this.showSavingForm = false;
      this.monthlySaving = monthlySaving;
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      amount: [
        null,
        [Validators.required, Validators.min(0), Validators.max(99)],
      ],
    });
  }

  get amount(): AbstractControl {
    return this.savingForm.get('amount') as AbstractControl;
  }

  public switchShowSavingForm(event: MouseEvent): void {
    event.stopPropagation();
    this.showSavingForm = !this.showSavingForm;
  }

  public onSubmit() {
    if (this.savingForm.valid) {
      let savingPayload: SavingPayload = {
        amount: parseInt(this.amount.value),
        appliedMonth: this.showDate
          ? moment(this.showDate).startOf('month').toISOString()
          : moment().startOf('month').toISOString(),
      };
      if (this.monthlySaving) {
        this.appStateFacade.updateMonthlySaving(savingPayload);
        this.showSavingForm = false;
      } else {
        this.appStateFacade.addMonthlySaving(savingPayload);
      }
    }
  }
}
