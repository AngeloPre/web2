import { Component, computed, inject, input, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoAdicionalDialogComponent } from '../dialogs/servico-adicional-dialog/servico-adicional-dialog.component';
import { ConfirmarOrcamentoDialogComponent } from '../dialogs/confirmar-orcamento-dialog/confirmar-orcamento-dialog.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ServicosAdicionaisComponent } from '../servicos-adicionais/servicos-adicionais.component';
import { ChamadoItem } from '@/app/model/chamado.type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-efetuar-orcamento',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton, NgxCurrencyDirective, DatePipe, CurrencyPipe],
  templateUrl: './efetuar-orcamento.component.html',
  styles: ``
})

export class EfetuarOrcamentoComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  chamado = input.required<ChamadoItem>();
  precoBase = signal(0);
  total = computed(() => this.precoBase());
  
  efetuarOrcamento() {
    const ref = this.dialog.open(ConfirmarOrcamentoDialogComponent, {
          width: '440px',
          maxWidth: 'none',
          panelClass: 'dialog-xxl',
          data: { chamado: this.chamado(), precoBase: this.precoBase() }
        });

    ref.afterClosed().subscribe(resultado => {
      if (resultado && resultado.saved) {
        this.snackBar.open('Orçamento efetuado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/funcionario']);
      }
    });
  }
}
