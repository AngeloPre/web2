import { inject, Injectable, signal } from '@angular/core';
import { ChamadoItem, ChamadoUpdateDTO } from '@model/chamado.type';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { API_URL } from './CONSTANTES';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
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
import { EtapaHistoricoApi, mapFuncionario } from '../dto/api.dto';
import { Orcamento } from '../model/orcamento';
import {
  ChamadoResponseApi,
  chamadoToDTO,
  dtoToChamado,
  toApiStatus,
} from '../dto/chamado.dto';
import { orcamentoToDTO } from '../dto/orcamento.dto';
import { etapaCreateDTO } from '../dto/etapa.dto';
import { EtapaHistorico } from '../model/etapa-historico.type';

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
      httpParams = httpParams.set('status', toApiStatus(params.status));
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

  inserir(elemento: ChamadoItem): Observable<ChamadoItem> {
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
    const dto = this.toUpdateDto(chamado);
    return this.httpClient
      .put<ChamadoResponseApi>(
        `${this.BASE_URL}/${chamado.id}`,
        dto,
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

  remover(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        tap(() =>
          this.chamadosSignal.update((list) => list.filter((c) => c.id !== id))
        )
      );
  }

  listarEtapas(
    chamadoId: number
  ): Observable<EtapaHistorico[]> {
    return this.httpClient
      .get<EtapaHistoricoApi[]>(
        `${this.BASE_URL}/${chamadoId}/etapas`
      ).pipe(
        map((dtos) => this.fromApiEtapas(dtos, chamadoId)),
        catchError((err) => {
          if (err.status === 404) return of<EtapaHistorico[]>([]);
          return throwError(() => err)
        })
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

  criarEtapaBase(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem> {
    return this.httpClient
      .post<ChamadoResponseApi>(
        `${this.BASE_URL}/${chamadoId}/etapas`,
        etapaCreateDTO(etapa),
        this.httpOptions
      ).pipe(
        map(dtoToChamado),
        tap((updated) => {
          this.chamadosSignal.update((list) =>
            list.map((c) => (c.id === updated.id ? updated : c))
          );
        })
      );
  }

  pagar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem> {
    return this.criarEtapaBase(chamadoId, etapa);
  }

  aprovar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
  }

  rejeitar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
  }

  resgatar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
  }

  finalizar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
  }

  efetuar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
  }

  redirecionar(chamadoId: number, etapa: EtapaHistorico): Observable<ChamadoItem>{
    return this.criarEtapaBase(chamadoId, etapa);
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

  private fromApiEtapas(
    etapas: EtapaHistoricoApi[] | null | undefined,
    serviceId: number
  ): EtapaHistorico[] {
    return (etapas ?? [])
      .map((e) => this.fromApiEtapa(e, serviceId))
      .sort((a, b) => a.dataCriado.getTime() - b.dataCriado.getTime());
  }

  private fromApiEtapa(etapa: EtapaHistoricoApi, chamadoId: number): EtapaHistorico {
    return {
      id: etapa.id,
      serviceId: chamadoId,
      dataCriado: new Date(etapa.dataCriacao),
      status: this.fromApiStatus(etapa.status),
      tecnico: mapFuncionario(etapa.funcionario),
      redirecionamento: {
        tecnicoDestino: {
          nome: etapa.funcionario?.nome
        },
        tecnicoOrigem: {
          nome: etapa.funcionarioAnterior?.nome
        }
      },
      motivoRejeicao: etapa.motivoRejeicao ?? undefined,
      orcamento: etapa.orcamento ?? 0
    };
  }

  private fromApiStatus(s: string | null | undefined): StatusConsertoEnum {
    const key = (s ?? '').toUpperCase() as keyof typeof StatusConsertoEnum;
    return StatusConsertoEnum[key];
  }

  private toUpdateDto(chamado: ChamadoItem): ChamadoUpdateDTO {
    const chamadoDto: ChamadoUpdateDTO = {
      categoriaNome: chamado.serviceCategory,
      descricaoEquipamento: chamado.descricaoEquipamento,
      descricaoFalha: chamado.descricaoFalha,
      statusConcerto: chamado.status
    }
    return chamadoDto;
  }
}
