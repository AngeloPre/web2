import { Component, computed, inject, input, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarOrcamentoDialogComponent } from '../dialogs/confirmar-orcamento-dialog/confirmar-orcamento-dialog.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ChamadoItem } from '@/app/model/chamado.type';
import { Router } from '@angular/router';
import { ChamadoService } from '@/app/services/chamado.service';
import { Orcamento } from '@/app/model/orcamento';
import { IniciaisPipe } from '@pipes/iniciais.pipe';

@Component({
  selector: 'app-efetuar-orcamento',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
    NgxCurrencyDirective,
    DatePipe,
    CurrencyPipe,
    IniciaisPipe,
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styles: ``,
})
export class EfetuarOrcamentoComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  private chamadoService = inject(ChamadoService);

  chamado = input.required<ChamadoItem>();
  precoBase = signal(0);
  total = computed(() => this.precoBase());

  efetuarOrcamento() {
    const ref = this.dialog.open(ConfirmarOrcamentoDialogComponent, {
      width: '440px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl',
      data: { chamado: this.chamado(), precoBase: this.precoBase() },
    });
    ref.afterClosed().subscribe((resposta) => {
      if (resposta && resposta.confirmado) {
        const orcamento: Orcamento = {
          valor: this.precoBase(),
          comentario: resposta.comentario,
        };
        this.chamadoService
          .efetuarOrcamento(this.chamado().id, orcamento)
          .subscribe({
            next: () => {
              this.snack.open('Orçamento efetuado', 'OK', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snack-top', 'snack-success'],
              });
              this.router.navigate(['/funcionario']);
            },
            error: (err) => {
              this.snack.open(err.error, 'OK', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snack-top', 'snack-danger'],
              });
            },
          });
      }
    });
  }
}
