import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './guards/authorized.guard';
import { NotAuthorizedGuard } from './guards/not-authorized.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: (): Promise<any> =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: (): Promise<any> =>
      import('./features/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'profile',
    loadChildren: (): Promise<any> =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'new-transaction',
    loadChildren: (): Promise<any> =>
      import('./features/new-transaction/new-transaction.module').then(
        (m) => m.NewTransactionModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'edit-income',
    loadChildren: (): Promise<any> =>
      import('./features/edit-income/edit-income.module').then(
        (m) => m.EditIncomeModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'edit-transaction',
    loadChildren: (): Promise<any> =>
      import('./features/edit-transaction/edit-transaction.module').then(
        (m) => m.EditTransactionModule
      ),
    canLoad: [AuthorizedGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
