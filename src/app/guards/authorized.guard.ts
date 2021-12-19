import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authStateFacade: AuthStateFacade, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStateFacade.isUserAuthorized$.pipe(
      map((state: boolean) => {
        return state ? state : this.router.parseUrl('/login');
      })
    );
  }
}
