import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import { Saving, SavingPayload } from './interfaces/saving';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private http: HttpClient) {}

  public get(requestUrl: string): Observable<Saving[]> {
    return this.http.get<Saving[]>(
      BASE_URL + apiUrls.APP_STATE.GET + requestUrl
    );
  }

  public add(savingPayload: SavingPayload): Observable<Saving> {
    return this.http.post<Saving>(
      BASE_URL + apiUrls.APP_STATE.ADD,
      savingPayload
    );
  }

  public update(savingPayload: SavingPayload): Observable<Saving> {
    return this.http.put<Saving>(
      BASE_URL + apiUrls.APP_STATE.ADD,
      savingPayload
    );
  }
}
