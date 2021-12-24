import { Component, OnInit } from '@angular/core';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';
import { GroupStateFacade } from 'src/app/store/group/group.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public displayPasswordForm = false;
  public group?: string = undefined;
  public groupId = this.groupStateFacade.groupId$;
  public displayedTab = 'profile';
  public pendingInvites: Record<string, string>[] = [];
  constructor(
    private groupStateFacade: GroupStateFacade,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.authStateFacade.getUserPendingInvites$.subscribe((pendingInvites) =>
      this.createPendingInvitesArray(pendingInvites)
    );
  }

  public changeDisplayPasswordForm(event: MouseEvent): void {
    event.preventDefault();
    this.displayPasswordForm = !this.displayPasswordForm;
  }

  public changeTab(newTab: string): void {
    if (newTab !== this.displayedTab) {
      this.displayedTab = newTab;
    }
  }

  private createPendingInvitesArray(pendingInvites: Record<string, string>) {
    if (pendingInvites) {
      let modifiedPendingInvites = Object.keys(pendingInvites).map(
        (groupId) => ({
          groupName: pendingInvites[groupId],
          groupId,
        })
      );
      this.pendingInvites = modifiedPendingInvites;
    }
  }
}
