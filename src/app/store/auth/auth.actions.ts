import { createAction, props } from '@ngrx/store';
import { PasswordPayload } from 'src/app/services/user/interfaces/passwordPayload';
import { ProfilePayload } from 'src/app/services/user/interfaces/profilePayload';
import { UserResponse } from 'src/app/services/user/interfaces/userResponse';

export enum AuthActionTypes {
  requestLogin = '[AuthRequest] requestLogin',
  requestLoginSuccess = '[AuthRequest] requestLoginSuccess',
  requestLoginFail = '[AuthRequest] requestLoginFail',
  requestRegister = '[AuthRequest] requestRegister',
  requestRegisterSuccess = '[AuthRequest] requestRegisterSuccess',
  requestRegisterFail = '[AuthRequest] requestRegisterFail',
  requestLogout = '[AuthRequest] requestLogout',
  requestLogoutSuccess = '[AuthRequest] requestLogoutSuccess',
  requestUser = '[UserRequest] requestUser',
  requestUserSuccess = '[UserRequest] requestUserSuccess',
  requestUserFail = '[UserRequest] requestUserFail',
  requestUpdatePassword = '[UserRequest] requestUpdatePassword',
  requestUpdatePasswordSuccess = '[UserRequest] requestUpdatePasswordSuccess',
  requestUpdatePasswordFail = '[UserRequest] requestUpdatePasswordFail',
  requestUpdateProfile = '[UserRequest] requestUpdateProfile',
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

export const requestUser = createAction(AuthActionTypes.requestUser);

export const requestUserSuccess = createAction(
  AuthActionTypes.requestUserSuccess,
  props<{ userResponse: UserResponse }>()
);

export const requestUserFail = createAction(AuthActionTypes.requestUserFail);

export const requestUpdatePassword = createAction(
  AuthActionTypes.requestUpdatePassword,
  props<{ passwordPayload: PasswordPayload }>()
);

export const requestUpdatePasswordSuccess = createAction(
  AuthActionTypes.requestUpdatePasswordSuccess
);

export const requestUpdatePasswordFail = createAction(
  AuthActionTypes.requestUpdatePasswordFail
);

export const requestUpdateProfile = createAction(
  AuthActionTypes.requestUpdateProfile,
  props<{ profilePayload: ProfilePayload }>()
);
