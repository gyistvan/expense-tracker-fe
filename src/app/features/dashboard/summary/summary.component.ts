import { Component, OnInit } from '@angular/core';
import { AppStateFacade } from 'src/app/store/appStates/facade';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public totalIncomes = 0;
  public totalSpendings = 0;
  public saving: null | number = 0;
  public savingTotal = 0;
  public remainder = 0;

  constructor(
    private appStateFacade: AppStateFacade,
    private incomeStateFacade: IncomeStateFacade,
    private transactionStateFacade: TransactionStateFacade
  ) {}

  ngOnInit(): void {
    this.getTotalSpending();
    this.getTotalIncome();
    this.getSaving();
  }

  private getTotalSpending(): void {
    this.transactionStateFacade.transactions$.subscribe((transactions) => {
      this.totalSpendings = transactions.reduce(
        (total, transaction) => (total += transaction.amount),
        0
      );
      this.calcRemainder();
    });
  }

  private getTotalIncome(): void {
    this.incomeStateFacade.incomes$.subscribe((incomes) => {
      this.totalIncomes = incomes.reduce(
        (total, income) => (total += income.amount),
        0
      );
      this.calculateSaving();
      this.calcRemainder();
    });
  }

  private getSaving(): void {
    this.appStateFacade.monthlySaving$.subscribe((saving) => {
      this.saving = saving;
      this.calculateSaving();
      this.calcRemainder();
    });
  }

  private calculateSaving(): void {
    this.savingTotal = this.saving
      ? Math.round(this.totalIncomes * (this.saving / 100))
      : 0;
  }

  private calcRemainder(): void {
    this.remainder = Math.round(
      this.totalIncomes - this.totalSpendings - this.savingTotal
    );
  }
}
