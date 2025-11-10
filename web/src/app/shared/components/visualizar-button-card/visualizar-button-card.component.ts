import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '@shared/components/confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChamadoService } from '@services/chamado.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-visualizar-button-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './visualizar-button-card.component.html',
  styles: ``,
})
export class VisualizarButtonCardComponent {
  id = input.required<number>();
  status = input.required<StatusConsertoEnum>();
  private dialog = inject(MatDialog);
  private chamadoService = inject(ChamadoService);

  btnClicked = output<number>();
  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  finalizar(): void {
    const id = this.id();

    this.chamadoService.buscarPorId(id).pipe(
      map(ch => ({ ...ch, status: StatusConsertoEnum.FINALIZADA })),
      switchMap(ch => this.chamadoService.atualizar(ch)),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe();
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
