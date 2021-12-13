import { ActionReducerMap } from '@ngrx/store';
import { incomeReducer, IncomeState } from './incomes/reducers';
import { TransactionEffects } from './transactions/effects';
import { transactionsReducer, TransactionState } from './transactions/reducers';

export interface State {
  transactions: TransactionState;
  incomes: IncomeState;
}

export const reducers: ActionReducerMap<State> = {
  transactions: transactionsReducer,
  incomes: incomeReducer,
};
export const effects: any[] = [TransactionEffects];
