import { createAction, props } from '@ngrx/store';
import {
  Saving,
  SavingPayload,
} from 'src/app/services/app-state-service/interfaces/saving';

export enum AppStateActionTypes {
  changeDisplayedInterval = '[appStateChange] changeDisplayedInterval',
  changeDisplayedIntervalSuccess = '[appStateChange] changeDisplayedInterval',
  changeDisplayedIntervalFail = '[appStateChange] changeDisplayedIntervalFail',
  requestMonthlySaving = '[appStateChange] requestMonthlySaving',
  requestMonthlySavingSuccess = '[appStateChange] requestMonthlySavingSuccess',
  requestMonthlySavingFail = '[appStateChange] requestMonthlySavingFail',
  requestAddMonthlySaving = '[appStateChange] requestAddMonthlySaving',
  requestAddMonthlySavingSuccess = '[appStateChange] requestAddMonthlySavingSuccess',
  requestAddMonthlySavingFail = '[appStateChange] requestAddMonthlySavingFail',
  requestUpdateMonthlySaving = '[appStateChange] requestUpdateMonthlySaving',
  requestUpdateMonthlySavingSuccess = '[appStateChange] requestUpdateMonthlySavingSuccess',
  requestUpdateMonthlySavingFail = '[appStateChange] requestUpdateMonthlySavingFail',
}

export const changeDisplayedInterval = createAction(
  AppStateActionTypes.changeDisplayedInterval,
  props<{ showDate: string }>()
);

export const changeDisplayedIntervalSuccess = createAction(
  AppStateActionTypes.changeDisplayedIntervalSuccess,
  props<{ showDate: string }>()
);

export const changeDisplayedIntervalFail = createAction(
  AppStateActionTypes.changeDisplayedIntervalFail
);

export const requestMonthlySaving = createAction(
  AppStateActionTypes.requestMonthlySaving,
  props<{ requestUrl: string }>()
);

export const requestMonthlySavingSuccess = createAction(
  AppStateActionTypes.requestMonthlySavingSuccess,
  props<{ saving: Saving[] }>()
);

export const requestMonthlySavingFail = createAction(
  AppStateActionTypes.requestMonthlySavingFail,
  props<{ saving: Saving }>()
);

export const requestAddMonthlySaving = createAction(
  AppStateActionTypes.requestAddMonthlySaving,
  props<{ savingPayload: SavingPayload }>()
);

export const requestAddMonthlySavingSuccess = createAction(
  AppStateActionTypes.requestAddMonthlySavingSuccess,
  props<{ saving: Saving }>()
);

export const requestAddMonthlySavingFail = createAction(
  AppStateActionTypes.requestAddMonthlySavingFail
);

export const requestUpdateMonthlySaving = createAction(
  AppStateActionTypes.requestUpdateMonthlySaving,
  props<{ savingPayload: SavingPayload }>()
);

export const requestUpdateMonthlySavingSuccess = createAction(
  AppStateActionTypes.requestUpdateMonthlySavingSuccess,
  props<{ saving: Saving }>()
);

export const requestUpdateMonthlySavingFail = createAction(
  AppStateActionTypes.requestUpdateMonthlySavingFail
);
