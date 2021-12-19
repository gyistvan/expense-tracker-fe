import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public setToken(tokenName: string, tokenValue: string): void {
    sessionStorage.setItem(tokenName, tokenValue);
  }

  public getToken(tokenName: string): string {
    let token = sessionStorage.getItem(tokenName);
    return token ? token : '';
  }

  public deleteToken(tokenName: string): void {
    sessionStorage.removeItem(tokenName);
  }
}
