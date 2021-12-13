import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import { Transaction } from './interfaces/transaction';
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

  public getAll(): Observable<Transaction[]> {
    return this.http.get<any[]>(BASE_URL + apiUrls.TRANSACTIONS.GET_ALL);
  }

  public delete(deleteAction: DeleteTransactionAction): Observable<any> {
    return this.http
      .delete<any>(BASE_URL + apiUrls.TRANSACTION.DELETE + deleteAction.id)
      .pipe(map(() => deleteAction.id));
  }

  public addNew(
    addTransactionAction: AddTransactionAction
  ): Observable<Transaction> {
    return this.http.post<Transaction>(
      BASE_URL + apiUrls.TRANSACTIONS.ADD_NEW,
      addTransactionAction.transactionPayload
    );
  }

  updateTransaction(updateTransactionAction: UpdateTransactionAction) {
    return this.http.put<Transaction>(
      BASE_URL + apiUrls.TRANSACTION.UPDATE + updateTransactionAction.id,
      updateTransactionAction.transaction
    );
  }
}
