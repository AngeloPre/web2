import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmarModalComponent } from '@/app/shared/components/confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChamadoService } from '@/app/services/chamado.service';

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
  status = input.required<StatusConcertoEnum>();
  private dialog = inject(MatDialog);
  private chamadoService = inject(ChamadoService);

  btnClicked = output<number>();
  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  finalizar() {
    let chamado = this.chamadoService.buscarPorID(this.id());
    if (chamado) {
      chamado.status = StatusConcertoEnum.FINALIZADA;
      this.chamadoService.atualizar(chamado);
    }
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: 'Deseja finalizar o chamado?', confirmacao: 'Finalizar' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.finalizar();
    });
  }

  chamadosStatus = StatusConcertoEnum;
}
