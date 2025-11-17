import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ResgatarServicoComponent } from '../resgatar-servico/resgatar-servico.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChamadoService } from '@/app/services/chamado.service';
import { filter, switchMap, tap } from 'rxjs';
import { EtapaHistorico } from '@/app/model/etapa-historico.type';

@Component({
  selector: 'app-visualizar-button',
  standalone: true,
  imports: [RouterLink, MatDialogModule],
  templateUrl: './visualizar-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizarButtonComponent {
  private chamadoService = inject(ChamadoService);
  chamadosStatus = StatusConsertoEnum;
  status = input.required<StatusConsertoEnum>();
  id = input.required<number>();
  slug = input<string>();
  readonly dialog = inject(MatDialog);

  abrirModal(): void {
    const dialogRef = this.dialog.open(ResgatarServicoComponent);

    dialogRef.afterClosed().pipe(
      filter(result => result === 'resgatar'),
      switchMap(() => {
        const resgatada: EtapaHistorico = {
          id: -1,
          serviceId: this.id(),
          status: StatusConsertoEnum.APROVADA,
          dataCriado: new Date(),
        } as EtapaHistorico;
        return this.chamadoService.resgatar(this.id(), resgatada);
      }),
      switchMap(() => this.chamadoService.refresh())
    ).subscribe();
  }

}
