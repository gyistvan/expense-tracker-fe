import { createSelector } from '@ngrx/store';
import { State } from '../../store/index';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: State) => state.authState;

export const isUserAuthorized = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthorized
);
export const getToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const getLoginErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginErrorMessage
);
export const getRegistrationErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.registrationErrorMessage
);
