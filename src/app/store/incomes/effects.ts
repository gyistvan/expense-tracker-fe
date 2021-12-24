import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { Income } from 'src/app/services/incomes/interfaces/income';
import {
  IncomeActionTypes,
  requestAddIncomeSuccess,
  requestAllIncomesSuccess,
  requestDeleteIncomeSuccess,
} from './actions';

@Injectable()
export class IncomeEffects {
  addIncomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestAddIncome),
      mergeMap((incomePayload) => {
        return this.incomeService.addNew(incomePayload).pipe(
          map(({ income }) => requestAddIncomeSuccess({ income })),
          catchError(() => of({ type: IncomeActionTypes.requestAddIncomeFail }))
        );
      })
    )
  );

  getIncomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestAllIncomes),
      mergeMap(({ requestUrl }) => {
        return this.incomeService.getAll(requestUrl).pipe(
          map((incomes: Income[]) => requestAllIncomesSuccess({ incomes })),
          catchError(() =>
            of({ type: IncomeActionTypes.requestAllIncomesFail })
          )
        );
      })
    )
  );

  deleteIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestDeleteIncome),
      mergeMap(({ id }) => {
        return this.incomeService.deleteIncome(id).pipe(
          map(() => requestDeleteIncomeSuccess({ id })),
          catchError(() =>
            of({ type: IncomeActionTypes.requestDeleteIncomeFail })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private incomeService: IncomeService
  ) {}
}
