import { Component, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list.type';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { DataHoraPipe } from '../../pipes/data-hora.pipe';
import { MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { EtapaHistorico, Manutencao, Redirecionamento, Tecnico } from '@/app/model/etapa-historico.type';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-efetuar-manutencao',
    imports: [StatusIconComponent, DataHoraPipe, MatLabel, MatButton, FormsModule],
    templateUrl: './efetuar-manutencao.component.html',
    styles: ``
})
export class EfetuarManutencaoComponent {
    chamado = input<ChamadoItem>();
    salvarChamado = input.required<(item: ChamadoItem) => void>();

    descricaoManutencao: string = '';
    orientacoesCliente: string = '';

    redirecionarManutencao(): void {
        const chamado = this.chamado();
        if (chamado) {
            const tecnicoAtual: Tecnico = { nome: "Tecnico Atual" };
            const novoTecnico: Tecnico = { nome: "Novo Tecnico" };

            const redirecionamento: Redirecionamento = {
                tecnicoOrigem: tecnicoAtual,
                tecnicoDestino: novoTecnico //selecionar o nome do crud de funcionarios quando tivermos
            };
            const etapaRedirecionamento: EtapaHistorico = {
                id: 1,
                serviceId: chamado.serviceId,
                dataCriado: new Date(),
                tecnico: tecnicoAtual,
                status: StatusConcertoEnum.REDIRECIONADA,
                redirecionamento
            };
            const etapas = chamado.etapas && chamado.etapas.length > 0
                ? [...chamado.etapas, etapaRedirecionamento]
                : [etapaRedirecionamento]
            const novoChamado: ChamadoItem = {
                ...chamado,
                status: StatusConcertoEnum.REDIRECIONADA,
                etapas
            };
            console.log("redirecionada", novoChamado);
            const salvarChamado = this.salvarChamado();
            salvarChamado(novoChamado);
        }
    }

    efetuarManutencao(): void {
        const chamado = this.chamado();
        if (chamado !== undefined) {
            const tecnicoAtual: Tecnico = { nome: "Tecnico Atual" };
            const manutencao: Manutencao = {
                descricao: this.descricaoManutencao,
                orientacoes: this.orientacoesCliente
            };
            const etapaManutencao: EtapaHistorico = {
                id: 1,
                serviceId: chamado.serviceId,
                dataCriado: new Date(),
                tecnico: tecnicoAtual,
                status: StatusConcertoEnum.ARRUMADA,
                manutencao
            };
            const etapas = chamado.etapas && chamado.etapas.length > 0
                ? [...chamado.etapas, etapaManutencao]
                : [etapaManutencao]
            const novoChamado: ChamadoItem = {
                ...chamado,
                status: StatusConcertoEnum.ARRUMADA,
                etapas
            };
            console.log("efetuada", novoChamado);
            const salvarChamado = this.salvarChamado();
            salvarChamado(novoChamado);
        }
    }
}
