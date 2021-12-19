import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import {
  LoginPayload,
  RegistrationPayload,
} from 'src/app/services/auth/interfaces/payloads';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { PasswordPayload } from 'src/app/services/user/interfaces/passwordPayload';
import { ProfilePayload } from 'src/app/services/user/interfaces/profilePayload';
import { State } from 'src/app/store';
import {
  requestLogin,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestRegister,
  requestUpdatePassword,
  requestUpdateProfile,
  requestUser,
} from './auth.actions';
import {
  getLoginErrorMessage,
  getRegistrationErrorMessage,
  getToken,
  getUserEmail,
  getUserGroupId,
  getUserName,
  isUserAuthorized,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  public isUserAuthorized$ = this.store.pipe(select(isUserAuthorized));
  public getToken$ = this.store.pipe(select(getToken));
  public getUserName$ = this.store.pipe(select(getUserName));
  public getUserEmail$ = this.store.pipe(select(getUserEmail));
  public getUesrGroupId$ = this.store.pipe(select(getUserGroupId));
  public getLoginErrorMessage$ = this.store.pipe(select(getLoginErrorMessage));
  public getRegistrationErrorMessage$ = this.store.pipe(
    select(getRegistrationErrorMessage)
  );
  public userName?: string | null;
  public userEmail?: string | null;
  public userGroupId?: string | null;

  constructor(
    private store: Store<State>,
    private sessionStorageService: SessionStorageService
  ) {
    this.getUserName$.subscribe((userName) => (this.userName = userName));
    this.getUserEmail$.subscribe((userEmail) => (this.userEmail = userEmail));
    this.getUesrGroupId$.subscribe(
      (userGroupId) => (this.userGroupId = userGroupId)
    );
    let token = this.sessionStorageService.getToken('bearerToken');
    if (token) {
      this.store.dispatch(requestLoginSuccess({ token }));
    }
  }

  public login(loginPayload: LoginPayload): void {
    this.store.dispatch(requestLogin(loginPayload));
  }

  public register(registrationPayload: RegistrationPayload): void {
    this.store.dispatch(requestRegister(registrationPayload));
  }

  public logout(): void {
    this.store.dispatch(requestLogout());
  }

  public closeSession(): void {
    this.store.dispatch(requestLogoutSuccess());
  }

  public getUser(): void {
    this.store.dispatch(requestUser());
  }

  public updatePassword(passwordPayload: PasswordPayload): void {
    this.store.dispatch(requestUpdatePassword({ passwordPayload }));
  }

  public updateProfile(profilePayload: ProfilePayload): void {
    console.log('fdsafdsafdsafdsfdsads23122112321');
    this.store.dispatch(requestUpdateProfile({ profilePayload }));
  }
}
