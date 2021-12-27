import { createAction, props } from '@ngrx/store';
import {
  Transaction,
  TransactionPayload,
} from 'src/app/services/transaction/interfaces/transaction';

export enum TransactionActionTypes {
  requestTransactions = '[TransactionRequest] requestTransactions',
  requestTransactionsSuccess = '[TransactionRequest] requestTransactionsSuccess',
  requestTransactionsFail = '[TransactionRequest] requestTransactionsFail',
  requestTransactionDelete = '[TransactionRequest] requestTransactionDelete',
  requestTransactionDeleteSuccess = '[TransactionRequest] requestTransactionDeleteSuccess',
  requestTransactionDeleteFail = '[TransactionRequest] requestTransactionDeleteFail',
  requestTransactionAdd = '[TransactionRequest] requestTransactionAdd',
  requestTransactionAddSuccess = '[TransactionRequest] requestTransactionAddSuccess',
  requestTransactionAddFail = '[TransactionRequest] requestTransactionAddFail',
  requestTransactionUpdate = '[TransactionRequest] requestTransactionUpdate',
  requestTransactionUpdateSuccess = '[TransactionRequest] requestTransactionUpdateSuccess',
  requestTransactionUpdateFail = '[TransactionRequest] requestTransactionUpdateFail',
  requestSingleTransaction = '[TransactionRequest] requestSingleTransaction',
  requestSingleTransactionSuccess = '[TransactionRequest] requestSingleTransactionSuccess',
  requestSingleTransactionFail = '[TransactionRequest] requestSingleTransactionFail',
}

export const requestTransactions = createAction(
  TransactionActionTypes.requestTransactions,
  props<{ requestUrl: string }>()
);

export const requestTransactionsSuccess = createAction(
  TransactionActionTypes.requestTransactionsSuccess,
  props<{ transactions: Transaction[] }>()
);

export const requestTransactionsFail = createAction(
  TransactionActionTypes.requestTransactionsFail,
  props<{ error: string }>()
);

export const requestTransactionDelete = createAction(
  TransactionActionTypes.requestTransactionDelete,
  props<{ id: string }>()
);

export const requestTransactionDeleteSuccess = createAction(
  TransactionActionTypes.requestTransactionDeleteSuccess,
  props<{ id: string }>()
);

export const requestTransactionDeleteFail = createAction(
  TransactionActionTypes.requestTransactionDeleteFail,
  props<{ error: string }>()
);

export const requestTransactionAdd = createAction(
  TransactionActionTypes.requestTransactionAdd,
  props<{ transactionPayload: TransactionPayload }>()
);

export const requestTransactionAddSuccess = createAction(
  TransactionActionTypes.requestTransactionAddSuccess,
  props<{ transaction: Transaction }>()
);

export const requestTransactionAddFail = createAction(
  TransactionActionTypes.requestTransactionAddFail,
  props<{ error: string }>()
);

export const requestTransactionUpdate = createAction(
  TransactionActionTypes.requestTransactionUpdate,
  props<{ id: string; transaction: TransactionPayload }>()
);

export const requestTransactionUpdateSuccess = createAction(
  TransactionActionTypes.requestTransactionUpdateSuccess,
  props<{ transaction: Transaction }>()
);

export const requestTransactionUpdateFail = createAction(
  TransactionActionTypes.requestTransactionUpdateFail,
  props<{ error: string }>()
);

export const requestSingleTransaction = createAction(
  TransactionActionTypes.requestSingleTransaction,
  props<{ id: string }>()
);

export const requestSingleTransactionSuccess = createAction(
  TransactionActionTypes.requestSingleTransactionSuccess,
  props<{ transaction: Transaction }>()
);

export const requestSingleTransactionFail = createAction(
  TransactionActionTypes.requestSingleTransactionFail,
  props<{ error: string }>()
);
