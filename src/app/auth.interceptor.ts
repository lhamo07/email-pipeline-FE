import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: any;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    this.token = this.authService.loggedInCheck();
    if (this.token) {
      headersConfig['Authorization'] = `Bearer ${this.token}`;
    }
    const req = request.clone({
      setHeaders: headersConfig,
    });
    return next.handle(req);
  }
}
