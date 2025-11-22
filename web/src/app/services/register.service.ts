import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@/environment/env';
import { Register } from '@model/register';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = `${API_URL}/auth/register`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  register(cliente: Register): Observable<any> {
    return this.http.post(this.BASE_URL, cliente, this.httpOptions);
  }
}