import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setToken(tokenName: string, tokenValue: string): void {
    localStorage.setItem(tokenName, tokenValue);
  }

  public getToken(tokenName: string): string {
    let token = localStorage.getItem(tokenName);
    return token ? token : '';
  }

  public deleteToken(tokenName: string): void {
    localStorage.removeItem(tokenName);
  }
}
