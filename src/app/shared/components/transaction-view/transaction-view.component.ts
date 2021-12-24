import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import * as moment from 'moment';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css'],
})
export class TransactionViewComponent implements OnInit {
  @Input()
  public index = 0;
  @Input()
  public transaction!: Transaction;
  public isToday =
    moment().startOf('day').format() ===
    moment(this.transaction?.createdAt).startOf('day').format();
  constructor(private transactionStateFacade: TransactionStateFacade) {}

  ngOnInit(): void {}

  public onDelete(id: string): void {
    if (
      confirm(
        `Ąre you sure to delete: ${this.transaction.usedFor} - ${this.transaction.amount}`
      )
    ) {
      this.transactionStateFacade.deleteTransaction(id);
    }
  }

  public updateTransaction(t: Transaction, isPaid: boolean): void {
    let transaction = { ...t, isPaid };
    this.transactionStateFacade.updateTransaction(t._id, transaction);
  }

  public isDailyTransaction(t: Transaction): boolean {
    return t.type === 'Daily';
  }

  public getIconName(t: Transaction): IconName {
    return t.usedFor === 'Food'
      ? ('hamburger' as IconName)
      : t.usedFor === 'Smoke'
      ? ('smoking' as IconName)
      : ('pills' as IconName);
  }
}
