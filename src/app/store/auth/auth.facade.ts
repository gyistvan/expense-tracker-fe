import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
  LoginPayload,
  RegistrationPayload,
} from 'src/app/services/auth/interfaces/payloads';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { PasswordPayload } from 'src/app/services/user/interfaces/passwordPayload';
import { ProfilePayload } from 'src/app/services/user/interfaces/profilePayload';
import { State } from 'src/app/store';
import { GroupStateFacade } from '../group/group.facade';
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
  getUserPendingInvites,
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
  public getUserGroupId$ = this.store.pipe(select(getUserGroupId));
  public getUserPendingInvites$ = this.store.pipe(
    select(getUserPendingInvites)
  );
  public getLoginErrorMessage$ = this.store.pipe(select(getLoginErrorMessage));
  public getRegistrationErrorMessage$ = this.store.pipe(
    select(getRegistrationErrorMessage)
  );
  public userName: BehaviorSubject<any> = new BehaviorSubject(null);
  public userEmail: BehaviorSubject<any> = new BehaviorSubject(null);
  public userGroupId: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private store: Store<State>,
    private sessionStorageService: SessionStorageService,
    private groupStateFacade: GroupStateFacade
  ) {
    this.getUserName$.subscribe((userName) => this.userName.next(userName));
    this.getUserEmail$.subscribe((userEmail) => this.userEmail.next(userEmail));
    this.getUserGroupId$.subscribe((userGroupId) => {
      this.userGroupId.next(userGroupId);
      if (userGroupId) {
        this.groupStateFacade.getGroup(userGroupId);
      }
    });
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
    this.store.dispatch(requestUpdateProfile({ profilePayload }));
  }
}
