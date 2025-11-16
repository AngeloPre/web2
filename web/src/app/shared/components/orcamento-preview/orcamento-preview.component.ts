import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RejectReasonDialogComponent } from '../dialogs/reject-reason-dialog/reject-reason-dialog.component';
import { ApproveConfirmDialogComponent } from '../dialogs/approve-confirm-dialog/approve-confirm-dialog.component';
import { Router } from '@angular/router';
import { ChamadoItem } from '@/app/model/chamado.type';
import { ChamadoService } from '@/app/services/chamado.service';
import { EtapaHistorico } from '@/app/model/etapa-historico.type';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-orcamento-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './orcamento-preview.component.html',
  styles: `:host { display:block; }`
})
export class OrcamentoPreviewComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private chamadoService = inject(ChamadoService);


  chamado = input.required<ChamadoItem>();

  aprovar() {
    const ref = this.dialog.open(ApproveConfirmDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl',
      data: { chamado: this.chamado() }
    });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      const atual = this.chamado();
      const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      const mensagemValorMascara = `Serviço aprovado no valor ${brl.format(atual.precoBase ?? 0)}.`;

      const aprovada: EtapaHistorico = {
        id: -1,
        serviceId: atual.id,
        status: StatusConsertoEnum.APROVADA,
        dataCriado: new Date()
      };
      this.chamadoService.criarEtapaBase(atual.id, aprovada).subscribe({
        next: () => {
          const snack = this.snackBar.open(mensagemValorMascara, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success'],
          });
          snack.afterDismissed().subscribe(() => this.router.navigate(['/cliente']));
        },
        error: (err) => {
          this.snackBar.open(err?.error ?? 'Falha ao aprovar orçamento', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-danger'],
          });
        },
      });
    });
  }

  rejeitar() {
    const ref = this.dialog.open(RejectReasonDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl',
      data: { chamado: this.chamado() }
    });
    ref.afterClosed().subscribe((res?: { reason: string }) => {
      if (!res?.reason) return;
      const atual = this.chamado();
      const rejeitada: EtapaHistorico = {
        id: -1,
        serviceId: atual.id,
        status: StatusConsertoEnum.REJEITADA,
        dataCriado: new Date(),
        motivoRejeicao: res.reason
      };
      this.chamadoService.rejeitar(atual.id, rejeitada).subscribe({
        next: () => {
          const snack = this.snackBar.open('Serviço Rejeitado', 'Fechar', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-danger']
          });
          snack.afterDismissed().subscribe(() => this.router.navigate(['/cliente']));
        },
        error: (err) => {
          this.snackBar.open(err?.error ?? 'Falha ao rejeitar orçamento', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-danger'],
          });
        }
      });
    });
  }
}
