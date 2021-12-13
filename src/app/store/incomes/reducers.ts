import { Action, createReducer, on } from '@ngrx/store';
import { Income } from 'src/app/services/incomes/interfaces/income';

export type IncomeState = {
  incomes: Income[];
  isIncomesLoading: boolean;
  errorMessage?: string;
};

const initialState: IncomeState = {
  incomes: [],
  isIncomesLoading: false,
};

const incomeDataReducer = createReducer(initialState);

export const incomeReducer = (state: IncomeState | undefined, action: Action) =>
  incomeDataReducer(state, action);
