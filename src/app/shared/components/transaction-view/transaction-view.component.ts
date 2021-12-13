import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css'],
})
export class TransactionViewComponent implements OnInit {
  @Input()
  public transaction?: Transaction;
  public isToday =
    moment().startOf('day').format() ===
    moment(this.transaction?.createdAt).startOf('day').format();
  constructor(private transactionStateFacade: TransactionStateFacade) {}

  ngOnInit(): void {}

  public onDelete(id: string): void {
    this.transactionStateFacade.deleteTransaction(id);
  }

  public updateTransaction(t: Transaction): void {
    let transaction = { ...t, isPaid: true };
    this.transactionStateFacade.updateTransaction(t._id, transaction);
  }
}
