import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Client } from '@/app/model/data/client.model';
import { UserAuth } from '@/app/model/data/auth.model';
import { AccessToken } from '@/app/model/data/access-token.model';
import { ROLE_STORAGE_KEY } from '../store/user-role/user-role.store';
import { UserRegisterDto } from '@/app/model/dtos/user-register-dto';
import { BaseResponse, EmptyResponse } from '@/app/model/data/base-response';
import { UserLoginDto } from '@/app/model/dtos/user-login-dto';

export const authTokenKey = 'auth-token';
export const refreshTokenKey = 'refresh-token';
export const userKey = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = 'http://localhost:8080'; //TODO: substituir com o endereço da rota de autenticação quando implementada na API
    registerUrl = `${this.url}/client-register`;
    loginUrl = `${this.url}/login`;
    logoutUrl = `${this.url}/logout`;
    refreshTokenUrl = `${this.url}/refresh-token`;

    private jwtHelper = new JwtHelperService();

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    constructor(private http: HttpClient) { }

    registerClient(registerDto: UserRegisterDto): Observable<BaseResponse<Client>> {
        return this.http.post<BaseResponse<Client>>(this.registerUrl, JSON.stringify(registerDto), this.httpOptions).pipe(catchError(this.handleError));
    }

    login(loginDto: UserLoginDto): Observable<BaseResponse<UserAuth>> {
        return this.http.post<BaseResponse<UserAuth>>(this.loginUrl, JSON.stringify(loginDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    postRefreshToken(accessToken: AccessToken): Observable<AccessToken> {
        return this.http.post<AccessToken>(this.refreshTokenUrl, JSON.stringify(accessToken), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    saveAccessToken(token: AccessToken): void {
        localStorage.setItem(authTokenKey, token.authToken);
        localStorage.setItem(refreshTokenKey, token.refreshToken);
    }

    logout(): Observable<EmptyResponse> {
        this.removeAccessToken();
        localStorage.removeItem(userKey);
        localStorage.removeItem(ROLE_STORAGE_KEY);
        return this.http.post<EmptyResponse>(this.logoutUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    getAuthToken(): string | null {
        return localStorage.getItem(authTokenKey);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(refreshTokenKey);
    }

    removeAccessToken(): void {
        localStorage.removeItem(authTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }

    isAuthTokenExpired(): boolean {
        const authToken = this.getAuthToken();
        return authToken ? this.jwtHelper.isTokenExpired(authToken) : true;
    }

    isRefreshTokenExpired(): boolean {
        const refreshToken = this.getRefreshToken();
        return refreshToken ? this.jwtHelper.isTokenExpired(refreshToken) : true;
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    };
}
