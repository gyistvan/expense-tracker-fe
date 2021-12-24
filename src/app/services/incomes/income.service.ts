import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import { Income, IncomeResponse } from './interfaces/income';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  public getAll(requestUrl: string): Observable<Income[]> {
    return this.http.get<Income[]>(
      BASE_URL + apiUrls.INCOMES.GET_ALL + requestUrl
    );
  }

  public addNew(addIncomeAction: any): Observable<IncomeResponse> {
    return this.http.post<IncomeResponse>(
      BASE_URL + apiUrls.INCOMES.ADD_NEW,
      addIncomeAction.incomePayload
    );
  }

  public deleteIncome(id: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + apiUrls.INCOME.DELETE + id);
  }
}
