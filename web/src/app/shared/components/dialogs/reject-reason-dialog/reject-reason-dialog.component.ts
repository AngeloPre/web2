import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChamadoService } from '@/app/services/chamado.service';
import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-reject-reason-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './reject-reason-dialog.component.html',
  styles: ``
})
export class RejectReasonDialogComponent {
  private chamadoService = inject(ChamadoService);
  public data: { chamado: ChamadoItem } = inject(MAT_DIALOG_DATA);
  reason = '';
  constructor(private ref: MatDialogRef<RejectReasonDialogComponent>) {}

  rejeitarOrcamento(): void{
    const chamadoAtualizado: ChamadoItem = {
      ...this.data.chamado,
      status:StatusConsertoEnum.REJEITADA
    }
    
    this.chamadoService.atualizar(chamadoAtualizado);
    this.ref.close({ reason: this.reason.trim() } );
  }
}
