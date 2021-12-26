/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, mergeMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage/session-storage.service';
import { NotificationService } from '../services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private translation: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  private createMessage(
    translationKey: string,
    params?: Record<string, any>
  ): void {
    if (params) {
      let forkJoinParams: Record<string, any> = {};
      Object.keys(params).forEach((param) => {
        forkJoinParams[param] = this.translateService.get(params[param]);
      });
      forkJoin(forkJoinParams)
        .pipe(
          mergeMap((params) => {
            return this.translateService.get(translationKey, params);
          })
        )
        .subscribe((translatedString: string) =>
          this.translation.next(translatedString)
        );
    } else {
      this.translateService
        .get(translationKey)
        .subscribe((translatedString: string) =>
          this.translation.next(translatedString)
        );
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.sessionStorageService.getToken('bearerToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(request).pipe(
      tap((response: any) => {
        if (response.status === 200 && response.body.message) {
          this.createMessage(
            response.body.message,
            response.body.translationParams
          );
          this.translation
            .pipe(take(1))
            .subscribe((translatedString: string) => {
              this.notificationService.success('Success', translatedString);
            });
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status !== 200) {
          console.log(err);
          this.createMessage(err.error.message, err.error.translationParams);
          this.translation
            .pipe(take(1))
            .subscribe((translatedString: string) => {
              this.notificationService.error('Error', translatedString);
            });
        }
        return of(err);
      })
    );
  }
}
