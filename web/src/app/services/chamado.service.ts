import { Injectable, signal } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { ChamadoItem } from '../model/chamado.type';
import { StatusConcertoEnum } from '../model/enums/chamado-status.enum';
import { CategoriaEquipamento } from '../model/enums/categoria-equipamento';

export const LS_Chamado = 'Chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService implements MockServices<ChamadoItem> {
  private _chamadoSignal = signal<ChamadoItem[]>([]);
  private serviceID = 100;

  private persistirAtualizar(chamados: ChamadoItem[]): void {
    localStorage[LS_Chamado] = JSON.stringify(chamados);
    this._chamadoSignal.set(chamados);
  }

  get chamadosSignal() {
    return this._chamadoSignal.asReadonly();
  }

  listarTodos(): ChamadoItem[] {
    const chamados = localStorage[LS_Chamado];
    return chamados ? JSON.parse(chamados) : [];
  }
  listarPorStatus(status: StatusConcertoEnum): ChamadoItem[] {
    const chamados = localStorage[LS_Chamado];
    const lista: ChamadoItem[] = JSON.parse(chamados);
    return lista.filter((chamado) => chamado.status === status);
  }
  listarPorUser(userId: number): ChamadoItem[] {
    const chamados = localStorage[LS_Chamado];
    const lista: ChamadoItem[] = JSON.parse(chamados);
    return lista.filter((chamado) => chamado.userId === userId);
  }
  listarEmOrdemCrescente(): ChamadoItem[] {
    const chamados = this.listarTodos();
    return chamados.sort(
      (a, b) =>
        new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime()
    );
  }
  listarFiltroData(data_inicial: string, data_final: string): ChamadoItem[] {
    const dt_i = new Date(data_inicial).setHours(0, 0, 0, 0);
    const dt_f = new Date(data_final).setHours(23, 59, 59, 0);

    return this.listarEmOrdemCrescente().filter(
      (chamado) =>
        new Date(chamado.dataCriacao).getTime() >= dt_i &&
        new Date(chamado.dataCriacao).getTime() <= dt_f
    );
  }
  inserir(elemento: ChamadoItem): void {
    const chamados = this.listarTodos();
    elemento.serviceId = this.serviceID++;
    chamados.push(elemento);
    localStorage[LS_Chamado] = JSON.stringify(chamados);
    this.persistirAtualizar(chamados);
  }
  buscarPorID(id: number): ChamadoItem | undefined {
    const chamados = this.listarTodos();
    return chamados.find((chamado) => chamado.serviceId === id);
  }
  atualizar(elemento: ChamadoItem): void {
    let chamados = this.listarTodos();
    chamados = chamados.map((chamado) =>
      chamado.serviceId === elemento.serviceId ? elemento : chamado
    );
    localStorage[LS_Chamado] = JSON.stringify(chamados);
    this.persistirAtualizar(chamados);
  }
  remover(elemento: ChamadoItem): void {
    let chamados = this.listarTodos();
    chamados = chamados.filter(
      (chamado) => chamado.serviceId !== elemento.serviceId
    );
    localStorage[LS_Chamado] = JSON.stringify(chamados);
    this.persistirAtualizar(chamados);
  }

  constructor() {
    const existentes = this.listarTodos();
    this.serviceID = 100 + (existentes.length + 1);
    if (existentes.length === 0) {
      this.inserir({
        userId: 1,
        userName: 'João',
        serviceId: -1,
        serviceCategory: 'Notebook',
        status: StatusConcertoEnum.FINALIZADA,
        descricaoEquipamento: 'Notebook Dell',
        descricaoFalha: 'Descrição do chamado 2',
        slug: 'descricao-do-chamado-1',
        etapas: [],
        dataCriacao: new Date('2025-09-13T03:24:00'),
        precoBase: 250.0,
      });
      this.inserir({
        userId: 2,
        userName: 'João',
        serviceId: -1,
        serviceCategory: 'Impressora',
        status: StatusConcertoEnum.PAGA,
        descricaoEquipamento: 'Impressora HP',
        descricaoFalha: 'Descrição do chamado 2',
        slug: 'descricao-do-chamado-2',
        etapas: [],
        dataCriacao: new Date('2025-09-12T03:24:00'),
        precoBase: 395.0,
      });
      this.inserir({
        userId: 3,
        userName: 'José',
        serviceId: -1,
        serviceCategory: 'Mouse',
        status: StatusConcertoEnum.ARRUMADA,
        descricaoEquipamento: 'Mouse Razer',
        descricaoFalha: 'Descrição do chamado 3',
        slug: 'descricao-do-chamado-3',
        etapas: [],
        dataCriacao: new Date('2025-09-11T03:24:00'),
        precoBase: 75.0,
      });
      this.inserir({
        userId: 4,
        userName: 'José',
        serviceId: -1,
        serviceCategory: 'Desktop',
        status: StatusConcertoEnum.REDIRECIONADA,
        descricaoEquipamento: 'Desktop Dell',
        descricaoFalha: 'Descrição do chamado 4',
        slug: 'descricao-do-chamado-4',
        etapas: [],
        dataCriacao: new Date('2025-09-10T03:24:00'),
        precoBase: 450.0,
      });
      this.inserir({
        userId: 5,
        userName: 'Joana',
        serviceId: -1,
        serviceCategory: 'Teclado',
        status: StatusConcertoEnum.APROVADA,
        descricaoEquipamento: 'Teclado Logitec',
        descricaoFalha: 'Descrição do chamado 5',
        slug: 'descricao-do-chamado-5',
        etapas: [],
        dataCriacao: new Date(),
        precoBase: 120.0,
      });
      this.inserir({
        userId: 6,
        userName: 'Joana',
        serviceId: -1,
        serviceCategory: 'Impressora',
        status: StatusConcertoEnum.REJEITADA,
        descricaoEquipamento: 'Impressora Epson',
        descricaoFalha: 'Descrição do chamado 6',
        slug: 'descricao-do-chamado-6',
        etapas: [],
        dataCriacao: new Date(),
        precoBase: 420.0,
      });
      this.inserir({
        userId: 7,
        userName: 'Joaquina',
        serviceId: -1,
        serviceCategory: 'Desktop',
        status: StatusConcertoEnum.ORCADA,
        descricaoEquipamento: 'Desktop Customizado',
        descricaoFalha: 'Descrição do chamado 7',
        slug: 'descricao-do-chamado-7',
        dataCriacao: new Date(),
        etapas: [],
        precoBase: 780.0,
      });
      this.inserir({
        userId: 8,
        userName: 'Joaquina',
        serviceId: 108,
        serviceCategory: 'Notebook',
        status: StatusConcertoEnum.ABERTA,
        descricaoEquipamento: 'Notebook Avell',
        descricaoFalha: 'Descrição do chamado 8',
        slug: 'descricao-do-chamado-8',
        etapas: [],
        dataCriacao: new Date(),
        precoBase: 325.0,
      });
    }
  }
}
