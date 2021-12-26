/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { InviteMemberFormComponent } from './manage-group/invite-member-form/invite-member-form.component';
import { PendingInvitesComponent } from './pending-invites/pending-invites.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

const COMPONENTS = [
  ProfileComponent,
  CreateGroupFormComponent,
  ManageGroupComponent,
  InviteMemberFormComponent,
  PendingInvitesComponent,
  ProfileFormComponent,
  ChangePasswordFormComponent,
];
const ROUTES = [{ path: '', component: ProfileComponent }];

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
export class ProfileModule {}
