import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/services/group/interfaces/group';
import { requestUser, requestUserSuccess } from '../auth/auth.actions';
import {
  GroupActionTypes,
  requestAcceptInviteFail,
  requestAcceptInviteSuccess,
  requestCreateGroupFail,
  requestCreateGroupSuccess,
  requestGroupFail,
  requestGroupInviteFail,
  requestGroupInviteSuccess,
  requestGroupSuccess,
} from './group.actions';

@Injectable()
export class GroupEffects {
  getGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActionTypes.requestGroup),
      mergeMap(({ id }) =>
        this.groupService.get(id).pipe(
          map((group: Group) => {
            return requestGroupSuccess({ group });
          }),
          catchError((err) => {
            return of(requestGroupFail());
          })
        )
      )
    )
  );

  createGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActionTypes.requestCreateGroup),
      mergeMap(({ groupPayload }) =>
        this.groupService.createGroup(groupPayload).pipe(
          map((group: Group) => {
            return requestCreateGroupSuccess({ group });
          }),
          catchError((err) => {
            return of(requestCreateGroupFail());
          })
        )
      )
    )
  );

  inviteGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActionTypes.requestGroupInvite),
      mergeMap(({ groupInvitePayload, id }) =>
        this.groupService.groupInvite(groupInvitePayload, id).pipe(
          map((group: Group) => {
            return requestGroupInviteSuccess({ group });
          }),
          catchError((err) => {
            return of(requestGroupInviteFail());
          })
        )
      )
    )
  );

  acceptInvite$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActionTypes.requestAcceptInvite),
      mergeMap(({ id }) =>
        this.groupService.acceptInvite(id).pipe(
          map(({ group }) => {
            requestUser();
            return requestAcceptInviteSuccess({ group });
          }),
          catchError((err) => {
            return of(requestAcceptInviteFail());
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private groupService: GroupService) {}
}
