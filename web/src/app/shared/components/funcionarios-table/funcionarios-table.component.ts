import { StatusAtivoInativoComponent } from "../status-ativo-inativo/status-ativo-inativo.component";
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Funcionario } from '@/app/model/funcionario';
import { FuncionarioService } from '@/app/services/funcionario.service';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';

@Component({
  selector: 'app-funcionarios-table',
  standalone: true,
  imports: [StatusAtivoInativoComponent, RouterLink, RiveLoaderComponent],
  templateUrl: './funcionarios-table.component.html',
  styles: `:host {overflow-y: auto; max-height: 75vh; display: block;}`
})
export class FuncionariosTableComponent {
  private dialog = inject(MatDialog);
  protected funcionarioService = inject(FuncionarioService);
  funcionarios = input.required<Funcionario[]>();
  router = inject(Router);
  deleted = output<number>();

  confirmarExcluir(id: number) {
    this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: 'Deseja excluir o(a) funcionário(a)', confirmacao: 'Excluir' },
      width: '360px'
    }).afterClosed().subscribe(ok => {
      if (!ok) return;
      this.funcionarioService.remover(id).subscribe({
        next: () => this.deleted.emit(id),
        error: (err) => console.error('Erro ao remover funcionário', err)
      });
    });
  }
}