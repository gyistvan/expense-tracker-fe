import { Action, createReducer, on } from '@ngrx/store';
import * as moment from 'moment';
import {
  changeDisplayedIntervalSuccess,
  requestAddMonthlySavingSuccess,
  requestMonthlySavingSuccess,
  requestUpdateMonthlySavingSuccess,
  requestMonthlySaving,
  requestMonthlySavingFail,
  requestAddMonthlySaving,
  requestAddMonthlySavingFail,
  requestUpdateMonthlySaving,
  requestUpdateMonthlySavingFail,
} from './actions';

export type AppState = {
  showDate: string;
  numOfDaysInInerval: number;
  monthlySaving: number | null;
  isMonthlySavingLoading: boolean;
};

const calcDaysInMonth = (showDate: string = moment().toISOString()): number => {
  return (
    moment(showDate)
      .endOf('month')
      .diff(moment(showDate).startOf('month'), 'days') + 1
  );
};

const initialState: AppState = {
  showDate: moment().toISOString(),
  numOfDaysInInerval: calcDaysInMonth(),
  monthlySaving: null,
  isMonthlySavingLoading: false,
};

const appDataReducer = createReducer(
  initialState,
  on(changeDisplayedIntervalSuccess, (state, { showDate }) => ({
    ...state,
    showDate,
    numOfDaysInInerval: calcDaysInMonth(showDate),
  })),
  on(requestMonthlySaving, (state) => ({
    ...state,
    isMonthlySavingLoading: true,
  })),
  on(requestMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving?.[0]?.amount,
    isMonthlySavingLoading: false,
  })),
  on(requestMonthlySavingFail, (state) => ({
    ...state,
    isMonthlySavingLoading: false,
  })),
  on(requestAddMonthlySaving, (state) => ({
    ...state,
    isMonthlySavingLoading: true,
  })),
  on(requestAddMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving.amount,
    isMonthlySavingLoading: false,
  })),
  on(requestAddMonthlySavingFail, (state) => ({
    ...state,
    isMonthlySavingLoading: false,
  })),
  on(requestUpdateMonthlySaving, (state) => ({
    ...state,
    isMonthlySavingLoading: true,
  })),
  on(requestUpdateMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving.amount,
    isMonthlySavingLoading: false,
  })),
  on(requestUpdateMonthlySavingFail, (state) => ({
    ...state,
    isMonthlySavingLoading: false,
  }))
);

export const appReducer = (state: AppState | undefined, action: Action) =>
  appDataReducer(state, action);
