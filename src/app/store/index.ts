import { ActionReducerMap } from '@ngrx/store';
import { AppEffects } from './appStates/effects';
import { appReducer, AppState } from './appStates/reducers';
import { AuthEffects } from './auth/auth.effects';
import { authReducer, AuthState } from './auth/auth.reducer';
import { GroupEffects } from './group/group.effects';
import { groupReducer, GroupState } from './group/group.reducer';
import { IncomeEffects } from './incomes/effects';
import { incomeReducer, IncomeState } from './incomes/reducers';
import { TransactionEffects } from './transactions/effects';
import { transactionsReducer, TransactionState } from './transactions/reducers';

export interface State {
  transactions: TransactionState;
  incomes: IncomeState;
  appState: AppState;
  authState: AuthState;
  groupState: GroupState;
}

export const reducers: ActionReducerMap<State> = {
  transactions: transactionsReducer,
  incomes: incomeReducer,
  appState: appReducer,
  authState: authReducer,
  groupState: groupReducer,
};

export const effects: any[] = [
  TransactionEffects,
  IncomeEffects,
  AppEffects,
  AuthEffects,
  GroupEffects,
];
