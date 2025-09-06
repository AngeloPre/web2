import { Injectable } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { ChamadoItem } from '../model/chamado-list-mock.type';
import { StatusConcertoEnum } from '../model/enums/chamado-status.enum';

export const LS_Chamado = 'Chamado';

@Injectable({
  providedIn: 'root',
})
class ChamadoService implements MockServices<ChamadoItem> {
  listarTodos(): ChamadoItem[] {
    const chamados = localStorage[LS_Chamado];
    return chamados ? JSON.parse(chamados) : [];
  }
  inserir(elemento: ChamadoItem): void {
    const chamados = this.listarTodos();
    elemento.status = StatusConcertoEnum.ABERTA;
    elemento.data = new Date();
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
}
