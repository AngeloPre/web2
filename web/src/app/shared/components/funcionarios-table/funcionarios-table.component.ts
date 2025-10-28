import { Usuario } from '@model/usuario';
import { StatusAtivoInativoComponent } from "../status-ativo-inativo/status-ativo-inativo.component";
import { Component, computed, effect, inject, OnInit, signal, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '@services/usuario.service';
import { Funcionario } from '@/app/model/funcionario';
import { FuncionarioService } from '@/app/services/funcionario-service';

@Component({
  selector: 'app-funcionarios-table',
  imports: [StatusAtivoInativoComponent, RouterLink],
  templateUrl: './funcionarios-table.component.html',
  styles: `:host {overflow-y: auto; max-height: 75vh; display: block;}`
})
export class FuncionariosTableComponent {
  private dialog = inject(MatDialog);
  private funcionarioService = inject(FuncionarioService);
  funcionarios = input.required<Usuario[]>();
  router = inject(Router);
  deleted = output<number>();

  confirmarExcluir(id: number) {
    const funcionario = this.funcionarioService.buscarPorId(id);
    if (!funcionario) return;

    this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: `Deseja excluir o(a) funcionário(a)`, confirmacao: 'Excluir' },
      width: '360px'
    }).afterClosed().subscribe(ok => {
      if (!ok) return;

      //this.funcionarioService.remover(funcionario)
      this.deleted.emit(id);
    });
  }
}
