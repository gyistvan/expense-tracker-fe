import { Action, createReducer, on } from '@ngrx/store';
import * as moment from 'moment';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import {
  requestSingleTransaction,
  requestSingleTransactionFail,
  requestSingleTransactionSuccess,
  requestTransactionAdd,
  requestTransactionAddFail,
  requestTransactionAddSuccess,
  requestTransactionDelete,
  requestTransactionDeleteFail,
  requestTransactionDeleteSuccess,
  requestTransactions,
  requestTransactionsFail,
  requestTransactionsSuccess,
  requestTransactionUpdate,
  requestTransactionUpdateFail,
  requestTransactionUpdateSuccess,
} from './actions';

export type TransactionState = {
  transactions: Transaction[];
  transaction?: Transaction;
  isTransactionsLoading: boolean;
  errorMessage?: string;
  startDate: string;
  endDate: string;
};

const initialState: TransactionState = {
  transactions: [],
  isTransactionsLoading: false,
  startDate: moment().startOf('month').toISOString(),
  endDate: moment().endOf('month').toISOString(),
};

const transactionsDataReducer = createReducer(
  initialState,
  on(requestTransactions, (state) => ({
    ...state,
    isTransactionsLoading: true,
  })),
  on(requestTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    isTransactionsLoading: false,
  })),
  on(requestTransactionsFail, (state, { error }) => ({
    ...state,
    isTransactionsLoading: false,
    errorMessage: error,
  })),
  on(requestTransactionDelete, (state) => ({
    ...state,
    isTransactionsLoading: true,
  })),
  on(requestTransactionDeleteSuccess, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter(
      (transaction) => transaction._id !== id
    ),
    isTransactionsLoading: false,
  })),
  on(requestTransactionDeleteFail, (state, { error }) => ({
    ...state,
    isTransactionsLoading: false,
    errorMessage: error,
  })),
  on(requestTransactionAdd, (state) => ({
    ...state,
    isTransactionsLoading: true,
  })),
  on(requestTransactionAddSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
    isTransactionsLoading: false,
  })),
  on(requestTransactionAddFail, (state, { error }) => ({
    ...state,
    isTransactionsLoading: false,
    errorMessage: error,
  })),
  on(requestTransactionUpdate, (state) => ({
    ...state,
    isTransactionsLoading: true,
  })),
  on(requestTransactionUpdateSuccess, (state, { transaction }) => ({
    ...state,
    isTransactionsLoading: false,
    transactions: state.transactions.map((t) =>
      t._id === transaction._id ? transaction : t
    ),
  })),
  on(requestTransactionUpdateFail, (state, { error }) => ({
    ...state,
    isTransactionsLoading: true,
    errorMessage: error,
  })),
  on(requestSingleTransaction, (state) => ({
    ...state,
    isTransactionsLoading: true,
  })),
  on(requestSingleTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transaction,
    isTransactionsLoading: false,
  })),
  on(requestSingleTransactionFail, (state) => ({
    ...state,
    transaction: undefined,
    isTransactionsLoading: false,
  }))
);

export const transactionsReducer = (
  state: TransactionState | undefined,
  action: Action
) => transactionsDataReducer(state, action);
