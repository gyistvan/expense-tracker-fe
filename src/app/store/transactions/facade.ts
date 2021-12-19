import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionPayload } from 'src/app/services/transaction/interfaces/transaction';
import { State } from 'src/app/store';
import { AppStateFacade } from '../appStates/facade';
import {
  requestTransactionAdd,
  requestTransactionDelete,
  requestTransactions,
  requestTransactionUpdate,
} from './actions';
import {
  errorMessage,
  getEndDate,
  getStartDate,
  isTransactionsLoading,
  transactions,
} from './selectors';

@Injectable({
  providedIn: 'root',
})
export class TransactionStateFacade {
  public transactions$ = this.store.pipe(select(transactions));
  public isTransactionsLoading$ = this.store.pipe(
    select(isTransactionsLoading)
  );
  public errorMessage$ = this.store.pipe(select(errorMessage));

  constructor(private store: Store<State>) {}

  public getTransactions(requestUrl: string) {
    this.store.dispatch(
      requestTransactions({
        requestUrl,
      })
    );
  }

  public deleteTransaction(id: string) {
    this.store.dispatch(requestTransactionDelete({ id }));
  }

  public saveNewTransaction(transactionPayload: TransactionPayload) {
    this.store.dispatch(requestTransactionAdd({ transactionPayload }));
  }

  public updateTransaction(id: string, transaction: TransactionPayload) {
    this.store.dispatch(requestTransactionUpdate({ id, transaction }));
  }
}
