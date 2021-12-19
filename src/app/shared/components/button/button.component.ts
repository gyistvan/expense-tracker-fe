import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  template: `<button
    class="btn text-white text-bold"
    (click)="click($event)"
    [ngClass]="{
      'btn-lg': buttonSize === 'lg',
      'btn-md': buttonSize === 'normal',
      'btn-sm': buttonSize === 'small',
      'btn-secondary': buttonColor === 'secondary',
      'btn-dark': buttonColor === 'dark',
      'btn-primary': buttonColor === 'primary',
      'btn-success': buttonColor === 'success'
    }"
  >
    <fa-icon *ngIf="iconName" [icon]="['fas', iconName]"></fa-icon>
    {{ btnText }}
  </button>`,
})
export class ButtonComponent {
  @Input() public btnText: string = '';
  @Input() public iconName?: IconName;
  @Input() public buttonSize = 'normal';
  @Input() public buttonColor = 'secondary';

  @Output() onClick = new EventEmitter<MouseEvent>();

  public click(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
