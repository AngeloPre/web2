import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';

import { ApiServices } from '../model/interfaces/api-services';
import { CategoriaEquipamento } from '@model/categoria-equipamento.type';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEquipamentoService implements ApiServices<CategoriaEquipamento> {
  BASE_URL = "https://java-web2.tail041186.ts.net/categoria-equipamento";
  
  private readonly httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin'),
    })
  };

  signalCategorias = signal<CategoriaEquipamento[]>([]);

  constructor(private httpClient: HttpClient) {
    this.refresh().subscribe();
  }

  refresh(): Observable<CategoriaEquipamento[]> {
    return this.listarTodos().pipe(
      tap(list => this.signalCategorias.set(list))
    );
  }

  listarTodos(): Observable<CategoriaEquipamento[]> {
    return this.httpClient.get<CategoriaEquipamento[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  buscarPorID(id: number): Observable<CategoriaEquipamento> {
    return this.httpClient.get<CategoriaEquipamento>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    );
  }

  buscarPorSlug(slug: string): Observable<CategoriaEquipamento> {
    return this.httpClient.get<CategoriaEquipamento>(
      `${this.BASE_URL}/slug/${slug}`,
      this.httpOptions
    );
  }

  inserir(elemento: CategoriaEquipamento): Observable<CategoriaEquipamento> {
    return this.httpClient.post<CategoriaEquipamento>(
      this.BASE_URL,
      elemento,
      this.httpOptions
    ).pipe(
      tap(created => this.signalCategorias.update(list => [...list, created]))
    );
  }

  atualizar(elemento: CategoriaEquipamento): Observable<CategoriaEquipamento> {
    return this.httpClient.put<CategoriaEquipamento>(
      `${this.BASE_URL}/${elemento.categoryId!}`,
      elemento,
      this.httpOptions
    ).pipe(
      tap(updated => this.signalCategorias.update(list =>
        list.map(c => c.categoryId === updated.categoryId ? updated : c)
      ))
    );
  }

  remover(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.BASE_URL}/${id}`,
      this.httpOptions
    ).pipe(
      tap(() => this.signalCategorias.update(list => list.filter(c => c.categoryId !== id)))
    );
  }

  desativar(id: number): Observable<CategoriaEquipamento> {
    return this.buscarPorID(id).pipe(
      map(c => ({ ...c, status: false })),
      switchMap(c => this.atualizar(c))
    );
  }

  reativar(id: number): Observable<CategoriaEquipamento> {
    return this.buscarPorID(id).pipe(
      map(c => ({ ...c, status: true })),
      switchMap(c => this.atualizar(c))
    );
  }
}
