import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[toggleShowPassword]',
  exportAs: 'toggleShowPassword',
})
export class TogglePasswordDirective {
  public _shown = false;

  constructor(private el: ElementRef) {}

  toggle(event: MouseEvent) {
    event.preventDefault();
    this._shown = !this._shown;
    const inputType = this._shown ? 'text' : 'password';
    this.el.nativeElement.setAttribute('type', inputType);
  }
}
