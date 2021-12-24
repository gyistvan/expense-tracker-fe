import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  GroupInvitePayload,
  GroupPayload,
} from 'src/app/services/group/interfaces/group';
import { State } from 'src/app/store';
import {
  requestAcceptInvite,
  requestCreateGroup,
  requestGroup,
  requestGroupInvite,
} from './group.actions';
import {
  getGroupId,
  getGroupMembers,
  getGroupName,
  getInvitedMembers,
} from './group.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupStateFacade {
  public groupId$ = this.store.pipe(select(getGroupId));
  public groupMembers$ = this.store.pipe(select(getGroupMembers));
  public groupName$ = this.store.pipe(select(getGroupName));
  public groupInvitedMembers$ = this.store.pipe(select(getInvitedMembers));

  constructor(private store: Store<State>) {}

  public getGroup(id: string): void {
    this.store.dispatch(requestGroup({ id }));
  }

  public createGroup(groupPayload: GroupPayload): void {
    this.store.dispatch(requestCreateGroup({ groupPayload }));
  }

  public inviteMember(
    groupInvitePayload: GroupInvitePayload,
    id: string
  ): void {
    this.store.dispatch(requestGroupInvite({ groupInvitePayload, id }));
  }

  acceptGroupInvite(id: string): void {
    this.store.dispatch(requestAcceptInvite({ id }));
  }
}
