import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  requestIncomeSuccess,
  requestUpdateIncomeSuccess,
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

  getAllIncomes$ = createEffect(() =>
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

  getIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestIncome),
      mergeMap(({ id }) => {
        return this.incomeService.getIncomeById(id).pipe(
          map((income: Income) => requestIncomeSuccess({ income })),
          catchError(() => of({ type: IncomeActionTypes.requestIncomeFail }))
        );
      })
    )
  );

  updateIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActionTypes.requestUpdateIncome),
      mergeMap(({ id, incomePayload }) => {
        return this.incomeService.updateIncomeById(id, incomePayload).pipe(
          map(({ income }) => {
            this.router.navigate(['/dashboard']);
            return requestUpdateIncomeSuccess({ income });
          }),
          catchError(() =>
            of({ type: IncomeActionTypes.requestUpdateIncomeFail })
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
    private incomeService: IncomeService,
    private router: Router
  ) {}
}
