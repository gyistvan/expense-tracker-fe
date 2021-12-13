import { createSelector } from '@ngrx/store';
import { State } from '../index';
import { TransactionState } from './reducers';

export const selectAuthorsState = (state: State) => state.transactions;

export const transactions = createSelector(
  selectAuthorsState,
  (state: TransactionState) => state.transactions
);
export const isTransactionsLoading = createSelector(
  selectAuthorsState,
  (state: TransactionState) => state.isTransactionsLoading
);
export const errorMessage = createSelector(
  selectAuthorsState,
  (state: TransactionState) => state.errorMessage
);
