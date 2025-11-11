import { inject, Injectable } from '@angular/core';
import { API_URL } from './CONSTANTES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { Token } from '../model/token';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role, UserRole } from '../core/store/user-role/user-role.store';

export const LS_Token = 'TokenLS';
export const UserName = 'UserName';

export function tokenGetter() {
  return localStorage.getItem('TokenLS');
}

export function usernameGetter() {
  return localStorage.getItem('UserName');
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = `${API_URL}/auth`;

  httpClient: HttpClient = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private userRole = inject(UserRole);

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(login: Login): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL}/login`, login, this.httpOptions)
      .pipe(
        tap((token: Token) => {
          localStorage[LS_Token] = token.Token;
          const tokenRole = this.jwtHelper.decodeToken(token.Token).roles;
          console.log(tokenRole);
          this.userRole.updateRoleFromToken(tokenRole);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(LS_Token);
    this.userRole.logoutUser();
  }

  me(): Observable<string> {
    return this.httpClient
      .get<string>(`${this.BASE_URL}/me`, this.httpOptions)
      .pipe(
        tap((username: string) => {
          localStorage[UserName] = username;
        })
      )
  }

  constructor() { }
}
