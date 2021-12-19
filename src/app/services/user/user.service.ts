import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from 'src/apiUrls';
import { PasswordPayload } from './interfaces/passwordPayload';
import { ProfilePayload } from './interfaces/profilePayload';
import { UserResponse } from './interfaces/userResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public get(): Observable<UserResponse> {
    return this.http.get<UserResponse>(BASE_URL + apiUrls.USER.ME);
  }

  public updatePassword(passwordPayload: PasswordPayload): Observable<any> {
    return this.http.put<any>(
      BASE_URL + apiUrls.USER.UPDATE_PASSWORD,
      passwordPayload
    );
  }
  public updateProfile(profilePayload: ProfilePayload): Observable<any> {
    return this.http.put<any>(
      BASE_URL + apiUrls.USER.UPDATE_PROFILE,
      profilePayload
    );
  }
}
