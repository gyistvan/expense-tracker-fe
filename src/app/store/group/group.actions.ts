import { createAction, props } from '@ngrx/store';
import {
  Group,
  GroupInvitePayload,
  GroupPayload,
} from 'src/app/services/group/interfaces/group';
import { UserResponse } from 'src/app/services/user/interfaces/userResponse';

export enum GroupActionTypes {
  requestGroup = '[GroupRequest] requestGroup',
  requestGroupSuccess = '[GroupRequest] requestGroupSuccess',
  requestGroupFail = '[GroupRequest] requestGroupFail',
  requestCreateGroup = '[GroupRequest] requestCreateGroup',
  requestCreateGroupSuccess = '[GroupRequest] requestCreateGroupSuccess',
  requestCreateGroupFail = '[GroupRequest] requestCreateGroupFail',
  requestGroupInvite = '[GroupRequest] requestGroupInvite',
  requestGroupInviteSuccess = '[GroupRequest] requestGroupInviteSuccess',
  requestGroupInviteFail = '[GroupRequest] requestGroupInviteFail',
  requestAcceptInvite = '[GroupRequest] requestAcceptInvite',
  requestAcceptInviteSuccess = '[GroupRequest] requestAcceptInviteSuccess',
  requestAcceptInviteFail = '[GroupRequest] requestAcceptInviteFail',
}

export const requestGroup = createAction(
  GroupActionTypes.requestGroup,
  props<{ id: string }>()
);

export const requestGroupSuccess = createAction(
  GroupActionTypes.requestGroupSuccess,
  props<{ group: Group }>()
);

export const requestGroupFail = createAction(GroupActionTypes.requestGroupFail);

export const requestCreateGroup = createAction(
  GroupActionTypes.requestCreateGroup,
  props<{ groupPayload: GroupPayload }>()
);

export const requestCreateGroupSuccess = createAction(
  GroupActionTypes.requestCreateGroupSuccess,
  props<{ group: Group }>()
);

export const requestCreateGroupFail = createAction(
  GroupActionTypes.requestCreateGroupFail
);

export const requestGroupInvite = createAction(
  GroupActionTypes.requestGroupInvite,
  props<{ groupInvitePayload: GroupInvitePayload; id: string }>()
);

export const requestGroupInviteSuccess = createAction(
  GroupActionTypes.requestGroupInviteSuccess,
  props<{ group: Group }>()
);

export const requestGroupInviteFail = createAction(
  GroupActionTypes.requestGroupInviteFail
);

export const requestAcceptInvite = createAction(
  GroupActionTypes.requestAcceptInvite,
  props<{ id: string }>()
);

export const requestAcceptInviteSuccess = createAction(
  GroupActionTypes.requestAcceptInviteSuccess,
  props<{ group: Group }>()
);

export const requestAcceptInviteFail = createAction(
  GroupActionTypes.requestAcceptInviteFail
);
