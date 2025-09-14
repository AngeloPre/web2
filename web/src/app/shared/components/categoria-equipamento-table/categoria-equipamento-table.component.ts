import { Component, inject } from '@angular/core';
import { StatusAtivoInativoComponent } from '../status-ativo-inativo/status-ativo-inativo.component';
import { CategoriaEquipamento } from '@/app/model/categoria-equipamento.type';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NovaCategoriaEquipamentoComponent } from '../dialogs/nova-categoria-equipamento/nova-categoria-equipamento.component';
import { CategoriaEquipamentoService } from '@/app/services/categoria-equipamento.service';
import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-categoria-equipamento-table',
  imports: [StatusAtivoInativoComponent, MatButtonModule, MatDialogModule, MatSnackBarModule, FormsModule, NgxCurrencyDirective],
  templateUrl: './categoria-equipamento-table.component.html',
  styles: ``
})
export class CategoriaEquipamentoTableComponent {
  private dialog = inject(MatDialog);
  private snack  = inject(MatSnackBar);
  private categoriasService = inject(CategoriaEquipamentoService);
  categorias = this.categoriasService.signalCategorias;
  novo() {
      const ref = this.dialog.open(NovaCategoriaEquipamentoComponent, {
        width: '500px',
        maxWidth: 'none',
        panelClass: 'dialog-xxl'
      });
      ref.afterClosed().subscribe((ok: boolean) => {
        if (ok) {
          this.snack.open('Criada nova categoria de equipamento', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success'],
          });
        }
      });
    }
    toggle(categoria: CategoriaEquipamento) {
    if (categoria.isActive === StatusAtivoInativo.ATIVO) {
      this.categoriasService.desativar(categoria.id);
      this.snack.open('Categoria desativada', 'OK', {
        duration: 2500, verticalPosition: 'top', horizontalPosition: 'center',
        panelClass: ['snack-top','snack-success']
      });
    } else {
      this.categoriasService.reativar(categoria.id);
      this.snack.open('Categoria reativada', 'OK', {
        duration: 2500, verticalPosition: 'top', horizontalPosition: 'center',
        panelClass: ['snack-top','snack-success']
      });
    }
  }
}
