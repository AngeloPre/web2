import { ChamadoItem } from '@model/chamado.type';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { ChamadoService } from '@services/chamado.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-confirmar-orcamento-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './confirmar-orcamento-dialog.component.html',
  styles: ``,
})
export class ConfirmarOrcamentoDialogComponent {
  public dados: { chamado: ChamadoItem; precoBase: number } =
    inject(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<ConfirmarOrcamentoDialogComponent>
  ) {}

  salvarOrcamento() {
    this.dialogRef.close({ confirmado: true });
  }
}
