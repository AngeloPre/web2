import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RejectReasonDialogComponent } from '../dialogs/reject-reason-dialog/reject-reason-dialog.component';
import { ApproveConfirmDialogComponent } from '../dialogs/approve-confirm-dialog/approve-confirm-dialog.component';

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
  private snack  = inject(MatSnackBar);

  aprovar() {
    const ref = this.dialog.open(ApproveConfirmDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl'
    });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (ok) {
        // TODO: chamar API de aprovação
        this.snack.open('Orçamento aprovado', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-success'],
        });
      }
    });
  }

  rejeitar() {
    const ref = this.dialog.open(RejectReasonDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl'
    });
    ref.afterClosed().subscribe((res?: { reason: string }) => {
      if (res?.reason) {
        // TODO: enviar motivo
        this.snack.open('Orçamento rejeitado', 'Fechar', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-danger'],
        });
      }
    });
  }
}
