import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, switchMap, tap, finalize, delay } from 'rxjs';

import { ApiServices } from '../model/interfaces/api-services';
import { API_URL } from './CONSTANTES';
import { Cliente } from '../model/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService implements ApiServices<Cliente> {
    BASE_URL = `${API_URL}/cliente`;

    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    signalClientes = signal<Cliente[]>([]);
    loading = signal(false);

    constructor(private httpClient: HttpClient) {
        this.refresh().subscribe();
    }

    refresh(): Observable<Cliente[]> {
        this.loading.set(true);
        return this.listarTodos().pipe(
            delay(1000),
            tap(list => this.signalClientes.set(list)),
            finalize(() => this.loading.set(false))
        );
    }

    listarTodos(): Observable<Cliente[]> {
        return this.httpClient.get<Cliente[]>(
            this.BASE_URL,
            this.httpOptions
        );
    }

    buscarPorId(id: number): Observable<Cliente> {
        return this.httpClient.get<Cliente>(
            `${this.BASE_URL}/${id}`,
            this.httpOptions
        );
    }

    atualizar(elemento: Cliente): Observable<Cliente> {
        return this.httpClient.put<Cliente>(
            `${this.BASE_URL}/${elemento.id}`,
            elemento,
            this.httpOptions
        ).pipe(
            tap(updated => this.signalClientes.update(list =>
                list.map(c => c.id === updated.id ? updated : c)
            ))
        );
    }

    remover(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.BASE_URL}/${id}`,
            this.httpOptions
        ).pipe(
            tap(() => this.signalClientes.update(list => list.filter(c => c.id !== id)))
        );
    }
}
