import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import { TransactionResponse, Transaction } from './interfaces/transaction';
import { map } from 'rxjs/operators';
import {
  AddTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
} from 'src/app/store/transactions/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  public getAll(requestUrl: string): Observable<Transaction[]> {
    return this.http.get<any[]>(
      BASE_URL + apiUrls.TRANSACTIONS.GET_ALL + requestUrl
    );
  }

  public delete(deleteAction: DeleteTransactionAction): Observable<string> {
    return this.http
      .delete<string>(BASE_URL + apiUrls.TRANSACTION.DELETE + deleteAction.id)
      .pipe(map(() => deleteAction.id));
  }

  public addNew(
    addTransactionAction: AddTransactionAction
  ): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      BASE_URL + apiUrls.TRANSACTIONS.ADD_NEW,
      addTransactionAction.transactionPayload
    );
  }

  updateTransaction(
    updateTransactionAction: UpdateTransactionAction
  ): Observable<TransactionResponse> {
    return this.http.put<TransactionResponse>(
      BASE_URL + apiUrls.TRANSACTION.UPDATE + updateTransactionAction.id,
      updateTransactionAction.transaction
    );
  }
}
