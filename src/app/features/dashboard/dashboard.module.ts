import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualWeekComponent } from './actual-week/actual-week.component';
import { DashboardComponent } from './dashboard.component';
import { NewSpendingFormComponent } from './new-spending-form/new-spending-form.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NewIncomeFormComponent } from './new-income-form/new-income-form.component';
import { IncomesTableComponent } from './incomes-table/incomes-table.component';
import { MonthlyTransactionsComponent } from './monthly-transactions/monthly-transactions.component';
import { CategoryBoxComponent } from './monthly-spendings/category-box/category-box.component';
import { MontlySpendingsComponent } from './monthly-spendings/montly-spendings.component';
import { SavingFormComponent } from './saving-form/saving-form.component';

const COMPONENTS = [
  DashboardComponent,
  ActualWeekComponent,
  NewSpendingFormComponent,
  NewIncomeFormComponent,
  IncomesTableComponent,
  MonthlyTransactionsComponent,
  ActualWeekComponent,
  CategoryBoxComponent,
  MontlySpendingsComponent,
  SavingFormComponent,
];
const ROUTES = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
  ],
  declarations: COMPONENTS,
  exports: [...COMPONENTS, RouterModule],
})
export class DashboardModule {}
