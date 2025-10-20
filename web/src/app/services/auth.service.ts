import { inject, Injectable } from '@angular/core';
import { ClienteRegisterDTO } from '@model/dto/cliente-register.dto';
import { LoginDTO } from '@model/dto/login.dto';
import { LoginResponseDTO } from '@model/dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://java-web2.tail041186.ts.net/auth';
  private readonly TOKEN_KEY = 'auth_token';

  private salvarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  registrarCliente(data: ClienteRegisterDTO): Observable<string>{
    return this.http.post(`${this.BASE_URL}/register`, data, { responseType: 'text' });
  }

  login(credentials: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.BASE_URL}/login`, credentials).pipe(
      tap(response => this.salvarToken(response.token))
    );    
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}


