import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';
import { GroupStateFacade } from 'src/app/store/group/group.facade';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.css'],
})
export class CreateGroupFormComponent implements OnInit {
  public newGroupForm!: FormGroup;

  public userGroupId: string | null = this.authStateFacade.userGroupId.value;

  constructor(
    private formBuilder: FormBuilder,
    private groupStateFacade: GroupStateFacade,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.authStateFacade.getUserGroupId$.subscribe((userGroupId) => {
      this.userGroupId = userGroupId;
    });
    this.newGroupForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get name(): AbstractControl {
    return this.newGroupForm.get('name') as AbstractControl;
  }

  public onSubmit(event: MouseEvent): void {
    event.preventDefault();
    if (this.newGroupForm.valid) {
      this.groupStateFacade.createGroup({
        ...this.newGroupForm.value,
        groupId: this.userGroupId,
      });
    }
  }
}
