import { OnInit, ElementRef, Input, Directive } from '@angular/core';

@Directive({ selector: '[focus-me]' })
export class FocusDirective implements OnInit {
  @Input('focus-me') isFocused: boolean = true;

  constructor(private hostElement: ElementRef) {}

  ngOnInit() {
    if (this.isFocused) {
      this.hostElement.nativeElement.focus();
    }
  }
}
