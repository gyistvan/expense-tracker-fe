import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IncomePayload } from 'src/app/services/incomes/interfaces/income';
import { State } from 'src/app/store';
import {
  requestAddIncome,
  requestAllIncomes,
  requestDeleteIncome,
  requestIncome,
  requestUpdateIncome,
} from './actions';
import { getIncome, getTotal, incomes, isIncomesLoading } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class IncomeStateFacade {
  incomes$ = this.store.pipe(select(incomes));
  income$ = this.store.pipe(select(getIncome));
  total$ = this.store.pipe(select(getTotal));
  isIncomesLoading$ = this.store.pipe(select(isIncomesLoading));

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

  public deleteIncome(id: string) {
    this.store.dispatch(requestDeleteIncome({ id }));
  }

  public getIncomeById(id: string) {
    this.store.dispatch(requestIncome({ id }));
  }

  public updateIncomeById(id: string, incomePayload: IncomePayload) {
    this.store.dispatch(requestUpdateIncome({ id, incomePayload }));
  }
}
