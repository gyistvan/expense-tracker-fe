import { createAction, props } from '@ngrx/store';
import {
  Income,
  IncomePayload,
} from 'src/app/services/incomes/interfaces/income';

export enum IncomeActionTypes {
  requestAddIncome = '[IncomeRequest] requestAddIncome',
  requestAddIncomeSuccess = '[IncomeRequest] requestAddIncomeSuccess',
  requestAddIncomeFail = '[IncomeRequest] requestAddIncomeFail',
  requestAllIncomes = '[IncomeRequest] requestAllIncome',
  requestAllIncomesSuccess = '[IncomeRequest] requestAllIncomesSuccess',
  requestAllIncomesFail = '[IncomeRequest] requestAllIncomesFail',
  requestDeleteIncome = '[IncomeRequest] requestDeleteIncome',
  requestDeleteIncomeSuccess = '[IncomeRequest] requestDeleteIncomeSuccess',
  requestDeleteIncomeFail = '[IncomeRequest] requestDeleteIncomeFail',
  requestIncome = '[IncomeRequest] requestIncome',
  requestIncomeSuccess = '[IncomeRequest] requestIncomeSuccess',
  requestIncomeFail = '[IncomeRequest] requestIncomeFail',
  requestUpdateIncome = '[IncomeRequest] requestUpdateIncome',
  requestUpdateIncomeSuccess = '[IncomeRequest] requestUpdateIncomeSuccess',
  requestUpdateIncomeFail = '[IncomeRequest] requestUpdateIncomeFail',
}

export const requestAddIncome = createAction(
  IncomeActionTypes.requestAddIncome,
  props<{ incomePayload: IncomePayload }>()
);

export const requestAddIncomeSuccess = createAction(
  IncomeActionTypes.requestAddIncomeSuccess,
  props<{ income: Income }>()
);

export const requestAddIncomeFail = createAction(
  IncomeActionTypes.requestAddIncomeFail
);

export const requestAllIncomes = createAction(
  IncomeActionTypes.requestAllIncomes,
  props<{ requestUrl: string }>()
);

export const requestAllIncomesSuccess = createAction(
  IncomeActionTypes.requestAllIncomesSuccess,
  props<{ incomes: Income[] }>()
);

export const requestAllIncomesFail = createAction(
  IncomeActionTypes.requestAllIncomesFail
);

export const requestDeleteIncome = createAction(
  IncomeActionTypes.requestDeleteIncome,
  props<{ id: string }>()
);

export const requestDeleteIncomeSuccess = createAction(
  IncomeActionTypes.requestDeleteIncomeSuccess,
  props<{ id: string }>()
);

export const requestDeleteIncomeFail = createAction(
  IncomeActionTypes.requestDeleteIncomeFail
);

export const requestIncome = createAction(
  IncomeActionTypes.requestIncome,
  props<{ id: string }>()
);

export const requestIncomeSuccess = createAction(
  IncomeActionTypes.requestIncomeSuccess,
  props<{ income: Income }>()
);

export const requestIncomeFail = createAction(
  IncomeActionTypes.requestIncomeFail
);

export const requestUpdateIncome = createAction(
  IncomeActionTypes.requestUpdateIncome,
  props<{ id: string; incomePayload: IncomePayload }>()
);

export const requestUpdateIncomeSuccess = createAction(
  IncomeActionTypes.requestUpdateIncomeSuccess,
  props<{ income: Income }>()
);

export const requestUpdateIncomeFail = createAction(
  IncomeActionTypes.requestUpdateIncomeFail
);
