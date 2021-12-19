import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { AppStateFacade } from 'src/app/store/appStates/facade';

@Component({
  selector: 'app-actual-week',
  templateUrl: './actual-week.component.html',
  styleUrls: ['./actual-week.component.css'],
})
export class ActualWeekComponent implements OnInit {
  @Input()
  public transactions: Observable<Transaction[]> = of([]);

  @Input()
  public actualWeek: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
