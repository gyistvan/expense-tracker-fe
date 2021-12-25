import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppStateFacade } from 'src/app/store/appStates/facade';

@Component({
  selector: 'app-month-switch',
  templateUrl: './month-switch.component.html',
  styleUrls: ['./month-switch.component.css'],
})
export class MonthSwitchComponent implements OnInit {
  public actualMonth: string = moment().toISOString();

  constructor(private appStateFacade: AppStateFacade) {}

  ngOnInit(): void {
    this.appStateFacade.showDate$.subscribe((endDate) => {
      this.actualMonth = moment(endDate).toISOString();
    });
  }

  public addOneMonth(): void {
    const showDate = moment(this.actualMonth)
      .add(1, 'month')
      .startOf('month')
      .toISOString();

    this.appStateFacade.changeDateInterval(showDate);
  }

  public subtractOneMonth(): void {
    const showDate = moment(this.actualMonth)
      .subtract(1, 'month')
      .startOf('month')
      .toISOString();

    this.appStateFacade.changeDateInterval(showDate);
  }

  public getPreviousMonth(): string {
    return `SHARED_COMPONENTS.MONTH_SWITCH.MONTHS.${moment(this.actualMonth)
      .subtract(1, 'month')
      .format('MMMM')
      .toUpperCase()}`;
  }

  public getNextMonth(): string {
    return `SHARED_COMPONENTS.MONTH_SWITCH.MONTHS.${moment(this.actualMonth)
      .add(1, 'month')
      .format('MMMM')
      .toUpperCase()}`;
  }
}
