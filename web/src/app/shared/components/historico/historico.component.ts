import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { EtapaHistorico, Tecnico } from '@/app/model/etapa-historico.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { StatusIconComponent } from '../status-icon/status-icon.component';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    StatusIconComponent,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    DatePipe,
  ],
  templateUrl: './historico.component.html',
  styles: `:host { display:block; }`,
})
export class HistoricoComponent {
  chamado = input.required<ChamadoItem>();

  statusFinal: StatusConsertoEnum = StatusConsertoEnum.FINALIZADA;
  StatusConsertoEnum = StatusConsertoEnum; //para que o html possa acessar
}
