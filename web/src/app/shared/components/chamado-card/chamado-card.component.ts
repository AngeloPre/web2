import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChamadoItem } from '@model/chamado.type';
import { DatePipe } from '@angular/common';
import { LimiteCaracteresPipe } from '@shared/pipes/limite-caracteres.pipe';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { VisualizarButtonCardComponent } from '../visualizar-button-card/visualizar-button-card.component';


@Component({
  selector: 'app-chamado-card',
  imports: [DatePipe, MatCardModule, LimiteCaracteresPipe, StatusIconComponent, VisualizarButtonCardComponent],
  templateUrl: './chamado-card.component.html',
  styles: ``
})
export class ChamadoCardComponent {
  chamados = input.required<Array<ChamadoItem>>();
  chamadosStatus = StatusConsertoEnum;
}
