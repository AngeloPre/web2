import { ChamadoItem } from '@/app/model/chamado.type';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ChamadoService } from '@/app/services/chamado.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirmar-orcamento-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './confirmar-orcamento-dialog.component.html',
  styles: ``
})
export class ConfirmarOrcamentoDialogComponent {
  private chamadoService = inject(ChamadoService);
  public dados: { chamado: ChamadoItem, precoBase: number } = inject(MAT_DIALOG_DATA)
  comentario = '';

  constructor(public dialogRef: MatDialogRef<ConfirmarOrcamentoDialogComponent>) {}  

  salvarOrcamento(){

    const chamadoAtualizado: ChamadoItem = {
      ...this.dados.chamado,
      precoBase: this.dados.precoBase,
      dataResposta: new Date(),
      comentario: this.comentario,
      status: StatusConsertoEnum.ORCADA 
    };
    this.chamadoService.atualizar(chamadoAtualizado);
    this.dialogRef.close({saved: true});
  }
}
