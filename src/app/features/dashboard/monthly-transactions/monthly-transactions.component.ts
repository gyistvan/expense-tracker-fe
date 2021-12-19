import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { AppStateFacade } from 'src/app/store/appStates/facade';

@Component({
  selector: 'app-monthly-transactions',
  templateUrl: './monthly-transactions.component.html',
  styleUrls: ['./monthly-transactions.component.css'],
})
export class MonthlyTransactionsComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  public showDate: string = moment().toISOString();
  public daysInInterval = this.appStateFacade.daysInInterval$;

  constructor(private appStateFacade: AppStateFacade) {}

  ngOnInit(): void {
    this.appStateFacade.showDate$.subscribe(
      (showDate) => (this.showDate = showDate)
    );
  }

  getMonth(daysInInterval: number | null): string[] {
    const currentDate = moment(this.showDate);
    const monthStart = currentDate.clone().startOf('month');
    const days = [];

    for (let i = 0; daysInInterval ? i < daysInInterval : i < 31; i++) {
      days.push(moment(monthStart).clone().add(i, 'days').format());
    }

    return days;
  }
}
