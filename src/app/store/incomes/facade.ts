import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { IncomePayload } from 'src/app/services/incomes/interfaces/income';
import { State } from 'src/app/store';
import {
  requestAddIncome,
  requestAllIncomes,
  requestDeleteIncome,
} from './actions';
import { getTotal, incomes } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class IncomeStateFacade {
  incomes$ = this.store.pipe(select(incomes));
  total$ = this.store.pipe(select(getTotal));

  constructor(private store: Store<State>) {}

  public saveNewIncome(incomePayload: IncomePayload): void {
    this.store.dispatch(
      requestAddIncome({
        incomePayload,
      })
    );
  }

  public getIncomes(requestUrl: string): void {
    this.store.dispatch(requestAllIncomes({ requestUrl }));
  }

  deleteIncome(id: string) {
    this.store.dispatch(requestDeleteIncome({ id }));
  }
}
