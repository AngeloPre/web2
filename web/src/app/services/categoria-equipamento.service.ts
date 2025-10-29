import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, switchMap, tap, finalize, delay } from 'rxjs';

import { ApiServices } from '../model/interfaces/api-services';
import { CategoriaEquipamento } from '@model/categoria-equipamento.type';
import { API_URL } from './CONSTANTES';
import {
  DtoToEquipamento,
  EquipamentoCreateUpdateApi,
  EquipamentoResponseApi,
  EquipamentoToDTO,
} from '../dto/equipamento.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriaEquipamentoService
  implements ApiServices<CategoriaEquipamento>
{
  BASE_URL = `${API_URL}/categoria-equipamento`;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  signalCategorias = signal<CategoriaEquipamento[]>([]);
  loading = signal(false);

  constructor(private httpClient: HttpClient) {
    this.refresh().subscribe();
  }

  refresh(): Observable<CategoriaEquipamento[]> {
    this.loading.set(true);
    return this.listarTodos().pipe(
      delay(1000),
      tap((list) => this.signalCategorias.set(list)),
      finalize(() => this.loading.set(false))
    );
  }

  listarTodos(): Observable<CategoriaEquipamento[]> {
    return this.httpClient.get<CategoriaEquipamento[]>(
      this.BASE_URL,
      this.httpOptions
    );
  }

  buscarPorId(id: number): Observable<CategoriaEquipamento> {
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
    return this.httpClient
      .post<EquipamentoResponseApi>(
        this.BASE_URL,
        EquipamentoToDTO(elemento),
        this.httpOptions
      )
      .pipe(
        map(DtoToEquipamento),
        tap((created) =>
          this.signalCategorias.update((list) => [...list, created])
        )
      );
  }

  atualizar(elemento: CategoriaEquipamento): Observable<CategoriaEquipamento> {
    return this.httpClient
      .put<EquipamentoResponseApi>(
        `${this.BASE_URL}/${elemento.categoryId!}`,
        EquipamentoToDTO(elemento),
        this.httpOptions
      )
      .pipe(
        map(DtoToEquipamento),
        tap((updated) =>
          this.signalCategorias.update((list) =>
            list.map((c) => (c.categoryId === updated.categoryId ? updated : c))
          )
        )
      );
  }

  remover(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        tap(() =>
          this.signalCategorias.update((list) =>
            list.filter((c) => c.categoryId !== id)
          )
        )
      );
  }

  desativar(id: number): Observable<CategoriaEquipamento> {
    return this.buscarPorId(id).pipe(
      map((c) => ({ ...c, status: false })),
      switchMap((c) => this.atualizar(c))
    );
  }

  reativar(id: number): Observable<CategoriaEquipamento> {
    return this.buscarPorId(id).pipe(
      map((c) => ({ ...c, status: true })),
      switchMap((c) => this.atualizar(c))
    );
  }
}
