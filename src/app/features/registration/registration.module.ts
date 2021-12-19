import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const ROUTES = [{ path: '', component: RegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent, RouterModule],
})
export class RegistrationModule {}
