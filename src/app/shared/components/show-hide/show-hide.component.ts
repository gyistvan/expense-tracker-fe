import { Component } from '@angular/core';

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.css'],
})
export class ShowHideComponent {
  public isDisplayed: boolean = false;

  constructor() {}

  public changeDisplayed(): void {
    this.isDisplayed = !this.isDisplayed;
  }
}
