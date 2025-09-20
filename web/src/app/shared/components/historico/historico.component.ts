import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
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

  statusFinal: StatusConcertoEnum = StatusConcertoEnum.FINALIZADA;
  StatusConcertoEnum = StatusConcertoEnum; //para que o html possa acessar

  etapas: EtapaHistorico[] = [
    {
      id: 1,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 12, 9, 12), //ano, mes, dia, hora, minuto
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.ABERTA,
    } as EtapaHistorico,
    {
      id: 2,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 13, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.ORCADA,
      orcamento: 120.0,
    } as EtapaHistorico,
    {
      id: 3,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 14, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.REJEITADA,
      orcamento: 120.0,
      motivoRejeicao: 'Este preço não condiz com o serviço solicitado.',
    } as EtapaHistorico,
    {
      id: 4,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 15, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.ORCADA,
      orcamento: 100.0,
    } as EtapaHistorico,
    {
      id: 5,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 16, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.APROVADA,
      orcamento: 100.0,
    } as EtapaHistorico,
    {
      id: 6,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 16, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.REDIRECIONADA,
      orcamento: 100.0,
    } as EtapaHistorico,
    {
      id: 7,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 17, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.ARRUMADA,
      orcamento: 100.0,
    } as EtapaHistorico,
    {
      id: 8,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 17, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.PAGA,
      orcamento: 100.0,
    } as EtapaHistorico,
    {
      id: 9,
      serviceId: 1,
      dataCriado: new Date(2025, 2, 18, 9, 12),
      tecnico: { nome: 'Ramon Alves' } as Tecnico,
      status: StatusConcertoEnum.FINALIZADA,
      orcamento: 100.0,
    } as EtapaHistorico,
  ];
}
