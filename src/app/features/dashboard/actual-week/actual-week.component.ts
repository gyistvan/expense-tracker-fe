import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';

@Component({
  selector: 'app-actual-week',
  templateUrl: './actual-week.component.html',
  styleUrls: ['./actual-week.component.css'],
})
export class ActualWeekComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  public actualWeek: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.actualWeek = this.getCurrentWeek();
  }

  getCurrentWeek(): string[] {
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('isoWeek');
    const days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format());
    }

    return days;
  }
}
