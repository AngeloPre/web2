import { inject, Injectable } from '@angular/core';
import { API_URL } from './CONSTANTES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { Token } from '../model/token';
import { Observable, tap } from 'rxjs';

export const LS_Token = 'TokenLS';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = `${API_URL}/auth/login`;
  httpClient: HttpClient = inject(HttpClient);

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  inserir(login: Login): void {
    console.log(login);
    this.httpClient
      .post<Token>(this.BASE_URL, login, this.httpOptions)
      .subscribe((res) => {
        localStorage[LS_Token] = res.Token;
      });
  }

  constructor() {}
}
