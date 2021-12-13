import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/services/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionStateFacade } from 'src/app/store/transactions/facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public transactions: Observable<Transaction[]> =
    this.transactionStateFacade.transactions$;

  public showAddNewForm = false;

  constructor(private transactionStateFacade: TransactionStateFacade) {
    this.transactionStateFacade.getTransactions();
  }

  public changeShowAddNewForm(): void {
    this.showAddNewForm = !this.showAddNewForm;
  }

  public closeForm(formState: boolean): void {
    this.showAddNewForm = formState;
  }
}
