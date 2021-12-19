import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrls, BASE_URL } from 'src/apiUrls';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { LoginPayload, RegistrationPayload } from './interfaces/payloads';
import { LoginResponse, RegistrationResponse } from './interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorised$$ = new BehaviorSubject(false);
  public isAuthorised$ = this.isAuthorised$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.getLoginState();
  }

  private getLoginState(): void {
    let token = this.sessionStorageService.getToken('bearerToken');
    if (token) {
      this.isAuthorised$$.next(true);
    }
  }

  public login(loginPayload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      BASE_URL + apiUrls.AUTH.LOGIN,
      loginPayload
    );
  }

  public register(registrationData: RegistrationPayload): Observable<string> {
    return this.http
      .post<RegistrationResponse>(
        BASE_URL + apiUrls.AUTH.REGISTER,
        registrationData
      )
      .pipe(map(() => 'Registration successful'));
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(BASE_URL + apiUrls.AUTH.LOGOUT);
  }
}
