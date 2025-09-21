import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoItem } from '@/app/model/chamado.type';
import { ChamadoService } from '@/app/services/chamado.service';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-approve-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './approve-confirm-dialog.component.html',
  styles: ``
})
export class ApproveConfirmDialogComponent {
  private chamadoService = inject(ChamadoService);
  public data: { chamado: ChamadoItem } = inject(MAT_DIALOG_DATA);

  constructor(private ref: MatDialogRef<ApproveConfirmDialogComponent>) { }

  aprovarOrcamento(): void {
    const chamadoAtualizado: ChamadoItem = {
      ...this.data.chamado,
      status: StatusConsertoEnum.APROVADA
    }

    this.chamadoService.atualizar(chamadoAtualizado);
    this.ref.close(true);
  }
}
