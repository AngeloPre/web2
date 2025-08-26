import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = req.headers.set('Content-Type', 'application/json');
    const authToken = this.authService.getAuthToken();
    if (authToken) { //se o access token existe, ele é automaticamente anexado à requisição
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      console.log("anexando access token a requisição");
    }
    const cloned = req.clone({ headers });
    return next.handle(cloned);
  }
}