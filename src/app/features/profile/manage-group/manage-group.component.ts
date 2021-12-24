import { Component, OnInit } from '@angular/core';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';
import { GroupStateFacade } from 'src/app/store/group/group.facade';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css'],
})
export class ManageGroupComponent implements OnInit {
  public groupId = this.groupStateFacade.groupId$;
  public groupName = this.groupStateFacade.groupName$;
  public groupMembers = this.groupStateFacade.groupMembers$;
  public invitedMembers: string[] = [];
  public groupInvitedMembers = this.groupStateFacade.groupInvitedMembers$;

  constructor(
    private groupStateFacade: GroupStateFacade,
    private authStateFacade: AuthStateFacade
  ) {
    this.groupStateFacade.groupInvitedMembers$.subscribe((invitedMembers) => {
      if (invitedMembers) {
        this.invitedMembers = Object.keys(invitedMembers);
      }
    });
  }

  ngOnInit(): void {}
}
