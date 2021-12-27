import { createSelector } from '@ngrx/store';
import { State } from '../index';
import { TransactionState } from './reducers';

export const selectTransactionState = (state: State) => state.transactions;

export const transactions = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.transactions
);
export const transaction = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.transaction
);
export const isTransactionsLoading = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.isTransactionsLoading
);
export const errorMessage = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.errorMessage
);

export const getStartDate = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.startDate
);

export const getEndDate = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.endDate
);
