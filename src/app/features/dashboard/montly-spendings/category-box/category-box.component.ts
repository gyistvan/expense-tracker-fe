import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';

const DEFAULT_SHOW_AMOUNT = 2;

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

  public showAmount = DEFAULT_SHOW_AMOUNT;

  public total = 0;

  constructor() {}

  ngOnChanges(): void {
    this.total = this.countTotal();
  }

  showMore(): void {
    this.showAmount += 2;
  }

  countTotal(): number {
    return this.transactions.reduce(
      (total: number, transaction: Transaction) =>
        (total = total + transaction.amount),
      0
    );
  }
}
