import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { IncomeActionTypes, requestAddIncomeSuccess } from './actions';

@Injectable()
export class TransactionEffects {
  addIncomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestAddIncome),
      mergeMap((IncomePayload) => {
        return this.incomeService.addNew(IncomePayload).pipe(
          map((transaction) => requestAddIncomeSuccess()),
          catchError(() => of({ type: IncomeActionTypes.requestAddIncomeFail }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private incomeService: IncomeService
  ) {}
}
