import { Component, inject, input, output, Signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { DataHoraPipe } from '../../pipes/data-hora.pipe';
import { MatLabel, MatError } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import {
  EtapaHistorico,
  Manutencao,
  Redirecionamento,
  Tecnico,
} from '@/app/model/etapa-historico.type';
import { FormsModule } from '@angular/forms';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RedirecionarModalComponent } from '../redirecionar-modal/redirecionar-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChamadoService } from '@/app/services/chamado.service';
import { IniciaisPipe } from '@pipes/iniciais.pipe';
import { Observable, of } from 'rxjs';
import { Funcionario } from '@/app/model/funcionario';

@Component({
  selector: 'app-efetuar-manutencao',
  imports: [
    StatusIconComponent,
    DataHoraPipe,
    MatLabel,
    MatButton,
    FormsModule,
    IniciaisPipe
],
  templateUrl: './efetuar-manutencao.component.html',
  styles: ``,
})
export class EfetuarManutencaoComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private chamadoService = inject(ChamadoService);
  chamado = input<ChamadoItem | undefined>();
  salvarChamado = input.required<(item: ChamadoItem) => void>();
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  descricaoObrigatoria = false;

  redirecionarManutencao(funcionarioDestino: Funcionario): Observable<ChamadoItem> {
  const chamado = this.chamado();
  if (!chamado) {
    return of();
  }

  const tecnicoDestino: Tecnico = {
    id: funcionarioDestino.id,
    nome: funcionarioDestino.nome,
  };

  const redirecionamento: Redirecionamento = {
    tecnicoDestino,
  };

  const etapaRedirecionamento: EtapaHistorico = {
    id: -1,
    serviceId: chamado.id,
    dataCriado: new Date(),
    status: StatusConsertoEnum.REDIRECIONADA,
    redirecionamento: redirecionamento,
  };

  return this.chamadoService.redirecionar(chamado.id, etapaRedirecionamento);
}

  efetuarManutencao(): Observable<ChamadoItem> {
    const chamado = this.chamado();
    if(!chamado) return of()
    const tecnicoAtual: Tecnico = {
      nome: chamado?.funcionario ?? ""
    };
    const manutencao: Manutencao = {
      descricao: this.descricaoManutencao,
      orientacoes: this.orientacoesCliente,
    };
    const arrumada: EtapaHistorico = {
      id: -1,
      serviceId: chamado.id,
      dataCriado: new Date(),
      tecnico: tecnicoAtual,
      status: StatusConsertoEnum.ARRUMADA,
      manutencao: manutencao,
    };

    return this.chamadoService.efetuar(chamado.id, arrumada)
  }

  abrirModalConfirmacao(): void {
    if (!this.descricaoManutencao || !this.descricaoManutencao.trim()) {
      this.descricaoObrigatoria = true;
      return;
    }

    this.descricaoObrigatoria = false;
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: {
        titulo: 'Deseja concluir a manutenção?',
        confirmacao: 'Concluir',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.efetuarManutencao().subscribe({
          next: () => {
            this.snackBar.open('Manutenção concluída com sucesso!', 'Fechar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snack-top', 'snack-success'],
            });
            this.router.navigate(['/funcionario/solicitacoes']);
          },
          error: (err) => {
            this.snackBar.open(err.error, 'OK', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snack-top', 'snack-danger'],
            });
          },
        });
      }
    });
  }

  abrirModalRedirecionamento(): void {
  const chamadoAtual = this.chamado();
  if (!chamadoAtual) return;

  const dialogRef = this.dialog.open(RedirecionarModalComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((selectedFuncionario: Funcionario | null) => {
    if (!selectedFuncionario) return;
    this.redirecionarManutencao(selectedFuncionario).subscribe({
      next: () => {
        this.snackBar.open(
          'Manutenção redirecionada com sucesso!',
          'Fechar',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success'],
          },
        );
        this.router.navigate(['/funcionario/solicitacoes']);
      },
      error: (err) => {
        this.snackBar.open(err.error ?? 'Erro ao redirecionar manutenção.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-danger'],
        });
      },
    });
  });
}
}
