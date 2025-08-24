import { Component, input } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { DatePipe } from '@angular/common';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { VisualizarButtonComponent } from '../visualizar-button/visualizar-button.component';
import { StatusIconComponent } from '../status-icon/status-icon.component';

@Component({
  selector: 'app-chamado-table',
  imports: [DatePipe, VisualizarButtonComponent, StatusIconComponent],
  templateUrl: './chamado-table.component.html',
  styles: ``,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();

  chamadosStatus = StatusConcertoEnum;

  btnAcao(id: number): void {
    const res = this.chamados().find((chamado) => chamado.serviceId === id);
    switch (res?.status) {
      case StatusConcertoEnum.ARRUMADA:
        console.log('Pagar');
        break;
      case StatusConcertoEnum.REJEITADA:
        console.log('Resgatar');
        break;
      case StatusConcertoEnum.ORCADA:
        console.log('Aprovar');
        break;
      default:
        console.log('Não implementado');
    }
  }
}
