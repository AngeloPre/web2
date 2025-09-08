import { Component, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list.type';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { VisualizarButtonComponent } from '../visualizar-button/visualizar-button.component';
import { StatusIconComponent } from '../status-icon/status-icon.component';

@Component({
  selector: 'app-chamado-table',
  imports: [DatePipe, VisualizarButtonComponent, StatusIconComponent, RouterLink],
  templateUrl: './chamado-table.component.html',
  styles: ``,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();
  btnClicked = output<{ id: number; statusNovo: StatusConcertoEnum }>();

  chamadosStatus = StatusConcertoEnum;

  btnAcao(id: number): void {
    const res = this.chamados().find((chamado) => chamado.serviceId === id);
    switch (res?.status) {
      case StatusConcertoEnum.ARRUMADA:
        console.log('Pagar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConcertoEnum.FINALIZADA,
        });
        break;
      case StatusConcertoEnum.REJEITADA:
        console.log('Resgatar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConcertoEnum.APROVADA,
        });
        break;
      case StatusConcertoEnum.ORCADA:
        console.log('Aprovar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConcertoEnum.APROVADA,
        });
        break;
      default:
        console.log('Não implementado');
    }
  }
}
