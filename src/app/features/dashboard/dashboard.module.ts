import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualWeekComponent } from './actual-week/actual-week.component';
import { DashboardComponent } from './dashboard.component';
import { IncomesTableComponent } from './incomes-table/incomes-table.component';
import { MonthlyTransactionsComponent } from './monthly-transactions/monthly-transactions.component';
import { CategoryBoxComponent } from './monthly-spendings/category-box/category-box.component';
import { MontlySpendingsComponent } from './monthly-spendings/montly-spendings.component';
import { SavingFormComponent } from './summary/saving-form/saving-form.component';
import { SummaryComponent } from './summary/summary.component';

const COMPONENTS = [
  DashboardComponent,
  ActualWeekComponent,
  IncomesTableComponent,
  MonthlyTransactionsComponent,
  ActualWeekComponent,
  CategoryBoxComponent,
  MontlySpendingsComponent,
  SavingFormComponent,
  SummaryComponent,
];
const ROUTES = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
  exports: [...COMPONENTS, RouterModule],
})
export class DashboardModule {}
