import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, switchMap, tap, finalize, delay } from 'rxjs';

import { ApiServices } from '../model/interfaces/api-services';
import { API_URL } from './CONSTANTES';
import { Funcionario } from '../model/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService implements ApiServices<Funcionario> {
  BASE_URL = `${API_URL}/funcionario`;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  signalFuncionarios = signal<Funcionario[]>([]);
  loading = signal(false);

  constructor(private httpClient: HttpClient) {
    this.refresh().subscribe();
  }

  refresh(): Observable<Funcionario[]> {
    this.loading.set(true);
    this.signalFuncionarios.set([]);
    return this.listarTodos().pipe(
      delay(1000),
      tap(list => this.signalFuncionarios.set(list)),
      finalize(() => this.loading.set(false))
    );
  }

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    );
  }

  inserir(elemento: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(
      this.BASE_URL,
      elemento,
      this.httpOptions
    ).pipe(
      tap(created => this.signalFuncionarios.update(list => [...list, created]))
    );
  }

  atualizar(elemento: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(
      `${this.BASE_URL}/${elemento.id}`,
      elemento,
      this.httpOptions
    ).pipe(
      tap(updated => this.signalFuncionarios.update(list =>
        list.map(f => f.id === updated.id ? updated : f)
      ))
    );
  }

  remover(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    ).pipe(
      tap(() => this.signalFuncionarios.update(list => list.filter(c => c.id !== id)))
    );
  }
}
