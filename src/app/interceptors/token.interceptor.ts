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
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage/session-storage.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

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
          this.notificationService.success('Success', response.body.message);
        }
        console.log(response);
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status !== 200) {
          this.notificationService.error(`Error`, err.error.message, 3000);
        }
        return of(err);
      })
    );
  }
}
