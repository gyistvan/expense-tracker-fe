import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import { map } from 'rxjs/operators';
import { Income } from './interfaces/income';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}
  /*
  public getAll(): Observable<Income[]> {
    return this.http.get<any[]>(BASE_URL + apiUrls.IncomeS.GET_ALL);
  }*/

  public addNew(addIncomeAction: any): Observable<Income> {
    return this.http.post<Income>(
      BASE_URL + apiUrls.INCOMES.ADD_NEW,
      addIncomeAction.IncomePayload
    );
  }
}
