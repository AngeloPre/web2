import { Component, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { VisualizarButtonComponent } from '../visualizar-button/visualizar-button.component';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { LimiteCaracteresPipe } from '../../pipes/limite-caracteres.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chamado-table',
  imports: [
    DatePipe,
    VisualizarButtonComponent,
    StatusIconComponent,
    RouterLink,
    LimiteCaracteresPipe,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './chamado-table.component.html',
  styles: ``,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();
  btnClicked = output<{ id: number; statusNovo: StatusConsertoEnum }>();

  chamadosStatus = StatusConsertoEnum;

  btnAcao(id: number): void {
    const res = this.chamados().find((chamado) => chamado.serviceId === id);
    switch (res?.status) {
      case StatusConsertoEnum.ARRUMADA:
        console.log('Pagar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConsertoEnum.FINALIZADA,
        });
        break;
      case StatusConsertoEnum.REJEITADA:
        console.log('Resgatar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConsertoEnum.APROVADA,
        });
        break;
      case StatusConsertoEnum.ORCADA:
        console.log('Aprovar');
        this.btnClicked.emit({
          id: res.serviceId,
          statusNovo: StatusConsertoEnum.APROVADA,
        });
        break;
      default:
        console.log('Não implementado');
    }
  }
}
