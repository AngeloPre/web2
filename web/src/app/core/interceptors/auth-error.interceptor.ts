import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '@/app/services/login.service';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private loginService = inject(LoginService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.loginService.logout();
          this.router.navigate(['/login']);
        }
        
        return throwError(() => error);
      })
    );
  }
}