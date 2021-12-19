import { Action, createReducer, on } from '@ngrx/store';
import { Income } from 'src/app/services/incomes/interfaces/income';
import {
  requestAddIncome,
  requestAddIncomeFail,
  requestAddIncomeSuccess,
  requestAllIncomes,
  requestAllIncomesFail,
  requestAllIncomesSuccess,
  requestDeleteIncomeSuccess,
} from './actions';

export type IncomeState = {
  incomes: Income[];
  isIncomesLoading: boolean;
  total: number;
  errorMessage?: string;
};

const initialState: IncomeState = {
  incomes: [],
  isIncomesLoading: false,
  total: 0,
};

const incomeDataReducer = createReducer(
  initialState,
  on(requestAllIncomes, (state) => ({ ...state })),
  on(requestAllIncomesSuccess, (state, { incomes }) => ({
    ...state,
    incomes,
    total: incomes.reduce((acc, income) => (acc += income.amount), 0),
  })),
  on(requestAllIncomesFail, (state) => ({ ...state })),
  on(requestAddIncome, (state) => ({ ...state })),
  on(requestAddIncomeSuccess, (state, { income }) => ({
    ...state,
    incomes: [...state.incomes, income],
    total: state.total + income.amount,
  })),
  on(requestAddIncomeFail, (state) => ({ ...state })),
  on(requestDeleteIncomeSuccess, (state, { id }) => ({
    ...state,
    incomes: state.incomes.filter((income) => income._id !== id),
    total:
      state.total - state.incomes.find((income) => income._id === id)!.amount,
  }))
);

export const incomeReducer = (state: IncomeState | undefined, action: Action) =>
  incomeDataReducer(state, action);
