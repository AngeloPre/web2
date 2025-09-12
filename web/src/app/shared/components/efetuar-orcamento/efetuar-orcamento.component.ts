import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoAdicionalDialogComponent } from '../dialogs/servico-adicional-dialog/servico-adicional-dialog.component';
import { ConfirmarOrcamentoDialogComponent } from '../dialogs/confirmar-orcamento-dialog/confirmar-orcamento-dialog.component';


@Component({
  selector: 'app-efetuar-orcamento',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton],
  templateUrl: './efetuar-orcamento.component.html',
  styles: ``
})
export class EfetuarOrcamentoComponent {
  private dialog = inject(MatDialog);

  adicionarServico() {
    const ref = this.dialog.open(ServicoAdicionalDialogComponent, {
          width: '440px',
          maxWidth: 'none',
          panelClass: 'dialog-xxl'
        });
  }

  excluirServico() {
    //implementar on delete do servico
  }

  efetuarOrcamento() {
    const ref = this.dialog.open(ConfirmarOrcamentoDialogComponent, {
          width: '440px',
          maxWidth: 'none',
          panelClass: 'dialog-xxl'
        });
  }


}
