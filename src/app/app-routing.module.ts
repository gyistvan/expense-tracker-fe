/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  /*{
    path: 'login',
    loadChildren: (): Promise<any> => import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: (): Promise<any> =>
      import('./features/registration/registration.module').then((m) => m.RegistrationModule),
  },*/
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
