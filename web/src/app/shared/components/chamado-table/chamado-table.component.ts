import { Component, input } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { DatePipe } from '@angular/common';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { VisualizarButtonComponent } from '../visualizar-button/visualizar-button.component';

@Component({
  selector: 'app-chamado-table',
  imports: [DatePipe, VisualizarButtonComponent],
  templateUrl: './chamado-table.component.html',
  styles: ``,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();
  chamadosStatus = StatusConcertoEnum;
}
