import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  LoginPayload,
  RegistrationPayload,
} from 'src/app/services/auth/interfaces/payloads';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { State } from 'src/app/store';
import {
  requestLogin,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestRegister,
} from './auth.actions';
import {
  getLoginErrorMessage,
  getRegistrationErrorMessage,
  getToken,
  isUserAuthorized,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  public isUserAuthorized$ = this.store.pipe(select(isUserAuthorized));
  public getToken$ = this.store.pipe(select(getToken));
  public getLoginErrorMessage$ = this.store.pipe(select(getLoginErrorMessage));
  public getRegistrationErrorMessage$ = this.store.pipe(
    select(getRegistrationErrorMessage)
  );

  constructor(
    private store: Store<State>,
    private sessionStorageService: SessionStorageService
  ) {
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

  /*  public setAuthorization(): void {
    this.store.dispatch(
      requestLoginSuccess({ token: sessionStorage.getToken("bearerToken") })
    );
  }*/
}
