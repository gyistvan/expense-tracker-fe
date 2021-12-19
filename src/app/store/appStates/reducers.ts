import { Action, createReducer, on } from '@ngrx/store';
import * as moment from 'moment';
import {
  changeDisplayedIntervalSuccess,
  requestAddMonthlySavingSuccess,
  requestMonthlySavingSuccess,
  requestUpdateMonthlySavingSuccess,
} from './actions';

export type AppState = {
  showDate: string;
  numOfDaysInInerval: number;
  monthlySaving: number | null;
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
};

const appDataReducer = createReducer(
  initialState,
  on(changeDisplayedIntervalSuccess, (state, { showDate }) => ({
    ...state,
    showDate,
    numOfDaysInInerval: calcDaysInMonth(showDate),
  })),
  on(requestMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving?.[0]?.amount,
  })),
  on(requestAddMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving.amount,
  })),
  on(requestUpdateMonthlySavingSuccess, (state, { saving }) => ({
    ...state,
    monthlySaving: saving.amount,
  }))
);

export const appReducer = (state: AppState | undefined, action: Action) =>
  appDataReducer(state, action);
