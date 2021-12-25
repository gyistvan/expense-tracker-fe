import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { TranslateService } from '@ngx-translate/core';
import { AvailbleBSPositions } from 'ngx-bootstrap/positioning';

@Component({
  selector: 'app-button',
  template: `<button
    [tooltip]="tooltipText | translate"
    [tooltipPlacement]="tooltipPlacement"
    [disabled]="isDisabled"
    class="btn text-bold"
    (click)="click($event)"
    [ngClass]="{
      'btn-lg': buttonSize === 'lg',
      'btn-md': buttonSize === 'normal',
      'btn-sm': buttonSize === 'small',
      'btn-secondary': buttonColor === 'secondary',
      'btn-dark': buttonColor === 'dark',
      'btn-primary': buttonColor === 'primary',
      'btn-success': buttonColor === 'success',
      'btn-danger': buttonColor === 'danger',
      'btn-warning': buttonColor === 'warning',
      'btn-info': buttonColor === 'info',
      'text-white': textColor === 'white',
      'text-dark': textColor === 'dark'
    }"
  >
    <fa-icon *ngIf="iconName" [icon]="['fas', iconName]"></fa-icon>
    {{ btnText | translate }}
  </button>`,
})
export class ButtonComponent {
  @Input() public btnText: string = '';
  @Input() public iconName?: IconName;
  @Input() public buttonSize = 'normal';
  @Input() public buttonColor = 'secondary';
  @Input() public textColor = 'white';
  @Input() public isDisabled = false;
  @Input() public tooltipText = '';
  @Input() public tooltipPlacement = 'top' as AvailbleBSPositions;

  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() {}

  public click(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
