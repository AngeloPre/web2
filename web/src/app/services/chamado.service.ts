import { Injectable } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { ChamadoItem } from '../model/chamado-list-mock.type';
import { StatusConcertoEnum } from '../model/enums/chamado-status.enum';

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
      this.inserir({
        userId: 1,
        serviceId: 101,
        status: StatusConcertoEnum.FINALIZADA,
        descricao: 'Descrição do chamado 1',
        slug: 'descricao-do-chamado-1',
        data: new Date(),
      });
      this.inserir({
        userId: 2,
        serviceId: 102,
        status: StatusConcertoEnum.PAGA,
        descricao: 'Descrição do chamado 2',
        slug: 'descricao-do-chamado-2',
        data: new Date(),
      });
      this.inserir({
        userId: 3,
        serviceId: 103,
        status: StatusConcertoEnum.ARRUMADA,
        descricao: 'Descrição do chamado 3',
        slug: 'descricao-do-chamado-3',
        data: new Date(),
      });
      this.inserir({
        userId: 4,
        serviceId: 104,
        status: StatusConcertoEnum.REDIRECIONADA,
        descricao: 'Descrição do chamado 4',
        slug: 'descricao-do-chamado-4',
        data: new Date(),
      });
      this.inserir({
        userId: 5,
        serviceId: 105,
        status: StatusConcertoEnum.APROVADA,
        descricao: 'Descrição do chamado 5',
        slug: 'descricao-do-chamado-5',
        data: new Date(),
      });
      this.inserir({
        userId: 6,
        serviceId: 106,
        status: StatusConcertoEnum.REJEITADA,
        descricao: 'Descrição do chamado 6',
        slug: 'descricao-do-chamado-6',
        data: new Date(),
      });
      this.inserir({
        userId: 7,
        serviceId: 107,
        status: StatusConcertoEnum.ORCADA,
        descricao: 'Descrição do chamado 7',
        slug: 'descricao-do-chamado-7',
        data: new Date(),
      });
      this.inserir({
        userId: 8,
        serviceId: 108,
        status: StatusConcertoEnum.ABERTA,
        descricao: 'Descrição do chamado 8',
        slug: 'descricao-do-chamado-8',
        data: new Date(),
      });
    }
  }
}
