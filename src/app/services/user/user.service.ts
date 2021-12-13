import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from 'src/app/apiUrls';
import { UserResponse } from './interfaces/userResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public get(): Observable<UserResponse> {
    return this.http.get<UserResponse>(BASE_URL + apiUrls.USER.me);
  }
}
