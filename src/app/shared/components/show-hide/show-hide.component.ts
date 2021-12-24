import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.css'],
})
export class ShowHideComponent implements OnInit {
  @Input()
  public showText: string = 'Show content';
  @Input()
  public hideText: string = 'Hide content';
  @Input()
  public componentName?: string;

  public isDisplayed: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.componentName) {
      this.isDisplayed = JSON.parse(
        this.localStorageService.getToken(this.componentName)
      );
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
