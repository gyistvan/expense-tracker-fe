import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MONTHLY_USED_FOR_OPTIONS } from 'src/app/constants';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';

@Component({
  selector: 'app-montly-spendings',
  templateUrl: './montly-spendings.component.html',
  styleUrls: ['./montly-spendings.component.css'],
})
export class MontlySpendingsComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  public filteredTransactions: Transaction[] = [];

  public categoryNames = MONTHLY_USED_FOR_OPTIONS;

  constructor() {}

  ngOnInit(): void {
    this.getFilteredTransactions();
  }

  isMonthlyTransaction(type: string): boolean {
    return type === 'Monthly';
  }

  isSameUsage(usedFor: string, transactionUsedFor: string): boolean {
    return usedFor === transactionUsedFor;
  }

  getFilteredTransactions(): void {
    this.transactions.subscribe((transactions) => {
      this.filteredTransactions = transactions.filter((transaction) =>
        this.isMonthlyTransaction(transaction.type)
      );
    });
  }

  getFilteredTransactionsByUsage(usedFor: string): Transaction[] {
    return this.filteredTransactions.filter((transaction) =>
      this.isSameUsage(usedFor, transaction.usedFor)
    );
  }
}
