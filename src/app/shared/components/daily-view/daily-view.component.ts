import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Income } from 'src/app/services/incomes/interfaces/income';
import { AppStateFacade } from 'src/app/store/appStates/facade';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';
import { Transaction } from '../../../services/transaction/interfaces/transaction';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.css'],
})
export class DailyViewComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  @Input()
  public displayedDate!: string;

  public filteredTransactions: Transaction[] = [];

  public isLoading = true;

  public incomes = this.incomeStateFacade.incomes$;
  public daysInInterval = this.appStateFacade.daysInInterval$;
  public monthlySaving = this.appStateFacade.monthlySaving$;

  public dailyResult = 0;
  public spendablePerDay = 0;

  constructor(
    private transactionStateFacade: TransactionStateFacade,
    private appStateFacade: AppStateFacade,
    private incomeStateFacade: IncomeStateFacade
  ) {}

  ngOnInit(): void {
    this.filterTransactions();
    this.transactionStateFacade.isTransactionsLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
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

  getTotalForDay(transactions: Transaction[]): number {
    return transactions.reduce(
      (acc: number, transaction: Transaction) => (acc += transaction.amount),
      0
    );
  }

  getSpendableMoneyPerDay(
    incomes: Income[] | null,
    transactions: Transaction[] | null,
    daysInInterval: number | null,
    monthlySaving: number | null
  ): number {
    if (incomes && daysInInterval && transactions) {
      const totalIncomes = incomes.reduce(
        (acc, income) => (acc += income.amount),
        0
      );
      const totalMonthlyTransactions = transactions
        .filter((transaction) => transaction.type === 'Monthly')
        .reduce((acc, transaction) => (acc += transaction.amount), 0);
      let spendableMoney =
        (totalIncomes - totalMonthlyTransactions) / daysInInterval;

      if (monthlySaving) {
        spendableMoney *= 1 - monthlySaving / 100;
      }
      this.spendablePerDay = Math.round(spendableMoney);
      return Math.round(spendableMoney);
    }
    return 0;
  }

  public createComponentName(displayedDate: string): string {
    return `${displayedDate}transactions`;
  }

  public isOverTenPercent(): boolean {
    return this.dailyResult > this.spendablePerDay * 0.1;
  }

  public isOverZeroAndBelowThanTenPercent(): boolean {
    return (
      this.dailyResult > 0 && this.dailyResult < this.spendablePerDay * 0.1
    );
  }

  public isBelowZero(): boolean {
    return this.dailyResult < 0;
  }
}
