import { Action, createReducer, on } from '@ngrx/store';
import {
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestRegister,
  requestRegisterFail,
  requestRegisterSuccess,
  requestUserSuccess,
} from './auth.actions';

export type AuthState = {
  isAuthorized: boolean;
  token?: string;
  loginErrorMessage?: string;
  registrationErrorMessage?: string;
  userName: string | null;
  userEmail: string | null;
  userGroupId: string | null;
  userPendingInvites: Record<string, string>;
};

const initialState: AuthState = {
  isAuthorized: false,
  userName: null,
  userEmail: null,
  userGroupId: null,
  userPendingInvites: {},
};

export const authDataReducer = createReducer(
  initialState,
  on(requestLogin, (state) => state),
  on(requestLoginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthorized: true,
  })),
  on(requestLoginFail, (state, { error }) => ({
    ...state,
    loginErrorMessage: error,
  })),
  on(requestRegister, (state) => state),
  on(requestRegisterSuccess, (state) => state),
  on(requestRegisterFail, (state, { error }) => ({
    ...state,
    registrationErrorMessage: error,
  })),
  on(requestLogout, (state) => state),
  on(requestLogoutSuccess, (state) => ({
    ...state,
    token: undefined,
    isAuthorized: false,
  })),
  on(requestUserSuccess, (state, { userResponse }) => ({
    ...state,
    userName: userResponse.name,
    userEmail: userResponse.email,
    userGroupId: userResponse.groupId,
    userPendingInvites: userResponse.pendingInvites,
  }))
);

export const authReducer = (state: AuthState | undefined, action: Action) =>
  authDataReducer(state, action);
