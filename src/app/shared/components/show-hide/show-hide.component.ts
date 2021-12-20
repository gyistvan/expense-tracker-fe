import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.css'],
})
export class ShowHideComponent {
  @Input()
  public showText: string = 'Show content';
  @Input()
  public hideText: string = 'Hide content';

  public isDisplayed: boolean = false;

  constructor() {}

  public changeDisplayed(): void {
    this.isDisplayed = !this.isDisplayed;
  }
}
