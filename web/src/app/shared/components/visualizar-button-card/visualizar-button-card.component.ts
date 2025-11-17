import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '@shared/components/confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChamadoService } from '@services/chamado.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { EtapaHistorico } from '@/app/model/etapa-historico.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visualizar-button-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './visualizar-button-card.component.html',
  styles: ``,
})
export class VisualizarButtonCardComponent {
  id = input.required<number>();
  slug = input<string>();
  status = input.required<StatusConsertoEnum>();
  private dialog = inject(MatDialog);
  private chamadoService = inject(ChamadoService);
  private snackBar = inject(MatSnackBar);

  btnClicked = output<number>();
  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  finalizar(): void {
    const chamadoId = this.id();
    const finalizada: EtapaHistorico = {
      id: -1,
      serviceId: chamadoId,
      status: StatusConsertoEnum.FINALIZADA,
      dataCriado: new Date(),
    };

    this.chamadoService.finalizar(chamadoId, finalizada).pipe(
      switchMap(() => this.chamadoService.refresh()),
      catchError(err => {
        this.snackBar.open(err.error, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-danger'],
        });
        return of([]);
      })
    ).subscribe(() => {
      this.snackBar.open('Solicitação finalizada com sucesso', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snack-top', 'snack-success'],
      });
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: 'Deseja finalizar o chamado?', confirmacao: 'Finalizar' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.finalizar();
    });
  }

  chamadosStatus = StatusConsertoEnum;
}
