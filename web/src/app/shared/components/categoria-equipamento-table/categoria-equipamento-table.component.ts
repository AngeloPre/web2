import { Component, inject } from '@angular/core';
import { StatusAtivoInativoComponent } from '../status-ativo-inativo/status-ativo-inativo.component';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';
import { CategoriaEquipamento } from '@model/categoria-equipamento.type';
import { ConfirmarModalComponent } from '@shared/components/confirmar-modal/confirmar-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NovaCategoriaEquipamentoComponent } from '../dialogs/nova-categoria-equipamento/nova-categoria-equipamento.component';
import { CategoriaEquipamentoService } from '@services/categoria-equipamento.service';
import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-categoria-equipamento-table',
  imports: [StatusAtivoInativoComponent, MatButtonModule, MatDialogModule, MatSnackBarModule, FormsModule, NgxCurrencyDirective, RiveLoaderComponent],
  templateUrl: './categoria-equipamento-table.component.html',
  styles: `:host {overflow-y: auto; max-height: 72vh; display: block;}`
})
export class CategoriaEquipamentoTableComponent {
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  protected categoriasService = inject(CategoriaEquipamentoService);
  categorias = this.categoriasService.signalCategorias;
  readonly StatusAtivoInativo = StatusAtivoInativo;

  constructor() {
    this.categoriasService.refresh().subscribe();
  }

  private reload() { this.categoriasService.refresh().subscribe(); }

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
        this.reload();
      }
    });
  }

  editar(categoria: CategoriaEquipamento) {
    const ref = this.dialog.open(NovaCategoriaEquipamentoComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl',
      data: { categoria }
    });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (ok) {
        this.snack.open('Categoria atualizada', 'OK', {
          duration: 2500, verticalPosition: 'top', horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-success']
        });
        this.reload();
      }
    });
  }

  toggle(categoria: CategoriaEquipamento) {
    const id = categoria.categoryId;
    if (categoria.status) {
      if (id){
        this.categoriasService.desativar(id).subscribe(() => {
          this.snack.open('Categoria desativada', 'OK', {
            duration: 2500, verticalPosition: 'top', horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success']
          });
          this.reload();
        })
      };
    } else {
      if (id){
        this.categoriasService.reativar(id).subscribe(() => {
          this.snack.open('Categoria reativada', 'OK', {
            duration: 2500, verticalPosition: 'top', horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success']
          });
          this.reload();
        })
      };
    }
  }
  abrirModal(categoria: CategoriaEquipamento): void {
    const isAtivo = categoria.status;
    const acao = isAtivo ? 'Desativar' : 'Reativar';
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: {
        titulo: `Deseja realmente ${acao.toLowerCase()} essa categoria?`,
        confirmacao: acao,
      },
    });

    dialogRef.afterClosed().subscribe((ok) => {
      if (ok) this.toggle(categoria);
    });
  }

}
