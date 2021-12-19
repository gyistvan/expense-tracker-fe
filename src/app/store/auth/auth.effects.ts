import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginResponse } from 'src/app/services/auth/interfaces/responses';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { PasswordPayload } from 'src/app/services/user/interfaces/passwordPayload';
import { ProfilePayload } from 'src/app/services/user/interfaces/profilePayload';
import { UserResponse } from 'src/app/services/user/interfaces/userResponse';
import { UserService } from 'src/app/services/user/user.service';
import {
  AuthActionTypes,
  requestLoginFail,
  requestLoginSuccess,
  requestLogoutSuccess,
  requestRegisterFail,
  requestRegisterSuccess,
  requestUpdatePasswordSuccess,
  requestUserFail,
  requestUserSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestLogin),
      mergeMap((loginPayload) =>
        this.authService.login(loginPayload).pipe(
          map((loginResponse: LoginResponse) => {
            this.router.navigate(['/dashboard']);
            this.sessionStorageService.setToken(
              'bearerToken',
              loginResponse.token
            );
            return requestLoginSuccess(loginResponse);
          }),
          catchError((err) => {
            return of(requestLoginFail({ error: err }));
          })
        )
      )
    )
  );

  register$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestRegister),
      mergeMap((id) =>
        this.authService.register(id).pipe(
          map((msg) => {
            this.router.navigate(['/login']);
            return requestRegisterSuccess({ msg });
          }),
          catchError((err) => {
            return of(requestRegisterFail({ error: err }));
          })
        )
      )
    )
  );

  logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestLogout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.sessionStorageService.deleteToken('bearerToken');
            this.router.navigate(['/login']);
            return requestLogoutSuccess();
          })
        )
      )
    )
  );

  getUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestUser, AuthActionTypes.requestLoginSuccess),
      mergeMap(() =>
        this.userService.get().pipe(
          map((userResponse: UserResponse) => {
            return requestUserSuccess({ userResponse });
          }),
          catchError((err) => {
            return of(requestUserFail());
          })
        )
      )
    )
  );

  updatePassword$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestUpdatePassword),
      mergeMap((passwordAction: { passwordPayload: PasswordPayload }) =>
        this.userService.updatePassword(passwordAction.passwordPayload).pipe(
          map(() => {
            return requestUpdatePasswordSuccess();
          })
        )
      )
    )
  );

  updateProfile$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.requestUpdateProfile),
      mergeMap((profileAction: { profilePayload: ProfilePayload }) =>
        this.userService.updateProfile(profileAction.profilePayload).pipe(
          map((userResponse: UserResponse) => {
            return requestUserSuccess({ userResponse });
          }),
          catchError((err) => {
            return of(requestUserFail());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}
}
