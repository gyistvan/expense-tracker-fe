import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TransactionPayload } from 'src/app/services/transaction/interfaces/transaction';
import { State } from 'src/app/store';
import {
  requestSingleTransaction,
  requestTransactionAdd,
  requestTransactionDelete,
  requestTransactions,
  requestTransactionUpdate,
} from './actions';
import {
  errorMessage,
  isTransactionsLoading,
  transaction,
  transactions,
} from './selectors';

@Injectable({
  providedIn: 'root',
})
export class TransactionStateFacade {
  public transactions$ = this.store.pipe(select(transactions));
  public transaction$ = this.store.pipe(select(transaction));
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

  public getTransactionById(id: string) {
    this.store.dispatch(requestSingleTransaction({ id }));
  }
}
