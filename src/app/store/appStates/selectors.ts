import { createSelector } from '@ngrx/store';
import { State } from '../index';
import { AppState } from './reducers';

export const selectAppState = (state: State) => state.appState;

export const getShowDate = createSelector(
  selectAppState,
  (state: AppState) => state.showDate
);

export const getDaysInInterval = createSelector(
  selectAppState,
  (state: AppState) => state.numOfDaysInInerval
);

export const getMonthlySaving = createSelector(
  selectAppState,
  (state: AppState) => state.monthlySaving
);
