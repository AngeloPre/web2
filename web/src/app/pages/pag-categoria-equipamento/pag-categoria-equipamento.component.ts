import { CategoriaEquipamentoTableComponent } from '@/app/shared/components/categoria-equipamento-table/categoria-equipamento-table.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoriaEquipamentoService } from '@/app/services/categoria-equipamento.service';
import { CategoriaEquipamento } from '@/app/model/categoria-equipamento.type';
import { NovaCategoriaEquipamentoComponent } from '@/app/shared/components/dialogs/nova-categoria-equipamento/nova-categoria-equipamento.component';

@Component({
  selector: 'app-pag-categoria-equipamento',
  imports: [CategoriaEquipamentoTableComponent, MatButtonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './pag-categoria-equipamento.component.html',
  styles: ``
})
export class PagCategoriaEquipamentoComponent implements OnInit {
  private categoriaEquipamentoService = inject(CategoriaEquipamentoService);

  categoriaEquipamentoMock = signal<CategoriaEquipamento[]>([]);

  ngOnInit(): void {
    this.atualizarTela();
    console.log(this.categoriaEquipamentoService.listarTodos());
  }

  atualizarTela(): void {
    this.categoriaEquipamentoMock.set(this.categoriaEquipamentoService.listarTodos());
  }

  private dialog = inject(MatDialog);
  private snack  = inject(MatSnackBar);
  novo() {
      const ref = this.dialog.open(NovaCategoriaEquipamentoComponent, {
        width: '500px',
        maxWidth: 'none',
        panelClass: 'dialog-xxl'
      });
      ref.afterClosed().subscribe((ok: boolean) => {
        if (ok) {
          // TODO: chamar API de aprovação
          this.snack.open('Criada nova categoria de equipamento', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success'],
          });
        }
      });
    }
}
