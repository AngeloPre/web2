import { Funcionario } from '@/app/model/funcionario';
import { ChamadoItem } from '@/app/model/chamado.type';
import { Component, inject, Inject, OnInit } from '@angular/core';
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
import { FuncionarioService } from '@/app/services/funcionario.service';

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
export class RedirecionarModalComponent implements OnInit{
  private funcionarioService: FuncionarioService = inject(FuncionarioService);
  funcionariosSignal = this.funcionarioService.signalFuncionarios;
  selectedFuncionario: Funcionario | null = null;

  constructor(
    public dialog: MatDialogRef<RedirecionarModalComponent>,
  ) {
  }
  ngOnInit(): void {
    this.funcionarioService.refresh().subscribe();
  }

  onCancel(): void {
    this.dialog.close();
  }

  onRedirect(): void {
  if (!this.selectedFuncionario) return;
console.log("FUNCIONARIO DA MODAL", this.selectedFuncionario)
  this.dialog.close(this.selectedFuncionario);
}
}
