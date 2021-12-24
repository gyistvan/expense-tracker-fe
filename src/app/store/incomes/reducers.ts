import { Action, createReducer, on } from '@ngrx/store';
import { Income } from 'src/app/services/incomes/interfaces/income';
import {
  requestAddIncome,
  requestAddIncomeFail,
  requestAddIncomeSuccess,
  requestAllIncomes,
  requestAllIncomesFail,
  requestAllIncomesSuccess,
  requestDeleteIncome,
  requestDeleteIncomeFail,
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
  on(requestAllIncomes, (state) => ({ ...state, isIncomesLoading: true })),
  on(requestAllIncomesSuccess, (state, { incomes }) => ({
    ...state,
    incomes,
    isIncomesLoading: false,
    total: incomes.reduce((acc, income) => (acc += income.amount), 0),
  })),
  on(requestAllIncomesFail, (state) => ({ ...state, isIncomesLoading: false })),
  on(requestAddIncome, (state) => ({ ...state, isIncomesLoading: true })),
  on(requestAddIncomeSuccess, (state, { income }) => ({
    ...state,
    isIncomesLoading: false,
    incomes: [...state.incomes, income],
    total: state.total + income.amount,
  })),
  on(requestAddIncomeFail, (state) => ({ ...state, isIncomesLoading: false })),
  on(requestDeleteIncome, (state) => ({ ...state, isIncomesLoading: true })),
  on(requestDeleteIncomeSuccess, (state, { id }) => ({
    ...state,
    isIncomesLoading: false,
    incomes: state.incomes.filter((income) => income._id !== id),
    total:
      state.total - state.incomes.find((income) => income._id === id)!.amount,
  })),
  on(requestDeleteIncomeFail, (state) => ({
    ...state,
    isIncomesLoading: false,
  }))
);

export const incomeReducer = (state: IncomeState | undefined, action: Action) =>
  incomeDataReducer(state, action);
