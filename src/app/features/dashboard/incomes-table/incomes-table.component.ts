import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Income } from 'src/app/services/incomes/interfaces/income';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.css'],
})
export class IncomesTableComponent implements OnInit {
  @Input()
  incomes: Income[] | null = [];
  total = 0;

  constructor(private incomeStateFacade: IncomeStateFacade) {}

  ngOnInit(): void {
    this.incomeStateFacade.total$.subscribe((total) => (this.total = total));
  }

  deleteIncome(id: string) {
    if (
      confirm(
        `Are you sure to delete: ${this.getIncome(id).whose} - ${
          this.getIncome(id).amount
        }`
      )
    )
      this.incomeStateFacade.deleteIncome(id);
  }

  private getIncome(id: string): Income {
    return this.incomes!.find((income: Income) => income._id === id)!;
  }
}
