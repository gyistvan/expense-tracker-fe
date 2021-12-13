import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';
import { Transaction } from '../../../../services/transaction/interfaces/transaction';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.css'],
})
export class DailyViewComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  @Input()
  public displayedDate?: string;

  public filteredTransactions: Transaction[] = [];

  public isLoading = this.transactionStateFacade.isTransactionsLoading$;

  constructor(private transactionStateFacade: TransactionStateFacade) {}

  ngOnInit(): void {
    this.filterTransactions();
  }

  isSameDay(day: string): boolean {
    return moment(day).startOf('day').format() === this.displayedDate;
  }

  isDailyTransaction(type: string): boolean {
    return type === 'Daily';
  }

  filterTransactions(): void {
    this.transactions.subscribe((transactions) => {
      const filteredTransactions = transactions.filter(
        (transaction) =>
          this.isSameDay(transaction.spentAt) &&
          this.isDailyTransaction(transaction.type)
      );
      this.filteredTransactions = filteredTransactions;
    });
  }
}
