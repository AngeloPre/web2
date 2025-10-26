import { Component, inject, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { DataHoraPipe } from '../../pipes/data-hora.pipe';
import { MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { EtapaHistorico, Manutencao, Redirecionamento, Tecnico } from '@/app/model/etapa-historico.type';
import { FormsModule } from '@angular/forms';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RedirecionarModalComponent } from '../redirecionar-modal/redirecionar-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-efetuar-manutencao',
    imports: [StatusIconComponent, DataHoraPipe, MatLabel, MatButton, FormsModule],
    templateUrl: './efetuar-manutencao.component.html',
    styles: ``
})
export class EfetuarManutencaoComponent {
    private dialog = inject(MatDialog);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
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
                status: StatusConsertoEnum.REDIRECIONADA,
                redirecionamento
            };
            const etapas = chamado.etapas && chamado.etapas.length > 0
                ? [...chamado.etapas, etapaRedirecionamento]
                : [etapaRedirecionamento]
            const novoChamado: ChamadoItem = {
                ...chamado,
                status: StatusConsertoEnum.REDIRECIONADA,
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
                status: StatusConsertoEnum.ARRUMADA,
                manutencao
            };
            const etapas = chamado.etapas && chamado.etapas.length > 0
                ? [...chamado.etapas, etapaManutencao]
                : [etapaManutencao]
            const novoChamado: ChamadoItem = {
                ...chamado,
                status: StatusConsertoEnum.ARRUMADA,
                etapas
            };
            console.log("efetuada", novoChamado);
            const salvarChamado = this.salvarChamado();
            salvarChamado(novoChamado);
        }
    }

    abrirModalConfirmacao(): void {
        const dialogRef = this.dialog.open(ConfirmarModalComponent, {
            data: { titulo: 'Deseja concluir a manutenção?', confirmacao: 'Concluir' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.efetuarManutencao();
                this.snackBar.open('Manutenção concluída com sucesso!', 'Fechar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['snack-top', 'snack-success']
                });
                this.router.navigate(['/funcionario/solicitacoes']);
            }
        });
    }

    abrirModalRedirecionamento(): void {
        const chamadoAtual = this.chamado();
        if (!chamadoAtual) return;

        const dialogRef = this.dialog.open(RedirecionarModalComponent, {
            width: '400px',
            data: { chamado: chamadoAtual}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const salvarChamado = this.salvarChamado();
                salvarChamado(result);
                this.snackBar.open('Manutenção redirecionada com sucesso!', 'Fechar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['snack-top', 'snack-success']
                });
                this.router.navigate(['/funcionario/solicitacoes']);
            }
        });
    }
}
