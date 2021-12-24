import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppStateService } from 'src/app/services/app-state-service/app-state-service.service';
import {
  Saving,
  SavingResponse,
} from 'src/app/services/app-state-service/interfaces/saving';
import {
  AppStateActionTypes,
  changeDisplayedIntervalFail,
  changeDisplayedIntervalSuccess,
  requestAddMonthlySavingSuccess,
  requestMonthlySavingSuccess,
  requestUpdateMonthlySavingSuccess,
} from './actions';

@Injectable()
export class AppEffects {
  changeInterval$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActionTypes.changeDisplayedInterval),
      mergeMap(({ showDate }) =>
        of().pipe(
          map(() => changeDisplayedIntervalSuccess({ showDate })),
          catchError(() => of(changeDisplayedIntervalFail))
        )
      )
    )
  );

  getSavings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActionTypes.requestMonthlySaving),
      mergeMap(({ requestUrl }) => {
        return this.appStateService.get(requestUrl).pipe(
          map((saving: Saving[]) => {
            return requestMonthlySavingSuccess({ saving });
          }),
          catchError(() =>
            of({ type: AppStateActionTypes.requestMonthlySavingFail })
          )
        );
      })
    )
  );

  addMonthlySaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActionTypes.requestAddMonthlySaving),
      mergeMap(({ savingPayload }) => {
        return this.appStateService.add(savingPayload).pipe(
          map(({ saving }) => requestAddMonthlySavingSuccess({ saving })),
          catchError(() =>
            of({ type: AppStateActionTypes.requestAddMonthlySavingFail })
          )
        );
      })
    )
  );

  updateMonthlySaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActionTypes.requestUpdateMonthlySaving),
      mergeMap(({ savingPayload }) => {
        return this.appStateService.update(savingPayload).pipe(
          map(({ saving }) => requestUpdateMonthlySavingSuccess({ saving })),
          catchError(() =>
            of({ type: AppStateActionTypes.requestUpdateMonthlySavingFail })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private appStateService: AppStateService
  ) {}
}
