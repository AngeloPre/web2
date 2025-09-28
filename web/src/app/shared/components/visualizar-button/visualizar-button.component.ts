import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ResgatarServicoComponent } from '../resgatar-servico/resgatar-servico.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChamadoService } from '@/app/services/chamado.service';

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
  status = input.required<StatusConsertoEnum>();
  id = input.required<number>();
  slug = input<string>();
  readonly dialog = inject(MatDialog);

  abrirModal(): void {
    const dialogRef = this.dialog.open(ResgatarServicoComponent);
    const chamado = this.chamadoService.buscarPorID(this.id());

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'resgatar' && chamado) {
        chamado.status = StatusConsertoEnum.APROVADA;
        this.chamadoService.atualizar(chamado);
      }
    });
  }

  chamadosStatus = StatusConsertoEnum;
}
