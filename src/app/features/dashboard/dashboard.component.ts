import { Component } from '@angular/core';
import * as moment from 'moment';
import { forkJoin, Observable } from 'rxjs';
import { Income } from 'src/app/services/incomes/interfaces/income';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { AppStateFacade } from 'src/app/store/appStates/facade';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public transactions: Observable<Transaction[]> =
    this.transactionStateFacade.transactions$;

  public incomes: Observable<Income[]> = this.incomeStateFacade.incomes$;
  private showDate: string = moment().format();
  public showAddNewTransactionForm = false;
  public showAddNewIncomeForm = false;
  public monthlySaving = this.appStateFacade.monthlySaving$;

  constructor(
    private transactionStateFacade: TransactionStateFacade,
    private incomeStateFacade: IncomeStateFacade,
    private appStateFacade: AppStateFacade
  ) {}

  ngOnInit(): void {
    this.appStateFacade.showDate$.subscribe((showDate) => {
      this.transactionStateFacade.getTransactions(
        this.createRequestUrl(showDate)
      );
      this.showDate = showDate;
      this.incomeStateFacade.getIncomes(this.createRequestUrl(showDate));
      this.appStateFacade.getMonthlySaving(this.createRequestUrl(showDate));
    });
  }

  private createRequestUrl(showDate: string = moment().toISOString()): string {
    const startDate = moment(showDate).startOf('month').toISOString();
    const endDate = moment(showDate).endOf('month').toISOString();
    return `?startDate=${startDate}&endDate=${endDate}`;
  }

  public changeShowAddNewTransactionForm(): void {
    this.showAddNewTransactionForm = !this.showAddNewTransactionForm;
  }

  public changeShowAddNewIncomeForm(): void {
    this.showAddNewIncomeForm = !this.showAddNewIncomeForm;
  }

  public closeAddTransactionForm(formState: boolean): void {
    this.showAddNewTransactionForm = formState;
  }
  public closeAddIncomeForm(formState: boolean): void {
    this.showAddNewIncomeForm = formState;
  }

  public getCurrentWeek(): string[] {
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('isoWeek');
    const days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format());
    }

    return days;
  }

  public isInDisplayedMonth(): boolean {
    const startDate = moment(this.showDate).startOf('month');
    const endDate = moment(this.showDate).endOf('month');

    const curretWeekDays = this.getCurrentWeek();

    return curretWeekDays.some((weekDay) =>
      moment(weekDay).isBetween(startDate, endDate)
    );
  }
}
