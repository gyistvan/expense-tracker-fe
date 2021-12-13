import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualWeekComponent } from './actual-week/actual-week.component';
import { DailyViewComponent } from './actual-week/daily-view/daily-view.component';
import { DashboardComponent } from './dashboard.component';
import { NewSpendingFormComponent } from './new-spending-form/new-spending-form.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { MontlySpendingsComponent } from './montly-spendings/montly-spendings.component';
import { CategoryBoxComponent } from './montly-spendings/category-box/category-box.component';

const COMPONENTS = [
  DashboardComponent,
  DailyViewComponent,
  ActualWeekComponent,
  NewSpendingFormComponent,
  MontlySpendingsComponent,
  CategoryBoxComponent,
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
