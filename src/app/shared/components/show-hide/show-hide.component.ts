import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.css'],
})
export class ShowHideComponent implements OnInit {
  @Input()
  public showText: string = 'SHARED_COMPONENTS.SHOW_HIDE.SHOW_BUTTON_TEXT';
  @Input()
  public hideText: string = 'SHARED_COMPONENTS.SHOW_HIDE.HIDE_BUTTON_TEXT';
  @Input()
  public componentName?: string;

  public isDisplayed: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.componentName) {
      let isDisplayed = this.localStorageService.getToken(this.componentName);
      this.isDisplayed = isDisplayed === 'true' ? true : false;
    }
  }

  public changeDisplayed(): void {
    this.isDisplayed = !this.isDisplayed;
    this.saveDisplayStateToSessionStorage();
  }

  private saveDisplayStateToSessionStorage(): void {
    if (this.componentName) {
      this.localStorageService.setToken(
        this.componentName,
        JSON.stringify(this.isDisplayed)
      );
    }
  }
}
