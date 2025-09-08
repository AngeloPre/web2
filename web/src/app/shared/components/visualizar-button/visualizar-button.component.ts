import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ResgatarServicoComponent } from '../resgatar-servico/resgatar-servico.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-button',
  standalone: true,
  imports: [RouterLink, MatDialogModule],
  templateUrl: './visualizar-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizarButtonComponent {
  status = input.required<StatusConcertoEnum>();
  id = input.required<number>();
  slug = input<string>();
  readonly dialog = inject(MatDialog);

  btnClicked = output<number>();

  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ResgatarServicoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'resgatar') this.btnClicked.emit(this.id());
    });
  }

  chamadosStatus = StatusConcertoEnum;
}
