import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import {
  requestSingleTransactionSuccess,
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

  getSingleTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActionTypes.requestSingleTransaction),
      mergeMap(({ id }) => {
        return this.transactionService.getTransactionById(id).pipe(
          map(({ transaction }) => {
            return requestSingleTransactionSuccess({ transaction });
          }),
          catchError(() =>
            of({ type: TransactionActionTypes.requestSingleTransactionFail })
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
            map(({ transaction }) => {
              this.router.navigate(['dashboard']);
              return requestTransactionUpdateSuccess({
                transaction,
              });
            }),
            catchError(() =>
              of({ type: TransactionActionTypes.requestTransactionUpdateFail })
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private router: Router
  ) {}
}
