import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  requestLogin = '[AuthRequest] requestLogin',
  requestLoginSuccess = '[AuthRequest] requestLoginSuccess',
  requestLoginFail = '[AuthRequest] requestLoginFail',
  requestRegister = '[AuthRequest] requestRegister',
  requestRegisterSuccess = '[AuthRequest] requestRegisterSuccess',
  requestRegisterFail = '[AuthRequest] requestRegisterFail',
  requestLogout = '[AuthRequest] requestLogout',
  requestLogoutSuccess = '[AuthRequest] requestLogoutSuccess',
}

export const requestLogin = createAction(
  AuthActionTypes.requestLogin,
  props<{ email: string; password: string }>()
);

export const requestLoginSuccess = createAction(
  AuthActionTypes.requestLoginSuccess,
  props<{ token: string }>()
);

export const requestLoginFail = createAction(
  AuthActionTypes.requestLoginFail,
  props<{ error: string }>()
);

export const requestRegister = createAction(
  AuthActionTypes.requestRegister,
  props<{ email: string; password: string; name: string }>()
);

export const requestRegisterSuccess = createAction(
  AuthActionTypes.requestRegisterSuccess,
  props<{ msg: string }>()
);

export const requestRegisterFail = createAction(
  AuthActionTypes.requestRegisterFail,
  props<{ error: string }>()
);

export const requestLogout = createAction(AuthActionTypes.requestLogout);

export const requestLogoutSuccess = createAction(
  AuthActionTypes.requestLogoutSuccess
);
