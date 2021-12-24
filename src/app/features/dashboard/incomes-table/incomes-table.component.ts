import { Component, Input, OnInit } from '@angular/core';
import { Income } from 'src/app/services/incomes/interfaces/income';
import { IncomeStateFacade } from 'src/app/store/incomes/facade';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.css'],
})
export class IncomesTableComponent implements OnInit {
  @Input()
  public incomes: Income[] | null = [];
  public total = 0;
  public isLoading = true;

  constructor(private incomeStateFacade: IncomeStateFacade) {}

  ngOnInit(): void {
    this.incomeStateFacade.total$.subscribe((total) => (this.total = total));
    this.incomeStateFacade.isIncomesLoading$.subscribe(
      (isIncomesLoading) => (this.isLoading = isIncomesLoading)
    );
  }

  public deleteIncome(id: string) {
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
