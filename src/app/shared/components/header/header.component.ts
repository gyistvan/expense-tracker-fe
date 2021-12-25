import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public isUserAuthorized = this.authStateFacade.isUserAuthorized$;
  public isMenuOpen = false;

  constructor(
    private router: Router,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {}

  public logoutAndRedirect(): void {
    this.authStateFacade.logout();
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['login']);
  }

  public changeMenuState() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
