import { Component, Input, OnInit } from '@angular/core';
import { GroupStateFacade } from 'src/app/store/group/group.facade';

@Component({
  selector: 'app-pending-invites',
  templateUrl: './pending-invites.component.html',
  styleUrls: ['./pending-invites.component.css'],
})
export class PendingInvitesComponent implements OnInit {
  @Input()
  public pendingInvites: Record<string, string>[] = [];
  constructor(private groupStateFacade: GroupStateFacade) {}

  ngOnInit(): void {}

  public acceptGroupInvite(id: string, event: MouseEvent) {
    event.preventDefault();
    this.groupStateFacade.acceptGroupInvite(id);
  }
}
