import { createSelector } from '@ngrx/store';
import { State } from '../index';
import { IncomeState } from './reducers';

export const selectIncomeState = (state: State) => state.incomes;

export const incomes = createSelector(
  selectIncomeState,
  (state: IncomeState) => state.incomes
);

export const isIncomesLoading = createSelector(
  selectIncomeState,
  (state: IncomeState) => state.isIncomesLoading
);

export const errorMessage = createSelector(
  selectIncomeState,
  (state: IncomeState) => state.errorMessage
);

export const getTotal = createSelector(
  selectIncomeState,
  (state: IncomeState) => state.total
);
