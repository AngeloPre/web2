import { Usuario } from '@/app/model/usuario';
import { Component, inject, input, output, } from '@angular/core';
import { StatusAtivoInativoComponent } from "../status-ativo-inativo/status-ativo-inativo.component";
import { Router, RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { Funcionario } from '@/app/model/funcionario';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '@/app/services/usuario.service';

@Component({
  selector: 'app-funcionarios-table',
  imports: [StatusAtivoInativoComponent, RouterLink],
  templateUrl: './funcionarios-table.component.html',
  styles: ``
})
export class FuncionariosTableComponent {
  private dialog = inject(MatDialog);
  usuarios = input.required<Usuario[]>();
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  deleted = output<number>();

  confirmarExcluir(id: number) {
    const funcionario = this.usuarioService.buscarPorID(id);
    if (!funcionario) return;

    this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: `Deseja excluir o(a) funcionário(a) ${funcionario?.nome}?`, confirmacao: 'Excluir' },
      width: '360px'
    }).afterClosed().subscribe(ok => {
      if (!ok) return;

      this.usuarioService.remover(funcionario);
      this.deleted.emit(id);
    });
  }
}
