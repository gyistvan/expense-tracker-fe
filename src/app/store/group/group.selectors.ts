import { createSelector } from '@ngrx/store';
import { State } from '../../store/index';
import { GroupState } from './group.reducer';

export const selectGroupState = (state: State) => state.groupState;

export const getGroupName = createSelector(
  selectGroupState,
  (state: GroupState) => state.name
);

export const getGroupId = createSelector(
  selectGroupState,
  (state: GroupState) => state.groupId
);

export const getGroupMembers = createSelector(
  selectGroupState,
  (state: GroupState) => state.members
);

export const getInvitedMembers = createSelector(
  selectGroupState,
  (state: GroupState) => state.invited
);
