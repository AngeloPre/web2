import { Injectable } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { ChamadoItem } from '../model/chamado-list-mock.type';
import { StatusConcertoEnum } from '../model/enums/chamado-status.enum';
import { CategoriaEquipamento } from '../model/enums/categoria-equipamento';

export const LS_Chamado = 'Chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService implements MockServices<ChamadoItem> {
  private serviceID = 100;

  listarTodos(): ChamadoItem[] {
    const chamados = localStorage[LS_Chamado];
    return chamados ? JSON.parse(chamados) : [];
  }
  inserir(elemento: ChamadoItem): void {
    const chamados = this.listarTodos();
    elemento.serviceId = this.serviceID++;
    chamados.push(elemento);
    localStorage[LS_Chamado] = JSON.stringify(chamados);
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
  }
  remover(elemento: ChamadoItem): void {
    let chamados = this.listarTodos();
    chamados.filter((chamado) => chamado.serviceId !== elemento.serviceId);
    localStorage[LS_Chamado] = JSON.stringify(chamados);
  }

  constructor() {
    if (this.listarTodos().length === 0) {
      localStorage.setItem('chamado_mock_initialized', 'true');
      this.inserir({
        userId: 1,
        userName: 'João',
        serviceId: 101,
        serviceCategory: CategoriaEquipamento.NOTEBOOK,
        status: StatusConcertoEnum.FINALIZADA,
        descricao: 'Descrição do chamado 1',
        slug: 'descricao-do-chamado-1',
        data: new Date(),
      });
      this.inserir({
        userId: 2,
        userName: 'João',
        serviceId: 102,
        serviceCategory: CategoriaEquipamento.IMPRESSORA,
        status: StatusConcertoEnum.PAGA,
        descricao: 'Descrição do chamado 2',
        slug: 'descricao-do-chamado-2',
        data: new Date(),
      });
      this.inserir({
        userId: 3,
        userName: 'José',
        serviceId: 103,
        serviceCategory: CategoriaEquipamento.MOUSE,
        status: StatusConcertoEnum.ARRUMADA,
        descricao: 'Descrição do chamado 3',
        slug: 'descricao-do-chamado-3',
        data: new Date(),
      });
      this.inserir({
        userId: 4,
        userName: 'José',
        serviceId: 104,
        serviceCategory: CategoriaEquipamento.DESKTOP,
        status: StatusConcertoEnum.REDIRECIONADA,
        descricao: 'Descrição do chamado 4',
        slug: 'descricao-do-chamado-4',
        data: new Date(),
      });
      this.inserir({
        userId: 5,
        userName: 'Joana',
        serviceId: 105,
        serviceCategory: CategoriaEquipamento.TECLADO,
        status: StatusConcertoEnum.APROVADA,
        descricao: 'Descrição do chamado 5',
        slug: 'descricao-do-chamado-5',
        data: new Date(),
      });
      this.inserir({
        userId: 6,
        userName: 'Joana',
        serviceId: 106,
        serviceCategory: CategoriaEquipamento.IMPRESSORA,
        status: StatusConcertoEnum.REJEITADA,
        descricao: 'Descrição do chamado 6',
        slug: 'descricao-do-chamado-6',
        data: new Date(),
      });
      this.inserir({
        userId: 7,
        userName: 'Joaquina',
        serviceId: 107,
        serviceCategory: CategoriaEquipamento.DESKTOP,
        status: StatusConcertoEnum.ORCADA,
        descricao: 'Descrição do chamado 7',
        slug: 'descricao-do-chamado-7',
        data: new Date(),
      });
      this.inserir({
        userId: 8,
        userName: 'Joaquina',
        serviceId: 108,
        serviceCategory: CategoriaEquipamento.NOTEBOOK,
        status: StatusConcertoEnum.ABERTA,
        descricao: 'Descrição do chamado 8',
        slug: 'descricao-do-chamado-8',
        data: new Date(),
      });
    }
  }
}
