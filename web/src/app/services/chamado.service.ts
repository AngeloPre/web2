import { inject, Injectable, signal } from '@angular/core';
import { ChamadoItem } from '@model/chamado.type';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { API_URL } from './CONSTANTES';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { ApiServices } from '../model/interfaces/api-services';
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  tap,
  throwError,
  delay,
} from 'rxjs';
import { ChamadoApi, clienteToApi, EtapaHistoricoApi, funcionarioToApi, mapCliente, mapFuncionario } from '../dto/api.dto';
import { Orcamento } from '../model/orcamento';
import {
  ChamadoCreateApi,
  ChamadoResponseApi,
  chamadoToDTO,
  dtoToChamado,
} from '../dto/chamado.dto';
import { orcamentoToDTO } from '../dto/orcamento.dto';

export const LS_Chamado = 'Chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService implements ApiServices<ChamadoItem> {
  BASE_URL = `${API_URL}/chamados`;
  httpClient: HttpClient = inject(HttpClient);
  chamadosSignal = signal<ChamadoItem[]>([]);
  private serviceID = 100;
  loading = signal(false);

  private readonly httpOptions = {
    // observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() { }

  refresh(params?: {
    status?: StatusConsertoEnum | string;
    dataInicio?: Date | string;
    dataFim?: Date | string;
  }): Observable<ChamadoItem[]> {
    this.loading.set(true);
    this.chamadosSignal.set([]);
    return this.listarTodos(params).pipe(
      delay(1000),
      tap((list) => this.chamadosSignal.set(list)),
      finalize(() => this.loading.set(false))
    );
  }

  listarTodos(params?: {
    status?: StatusConsertoEnum | string;
    dataInicio?: Date | string;
    dataFim?: Date | string;
  }): Observable<ChamadoItem[]> {
    let httpParams = new HttpParams();

    // Query params ?status=...&dataInicio=...&dataFim=...
    if (params?.status) {
      httpParams = httpParams.set('status', this.toApiStatus(params.status));
    }
    if (params?.dataInicio) {
      httpParams = httpParams.set(
        'dataInicio',
        this.converterData(params.dataInicio)
      );
    }
    if (params?.dataFim) {
      httpParams = httpParams.set(
        'dataFim',
        this.converterData(params.dataFim)
      );
    }

    return this.httpClient
      .get<ChamadoResponseApi[]>(this.BASE_URL, {
        ...this.httpOptions,
        params: httpParams,
      })
      .pipe(
        map((dtos) => dtos.map(dtoToChamado)),
        catchError((err) => {
          if (err.status === 404) return of<ChamadoItem[]>([]);
          return throwError(() => err);
        })
      );
  }

  // listarPorUser(userId: number): ChamadoItem[] {
  //   const chamados = localStorage[LS_Chamado];
  //   const lista: ChamadoItem[] = JSON.parse(chamados);
  //   return lista.filter((chamado) => chamado.userId === userId);
  // }

  inserir(chamado: ChamadoItem): Observable<ChamadoItem> {
    return this.httpClient
      .post<ChamadoResponseApi>(
        this.BASE_URL,
        chamadoToDTO(elemento),
        this.httpOptions
      )
      .pipe(
        map(dtoToChamado),
        tap((created) =>
          this.chamadosSignal.update((list) => [...list, created])
        )
      );
  }

  buscarPorId(id: number): Observable<ChamadoItem> {
    return this.httpClient
      .get<ChamadoResponseApi>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(map(dtoToChamado));
  }

  atualizar(chamado: ChamadoItem): Observable<ChamadoItem> {
    return this.httpClient
      .put<ChamadoItem>(
        `${this.BASE_URL}/${chamado.id}`,
        chamado,
        this.httpOptions
      )
      .pipe(
        tap((updated) => {
          this.chamadosSignal.update((list) =>
            list.map((c) => (c.id === updated.id ? updated : c))
          );
        })
      );
  }

  remover(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        tap(() =>
          this.chamadosSignal.update((list) => list.filter((c) => c.id !== id))
        )
      );
  }

  efetuarOrcamento(
    chamadoId: number,
    orcamento: Orcamento
  ): Observable<ChamadoItem> {
    return this.httpClient
      .post<ChamadoResponseApi>(
        `${this.BASE_URL}/${chamadoId}/orcamento`,
        orcamentoToDTO(orcamento),
        this.httpOptions
      )
      .pipe(
        map(dtoToChamado),
        tap((updated) => {
          this.chamadosSignal.update((list) =>
            list.map((c) => (c.id === updated.id ? updated : c))
          );
        })
      );
  }

  private converterData(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  private adaptarDadosApi(listaChamados: ChamadoItem[]): ChamadoItem[] {
    return (listaChamados ?? []).map((chamado) => ({
      ...chamado,
      status: this.fromApiStatus(chamado.status),
      dataCriacao: new Date(chamado.dataCriacao as unknown as string),
      dataResposta: chamado.dataResposta
        ? new Date(chamado.dataResposta as unknown as string)
        : undefined,
    }));
  }

  private fromApiStatus(s: string | null | undefined): StatusConsertoEnum {
    const key = (s ?? '').toUpperCase() as keyof typeof StatusConsertoEnum;
    return StatusConsertoEnum[key];
  }

  /* private adaptarUm(dto: ChamadoApi): ChamadoItem {
    const cliente = mapCliente(dto.cliente);

    return {
      id: dto.id,
      serviceCategory: dto.categoriaNome,

      status: this.fromApiStatus(dto.status),
      descricaoEquipamento: dto.descricaoEquipamento,
      descricaoFalha: dto.descricaoFalha,
      etapas: [],

      dataCriacao: new Date(dto.dataCriacao),
      dataResposta: dto.dataResposta ? new Date(dto.dataResposta) : undefined,

      comentario: dto.comentario ?? undefined,
      precoBase: dto.precoBase,

      funcionario: mapFuncionario(dto.funcionario),
      cliente: cliente,
    };
  }*/

  /*  private adaptarLista(list: ChamadoApi[]): ChamadoItem[] {
    return (list ?? []).map(this.adaptarUm.bind(this));
  }*/

  private toApiStatus(s: StatusConsertoEnum | string): string {
    if (typeof s === 'string' && (s as any) in StatusConsertoEnum) return s;

    const entry = Object.entries(StatusConsertoEnum).find(([, v]) => v === s);
    return entry?.[0] ?? String(s).toUpperCase();
  }
}
