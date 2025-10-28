import { StatusAtivoInativoComponent } from "../status-ativo-inativo/status-ativo-inativo.component";
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
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
  funcionarios = input.required<Funcionario[]>(); // use Funcionario type
  router = inject(Router);
  deleted = output<number>();

  confirmarExcluir(id: number) {
    this.funcionarioService.buscarPorId(id).subscribe({
      next: (funcionario) => {
        if (!funcionario) return;

        const dialogRef = this.dialog.open(ConfirmarModalComponent, {
          data: { titulo: `Deseja excluir o(a) funcionário(a) ${funcionario.nome}?`, confirmacao: 'Excluir' },
          width: '360px'
        });

        dialogRef.afterClosed().subscribe(ok => {
          if (!ok) return;

          this.funcionarioService.remover(id).subscribe({
            next: () => this.deleted.emit(id),
            error: (err) => console.error('Erro ao remover funcionário', err)
          });
        });
      },
      error: (err) => {
        console.error('Erro ao buscar funcionário', err);
      }
    });
  }
}