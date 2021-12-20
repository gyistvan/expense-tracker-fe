import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css'],
})
export class CategoryBoxComponent {
  @Input()
  public categoryName!: string;

  @Input()
  public transactions: Transaction[] = [];

  public total = 0;

  constructor() {}

  ngOnChanges(): void {
    this.total = this.countTotal();
  }

  public countTotal(): number {
    return this.transactions.reduce(
      (total: number, transaction: Transaction) =>
        (total = total + transaction.amount),
      0
    );
  }
}
