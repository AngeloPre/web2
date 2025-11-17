import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { EtapaHistorico, Tecnico } from '@/app/model/etapa-historico.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { IniciaisPipe } from '@pipes/iniciais.pipe';

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
    IniciaisPipe,
  ],
  templateUrl: './historico.component.html',
  styles: `:host { display:block; }`,
})
export class HistoricoComponent {
  chamado = input.required<ChamadoItem>();
  etapas = input.required<EtapaHistorico[]>();
  statusFinal: StatusConsertoEnum = StatusConsertoEnum.FINALIZADA;
  StatusConsertoEnum = StatusConsertoEnum; //para que o html possa acessar
}
