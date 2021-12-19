import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public isUserAuthorized = this.authStateFacade.isUserAuthorized$;

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
}
