import { CategoriaEquipamento } from '@/app/model/enums/categoria-equipamento';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ChamadoInicial, EtapaHistorico, Tecnico } from '@/app/model/etapa-historico-mock.type';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
        MatExpansionModule
    ],
    templateUrl: './historico.component.html',
    styles: `:host { display:block; }`
})
export class HistoricoComponent {
    statusFinal: StatusConcertoEnum = StatusConcertoEnum.FINALIZADA;
    StatusConcertoEnum = StatusConcertoEnum; //para que o html possa acessar

    chamadoInicial: ChamadoInicial = {
        categoriaEquipamento: CategoriaEquipamento.DESKTOP,
        descricaoEquipamento: "Computador de mesa",
        descricaoFalha: "O sistema de backup automático parou de funcionar"
    } as ChamadoInicial;

    etapas: EtapaHistorico[] = [
        {
            id: 1,
            dataCriado: new Date(2025, 2, 12, 9, 12), //ano, mes, dia, hora, minuto
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.ABERTA,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 2,
            dataCriado: new Date(2025, 2, 13, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.ORCADA,
            orcamento: 120.00,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 3,
            dataCriado: new Date(2025, 2, 14, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.REJEITADA,
            orcamento: 120.00,
            motivoRejeicao: "Este preço não condiz com o serviço solicitado.",
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 4,
            dataCriado: new Date(2025, 2, 15, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.ORCADA,
            orcamento: 100.00,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 5,
            dataCriado: new Date(2025, 2, 16, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.APROVADA,
            orcamento: 100.00,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 6,
            dataCriado: new Date(2025, 2, 17, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.ARRUMADA,
            orcamento: 100.00,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
        {
            id: 7,
            dataCriado: new Date(2025, 2, 18, 9, 12),
            tecnico: { nome: "Ramon Alves" } as Tecnico,
            status: StatusConcertoEnum.FINALIZADA,
            orcamento: 100.00,
            chamadoInicial: this.chamadoInicial
        } as EtapaHistorico,
    ]
}
