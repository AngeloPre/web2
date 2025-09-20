import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RejectReasonDialogComponent } from '../dialogs/reject-reason-dialog/reject-reason-dialog.component';
import { ApproveConfirmDialogComponent } from '../dialogs/approve-confirm-dialog/approve-confirm-dialog.component';
import { Router } from '@angular/router';
import { ChamadoItem } from '@/app/model/chamado.type';

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

  chamado = input.required<ChamadoItem>();

  aprovar() {
    const ref = this.dialog.open(ApproveConfirmDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl',
      data: { chamado: this.chamado() }
    });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (ok) {
        const snack = this.snackBar.open(
          'Serviço Aprovado', 'OK',{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success']}
        );
        snack.afterDismissed().subscribe(() => {
          this.router.navigate(['/cliente']);
        });
      }
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
      if (res?.reason) {
        const snack = this.snackBar.open(
          'Serviço Rejeitado', 'Fechar',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-danger']
        });
        snack.afterDismissed().subscribe(() => {
          this.router.navigate(['/cliente']);
        });
      }
    });
  } 
}