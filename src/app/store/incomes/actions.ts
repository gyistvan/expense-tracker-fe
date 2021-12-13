import { createAction, props } from '@ngrx/store';
import {
  Transaction,
  TransactionPayload,
} from 'src/app/services/transaction/interfaces/transaction';

export enum IncomeActionTypes {
  requestAddIncome = '[TransactionRequest] requestAddIncome',
  requestAddIncomeSuccess = '[TransactionRequest] requestAddIncomeSuccess',
  requestAddIncomeFail = '[TransactionRequest] requestAddIncomeFail',
}

export const requestAddIncome = createAction(
  IncomeActionTypes.requestAddIncome
);

export const requestAddIncomeSuccess = createAction(
  IncomeActionTypes.requestAddIncomeSuccess
);

export const requestAddIncomeFail = createAction(
  IncomeActionTypes.requestAddIncomeFail
);
