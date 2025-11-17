import { Funcionario } from '@/app/model/funcionario';
import { ChamadoItem } from '@/app/model/chamado.type';
import { ChamadoService } from '@services/chamado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-redirecionar-modal',
  imports: [
    FormsModule,
    CommonModule,
    MatButton,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
  ],
  templateUrl: './redirecionar-modal.component.html',
  styles: ``,
})
export class RedirecionarModalComponent {
  funcionarios: Funcionario[] = [];
  selectedFuncionario: Funcionario | null = null;
  chamado: ChamadoItem;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { chamado: ChamadoItem },
    public dialog: MatDialogRef<RedirecionarModalComponent>,
    private readonly chamadoService: ChamadoService
  ) {
    this.chamado = data.chamado;
  }

  onCancel(): void {
    this.dialog.close();
  }

  onRedirect(): void {
    if (this.selectedFuncionario && this.chamado) {
      this.chamado.funcionario = this.selectedFuncionario.nome;
      this.chamado.status = StatusConsertoEnum.REDIRECIONADA;
      this.chamadoService.atualizar(this.chamado);
      this.dialog.close(this.chamado);
    }
  }
}
