import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TransactionResponse } from 'src/app/services/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import {
  requestTransactionAddSuccess,
  requestTransactionDeleteSuccess,
  requestTransactionsSuccess,
  requestTransactionUpdateSuccess,
  TransactionActionTypes,
} from './actions';
import {
  AddTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
} from './interfaces';

@Injectable()
export class TransactionEffects {
  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActionTypes.requestTransactions),
      mergeMap(({ requestUrl }) => {
        return this.transactionService.getAll(requestUrl).pipe(
          map((transactions) => requestTransactionsSuccess({ transactions })),
          catchError(() =>
            of({ type: TransactionActionTypes.requestTransactionsFail })
          )
        );
      })
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActionTypes.requestTransactionDelete),
      mergeMap((deleteAction: DeleteTransactionAction) => {
        return this.transactionService.delete(deleteAction).pipe(
          map((id) => requestTransactionDeleteSuccess({ id })),
          catchError(() =>
            of({ type: TransactionActionTypes.requestTransactionDeleteFail })
          )
        );
      })
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActionTypes.requestTransactionAdd),
      mergeMap((addTransactionAction: AddTransactionAction) => {
        return this.transactionService.addNew(addTransactionAction).pipe(
          map(({ transaction }) =>
            requestTransactionAddSuccess({
              transaction,
            })
          ),
          catchError(() =>
            of({ type: TransactionActionTypes.requestTransactionAddFail })
          )
        );
      })
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActionTypes.requestTransactionUpdate),
      mergeMap((updateTransactionAction: UpdateTransactionAction) => {
        return this.transactionService
          .updateTransaction(updateTransactionAction)
          .pipe(
            map(({ transaction }) =>
              requestTransactionUpdateSuccess({
                transaction,
              })
            ),
            catchError(() =>
              of({ type: TransactionActionTypes.requestTransactionUpdateFail })
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService
  ) {}
}
