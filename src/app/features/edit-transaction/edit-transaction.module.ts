/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EditTransactionComponent } from './edit-transaction.component';

const ROUTES = [
  { path: ':transactionId', component: EditTransactionComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditTransactionComponent],
  exports: [EditTransactionComponent, RouterModule],
  providers: [DatePipe],
})
export class EditTransactionModule {}
