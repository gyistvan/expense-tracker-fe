import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { SavingPayload } from 'src/app/services/app-state-service/interfaces/saving';
import { State } from 'src/app/store';
import {
  changeDisplayedInterval,
  requestAddMonthlySaving,
  requestMonthlySaving,
  requestUpdateMonthlySaving,
} from './actions';
import {
  getDaysInInterval,
  getIsMonthlySavingLoading,
  getMonthlySaving,
  getShowDate,
} from './selectors';

@Injectable({
  providedIn: 'root',
})
export class AppStateFacade {
  public showDate = moment().format('YYYY-MM-DD');
  public showDate$ = this.store.pipe(select(getShowDate));
  public daysInInterval$ = this.store.pipe(select(getDaysInInterval));
  public monthlySaving$ = this.store.pipe(select(getMonthlySaving));
  public isMonthlySavingLoading$ = this.store.pipe(
    select(getIsMonthlySavingLoading)
  );

  constructor(private store: Store<State>) {
    this.showDate$.subscribe((showDate) => {
      this.showDate = showDate;
    });
  }

  public changeDateInterval(showDate: string) {
    this.store.dispatch(changeDisplayedInterval({ showDate }));
  }

  public getMonthlySaving(requestUrl: string) {
    this.store.dispatch(requestMonthlySaving({ requestUrl }));
  }

  public addMonthlySaving(savingPayload: SavingPayload) {
    this.store.dispatch(requestAddMonthlySaving({ savingPayload }));
  }

  public updateMonthlySaving(savingPayload: SavingPayload) {
    this.store.dispatch(requestUpdateMonthlySaving({ savingPayload }));
  }
}
