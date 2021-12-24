import { Action, createReducer, on } from '@ngrx/store';
import { GroupMember } from 'src/app/services/group/interfaces/group';
import {
  requestAcceptInviteSuccess,
  requestCreateGroupSuccess,
  requestGroup,
  requestGroupFail,
  requestGroupInviteSuccess,
  requestGroupSuccess,
} from './group.actions';

export type GroupState = {
  name?: string;
  groupId?: string;
  members: GroupMember[];
  invited: Record<string, string>;
};

const initialState: GroupState = {
  name: undefined,
  groupId: undefined,
  members: [],
  invited: {},
};

export const groupDataReducer = createReducer(
  initialState,
  on(requestGroup, (state) => state),
  on(requestGroupSuccess, (state, { group }) => ({
    ...state,
    name: group?.name,
    groupId: group?.groupId,
    members: group?.members,
    invited: group?.invited,
  })),
  on(requestGroupFail, (state) => ({
    ...state,
  })),
  on(requestCreateGroupSuccess, (state, { group }) => ({
    ...state,
    name: group.name,
    groupId: group.groupId,
    members: group.members,
    invited: group.invited,
  })),
  on(requestGroupInviteSuccess, (state, { group }) => ({
    ...state,
    invited: group.invited,
  })),
  on(requestAcceptInviteSuccess, (state, { group }) => ({
    ...state,
    name: group.name,
    groupId: group.groupId,
    members: group.members,
    invited: group.invited,
  }))
);

export const groupReducer = (state: GroupState | undefined, action: Action) =>
  groupDataReducer(state, action);
