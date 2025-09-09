import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualizar-button-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './visualizar-button-card.component.html',
  styles: ``
})
export class VisualizarButtonCardComponent {
  id = input.required<number>();
  slug = input<string>();
  status = input.required<StatusConcertoEnum>();

  btnClicked = output<number>();
  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  chamadosStatus = StatusConcertoEnum;
}
