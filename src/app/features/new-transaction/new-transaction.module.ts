/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTransactionComponent } from './new-transaction.component';

const COMPONENTS = [NewTransactionComponent];
const ROUTES = [{ path: '', component: NewTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule, CommonModule],
  declarations: COMPONENTS,
  exports: [...COMPONENTS, RouterModule],
})
export class NewTransactionModule {}
